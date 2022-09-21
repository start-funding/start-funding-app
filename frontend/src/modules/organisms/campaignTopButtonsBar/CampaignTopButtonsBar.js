import { Button, Grid } from "@mui/material";
import { React } from "react";
import SaveCampaignButton from "../../atoms/saveCampaignButton/SaveCampaignButton";
import ArrowBackButton from "../../atoms/arrowBackButton/ArrowBackButton";

export default function CampaignTopButtonsBar(props) {
    const handleEdit = () => {
        props.setEditing(true);
    }

    const handleCancel = () => {
        props.setEditing(false);
    }

    if (props.createCampaignPage) {
        return (
            <Grid container spacing={2} justifyContent="center" style={{ paddingLeft: "5%", paddingRight: "5%" }}>
                <Grid item xl={12} style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                    {/* Arrow back button*/}
                    <ArrowBackButton updateNavActive={props.updateNavActive}/>

                    {/* Save button */}
                    <SaveCampaignButton campaign={props.campaignToSave} update={false} setEditing={props.setEditing} />
                </Grid>
            </Grid>
        )
    } else {
        if (props.algoAddresses.includes(props.campaign.owner) && props.campaign.state === "active") {
            if (props.editing) {
                return (
                    <Grid container spacing={2} justifyContent="center" style={{ paddingLeft: "5%", paddingRight: "5%" }}>
                        <Grid item xl={12} style={{ width: "100%", display: "flex", justifyContent: "end" }}>
                            

                            {/* Save button */}
                            <div style={{display:"flex", gap:"2em"}}>
                                <Button variant="contained" component="label" onClick={handleCancel} className="cancelButton">
                                    Cancel
                                </Button>
                                <SaveCampaignButton campaign={props.campaignToSave} update={true} setEditing={props.setEditing} />
                            </div>
                        </Grid>
                    </Grid>
                )
            } else {
                return (
                    <Grid container spacing={2} justifyContent="center" style={{ paddingLeft: "5%", paddingRight: "5%" }}>
                        <Grid item xl={12} style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                            {/* Arrow back button*/}
                            <ArrowBackButton updateNavActive={props.updateNavActive} />

                            {/* Edit button */}
                            <Button variant="contained" component="label" onClick={handleEdit} className="editButton" >
                                Edit
                            </Button>
                        </Grid>
                    </Grid>
                )
            }
        } else {
            return(
                <Grid container spacing={2} justifyContent="center" style={{ paddingLeft: "5%", paddingRight: "5%" }}>
                        <Grid item xl={12} style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                            {/* Arrow back button*/}
                            <ArrowBackButton updateNavActive={props.updateNavActive} />

                            
                        </Grid>
                    </Grid>
            )
        }
    }
}