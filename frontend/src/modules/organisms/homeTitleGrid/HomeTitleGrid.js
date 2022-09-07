import { Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";
import GridSpacer from "../../atoms/gridSpacer/GridSpacer";
import SiteTitle from "../../atoms/siteTitle/SiteTitle";

export default function HomeTitleGrid(props) {
    return (
        <Grid container spacing={2} justifyContent="center" id="home-grid-first-block">
            <Grid item xl={6} >
                <Card style={{ border: "none", boxShadow: "none" }}>
                    <CardContent>
                        <SiteTitle title="start funding" />
                        <Typography align="center">
                            The new Algorand based crowdfunding platform
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}