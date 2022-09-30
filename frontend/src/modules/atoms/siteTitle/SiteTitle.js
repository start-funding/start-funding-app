import { Typography } from "@mui/material";
import React from "react";

import './siteTitle.scss';

export default function SiteTitle(props) {
    return(
        <Typography variant="h2" align="center" id="siteTitle">
            {props.title}
        </Typography>
    )
}