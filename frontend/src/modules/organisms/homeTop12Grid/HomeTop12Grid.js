import { Grid, Typography } from "@mui/material";
import React from "react";
import GridSpacer from "../../atoms/gridSpacer/GridSpacer";
import AnteprimaCampagna from "../../molecules/anteprimaCampagna/AnteprimaCampagna";

export default function HomeTop12Grid(props) {
    return (
        <Grid container spacing={2} id="home-grid-third-block">
            <Grid item xl={12} style={{paddingLeft:"8%", paddingRight:"8%"}}>
                <Typography variant="h5">
                    Top 12 campagne:
                </Typography>
                <GridSpacer height="1%" />
                <Grid container spacing={5} id="top-12-grid" justifyContent="space-between">
                    {props.campagne.map(campagna => {
                        return (
                            <AnteprimaCampagna key={campagna.id} campagna={campagna} />
                        )
                    })}
                </Grid>
            </Grid>
        </Grid>
    )
}