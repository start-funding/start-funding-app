import React from "react";
import CampaignOverviewGrid from "../../molecules/campaignOverviewGrid/CampaignOverviewGrid";

export default function CampaignsResultsSection(props) {
    return (
        <CampaignOverviewGrid 
            campaigns={props.campaigns}
        />
    )
}