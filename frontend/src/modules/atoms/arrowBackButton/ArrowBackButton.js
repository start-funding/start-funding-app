import React from "react";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import './arrowBackButton.scss'

export default function ArrowBackButton(props) {
    return (
        <Link to="/" >
            <IconButton color="primary" component="label" className="arrowBack">
                <ArrowBackIosIcon />
            </IconButton>
        </Link>
    )
}