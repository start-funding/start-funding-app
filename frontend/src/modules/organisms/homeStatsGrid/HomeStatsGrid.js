import React from "react";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import './homeStatsGrid.scss';

export default function HomeStatsGrid(props) {
    return(
        <Grid container spacing={2} justifyContent="center" id="home-grid-second-block">
                <Grid item xs={12} md={3} className="statsElement">
                    <Card>
                        <CardContent>
                            <Typography variant="h5"  align="center">
                                {props.stats.successfulCampaigns}
                            </Typography>
                            <Typography align="center">
                                completed campaigns
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3} className="statsElement">
                    <Card>
                        <CardContent>
                            <Typography variant="h5"  align="center">
                                {props.stats.foundsCollected}
                            </Typography>
                            <Typography align="center">
                                Algos collected
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3} className="statsElement">
                    <Card>
                        <CardContent>
                            <Typography variant="h5"  align="center">
                                {props.stats.totalCampaigns}
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