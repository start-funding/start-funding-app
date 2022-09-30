import { Card, CardActionArea, CardActions, CardMedia, IconButton } from "@mui/material";
import  { React, useState, useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";
import CancelIcon from '@mui/icons-material/Cancel';

export default function CampaignImageUpload(props) {

    useEffect(() => {
        if (!props.createCampaignPage) {
            props.setFile(props.campaign.image)
            setShowUploadButton(false);
            setImageSelectedUrl(props.campaign.image)
        }
    }, []);                            

    const fileTypes = ["JPEG", "PNG", "GIF", "JPG"];

    const [imageSelectedUrl, setImageSelectedUrl] = useState("");
    const [showUploadButton, setShowUploadButton] = useState(true);

    const cancelImageUpload = () => {
        props.setFile(null)
            setImageSelectedUrl("")
            setShowUploadButton(true)
    }

    const handleImageSelected = (image) => {
            props.setFile(image)
            setImageSelectedUrl(URL.createObjectURL(image))
            setShowUploadButton(false)
    }

    return (
        <Card style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <CardActionArea style={{ width: "100%", height: "90%", overflow: "hidden" }}>
                {showUploadButton ?
                    <FileUploader
                        multiple={false}
                        handleChange={handleImageSelected}
                        name="image"
                        types={fileTypes}
                        style={{ height: "90%" }}
                    />
                    :
                    <CardMedia
                        component="img"
                        image={imageSelectedUrl}
                    />
                }
            </CardActionArea>
            <CardActions style={{ width: "100%", height: "10%", display: "flex", justifyContent: "center" }}>
                {showUploadButton ?
                    <span></span>
                    :
                    <IconButton style={{ color: "red" }} aria-label="upload picture" component="label" onClick={cancelImageUpload}>
                        <CancelIcon />
                    </IconButton>
                }
            </CardActions>
        </Card>
    )
}