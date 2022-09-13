import React from "react";
import CampaignsCollectedRangeFilter from "../../atoms/campaignsCollectedRangeFilter/CampaignsCollectedRangeFilter";

export default function CampaignsMinAndMaxCollectedRangeFilter(props) {
    return (
        <div style={{display: "flex", gap: "4vw"}}>
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