const express = require('express');
const job = require('./scheduled/statsUpdater').job;

const app = express();
const PORT = 3000;

const cors = require('cors')
app.use(cors());

// To handle parameters from x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// To handle parameters from test cases
app.use(express.json());

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const Campaign = require('./models/Campaign.js');
const campaignController = require('./controllers/campaignController');

app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running, and App is listening on port " + PORT)
    else
        console.log("Error occurred, server can't start", error);
});

app.get('/campaigns', campaignController.getAll);
app.post('/campaigns', upload.array("file"), campaignController.create);

app.get('/campaign/:id', campaignController.get);
app.post('/campaign/:id', campaignController.fund);
app.put('/campaign/:id', upload.array("file"), campaignController.update);
app.delete('/campaign/:id', campaignController.deleteCampaign);

// Search
app.post('/filterCampaigns', campaignController.filterCampaigns)
app.get('/top12', campaignController.top12)

// Stats
app.get('/stats', campaignController.stats)

app.post('/claim', campaignController.claim)