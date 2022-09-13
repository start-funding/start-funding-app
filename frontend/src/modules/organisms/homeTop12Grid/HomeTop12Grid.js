import { Grid, Typography } from "@mui/material";
import React from "react";
import GridSpacer from "../../atoms/gridSpacer/GridSpacer";
import CampaignOverviewGrid from "../../molecules/campaignOverviewGrid/CampaignOverviewGrid";

export default function HomeTop12Grid(props) {
    return (
        <Grid container spacing={2} id="home-grid-third-block">
            <Grid item xl={12} >
                <Typography variant="h5" style={{paddingLeft: "8%"}}>
                    Top 12 campaigns:
                </Typography>
                <GridSpacer height="1%" />
                <CampaignOverviewGrid
                    campaigns={props.campaigns}
                />
            </Grid>
        </Grid>
    )
}