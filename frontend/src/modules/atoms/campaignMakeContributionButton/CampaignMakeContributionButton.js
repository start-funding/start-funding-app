import { Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import algosdk from "algosdk";
import React, { useState } from "react";

export default function CampaignMakeContributionButton(props) {
    const [open, setOpen] = useState(false);
    const handleCloseModal = () => {
        setOpen(false);
    } 

    const handleOpenModal = () => {
        setOpen(true)
    }

    const [address, setAddress ] = useState("");

    const handleAddressChange = (e) => {
        setAddress(e.target.value)
    }

    const [amount, setAmount] = useState(0);

    const handleAmountChange = (e) => {
        setAmount(e.target.value)
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

        if(amount < 1) {
            alert("The minimum amount is 1 Algo.")
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
                amount: +amount * 1000000,
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
                    alert(`Created transaction with id: ${d.txId}`)
                })
                  .catch(e => console.error(e));
            })
            .catch(e => console.error(e));
            
        })
        .catch(err => {
            console.log(err)
        })
    }

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

    return(
        <div >
            <Button style={{width:"100%"}} className="actionButton" variant="contained" onClick={handleOpenModal}>Make contribution</Button>
            <Modal
            open={open}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} style={{display:"flex", flexDirection: "column", gap: 30}}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Compile contribution form
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
                    <TextField
                        id="outlined-number"
                        label="Amount"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={amount}
                        onChange={handleAmountChange}
                    />
                <Button className="actionButton" variant="contained" onClick={handleMakeContribution}>Create transaction</Button>
                </div>

            </Box>
        </Modal>
        </div>
    )
}