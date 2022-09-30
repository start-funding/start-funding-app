import { TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React from "react";

export default function CampaignsEndingDateFilter(props) {

    const handleCampaignEndingDateChange = (e) => {
        props.setCampaignEndingDate(dayjs(e));
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
                label="Ending date"
                inputFormat="MM/DD/YYYY"
                value={props.campaignEndingDate}
                onChange={handleCampaignEndingDateChange}
                renderInput={(params) => <TextField {...params} variant="standard" />}
            />
        </LocalizationProvider>
    )
}