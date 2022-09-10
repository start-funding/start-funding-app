const Campaign = require('../models/Campaign.js');

// create function for post campaign route
const create = (req, res) => {
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

        // TODO: save new campaign inside db

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

module.exports = { create };