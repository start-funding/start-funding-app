import { TextField } from "@mui/material";
import { React, useEffect } from "react";

export default function CampaignTargetInput(props) {

    useEffect(() => {
        if (!props.createCampaignPage) {
            props.setCampaignTarget(props.campaign.target);
        }
    }, []);

    const handleCampaignTargetChange = (e) => {
        props.setCampaignTarget(parseFloat(e.target.value));
    };

    return (
        <TextField
            value={props.campaignTarget}
            onChange={handleCampaignTargetChange}
            required
            label="Target"
            type="number"
            placeholder="Insert campaign target (required)"
            variant="standard"
            InputLabelProps={{
                shrink: true,
            }}
            disabled={props.disabled}
        />
    )
}