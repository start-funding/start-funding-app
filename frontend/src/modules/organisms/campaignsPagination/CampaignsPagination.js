import React from "react";
import { FormControl, Grid, InputLabel, MenuItem, Pagination, Select } from "@mui/material";

export default function CampaignsPagination(props) {

    const handlePageChange = (e, newPageNumber) => {
        props.setPageNumber(newPageNumber)
    }

    const handleResultsPerPageChange = (e) => {
        props.setResultsPerPage(parseInt(e.target.value))
    }

    return (
        <Grid item xl={12} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Pagination
                count={props.totalPages}
                shape="rounded"
                page={props.pageNumber}
                onChange={handlePageChange}
            />
            
            <InputLabel id="total-results-label">{props.totalResults} results</InputLabel>

            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="results-per-page-label">Results per page</InputLabel>
                <Select
                    labelId="results-per-page-label"
                    id="results-per-page"
                    value={props.resultsPerPage}
                    onChange={handleResultsPerPageChange}
                    label="Results per page"
                >
                    <MenuItem value="10">10</MenuItem>
                    <MenuItem value="20">20</MenuItem>
                    <MenuItem value="50">50</MenuItem>
                </Select>
            </FormControl>
        </Grid>
    )
}