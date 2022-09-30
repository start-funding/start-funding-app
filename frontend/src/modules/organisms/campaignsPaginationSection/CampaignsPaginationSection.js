import React from "react";
import { Grid } from "@mui/material";
import CampaignsPagination from "../campaignsPagination/CampaignsPagination";

export default function CampaingsPaginationSection(props) {
    return (
        <Grid container spacing={2} justifyContent="center" sx={{ paddingLeft: "5%", paddingRight: "5%" }}>
            <CampaignsPagination
                setPageNumber={props.setPageNumber}
                setResultsPerPage={props.setResultsPerPage}
                totalPages={props.totalPages}
                pageNumber={props.pageNumber}
                totalResults={props.totalResults}
                resultsPerPage={props.resultsPerPage}
            />
        </Grid>
    )
}