const schedule = require('node-schedule');
const { db } = require('../services/firebase/firebase');

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

module.exports.job = job;