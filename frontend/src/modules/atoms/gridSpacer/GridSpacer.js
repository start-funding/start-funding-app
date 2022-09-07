import { Grid } from "@mui/material";
import React from "react";

export default function GridSpacer(props) {
    return (
        <Grid container style={{height:props.height}}>
            <Grid item xl={12} style={{ height: "100%", width: "100%" }}></Grid>
        </Grid>
    )
}