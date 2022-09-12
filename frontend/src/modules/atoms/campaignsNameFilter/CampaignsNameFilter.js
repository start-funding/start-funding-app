import { TextField } from "@mui/material";
import React from "react";

export default function CampaignsNameFilter(props) {

    const handleCampaignNameChange = (e) => {
        props.setCampaignName(e.target.value);
    }

    return (
        <TextField
            value={props.campaignName}
            onChange={handleCampaignNameChange}
            label="Campaign name"
            placeholder="Search campaign name"
            variant="standard"
        />
    )
}