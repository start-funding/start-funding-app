import algosdk from "algosdk";
import * as bkr from "beaker-ts";
import { Crowfunding } from "../crowfunding_client.ts"

// const algosdk = require('algosdk');
// const bkr = require("beaker-ts");
// const Crowfunding = require("../crowfunding_client.ts");

// import * as bkr from "beaker-ts";
// import { Crowfunding } from "../../../crowfunding_client.ts";
// import { customSigner } from "../utils/algorandUtils.js";

const createSmartContract = async(creatorAddress) => {

    let client = new algosdk.Algodv2({},
        'https://algosigner.api.purestake.io/testnet/algod',
        '',
    );
    //let address = "RTJKUIUP3P6F6WEZFXQSJD7CNRQGTFUHBO5WK5LTTTD7BMTES54B7X52BU";
    // let appAddress = "WQIOFPOHGAKAZA57BYFQDOLOU5FABZFDB34QFUUDEGW5CD2CV7Y5HTYD7Y";
    (async function() {
        const appClient = new Crowfunding({
            client: client,
            signer: customSigner,
            sender: creatorAddress
        });

        // Deploy our app on chain (Only works if the ApplicationSpec was used to generate the client)
        const [appId, appAddr, txId] = await appClient.create();
        console.log(`Created app ${appId} with address ${appAddr} in tx ${txId}`);

        // const bootstrapResult = await appClient.claim();
        // Get a typed result back from our app call
        // console.log(bootstrapResult); // Hello, Beaker


        // Ci vorrebbe un controllo, ma su quale campo?
        // axios.post(`${api}${Conf.backend.endpoints.fundCampaign}/${props.campaign.id}`, {
        //     addressFrom: address,
        //     amount: amount
        // })
        // .then(res => {
        //     switch(res.status) {
        //         case 200:
        //             props.handleCloseModal()

        //             props.setCampaignTarget(parseInt(res.data.data.collectedFunds))
        //             alert(res.data.message)
        //             break;
        //         case 500:
        //             alert(res.data.message)
        //             break;
        //     }                    
        // })
        // .catch(err => {
        //     console.log(err);
        //     alert(err)
        // })
    })();
}

module.exports = { createSmartContract }