import { Card, Grid, TextField, Typography } from "@mui/material";
import { React, useEffect } from "react";

export default function CampaignDescriptionSection(props) {

    useEffect(() => {
        if (!props.createCampaignPage) {
            props.setCampaignDescription(props.campaign.description)
        }
    }, []);

    const handleCampaignDescriptionChange = (e) => {
        props.setCampaignDescription(e.target.value);
    };

    return (
        <Grid container spacing={2} style={{ paddingLeft: "10%", paddingRight: "10%" }}>
            <Grid item xl={12} style={{ width: "100%" }}>
                <Card style={{ width: "100%", padding: 10, boxSizing: "border-box" }}>
                    {
                        props.createCampaignPage ?
                            <TextField
                                required
                                id="outlined-multiline-static"
                                label="Description"
                                multiline
                                rows={10}
                                placeholder="Insert campaign description (required)"
                                value={props.campaignDescription}
                                onChange={handleCampaignDescriptionChange}
                                style={{ width: "100%" }}
                            />
                            :
                            props.editing ?
                                <TextField
                                    required
                                    id="outlined-multiline-static"
                                    label="Description"
                                    multiline
                                    rows={10}
                                    placeholder="Insert campaign description (required)"
                                    value={props.campaignDescription}
                                    onChange={handleCampaignDescriptionChange}
                                    style={{ width: "100%" }}
                                />
                                :
                                <Typography variant="body2" gutterBottom>
                                    {props.campaign.description}
                                </Typography>
                    }
                </Card>
            </Grid>
        </Grid>
    )
}