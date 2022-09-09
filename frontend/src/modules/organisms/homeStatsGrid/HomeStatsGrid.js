import { Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";

export default function HomeStatsGrid(props) {
    console.log(props)
    return(
        <Grid container spacing={2} justifyContent="center" id="home-grid-second-block">
                <Grid item xl={3} style={{minWidth:"20%"}}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5"  align="center">
                                {props.stats.campagneCompletate}
                            </Typography>
                            <Typography align="center">
                                completed campaigns
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xl={3} style={{minWidth:"20%"}}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5"  align="center">
                                {props.stats.totaleAlgoRaccolti}
                            </Typography>
                            <Typography align="center">
                                Algos collected
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xl={3} style={{minWidth:"20%"}} >
                    <Card>
                        <CardContent>
                            <Typography variant="h5"  align="center">
                                {props.stats.campagneTotali}
                            </Typography>
                            <Typography align="center">
                                total campaigns
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
    )
}