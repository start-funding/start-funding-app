import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import algosdk from "algosdk";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Conf from '../../../conf/conf.json';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

let api = `http://${Conf.backend.ip}:${Conf.backend.port}/${Conf.backend.basePath}`;

export default function TransactionCreateCampaignDialog(props) {
    const navigate = useNavigate();
    const [address, setAddress ] = useState("");
 
    const handleAddressChange = (e) => {
        setAddress(e.target.value)
    }

    const handleMakeContribution = async () => {

        if(address === "") {
            alert("Address can't be empty.")
            return;
        }

        if(address === "") {
            alert("Not valid address. Address needs to be a 58 chars long string.")
            return;
        }   

        window.AlgoSigner.algod({
            ledger: 'TestNet',
            path: '/v2/transactions/params'
        })
        .then(txParams => {
            /*
            fee - integer fee per byte, in microAlgos. for a flat fee, set flatFee to true
            * flatFee - bool optionally set this to true to specify fee as microalgos-per-txn
            *       If true, txn fee may fall below the ALGORAND_MIN_TX_FEE
            * firstRound - integer first protocol round on which this txn is valid
            * lastRound - integer last protocol round on which this txn is valid
            * genesisHash - string specifies hash genesis block of network in use
            * genesisID - string specifies genesis ID of network in use
            * 
            * */
            let params = {
                flatFee: true,
                firstRound: txParams['last-round'] +1,
                lastRound: txParams['last-round'] +20,
                genesisHash: txParams['genesis-hash'],
                genesisID: txParams['genesis-id'],
                fee: 1000
            }
            console.log(txParams)

            const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
                from: address,
                to: "K7GGQIBN4DQKOTKDKV2663VQLTZ6ZSPZOP5JQBHC4TNABUSV7JWPN7TFGY",
                amount: + (props.newCampaign.target / 100 * 1) * 1000000,
                //note: "prova note",
                suggestedParams: {...params}
            });
            
            // Use the AlgoSigner encoding library to make the transactions base64
            let txn_b64 = window.AlgoSigner.encoding.msgpackToBase64(txn.toByte());
            
            window.AlgoSigner.signTxn([{txn:txn_b64}])
            .then(d => {
                console.log(d)
                window.AlgoSigner.send({
                    ledger: 'TestNet',
                    tx: d[0].blob
                  })
                  .then(d => {
                    console.log(d)
                    //alert(`Created transaction with id: ${d.txId}`)


                    const data = new FormData();
                    data.append('name', props.newCampaign.name);
                    data.append('owner', address);
                    data.append('id', d.txId)
                    data.append('target', props.newCampaign.target);
                    data.append('endingDate', props.newCampaign.endingDate);
                    data.append('description', props.newCampaign.description);
                    data.append('file', props.newCampaign.image);

                     // Axios post call -> Send transaction data to backend
                     axios.post(`${api}${Conf.backend.endpoints.createCampaign}`, data)
                        .then(res => {
                            console.log(res);
                            switch(res.status) {
                                case 201:
                                    props.handleCloseModal()
                                    console.log("Prima di redirect")
                                    navigate(`/campaign/${res.data.data.id}`)
                                    break;
                                case 500:
                                    alert("Error in campaign creation.")
                                    break;
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        })
                    })
                  .catch(e => console.error(e));
            })
            .catch(e => console.error(e));
            
        })
        .catch(err => {
            console.log(err)
        })
    }

    return(
        <Modal
        open={props.open}
        onClose={props.handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style} style={{display:"flex", flexDirection: "column", gap: 30}}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                {props.text}
            </Typography>
            <div style={{display: "flex", flexDirection: "column", gap: 30}}>
            <FormControl fullWidth variant="standard">
                <InputLabel id="demo-simple-select-label">Address</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    value={address}
                    label="Address"
                    onChange={handleAddressChange}
                >
                    {props.algoAddresses.map(address => {
                        return(
                            <MenuItem key={address} value={address}>{address}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
            <Button className="actionButton" variant="contained" onClick={handleMakeContribution}>{props.buttonText}</Button>
            </div>
        </Box>
    </Modal>
    )
}