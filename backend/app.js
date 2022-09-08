const express = require('express');

const app = express();
const PORT = 3000;

const Campaign = require('./models/Campaign.js');

app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running, and App is listening on port " + PORT)
    else
        console.log("Error occurred, server can't start", error);
});

app.get('/campaigns', (req, res) => {
    // Preparing example data
    const today = new Date();
    const tomorrow = new Date(today);
    const nextWeek = new Date(today);

    tomorrow.setDate(tomorrow.getDate() + 1);
    nextWeek.setDate(nextWeek.getDate() + 7);

    // TODO: Fetch data from db

    const campaigns = [];
    campaigns.push(new Campaign("test1", "description1", "img1", 1, 100, 10, false, tomorrow, nextWeek));
    campaigns.push(new Campaign("test2", "description2", "img2", 2, 200, false, tomorrow, nextWeek));
    campaigns.push(new Campaign("test3", "description3", "img3", 3, 300, true, tomorrow, nextWeek));

    res.status(200).json(campaigns);
});

app.use(express.urlencoded({ extended: true }));

app.post('/campaigns', (req, res) => {
    // TODO: add validation to params
    new_campaign = new Campaign({
        title: req.body.title,
        description: req.body.description,
        img: req.body.img,
        min_algo: req.body.min_algo,
        obj_algo: req.body.obj_algo,
        state: req.body.state,
        date_start: req.body.date_start,
        date_end: req.body.date_end,
    });

    // TODO: save new campaign inside db

    res.status(201).json({
        message: "Campaign " + new_campaign.id + " created successfully!"
    });
});