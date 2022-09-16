const request = require("supertest");
const Campaign = require("../models/Campaign.js");
const baseURL = "http://localhost:3000";

// const Campaign = require('../models/Campaign.js');
const createNewCampaignRequest = async() => {
    const newPost = {
        owner: "dsaokpdasosapkdpaos",
        title: "title",
        description: "description",
        img: "img",
        targetAlgo: 100,
        state: "active",
        endingDate: new Date()
    }

    const response = await request(baseURL)
        .post("/campaigns")
        .send(newPost);

    return response;
}

describe('Testing Campaign', () => {
    const Campaign = require('../models/Campaign.js');

    it('Create empty campaign', () => {
        const campaign = new Campaign();

        expect(typeof campaign.id).toBe("string");
        expect(campaign.owner).toBe("");

        expect(campaign.title).toBe("");
        expect(campaign.description).toBe("");
        expect(campaign.img).toBe("");

        expect(campaign.collectedAlgo).toBe(0);
        expect(campaign.targetAlgo).toBe(-1);
        expect(campaign.totalDonators).toBe(0);

        expect(campaign.state).toBe("deactivated");

        expect(campaign.endingDate).toBe(-1);
        expect(campaign.created).toBeInstanceOf(Date);
    });

    it('Create filled campaign', () => {
        const campaign = new Campaign(
            "dsaokpdasosapkdpaos",
            "title", "description", "img",
            100, "active",
            new Date(), new Date());

        expect(typeof campaign.id).toBe("string");
        expect(campaign.owner).not.toBe("");

        expect(campaign.title).not.toBe("");
        expect(campaign.description).not.toBe("");
        expect(campaign.img).not.toBe("");

        expect(campaign.collectedAlgo).toBe(0);
        expect(campaign.targetAlgo).not.toBe(-1);
        expect(campaign.totalDonators).toBe(0);

        expect(campaign.state).toBe("active");

        expect(campaign.endingDate).not.toBe(-1);
        expect(campaign.created).toBeInstanceOf(Date);
    });

    it('Incrementing totalDonators of existing campaign', () => {
        const campaign = new Campaign(
            "dsaokpdasosapkdpaos",
            "title", "description", "img",
            100, "active",
            new Date(), new Date());

        campaign.incrementTotalDonators();
        expect(campaign.totalDonators).toBe(1);
    });

    it('Setting totalDonators of existing campaign', () => {
        const campaign = new Campaign(
            "dsaokpdasosapkdpaos",
            "title", "description", "img",
            100, "active",
            new Date(), new Date());

        campaign.setTotalDonators = 5;
        expect(campaign.totalDonators).toBe(5);
    });
})

describe('Testing Campaign API', () => {
    it(" POST /campaigns - store campaign", async() => {
        const response = await createNewCampaignRequest();

        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe("Campaign created successfully!");
        expect(response.body.data).not.toBeNull();
        expect(response.body.error).toBeNull();
    });

    it(" GET /campaign/:id - get specific campaign", async() => {
        const newPost = {
            owner: "dsaokpdasosapkdpaos",
            title: "title",
            description: "description",
            img: "img",
            targetAlgo: 100,
            state: "active",
            endingDate: new Date()
        }

        const responsePost = await request(baseURL)
            .post("/campaigns")
            .send(newPost);

        const id = responsePost.body.data.id;

        const response = await request(baseURL)
            .get(`/campaign/${id}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Campaign details.");
        expect(response.body.data).toBeDefined();
        expect(response.body.error).toBeNull();
    });

    it(" GET /campaigns - campaigns, should return 200", async() => {
        const response = await request(baseURL).get("/campaigns");

        expect(response.statusCode).toBe(200);
        expect(response.body.data.length).toBeGreaterThanOrEqual(1);
    });

    it(" POST /campaign/:id - fund specific campaign", async() => {
        const responseNewCampaign = await createNewCampaignRequest();

        const createdId = responseNewCampaign.body.data.id;
        const oldCollectedAlgo = parseInt(responseNewCampaign.body.data.collectedAlgo);

        expect(responseNewCampaign.statusCode).toBe(201);

        const response = await request(baseURL)
            .post(`/campaign/${createdId}`)
            .send({ amount: 15 });

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Campaign funded successfully!");

        expect(response.body.data.collectedAlgo).toBeGreaterThan(oldCollectedAlgo);

        expect(response.body.data).not.toBeNull();
        expect(response.body.error).toBeNull();
    });

    it(" DELETE /campaign/:id - delete specific campaign", async() => {
        const responseNewCampaign = await createNewCampaignRequest();

        const createdId = responseNewCampaign.body.data.id;

        expect(responseNewCampaign.statusCode).toBe(201);

        const responseDelete = await request(baseURL)
            .delete(`/campaign/${createdId}`);

        expect(responseDelete.statusCode).toBe(200);
        expect(responseDelete.body.message).toBe("Campaign deleted successfully!");

        const responseGet = await request(baseURL)
            .get(`/campaign/${createdId}`);

        expect(responseGet.statusCode).toBe(404);
    });
})