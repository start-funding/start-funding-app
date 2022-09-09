import { Grid, Typography } from "@mui/material";
import React from "react";
import GridSpacer from "../../atoms/gridSpacer/GridSpacer";
import CampaignOverview from "../../molecules/campaignOverview/CampaignOverview";

export default function HomeTop12Grid(props) {
    return (
        <Grid container spacing={2} id="home-grid-third-block">
            <Grid item xl={12} style={{paddingLeft:"8%", paddingRight:"8%"}}>
                <Typography variant="h5">
                    Top 12 campaigns:
                </Typography>
                <GridSpacer height="1%" />
                <Grid container spacing={5} id="top-12-grid" justifyContent="space-between">
                    {props.campaigns.map(campaign => {
                        return (
                            <CampaignOverview key={campaign.id} campaign={campaign} />
                        )
                    })}
                </Grid>
            </Grid>
        </Grid>
    )
}