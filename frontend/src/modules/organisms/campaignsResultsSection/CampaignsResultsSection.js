import React from "react";
import CampaignOverviewGrid from "../../molecules/campaignOverviewGrid/CampaignOverviewGrid";

export default function CampaignsResultsSection(props) {
    return (
        <CampaignOverviewGrid 
            pageNumber={props.pageNumber}
            campaigns={props.campaigns}
            updateNavActive={props.updateNavActive}
        />
    )
}