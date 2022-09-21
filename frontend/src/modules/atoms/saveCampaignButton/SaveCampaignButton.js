import { Button } from "@mui/material";
import axios from "axios";
import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dateFormatter, getRandomInt } from "../../../utils/utils";
import ModalError from "../modalError/ModalError";

import Conf from '../../../conf/conf.json';
import { getBase64 } from "../../../utils/utils";

export default function SaveCampaignButton(props) {
    const navigate = useNavigate();

    // Modal error state
    const [open, setOpen] = useState(false);
    const [modalErrorText, setModalErrorText] = useState("");
    const handleOpenModal = () => setOpen(true);

    let api = `http://${Conf.backend.ip}:${Conf.backend.port}/${Conf.backend.basePath}`;



    function saveCampaign() {
        // Updating an existing campaign
        if (props.update) {
            if (props.campaign.description === "") {
                setModalErrorText("The description field can't be empty.")
                handleOpenModal()
            } else {
                if (props.campaign.image === "" || props.campaign.image === null) {
                    setModalErrorText("The image field can't be empty.")
                    handleOpenModal()
                } else {

                    console.log(props.campaign)
                    

                    // Axios post call
                    axios.post(`${api}${Conf.backend.endpoints.createCampaign}`, {
                        description: props.campaign.description,
                        image: props.campaign.image
                    })
                    .then(res => {
                        console.log(res);
                    })
                    .catch(err => {
                        console.log(err);
                    })
                    // Redirect to campaign page
                    props.setEditing(false)
                    navigate(`/campaign/${props.campaign.id}`)
                }
            }

            // Creating new campaign
        } else {

            // Get new campaign data
            let newCampaign = {
                id: getRandomInt(1, 12),
                name: props.campaign.name,
                target: props.campaign.target,
                endingDate: dateFormatter(props.campaign.endingDate['$d'], "-"),
                description: props.campaign.description,
                image: props.campaign.image
            }

            // dATA CONTROLS
            if (newCampaign.name === "") {
                setModalErrorText("Name field can't be empty.")
                handleOpenModal()
            } else {

                if (newCampaign.target === 0 || newCampaign.target < 0) {
                    setModalErrorText(newCampaign.target === 0 ? "The campaign target can't be 0." : "The campaign target can't be a negative number.")
                    handleOpenModal()
                } else {

                    if (props.campaign.endingDate['$d'].getTime() - (new Date()).getTime() <= 0) {
                        setModalErrorText("The date selected is not valid, it has to be grater than today.")
                        handleOpenModal()
                    } else {

                        if (newCampaign.description === "") {
                            setModalErrorText("The description field can't be empty.")
                            handleOpenModal()
                        } else {
                            if (newCampaign.image === "" || newCampaign.image === null) {
                                setModalErrorText("The image field can't be empty.")
                                handleOpenModal()
                            } else {

                                console.log(newCampaign)

                                const data = new FormData();
                                data.append('name', newCampaign.name);
                                data.append('target', newCampaign.target);
                                data.append('endingDate', newCampaign.endingDate);
                                data.append('description', newCampaign.description);
                                data.append('file', newCampaign.image);

                                // Axios post call
                                axios.post(`${api}${Conf.backend.endpoints.createCampaign}`, data)
                                .then(res => {
                                    console.log(res);
                                })
                                .catch(err => {
                                    console.log(err);
                                })

                                // Redirect to campaign page
                               //navigate(`/campaign/${newCampaign.id}`)
                            }
                        }
                    }
                }
            }
        }
    }
    return (
        <div>
            <Button variant="contained" className="saveButton" component="label" onClick={saveCampaign}>
                Save
            </Button>
            <ModalError open={open} setOpen={setOpen} modalErrorText={modalErrorText} />
        </div>
    )
}