const request = require("supertest");
const baseURL = "http://localhost:3000";

const Campaign = require('../models/Campaign.js');

describe('Testing Campaign', () => {
    let Campaign = require('../models/Campaign.js');

    it('Create empty campaign', () => {
        campaign = new Campaign();

        expect(campaign.title).toBe("");
        expect(campaign.description).toBe("");
        expect(campaign.img).toBe("");

        expect(campaign.min_algo).toBe(-1);
        expect(campaign.obj_algo).toBe(-1);

        expect(campaign.state).toBe(false);

        expect(campaign.date_start).toBe(-1);
        expect(campaign.date_end).toBe(-1);
        expect(campaign.created).toBeInstanceOf(Date);
    });

    it('Create filled campaign', () => {
        campaign = new Campaign(
            "test1", "description1", "img1",
            1, 100, false,
            new Date(), new Date());

        expect(campaign.title).not.toBe("");
        expect(campaign.description).not.toBe("");
        expect(campaign.img).not.toBe("");

        expect(campaign.min_algo).not.toBe(-1);
        expect(campaign.obj_algo).not.toBe(-1);

        expect(campaign.state).toBe(false);

        expect(campaign.date_start).not.toBe(-1);
        expect(campaign.date_end).not.toBe(-1);
        expect(campaign.created).toBeInstanceOf(Date);
    });
})

describe('Testing Campaign API', () => {
    let Campaign = require('../models/Campaign.js');

    it(" GET - campaigns, should return 200", async() => {
        const response = await request(baseURL).get("/campaigns");

        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThanOrEqual(1);
    });
})