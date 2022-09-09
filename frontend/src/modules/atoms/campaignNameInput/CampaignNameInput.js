import { TextField } from "@mui/material";
import { React, useEffect} from "react";

export default function CampaignNameInput(props) {

    useEffect(() => {
        if (!props.createCampaignPage) {
            props.setCampaignName(props.campaign.name);
        }
    }, []);

    const handleCampaignNameChange = (e) => {
        props.setCampaignName(e.target.value);
    };



    return (
        <TextField
            value={props.campaignName}
            onChange={handleCampaignNameChange}
            label="Campaign name"
            placeholder="Insert campaign name (required)"
            variant="standard"
            required
            disabled={props.disabled}
        />
    )
}