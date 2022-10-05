"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const algosdk = __importStar(require("algosdk"));
const crowfunding_client_1 = require("./crowfunding_client");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = 3001;
// algosdk.generateAccount();
var account = {
    addr: "SV5TEX4THH4HC7ROS6D5PAU4FCONL333DCKSDDEZQPDVLF45VYZUU4HTS4",
    sk: new Uint8Array([
        35, 10, 9, 61, 208, 30, 50, 150, 9, 162, 173,
        38, 11, 29, 65, 98, 205, 23, 150, 41, 190, 103,
        173, 24, 5, 125, 67, 92, 240, 129, 222, 109, 149,
        123, 50, 95, 147, 57, 248, 113, 126, 46, 151, 135,
        215, 130, 156, 40, 156, 213, 239, 123, 24, 149, 33,
        140, 153, 131, 199, 85, 151, 157, 174, 51
    ])
};
var passphrase = algosdk.secretKeyToMnemonic(account.sk);
const mnemonic = "dutch category burden unfair goddess grain aware pumpkin gospel injury calm stomach convince grain vanish guilt between behave salon service thing parrot humble about lift";
const creatorAddress = "K7GGQIBN4DQKOTKDKV2663VQLTZ6ZSPZOP5JQBHC4TNABUSV7JWPN7TFGY";
// Created app 114679833 with address UREIWF6K5YC6HYQSAIGKV7ETZPQ3LD3KBLDZLUWOD6TWSFVLZ3J6I3KJ6M in tx BCX2GZO2X4DMEOH2E4CD56G7564YPI7H4T2MJVE6CQK3PSSKUIFQ
// const pk = algosdk.mnemonicToMasterDerivationKey(mnemonic);
console.log(passphrase);
console.log(account.addr);
console.log(account.sk);
const customSignerBackend = (transactions, indexesToSign) => __awaiter(void 0, void 0, void 0, function* () {
    return transactions.map((tx) => {
        let signedTx = algosdk.signTransaction(tx, account.sk);
        console.log(signedTx);
        return signedTx.blob;
    });
});
app.post('/api/v1/createCampaign', (req, res) => {
    try {
        console.log(req.body);
        console.log("Creating..");
        const { owner, target, endingDate } = req.body;
        let client = new algosdk.Algodv2({}, 'https://algosigner.api.purestake.io/testnet/algod', '');
        (function () {
            return __awaiter(this, void 0, void 0, function* () {
                const appClient = new crowfunding_client_1.Crowfunding({
                    client: client,
                    signer: customSignerBackend,
                    sender: account.addr
                });
                // Deploy our app on chain (Only works if the ApplicationSpec was used to generate the client)
                const [appId, appAddr, txId] = yield appClient.create();
                console.log(`Created app ${appId} with address ${appAddr} in tx ${txId}`);
                const setted = yield appClient.setAll({
                    db_id: "smart",
                    end_date: endingDate,
                    target: target,
                    receiver: owner
                });
                res.status(201).json({
                    message: "Campaign created successfully!",
                    data: {
                        appId: appId,
                        appAddr: appAddr,
                        txId: txId
                    },
                    error: null
                });
            });
        })();
    }
    catch (err) {
        res.status(500).json({
            message: "Error creating the campaign",
            error: err
        });
    }
});
app.post('/api/v1/refund', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // let donations = req.body.donations;
        // let donators = Object.keys(donations);
        // let client = new algosdk.Algodv2({},
        //     'https://algosigner.api.purestake.io/testnet/algod',
        //     '',
        // );
        // const appClient = new Crowfunding({
        //     client: client,
        //     signer: customSignerBackend,
        //     sender: account.addr,
        //     appId: req.body.appId
        // });
        // const results = await Promise.all(
        //     donators.map(async (donator) => {
        //         return await appClient.refund({
        //             account: donator,
        //             amount: BigInt(donations[donator])
        //         });
        //     })
        // )
        res.status(200).json({
            message: "Users refunded.",
            data: null,
            error: null
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Error.",
            data: null,
            error: err
        });
    }
}));
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
