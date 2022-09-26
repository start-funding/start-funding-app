const Campaign = require('../models/Campaign.js');
const { db } = require('../firebase.js');
const { FieldValue } = require('firebase-admin/firestore');
var fs = require('fs');
const { dateFormatter, timeStampFromInt } = require('../utils/utils')
const { pinFileToIPFS } = require('../pinata.js');
const { resolve } = require('path');

//var admin = require("firebase-admin");

// Fetch the service account key JSON file contents
//var serviceAccount = require("./creds.json");

// Initialize the app with a service account, granting admin privileges
//admin.initializeApp({
//  credential: admin.credential.cert(serviceAccount),
  // The database URL depends on the location of the database
//  databaseURL: "https://start-funding-199c1-default-rtdb.firebaseio.com/"
//});

// As an admin, the app has access to read and write all data, regardless of Security Rules
//var db = admin.database();

// module.exports = { db }


const getAll = async (req, res) => {
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

const get = async (req, res) => {
    const id = req.params.id;

    try {
        // TODO: Add regex validation for uuid

        // Fetch data from db
        // const campaign = await db.collection('campaigns').doc(`${id}`).get();

        // const result = campaign.data();

        // result.endingDate = dateFormatter(new Date(result.endingDate._seconds * 1000), "-");

        const ref = db.ref(`campaigns/${id}`);


        ref.once('value', (data) => {
            result = data.val();
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
const create = async (req, res) => {
    try {
        const {
            owner,
            name,
            description,
            target,
            endingDate
        } = req.body;


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
            timeStampFromInt(endingDate)
        );

        // Saving new campaign inside db
        // const campaignRef = db.collection('campaigns').doc(`${new_campaign.id}`);
        // const result = await campaignRef.set({
        //     ...new_campaign
        // });

        const ref = db.ref('campaigns');

        ref.child(new_campaign.id).set(new_campaign);


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

const fund = async (req, res) => {
    try {
        console.log(req.body)
        const id = req.params.id;
        const amount = parseInt(req.body.amount);
        const addressFrom = req.body.addressFrom;

        const campaignRef = await db.ref(`campaigns/${id}`);

        let oldCampaign; 
        
        await campaignRef.once('value',  (data) => {
            oldCampaign = data.val();
        });

        const oldTransactions = oldCampaign.transactions ? oldCampaign.transactions : [];

        const newTransactions = oldTransactions;

        let donatorsNumber = 0;

        if (addressFrom in oldTransactions) {
            newTransactions[addressFrom] += amount;
        } else {
            newTransactions[addressFrom] = amount;
            donatorsNumber = 1;
        }
        if(oldCampaign.transactions) {
            const transactionsUpdate = await campaignRef.update({ 'transactions': newTransactions });
        } else {
            

            campaignRef.child('transactions').set(newTransactions);
        }

        console.log(oldCampaign)

        const result = await campaignRef.update({
            'collectedFunds': oldCampaign.collectedFunds +1,
            'donatorsNumber': oldCampaign.donatorsNumber +1
        });

        const updatedCampaign = await campaignRef.once('value', async (data) => {
            return data.val();
        });

        res.status(200).json({
            message: "Campaign funded successfully!",
            data: {
                collectedFunds: updatedCampaign.collectedFunds,
                donatorsNumber: updatedCampaign.donatorsNumber,
                transactions: updatedCampaign.transactions
            },
            error: null
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            data: null,
            error: error,
        });
    }
};

const update = async (req, res) => {
    try {
        const id = req.params.id;
        const owner = req.body.owner;
        const newDescription = req.body.description;
        const newImg = req.files.length > 0 ? req.files[0] : req.body.file;
        let result;

        if (!newDescription && !newImg) {
            res.status(500).json({
                message: "Nothing to update.",
                data: null,
                error: null
            });
        }
        
        const campaignRef = await db.ref(`campaigns/${id}`);
        
        if (newDescription) await campaignRef.update({'description': newDescription});
        if (newImg && typeof newImg !== 'string') {
            var fileStream = fs.createReadStream(req.files[0].path)
            const imageHash = await pinFileToIPFS(fileStream, "prova", owner)
            await campaignRef.update({ 'image': `https://gateway.pinata.cloud/ipfs/${imageHash}` });
        }

        const updatedCampaign = await db.ref(`campaigns/${id}`);

        updatedCampaign.once('value', (data) => {
            result = data.val();
            result.endingDate = dateFormatter(new Date(result.endingDate._seconds * 1000), "-");

            res.status(200).json({
                message: "Campaign updated successfully!",
                data: result,
                error: null
            });
        });


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            data: null,
            error: error,
        });
    }
};

const deleteCampaign = async (req, res) => {
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



const filterCampaigns = async (req, res) => {
    try {
        const {
            name,
            //minCollectedFilter,
            // maxCollectedFilter,
            // state,
            // endingDate,
            page,
            resultsPerPage
        } = req.body;

        let pageNumber = parseInt(page);
        let resultsPerPageNumber = parseInt(resultsPerPage);
        let inizio = parseInt(resultsPerPage) * (parseInt(page) - 1)
        let totalResults;
        let results;

        const first = db.collection('campaigns')
            .orderBy('id')
            .limit(parseInt(resultsPerPage));

        await campaignsRef
            .get()
            .then(res => {
                totalResults = res.size;
            });

        if (parseInt(page) > 1) {
            console.log("Dentro a if")
            let next = first;
            for (i = 0; i < parseInt(page); i++) {

                await next.get().then(documentSnapshots => {
                    results = documentSnapshots;
                    var lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
                    console.log("Last visible")
                    console.log(lastVisible)
                    next = db.collection("campaigns")
                        .orderBy("id")
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
                        totalPages: Math.ceil(totalResults / parseInt(resultsPerPage)),
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
            console.log("Campagne da restituire")
            console.log(campaigns)
            res.status(200).json({
                message: "Data found",
                data: {
                    campaigns: campaigns,
                    pagination: {
                        totalPages: Math.ceil(totalResults / parseInt(resultsPerPage)),
                        totalResults: totalResults
                    }
                },
                error: null
            });
        }


        // const ref = db.ref('campaigns');
        // const countRef = db.ref('campaigns');

        // let lastKey;


        // await ref.orderByKey().limitToFirst(resultsPerPageNumber).once('value', async (data) => {

        //     results = data.val();
        //     lastKey = Object.keys(results)[Object.keys(results).length -1];

        //     await countRef.once('value', async (dataToCount) => {
        //         totalResults = Object.keys(dataToCount.val()).length;


        //         // Gestisco paginazione
        //         if(pageNumber > 1) {
        //             console.log("Dentro a più di una pagina " + pageNumber)
        //             for(i = 1; i < pageNumber; i++) {
        //                 await ref.orderByKey().limitToFirst(resultsPerPageNumber).startAfter(lastKey).once('value', async (dataPag) => {
        //                     console.log("Ciclo numero " + i)
        //                     results = dataPag.val();
        //                     console.log(dataPag.val())

        //                     if(i === pageNumber-1) {
                               
        //                     } else {
        //                         lastKey = Object.keys(results)[Object.keys(results).length -1];
        //                     }
        //                 })
        //             }
        //         }

        //         if (results.empty) {
        //             res.status(200).json({
        //                 message: "No matching campaigns",
        //                 data: {
        //                     campaigns: [],
        //                     pagination: {
        //                         totalPages: Math.ceil(totalResults / parseInt(resultsPerPage)),
        //                         totalResults: totalResults
        //                     }
        //                 },
        //                 error: null
        //             });
        //         } else {
        //             let campaigns = [];
        //             for (i = 0; i < Object.keys(results).length; i++) {
        //                 results[Object.keys(results)[i]].endingDate = dateFormatter(new Date(results[Object.keys(results)[i]].endingDate._seconds * 1000), "-");
        //                 campaigns.push(results[Object.keys(results)[i]]);
        //             }
        
        //             res.status(200).json({
        //                 message: "Data found",
        //                 data: {
        //                     campaigns: campaigns,
        //                     pagination: {
        //                         totalPages: Math.ceil(totalResults / parseInt(resultsPerPage)),
        //                         totalResults: totalResults
        //                     }
        //                 },
        //                 error: null
        //             });
        //         }

        //     })

        // })

        

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            data: null,
            error: error,
        });
    }
}


const top12 = async (req, res) => {
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
                console.log(camp)

                return camp;
            });
            res.status(200).json({
                message: "Top 12 campaigns",
                data: campaigns,
                error: null
            });
        }


        // const ref = db.ref('campaigns');


        // ref.limitToFirst(12).once('value', (data) => {
        //     let results = data.val();

        //     if (results.empty) {
        //         res.status(200).json({
        //             message: "No campaigns yet",
        //             data: [],
        //             error: null
        //         });
        //     } else {
        //         let campaigns = [];
        //         for (i = 0; i < Object.keys(results).length; i++) {
        //             results[Object.keys(results)[i]].endingDate = dateFormatter(new Date(results[Object.keys(results)[i]].endingDate._seconds * 1000), "-");
        //             campaigns.push(results[Object.keys(results)[i]]);
        //         }


        //         res.status(200).json({
        //             message: "Top 12 campaigns",
        //             data: campaigns,
        //             error: null
        //         });
        //     }
        // })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            data: null,
            error: error,
        });
    }
}


module.exports = { getAll, get, create, fund, update, deleteCampaign, filterCampaigns, top12 };