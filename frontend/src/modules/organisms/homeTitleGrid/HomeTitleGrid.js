import React from "react";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import SiteTitle from "../../atoms/siteTitle/SiteTitle";

import './homeTitleGrid.scss'

export default function HomeTitleGrid(props) {
    return (
        <Grid container spacing={2} justifyContent="center" id="home-grid-first-block">
            <Grid item xl={6} >
                <Card style={{ border: "none", boxShadow: "none" }}>
                    <CardContent>
                        <SiteTitle title="start funding" />
                        <Typography  align="center" className="siteDescription">
                            The new Algorand based crowdfunding platform
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}