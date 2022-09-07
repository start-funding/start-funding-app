import { Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";
import GridSpacer from "../../atoms/gridSpacer/GridSpacer";

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
                                campagne completate
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
                                Algo raccolti
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
                                campagne totali
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
    )
}