import { Box, Card, CardActionArea, CardMedia, Grid, LinearProgress, Typography } from "@mui/material";
import React from "react";
import CampaignImageUpload from "../../molecules/campaignImageUpload/CampaignImageUpload";
import CampaignNameInput from "../../atoms/campaignNameInput/CampaignNameInput";
import CampaignTargetInput from "../../atoms/campaignTargetInput/CampaignTargetInput";
import CampaignEndingDateInput from "../../atoms/campaignEndingDateInput/CampaignEndingDateInput";

export default function CampaignImageAndDataSection(props) {    
    return (
        <Grid container spacing={2} style={{ paddingLeft: "10%", paddingRight: "10%", height: 350 }}>
            <Grid item xl={6} style={{ width: "50%", height: "100%" }}>
                {
                    props.createCampaignPage ?
                        <CampaignImageUpload 
                            file={props.file} 
                            setFile={props.setFile}
                            createCampaignPage={props.createCampaignPage}
                            campaign={props.campaign}
                        />
                    :
                        props.editing ?
                            <CampaignImageUpload 
                                file={props.file} 
                                setFile={props.setFile} 
                                createCampaignPage={props.createCampaignPage}
                                campaign={props.campaign}
                            />
                        :
                        <Card style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                            <CardActionArea style={{ width: "100%", height: "100%", overflow: "hidden" }}>
                                    <CardMedia
                                        component="img"
                                        image={props.campaign.image}
                                    />
                            </CardActionArea>
                        </Card>

                }
            </Grid>
            <Grid item xl={6} style={{ width: "50%", height: "100%" }}>
                <Card style={{ width: "100%", padding: 10, boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "space-around", height: "100%" }}>

                    {/* Campaign name input field */}
                    {
                        props.createCampaignPage ?
                            <CampaignNameInput 
                                campaignName={props.campaignName}
                                setCampaignName={props.setCampaignName} 
                                disabled={false}
                                createCampaignPage={props.createCampaignPage}
                                campaign={props.campaign}
                            />
                        :
                            props.editing ?
                                <CampaignNameInput 
                                    campaignName={props.campaignName}
                                    setCampaignName={props.setCampaignName}
                                    disabled={true} 
                                    createCampaignPage={props.createCampaignPage}
                                    campaign={props.campaign}
                                />
                            :
                                <Typography variant="h5" gutterBottom>
                                    {props.campaign.name}
                                </Typography>
                    }

                    {/* Campaign target input field */}
                    {
                        props.createCampaignPage ?
                            <CampaignTargetInput 
                                campaignTarget={props.campaignTarget} 
                                setCampaignTarget={props.setCampaignTarget}
                                disabled={false} 
                                createCampaignPage={props.createCampaignPage}
                                campaign={props.campaign}
                            />
                        :
                            props.editing ?
                                <CampaignTargetInput 
                                    campaignTarget={props.campaignTarget} 
                                    setCampaignTarget={props.setCampaignTarget}
                                    disabled={true} 
                                    createCampaignPage={props.createCampaignPage}
                                    campaign={props.campaign}
                                />
                            :
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                                    <Typography variant="body2" color="text.secondary">
                                        {Math.round( props.campaign.collectedFounds)} Algos
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {props.campaign.donatorsNumber} donators
                                    </Typography>
                                </Box>
                                <Box sx={{ width: '100%', mr: 1 }}>
                                    <LinearProgress variant="determinate" value={props.campaign.collectedFounds * 100 / props.campaign.target > 100 ? 100 : props.campaign.collectedFounds * 100 / props.campaign.target} />
                                </Box>
                                <Box sx={{ minWidth: 35 }}>
                                    <Typography variant="body2" color="text.secondary">
                                        {props.campaign.collectedFounds * 100 / props.campaign.target}% of {props.campaign.target} Algos
                                    </Typography>
                                </Box>
                            </Box>
                    }

                    {/* Campaign ending date input field */}
                    {
                        props.createCampaignPage ?
                            <CampaignEndingDateInput 
                                campaignEndingDate={props.campaignEndingDate}
                                setCampaignEndingDate={props.setCampaignEndingDate}
                                disabled={false} 
                                createCampaignPage={props.createCampaignPage}
                                campaign={props.campaign}
                            />
                        :
                            props.editing ?
                                <CampaignEndingDateInput 
                                    campaignEndingDate={props.campaignEndingDate}
                                    setCampaignEndingDate={props.setCampaignEndingDate}
                                    disabled={true} 
                                    createCampaignPage={props.createCampaignPage}
                                    campaign={props.campaign}
                                />
                            :
                                <Typography variant="body1" gutterBottom>
                                    Campaign closes on {props.campaign.endingDate}
                                </Typography>
                    }
                </Card>
            </Grid>
        </Grid>
    )
}