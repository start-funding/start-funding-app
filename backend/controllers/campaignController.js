const Campaign = require('../models/Campaign.js');
const { db } = require('../services/firebase/firebase.js');
const { FieldValue, Timestamp } = require('firebase-admin/firestore');
var fs = require('fs');
const { dateFormatter, timeStampFromInt } = require('../utils/utils')
const { pinFileToIPFS } = require('../services/pinata/pinata.js')
const axios = require('axios');
const ApiData = require('../conf/smartContractService.json')

const getAll = async(req, res) => {
    // Fetch data from db
    const campaigns = await db.collection('campaigns').get();

    // Check if there are campaigns
    if (campaigns.empty) {
        res.status(200).json({
            message: "No matching documents.",
            data: null,
            error: null
        });
    }

    // Map data as json
    let result = campaigns.docs.map(doc => doc.data());

    res.status(200).json({
        message: "List of all campaign",
        data: result,
        error: null
    });
};

const get = async(req, res) => {
    const id = req.params.id;

    try {
        // TODO: Add regex validation for uuid

        // Fetch data from db
        const campaign = await db.collection('campaigns').doc(`${id}`).get();

        const result = campaign.data();
        result.endingDate = dateFormatter(new Date(result.endingDate._seconds * 1000), "-");

        if (!result) {
            return res.status(404).json({
                message: "No matching campaigns.",
                data: null,
                error: null,
            });
        }

        res.status(200).json({
            message: "Campaign details.",
            data: result,
            error: null
        });

    } catch (error) {
        return res.status(404).json({
            message: "No matching documents.",
            data: null,
            error: error,
        });
    }
};

// Create function for post campaign route
const create = async(req, res) => {
    try {
        const {
            owner,
            name,
            description,
            target,
            endingDate
        } = req.body;

        console.log("Dentro a create")
        console.log(ApiData.api.createCampaign)
        console.log(axios)
        
        // Prima creo la campagna
        axios.post(`${ApiData.api.createCampaign}`, {
            owner: owner,
            target: target,
            endingDate: endingDate
        })
            .then(async (resp) => {
                console.log("Dopo la richiesta")
                // Campaign posted on blockchain
                if (resp.status === 201) {
                    console.log(resp.data)
                    var fileStream = fs.createReadStream(req.files[0].path)
                    const imageHash = await pinFileToIPFS(fileStream, "prova", owner)

                    // TODO: add validation to params
                    new_campaign = new Campaign(
                        owner,
                        name,
                        description,
                        `https://gateway.pinata.cloud/ipfs/${imageHash}`,
                        parseInt(target),
                        "active",
                        timeStampFromInt(endingDate),
                        resp.data.data.appId,
                        resp.data.data.appAddr
                    );

                    //Saving new campaign inside db
                    const campaignRef = db.collection('campaigns').doc(`${new_campaign.id}`);
                    const result = await campaignRef.set({
                        ...new_campaign
                    });

                    res.status(201).json({
                        message: "Campaign created successfully!",
                        data: new_campaign,
                        error: null
                    });
                } else {
                    return res.status(500).json({
                        data: null,
                        error: "error prova",
                    });
                }
            })
            .catch(err => {
                console.log(err)
            })


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            data: null,
            error: error,
        });
    }
};

const fund = async(req, res) => {
    try {
        const id = req.params.id;
        const amount = parseInt(req.body.amount);
        const addressFrom = req.body.addressFrom;

        const campaignRef = db.collection('campaigns').doc(`${id}`);

        const oldCampaign = await campaignRef.get();
        const oldTransactions = oldCampaign.data().transactions;

        const newTransactions = oldTransactions;

        let donatorsNumber = 0;

        if (addressFrom in oldTransactions) {
            newTransactions[addressFrom] += amount;
        } else {
            newTransactions[addressFrom] = amount;
            donatorsNumber = 1;
        }

        const transactionsUpdate = await campaignRef.set({ transactions: newTransactions }, { merge: true });

        const result = await campaignRef.update({
            collectedFunds: FieldValue.increment(amount),
            donatorsNumber: FieldValue.increment(donatorsNumber),
        });

        const updatedCampaign = await campaignRef.get();

        res.status(200).json({
            message: "Campaign funded successfully!",
            data: {
                collectedFunds: updatedCampaign.data().collectedFunds,
                donatorsNumber: updatedCampaign.data().donatorsNumber,
                transactions: updatedCampaign.data().transactions
            },
            error: null
        });
    } catch (error) {
        return res.status(500).json({
            data: null,
            error: error,
        });
    }
};

