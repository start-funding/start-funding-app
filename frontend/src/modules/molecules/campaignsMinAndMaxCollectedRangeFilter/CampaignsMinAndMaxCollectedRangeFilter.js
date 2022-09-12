import React from "react";
import CampaignsCollectedRangeFilter from "../../atoms/campaignsCollectedRangeFilter/CampaignsCollectedRangeFilter";

export default function CampaignsMinAndMaxCollectedRangeFilter(props) {
    return (
        <div>
            <CampaignsCollectedRangeFilter
                label={"Min"}
                placeholder={"Min. collected range"}
                collectedRange={props.minCollectedRange}
                setCollectedRange={props.setMinCollectedRange}
            />

            <CampaignsCollectedRangeFilter
                label={"Max"}
                placeholder={"Max. collected range"}
                collectedRange={props.maxCollectedRange}
                setCollectedRange={props.setMaxCollectedRange}
            />
        </div>
    )
}