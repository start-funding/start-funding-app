import { Button } from "@mui/material";
import algosdk from "algosdk";
import React from "react";
import * as bkr from "beaker-ts";
import {BeakerClient} from "./crowdfunding_client";

export default function CampaignClaimButton(props) {
    
    /*
    const [open, setOpen] = useState(false);
    const handleCloseModal = () => {
        setOpen(false);
    } 

    const handleOpenModal = () => {
        setOpen(true)
    }
    */

    const handleClaim = () => {
        // props.campaign.contractAddress
        // window.AlgoSigner.algod({
        //     ledger: 'TestNet',
        //     path: '/v2/transactions/params'
        // })
        // .then(txParams => {
        //     /*
        //     fee - integer fee per byte, in microAlgos. for a flat fee, set flatFee to true
        //     * flatFee - bool optionally set this to true to specify fee as microalgos-per-txn
        //     *       If true, txn fee may fall below the ALGORAND_MIN_TX_FEE
        //     * firstRound - integer first protocol round on which this txn is valid
        //     * lastRound - integer last protocol round on which this txn is valid
        //     * genesisHash - string specifies hash genesis block of network in use
        //     * genesisID - string specifies genesis ID of network in use
        //     * 
        //     * */
        //     let params = {
        //         flatFee: true,
        //         firstRound: txParams['last-round'] +1,
        //         lastRound: txParams['last-round'] +20,
        //         genesisHash: txParams['genesis-hash'],
        //         genesisID: txParams['genesis-id'],
        //         fee: algosdk.ALGORAND_MIN_TX_FEE
        //     }

        //     // const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        //     //     from: address,
        //     //     to: "K7GGQIBN4DQKOTKDKV2663VQLTZ6ZSPZOP5JQBHC4TNABUSV7JWPN7TFGY",
        //     //     amount: +amount * 1000000,
        //     //     //note: "prova note",
        //     //     suggestedParams: {...params}
        //     // });
            
        //     let amount = "1000000";
        //     console.log(amount)
        //     let appArgs = [];
        //     appArgs.push(new Uint8Array(Buffer.from(amount)));

        //     const txn2 = algosdk.makeApplicationNoOpTxnFromObject({
        //         from: "RTJKUIUP3P6F6WEZFXQSJD7CNRQGTFUHBO5WK5LTTTD7BMTES54B7X52BU",
        //         appIndex: 114347003,
        //         suggestedParams: {...params},
        //         appArgs: appArgs
        //     })
        
            
            
        //     // Use the AlgoSigner encoding library to make the transactions base64
        //     let txn_b64 = window.AlgoSigner.encoding.msgpackToBase64(txn2.toByte());
            
        //     window.AlgoSigner.signTxn([{txn:txn_b64}])
        //     .then(d => {
        //         window.AlgoSigner.send({
        //             ledger: 'TestNet',
        //             tx: d[0].blob
        //           })
        //           .then(d => {
        //             //alert(`Created transaction with id: ${d.txId}`)
        //             console.log(d)

        //             // axios.post(`${api}${Conf.backend.endpoints.fundCampaign}/${props.campaign.id}`, {
        //             //     addressFrom: address,
        //             //     amount: amount
        //             // })
        //             // .then(res => {
        //             //     switch(res.status) {
        //             //         case 200:
        //             //             props.handleCloseModal()
                            
        //             //             props.setCampaignTarget(parseInt(res.data.data.collectedFunds))
        //             //             alert(res.data.message)
        //             //             break;
        //             //         case 500:
        //             //             alert(res.data.message)
        //             //             break;
        //             //     }                    
        //             // })
        //             // .catch(err => {
        //             //     console.log(err);
        //             //     alert(err)
        //             // })
        //         })
        //           .catch(e => console.error(e));
        //     })
        //     .catch(e => console.error(e));
            
        // })
        // .catch(err => {
        //     console.log(err)
        // })

        (async function () {

            // Grab an account
            // const acct = (await bkr.sandbox.getAccounts()).pop();
            // if (acct === undefined) return;
          
            // Create a new client that will talk to our app
            // Including a signer lets it worry about signing
            // the app call transactions 
            const appClient = new HelloBeaker({
              client: bkr.ApplicationClient,
              signer: acct.signer,
              sender: acct.addr,
            });
          
            // Deploy our app on chain (Only works if the ApplicationSpec was used to generate the client)
            const [appId, appAddr, txId] = await appClient.create();
            console.log(`Created app ${appId} with address ${appAddr} in tx ${txId}`);
          
            // Call the method by name, with named and typed arguments
            const result = await appClient.hello({name: "Beaker"});
            // Get a typed result back from our app call
            console.log(result.value); // Hello, Beaker
          
          })();
    }

    return(
        <div >
            <Button style={{width:"100%"}} className="actionButton" variant="contained" onClick={handleClaim}>Claim funds</Button>
            {/* TODO: dialog conferma */}
        </div>
    )
}