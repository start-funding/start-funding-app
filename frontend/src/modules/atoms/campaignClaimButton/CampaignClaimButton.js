import { Button } from "@mui/material";
import algosdk from "algosdk";
import React, { useState } from "react";
import * as bkr from "beaker-ts";
import { Crowfunding } from "../../../crowfunding_client.ts";
import TransactionClaimDialog from "../transactionClaimDialog/TransactionClaimDialog";

export default function CampaignClaimButton(props) {
    const [open, setOpen] = useState(false);
    const handleCloseModal = () => {
        setOpen(false);
    } 

    const handleOpenModal = () => {
        setOpen(true)
    }
    

    return(
        <div >
            <Button style={{width:"100%"}} className="actionButton" variant="contained" onClick={handleOpenModal}>Claim funds</Button>
            <TransactionClaimDialog
                 text={"Select the owner address"} 
                 handleCloseModal={handleCloseModal} 
                 open={open} 
                 algoAddresses={props.algoAddresses}
                 buttonText={"Claim funds"}
                 campaign={props.campaign}
                 setCampaignState={props.setCampaignState}
            />
        </div>
    )
}