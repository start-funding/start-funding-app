import { Grid } from "@mui/material";
import React from "react";
import CampaignsEndingDateFilter from "../../atoms/campaignsEndingDateFilter/CampaingsEndingDateFilter";
import CampaignsNameFilter from "../../atoms/campaignsNameFilter/CampaignsNameFilter";
import CampaignStateFilter from "../../atoms/campaignsStateFilter/CampaingsStateFilter";
import CampaignsMinAndMaxCollectedRangeFilter from "../../molecules/campaignsMinAndMaxCollectedRangeFilter/CampaignsMinAndMaxCollectedRangeFilter";

export default function CampaignsFilterSection(props) {
    return (
        <Grid container spacing={2} justifyContent="center" style={{ paddingLeft: "5%", paddingRight: "5%" }}>
            <Grid item xl={12} style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>

                {/* Filtro nome campagna */}
                <CampaignsNameFilter
                    campaignName={props.campaignName}
                    setCampaignName={props.setCampaignName}
                />

                {/* Filtro data fine */}
                <CampaignsEndingDateFilter
                    campaignEndingDate={props.campaignEndingDate}
                    setCampaignEndingDate={props.setCampaignEndingDate}
                />
                {/* Filtro algo raccolti */}
                <CampaignsMinAndMaxCollectedRangeFilter
                    minCollectedRange={props.minCollectedRange}
                    setMinCollectedRange={props.setMinCollectedRange}
                    maxCollectedRange={props.maxCollectedRange}
                    setMaxCollectedRange={props.setMaxCollectedRange}
                />

                {/* Filtro stato */}
                <CampaignStateFilter
                    state={props.state}
                    setState={props.setState}
                />
            </Grid>
        </Grid>
    )
}