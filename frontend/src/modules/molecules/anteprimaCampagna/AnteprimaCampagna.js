import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import React from "react";
import { Link as NavLink } from "react-router-dom";

export default function AnteprimaCampagna(props) {

    return(
        <Grid item xl={4} style={{minWidth:"30%"}}>
            <Card>
                <CardMedia
                    component="img"
                    height="200"
                    image={props.campagna.image}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.campagna.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {props.campagna.fondiRaccolti} / {props.campagna.fondiTotali}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {props.campagna.dataFine}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" component={NavLink} to={`campagna/${props.campagna.id}`}  className="link nav-link-desktop">
                        Learn More
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    )
}