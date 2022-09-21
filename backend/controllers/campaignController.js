const Campaign = require('../models/Campaign.js');
const { db } = require('../firebase.js');
const { FieldValue } = require('firebase-admin/firestore');

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
            title,
            description,
            // img,
            targetAlgo,
            state,
            endingDate
        } = req.body;

        // TODO: add validation to params
        new_campaign = new Campaign(
            owner,
            title,
            description,
            req.files[0],
            targetAlgo,
            state,
            endingDate
        );

        // Saving new campaign inside db
        const campaignRef = db.collection('campaigns').doc(`${new_campaign.id}`);
        const result = await campaignRef.set({
            ...new_campaign
        });

        res.status(201).json({
            message: "Campaign created successfully!",
            data: new_campaign,
            error: null
        });
    } catch (error) {
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
        const addressFrom = req.body.address;

        const campaignRef = db.collection('campaigns').doc(`${id}`);

        const oldCampaign = await campaignRef.get();
        const oldTransactions = oldCampaign.data().transactions;

        const newTransactions = oldTransactions;

        let totalDonators = 0;

        if (addressFrom in oldTransactions) {
            newTransactions[addressFrom] += amount;
        } else {
            newTransactions[addressFrom] = amount;
            totalDonators = 1;
        }

        const transactionsUpdate = await campaignRef.set({ transactions: newTransactions }, { merge: true });

        const result = await campaignRef.update({
            collectedAlgo: FieldValue.increment(amount),
            totalDonators: FieldValue.increment(totalDonators),
        });

        const updatedCampaign = await campaignRef.get();

        res.status(200).json({
            message: "Campaign funded successfully!",
            data: {
                collectedAlgo: updatedCampaign.data().collectedAlgo,
                totalDonators: updatedCampaign.data().totalDonators,
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
        const newDescription = req.body.description;
        const newImg = req.body.img;

        const campaignRef = db.collection('campaigns').doc(`${id}`);

        if (!newDescription && !newImg) {
            res.status(500).json({
                message: "Nothing to update.",
                data: null,
                error: null
            });
        }

        if (newDescription) await campaignRef.update({ description: newDescription });

        if (newImg) await campaignRef.update({ img: newImg });

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

module.exports = { getAll, get, create, fund, update, deleteCampaign };