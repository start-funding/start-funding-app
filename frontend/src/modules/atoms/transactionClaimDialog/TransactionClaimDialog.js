import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import algosdk from "algosdk";
import axios from "axios";
import React, { useState } from "react";
import Conf from '../../../conf/conf.json';
import * as bkr from "beaker-ts";
import { Crowfunding } from "../../../crowfunding_client.ts";
import { customSigner } from "../../../utils/algorandUtils";


let api = `http://${Conf.backend.ip}:${Conf.backend.port}/${Conf.backend.basePath}`;

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

export default function TransactionClaimDialog(props) {
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

        let client = new algosdk.Algodv2(
            {},
            'https://algosigner.api.purestake.io/testnet/algod',
            '',
            );
            
            (async function () {
                const appClient = new Crowfunding({
                  client: client,
                  signer: customSigner,
                  sender: address,
                  appId: props.campaign.appId, // Sostituire con props.campaign.appId 114347003
                });
              
                // Call the method by name, with named and typed arguments
                //const result = await appClient.get_collected();
                try {
                    const bootstrapResult = await appClient.claim();
                    // Get a typed result back from our app call
                    console.log(bootstrapResult); // Hello, Beaker
                    // Ci vorrebbe un controllo, ma su quale campo?
                    axios.post(`${api}${Conf.backend.endpoints.claim}`, {
                        id: props.campaign.id
                    })
                    .then(res => {
                        switch(res.status) {
                            case 200:
                                props.handleCloseModal();

                                props.setCampaignState("success")
                                alert(res.data.message)
                                break;
                            case 500:
                                alert(res.data.message)
                                break;
                        }                    
                    })
                    .catch(err => {
                        console.log(err);
                        alert(err)
                    })

                } catch(err) {
                    console.log(err)

                    axios.post(`${api}${Conf.backend.endpoints.claim}`, {
                        id: props.campaign.id
                    })
                    .then(res => {
                        switch(res.status) {
                            case 200:
                                props.handleCloseModal();
                                props.setCampaignState("success")
                                alert(res.data.message)
                                break;
                            case 500:
                                alert(res.data.message)
                                break;
                        }                    
                    })
                    .catch(err2 => {
                        console.log(err2);
                        alert(err2)
                    })

                    
                }

                
              })();
            

        
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