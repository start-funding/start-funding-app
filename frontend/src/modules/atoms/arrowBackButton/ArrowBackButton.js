import { IconButton } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export default function ArrowBackButton(props) {
    return (
        <Link to="/" >
            <IconButton color="primary" component="label">
                <ArrowBackIosIcon />
            </IconButton>
        </Link>
    )
}