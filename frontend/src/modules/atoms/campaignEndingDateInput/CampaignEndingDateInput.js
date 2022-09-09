import { React, useEffect } from "react";
import dayjs from 'dayjs';
import { TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function CampaignEndingDateInput(props) {

    useEffect(() => {
        if (!props.createCampaignPage) {
            props.setCampaignEndingDate(
                dayjs(new Date(`${props.campaign.endingDate.split("-")[2]}-${props.campaign.endingDate.split("-")[1]}-${props.campaign.endingDate.split("-")[0]}`)));
        }
    }, []);

    const handleCampaignEndingDateChange = (e) => {
        props.setCampaignEndingDate(dayjs(e));
    };    

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
                disabled={props.disabled}
                label="Ending date"
                inputFormat="MM/DD/YYYY"
                value={props.campaignEndingDate}
                onChange={handleCampaignEndingDateChange}
                renderInput={(params) => <TextField {...params} variant="standard" required disabled={props.disabled}/>}
            />
        </LocalizationProvider>
    )
}