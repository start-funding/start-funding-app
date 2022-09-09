import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import React from "react";
import { Link as NavLink } from "react-router-dom";

export default function CampaignOverview(props) {

    return(
        <Grid item xl={4} style={{minWidth:"30%"}}>
            <Card>
                <CardMedia
                    component="img"
                    height="200"
                    image={props.campaign.image}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.campaign.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {props.campaign.collectedFounds} / {props.campaign.target}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {props.campaign.endingDate}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" component={NavLink} to={`campaign/${props.campaign.id}`}  className="link nav-link-desktop">
                        Learn More
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    )
}