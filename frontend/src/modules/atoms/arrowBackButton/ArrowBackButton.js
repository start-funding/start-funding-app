import React from "react";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import './arrowBackButton.scss'

export default function ArrowBackButton(props) {
    function handleCampaignClick() {
        props.updateNavActive('HOME');
    }

    return (
        <Link to="/" onClick={handleCampaignClick}>
            <IconButton color="primary" component="label" className="arrowBack">
                <ArrowBackIosIcon />
            </IconButton>
        </Link>
    )
}