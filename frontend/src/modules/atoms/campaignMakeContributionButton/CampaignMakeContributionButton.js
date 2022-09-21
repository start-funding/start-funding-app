import { Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import algosdk from "algosdk";
import React, { useState } from "react";
import TransactionDialog from "../transactionDialog/TransactionDialog";

export default function CampaignMakeContributionButton(props) {
    const [open, setOpen] = useState(false);

    const handleCloseModal = () => {
        setOpen(false);
    } 

    const handleOpenModal = () => {
        setOpen(true)
    }

    return(
        <div >
            <Button style={{width:"100%"}} className="actionButton" variant="contained" onClick={handleOpenModal}>Make contribution</Button>
            <TransactionDialog 
                text={"Compile contribution form"} 
                hangleCloseModal={handleCloseModal} 
                open={open} 
                algoAddresses={props.algoAddresses}
                buttonText={"Create transaction"}
            />
        </div>
    )
}