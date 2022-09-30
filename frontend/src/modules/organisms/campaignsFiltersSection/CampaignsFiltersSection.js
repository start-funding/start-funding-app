import React from "react";
import { Grid } from "@mui/material";
import CampaignsEndingDateFilter from "../../atoms/campaignsEndingDateFilter/CampaingsEndingDateFilter";
import CampaignsNameFilter from "../../atoms/campaignsNameFilter/CampaignsNameFilter";
import CampaignStateFilter from "../../atoms/campaignsStateFilter/CampaingsStateFilter";
import CampaignsMinAndMaxCollectedRangeFilter from "../../molecules/campaignsMinAndMaxCollectedRangeFilter/CampaignsMinAndMaxCollectedRangeFilter";
import './campaignsFiltersSection.scss'

export default function CampaignsFilterSection(props) {
    return (
        <Grid container spacing={5} className="filtersGridContainer">
            <Grid item md={6} className="filtersGridElement">

                {/* Filtro nome campagna */}
                {/*<CampaignsNameFilter
                    campaignName={props.campaignName}
                    setCampaignName={props.setCampaignName}
                />*/}

                {/* Filtro data fine */}
                {/*<CampaignsEndingDateFilter
                    campaignEndingDate={props.campaignEndingDate}
                    setCampaignEndingDate={props.setCampaignEndingDate}
                />*/}


                {/* Filtro stato */}
                <CampaignStateFilter
                    state={props.state}
                    setState={props.setState}
                />
                    {/* Filtro algo raccolti */}
                <CampaignsMinAndMaxCollectedRangeFilter
                    minCollectedRange={props.minCollectedRange}
                    setMinCollectedRange={props.setMinCollectedRange}
                    maxCollectedRange={props.maxCollectedRange}
                    setMaxCollectedRange={props.setMaxCollectedRange}
                />
            </Grid>
            {/*
                <Grid item md={6} className="filtersGridElement">
                </Grid>

            */}
        </Grid>
    )
}