const update = async(req, res) => {
    try {
        const id = req.params.id;
        const owner = req.body.owner;
        const newDescription = req.body.description;
        const newImg = req.files.length > 0 ? req.files[0] : req.body.file;

        const campaignRef = db.collection('campaigns').doc(`${id}`);

        if (!newDescription && !newImg) {
            res.status(500).json({
                message: "Nothing to update.",
                data: null,
                error: null
            });
        }

        if (newDescription) await campaignRef.update({ description: newDescription });
        if (newImg && typeof newImg !== 'string') {
            var fileStream = fs.createReadStream(req.files[0].path)
            const imageHash = await pinFileToIPFS(fileStream, "prova", owner)
            await campaignRef.update({ image: `https://gateway.pinata.cloud/ipfs/${imageHash}` });
        }

        const updatedCampaign = await campaignRef.get();

        res.status(200).json({
            message: "Campaign updated successfully!",
            data: updatedCampaign.data(),
            error: null
        });
    } catch (error) {
        return res.status(500).json({
            data: null,
            error: error,
        });
    }
};

const deleteCampaign = async(req, res) => {
    const id = req.params.id;

    const campaignRef = await db.collection('campaigns').doc(`${id}`);

    campaignRef.get().then((doc) => {
        if (doc.exists) {
            campaignRef.delete();
            return res.status(200).json({
                message: "Campaign deleted successfully!",
                data: {
                    deleted: id
                },
                error: null
            });
        } else {
            return res.status(404).json({
                message: "No matching campaigns.",
                data: null,
                error: null
            });
        }
    }).catch((error) => {
        return res.status(500).json({
            data: null,
            error: error,
        });
    });
};

const filterCampaigns = async(req, res) => {
    try {
        const {
            minCollected,
            maxCollected,
            state,
            page,
            resultsPerPage
        } = req.body;

        let pageNumber = parseInt(page);
        let resultsPerPageNumber = parseInt(resultsPerPage);
        let totalResults;
        let results;
        let states = state == "all" ? ['active', 'success', 'failed'] : [state];

        const campaignsRef = db.collection('campaigns')
            .orderBy('collectedFunds')
            .where('collectedFunds', '>=', minCollected)
            .where('collectedFunds', '<=', maxCollected)
            .where('state', 'in', states)
            .orderBy('id')
            .where('state', '==', "active");

        const first = db.collection('campaigns')
            .orderBy('collectedFunds')
            .where('collectedFunds', '>=', minCollected)
            .where('collectedFunds', '<=', maxCollected)
            .orderBy('id')
            .where('state', 'in', states)
            .limit(parseInt(resultsPerPage));

        await campaignsRef
            .get()
            .then(res => {
                totalResults = res.size;
            });


        if (pageNumber > 1) {
            let next = first;
            for (i = 0; i < pageNumber; i++) {

                await next.get().then(documentSnapshots => {
                    results = documentSnapshots;
                    var lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];

                    next = db.collection("campaigns")
                        .orderBy('collectedFunds')
                        .where('collectedFunds', '>=', minCollected)
                        .where('collectedFunds', '<=', maxCollected)
                        .orderBy('id')
                        .where('state', 'in', states)
                        .startAfter(lastVisible)
                        .limit(parseInt(resultsPerPage));
                })
            }
        } else {
            results = await first.get();
        }



        if (results.empty) {
            res.status(200).json({
                message: "No matching campaigns",
                data: {
                    campaigns: [],
                    pagination: {
                        totalPages: Math.ceil(totalResults / resultsPerPageNumber),
                        totalResults: totalResults
                    }
                },
                error: null
            });
        } else {
            let campaigns = results.docs.map(doc => {
                let camp = doc.data()
                camp.endingDate = dateFormatter(new Date(camp.endingDate._seconds * 1000), "-");
                return camp;
            });
            res.status(200).json({
                message: "Data found",
                data: {
                    campaigns: campaigns,
                    pagination: {
                        totalPages: Math.ceil(totalResults / resultsPerPageNumber),
                        totalResults: totalResults
                    }
                },
                error: null
            });
        }
    } catch (error) {
        return res.status(500).json({
            data: null,
            error: error,
        });
    }
}


const top12 = async(req, res) => {
    try {
        const campaignsRef = db.collection("campaigns");



        let results = await campaignsRef
            .orderBy('collectedFunds', 'desc')
            .limit(12)
            .get();

        if (results.empty) {
            res.status(200).json({
                message: "No campaigns yet",
                data: [],
                error: null
            });
        } else {

            let campaigns = results.docs.map(doc => {
                let camp = doc.data()
                camp.endingDate = dateFormatter(new Date(camp.endingDate._seconds * 1000), "-");
                return camp;
            });
            res.status(200).json({
                message: "Top 12 campaigns",
                data: campaigns,
                error: null
            });
        }
    } catch (error) {
        return res.status(500).json({
            data: null,
            error: error,
        });
    }
}

const stats = async(req, res) => {
    try {
        const statsRef = db.collection("stats").doc('homestats');

        let results = await statsRef
            .get();

        if (results.empty) {
            res.status(200).json({
                message: "No stats yet",
                data: [],
                error: null
            });
        } else {
            res.status(200).json({
                message: "Stats",
                data: results.data(),
                error: null
            });
        }
    } catch (error) {
        return res.status(500).json({
            data: null,
            error: error,
        });
    }
}

module.exports = { getAll, get, create, fund, update, deleteCampaign, filterCampaigns, top12, stats };