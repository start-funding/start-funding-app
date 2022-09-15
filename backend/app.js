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

app.get('/campaigns', campaignController.getAll);
app.post('/campaigns', campaignController.create);

app.get('/campaign/:id', campaignController.get);
app.post('/campaign/:id', campaignController.fund);