import express, { Express, Request, Response } from 'express';
import * as algosdk from 'algosdk';


import { Transaction, TransactionSigner } from "algosdk";
import {Crowfunding} from './crowfunding_client';
const app : Express = express();
const PORT = 3001;

// algosdk.generateAccount();
var account:algosdk.Account = {
    addr: "SV5TEX4THH4HC7ROS6D5PAU4FCONL333DCKSDDEZQPDVLF45VYZUU4HTS4",
    sk: new Uint8Array([
        35,  10,   9,  61, 208,  30,  50, 150,   9, 162, 173,  
        38,  11,  29,  65,  98, 205,  23, 150,  41, 190, 103,  
       173,  24,   5, 125,  67,  92, 240, 129, 222, 109, 149,  
       123,  50,  95, 147,  57, 248, 113, 126,  46, 151, 135,  
       215, 130, 156,  40, 156, 213, 239, 123,  24, 149,  33,  
       140, 153, 131, 199,  85, 151, 157, 174,  51
     ])
}
var passphrase = algosdk.secretKeyToMnemonic(account.sk);
const mnemonic = "dutch category burden unfair goddess grain aware pumpkin gospel injury calm stomach convince grain vanish guilt between behave salon service thing parrot humble about lift"
const creatorAddress = "K7GGQIBN4DQKOTKDKV2663VQLTZ6ZSPZOP5JQBHC4TNABUSV7JWPN7TFGY";

// Created app 114679833 with address UREIWF6K5YC6HYQSAIGKV7ETZPQ3LD3KBLDZLUWOD6TWSFVLZ3J6I3KJ6M in tx BCX2GZO2X4DMEOH2E4CD56G7564YPI7H4T2MJVE6CQK3PSSKUIFQ
// const pk = algosdk.mnemonicToMasterDerivationKey(mnemonic);
console.log(passphrase)
console.log(account.addr)
console.log(account.sk)


const customSignerBackend = async(transactions:Transaction[], indexesToSign:any) => {
    return transactions.map((tx:Transaction) => {
        
        let signedTx : {
            txID: string;
            blob: Uint8Array;
        } = algosdk.signTransaction(tx, account.sk);
        console.log(signedTx)
        return signedTx.blob;
    })
}


app.post('/api/v1/createCampaign', (req: Request, res: Response) => {

    try {
        console.log(req.body)
        
        let client = new algosdk.Algodv2({},
            'https://algosigner.api.purestake.io/testnet/algod',
            '',
        );
    
        (async function() {
            const appClient = new Crowfunding({
                client: client,
                signer: customSignerBackend,
                sender: account.addr
            });
    
            // Deploy our app on chain (Only works if the ApplicationSpec was used to generate the client)
            const [appId, appAddr, txId] = await appClient.create();
            console.log(`Created app ${appId} with address ${appAddr} in tx ${txId}`);
    
            res.status(201).json({
                message: "Campaign created successfully!",
                data: {
                    appId: appId,
                    appAddr: appAddr,
                    txId: txId
                },
                error: null
            });
    
        })();
    } catch(err) {
        res.status(500).json({
            message: "Error creating the campaign",
            error: err
        });
    }
  });

  app.post('/api/v1/refund', async (req: Request, res: Response) => {
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

    } catch(err) {
        console.log(err)
        res.status(500).json({
            message: "Error.",
            data: null,
            error: err
        });
    }
  })
  
  app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
  });

