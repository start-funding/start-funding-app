import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

export default function CampaignStateFilter(props) {

    const handleStateChange = (e) => {
        props.setState(e.target.value)
    }

    return(
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="select-state-label">State</InputLabel>
        <Select
            labelId="select-state-label"
            id="state-select"
            value={props.state}
            onChange={handleStateChange}
            label="State"
        >
            <MenuItem value="">
                <em style={{ visibility: 'hidden' }}>n</em>
            </MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="success">Closed with success</MenuItem>
            <MenuItem value="failed">Closed with fail</MenuItem>
        </Select>
    </FormControl>
    )
}