import { TextField } from "@mui/material";
import React from "react";

export default function CampaignsCollectedRangeFilter(props) {
    const handleCollectedRange = (e) => {
        props.setCollectedRange(parseInt(e.target.value))
    }

    return (
        <TextField
            variant="standard"
            placeholder={props.placeholder}
            label={props.label}
            type="number"
            value={props.collectedRange}
            onChange={handleCollectedRange}
            InputLabelProps={{
                shrink: true,
            }}
        />
    )
}