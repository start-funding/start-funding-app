const schedule = require('node-schedule');
const { db } = require('../services/firebase/firebase');
const axios = require('axios');
const ApiData = require('../conf/smartContractService.json')

const job = schedule.scheduleJob('*/1 * * * *', async function (fireDate) {
    console.log('Stats updating at ' + new Date());

    const campaignsRef = db.collection("campaigns");
    let totalCampaigns = 0;
    let foundsCollected = 0;
    let successfulCampaigns = 0;

    await campaignsRef
        .get()
        .then(res => {
            totalCampaigns = res.size;
        });

    await campaignsRef
        .where('state', 'in', ['success', 'active'])
        .get()
        .then(res => {
            res.forEach(campaign => {
                foundsCollected += campaign.data().collectedFunds;
                if(campaign.data().state === 'success')
                    successfulCampaigns += 1
            })
        });

    const statsRef = db.collection("stats").doc('homestats');

    await statsRef.update({ 
        totalCampaigns: totalCampaigns,
        foundsCollected: foundsCollected,
        successfulCampaigns: successfulCampaigns
    });
});

const refund = schedule.scheduleJob('*/1 * * * *', async function (fireDate) {
    console.log('Stats refund check at ' + new Date());
    const campaignsRef = db.collection("campaigns");

    await campaignsRef
        .where('state', '==', 'active')
        .get()
        .then(async(res) => {

            res.forEach(async(campaign) => {
                let endingDate = campaign.data().endingDate._seconds*1000;
                let timeNow =  (new Date).getTime();
                console.log("qui")
                // Se data fine campagna minore data attuale
                if((timeNow - endingDate) >= 0) {
                    // recupero tutti gli address
                    let donations = campaign.data().transactions;
                    // Faccio partire il refund
                    axios.post(`${ApiData.api.refund}`, {
                        donations: donations
                    })
                    .then(async(response) => {
                        // Setto state a 'failed'
                        const campaignRef = db.collection('campaigns').doc(`${campaign.data().id}`);
                        const result = await campaignRef.update({
                            state: "failed"
                        });
                    })
                    .catch(err => {
                        console.log(err)
                    })

                    
                }
            })
        });
});

module.exports.job = job;