const Campaign = require('../models/Campaign.js');
const { db } = require('../firebase.js');

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
}

const get = async(req, res) => {
    const id = req.params.id;

    try {
        // Fetch data from db
        const campaign = await db.collection('campaigns').doc(`${id}`).get();

        const result = campaign.data();

        if (!result) {
            return res.status(500).json({
                message: "No matching documents.",
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
        return res.status(500).json({
            message: "No matching documents.",
            data: null,
            error: error,
        });
    }
}

// Create function for post campaign route
const create = async(req, res) => {
    try {
        const {
            owner,
            title,
            description,
            img,
            targetAlgo,
            state,
            endingDate
        } = req.body;

        // TODO: add validation to params
        new_campaign = new Campaign(
            owner,
            title,
            description,
            img,
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

module.exports = { getAll, get, create };