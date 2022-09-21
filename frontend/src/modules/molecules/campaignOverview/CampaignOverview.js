import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import React from "react";
import { Link as NavLink } from "react-router-dom";

export default function CampaignOverview(props) {
    function handleCampaignClick() {
        props.updateNavActive('CAMPAIGN');
    }
    
    return(
        <Grid item xs={12} sm={6} lg={4} style={{minWidth:"30%"}}>
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
                        {props.campaign.collectedFunds} / {props.campaign.target}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {props.campaign.endingDate}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={handleCampaignClick} component={NavLink} to={`/campaign/${props.campaign.id}`}  className="link nav-link-desktop">
                        Learn More
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    )
}