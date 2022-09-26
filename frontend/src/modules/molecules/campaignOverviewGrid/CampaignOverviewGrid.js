import React from "react";
import { Grid } from "@mui/material";
import CampaignOverview from "../campaignOverview/CampaignOverview";

export default function CampaignOverviewGrid(props) {
    return (
        <Grid container spacing={5} id="top-12-grid" justifyContent="space-between" style={{paddingLeft:"8%", paddingRight:"8%"}}>
            {props.campaigns.map(campaign => {
                return (
                    <CampaignOverview 
                        key={campaign.id} 
                        campaign={campaign} 
                        updateNavActive={props.updateNavActive} 
                        pageNumber={props.pageNumber}
                    />
                )
            })}
        </Grid>
    )
}