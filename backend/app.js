const express = require('express');

const app = express();
const PORT = 3000;

// To handle parameters from x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// To handle parameters from test cases
app.use(express.json());

const Campaign = require('./models/Campaign.js');
const campaignController = require('./controllers/campaignController');

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

app.post('/campaigns', campaignController.create);