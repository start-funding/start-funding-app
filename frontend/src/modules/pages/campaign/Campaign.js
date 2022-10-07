import { React, useState, useEffect } from "react";
import GridSpacer from "../../atoms/gridSpacer/GridSpacer";
import dayjs from 'dayjs';
import {  useParams } from 'react-router-dom';

import './campaign.scss'
import CampaignTopButtonsBar from "../../organisms/campaignTopButtonsBar/CampaignTopButtonsBar";
import CampaignImageAndDataSection from "../../organisms/campaignImageAndDataSection/CampaignImageAndDataSection";
import CampaignDescriptionSection from "../../organisms/campaignDescriptionSection/CampaignDescriptionSection";
import Conf from '../../../conf/conf.json';
import axios from "axios";
import { Card, Grid, Typography } from "@mui/material";
import Loader from "../../atoms/loader/Loader";


let api = `http://${Conf.backend.ip}:${Conf.backend.port}/${Conf.backend.basePath}`;


export default function Campaign(props) {
    // Form inputs
    const [file, setFile] = useState(null);
    const [campaignName, setCampaignName] = useState("");
    const [campaignTarget, setCampaignTarget] = useState(0);
    const [campaignEndingDate, setCampaignEndingDate] = useState(dayjs(new Date()));
    const [campaignDescription, setCampaignDescription] = useState("");
    const [campaignState, setCampaignState] = useState("");

    const [showLoader, setShowLoader] = useState(false);
    
    // New campaig
    
    
    let { id } = useParams();
    const [campaign, setCampaign] = useState({});
    const [editing, setEditing] = useState(false);
    
    let campaignUpdated = {
        description: campaignDescription,
        image: file,
        id: id
    }
    useEffect(() => {    
        (async () => {
            // Recupero dati campagna da axios
            axios.get(`${api}${Conf.backend.endpoints.getCampaign}/${id}`)
            .then(res => {
                switch(res.status) {
                    case 200:
                        setCampaign(res.data.data)
                        setCampaignDescription(res.data.data.description)
                        setCampaignState(res.data.data.state)
                        campaignUpdated.owner = res.data.data.owner;
                        console.log(res.data.data)
                        break;
                    case 500:
                        alert("Error in campaign creation.")
                        break;
                }
            })
            .catch(err => {
                console.log(err);
            })
        })();
    }, [editing, campaignTarget, campaignState]);

    

    return (
        <div>
            <GridSpacer 
                height="5vh" 
            />

            {/* Top buttons bar */}
            <CampaignTopButtonsBar
                campaignToSave={campaignUpdated}
                campaign={campaign}
                editing={editing}
                setEditing={setEditing}
                createCampaignPage={false}
                algoAddresses={props.algoAddresses}
                updateNavActive={props.updateNavActive}
            />
            <GridSpacer 
                height="5vh" 
            />

            {/* Campaign image and other data (name, target, ending date) */}
            <CampaignImageAndDataSection 
                file={file} 
                setFile={setFile} 
                campaignName={campaignName}
                campaignTarget={campaignTarget}
                campaignEndingDate={campaignEndingDate}
                setCampaignName={setCampaignName}
                setCampaignTarget={setCampaignTarget}
                setCampaignEndingDate={setCampaignEndingDate}
                createCampaignPage={false}
                editing={editing}
                campaign={campaign}
                algoAddresses={props.algoAddresses}
                algoSignerActive={props.algoSignerActive}
                setCampaignState={setCampaignState}
                setShowLoader={setShowLoader}
            />
            
            <GridSpacer 
                height="2vh" 
            />

            {/* Campaign description */}
            <CampaignDescriptionSection 
                campaignDescription={campaignDescription}
                setCampaignDescription={setCampaignDescription}
                createCampaignPage={false}
                editing={editing}
                campaign={campaign}
            />

            <GridSpacer 
                height="2vh" 
            />


            {/* Donations */}
            {
                editing ?
                    <span></span>
                :
                    <Grid container spacing={2} style={{ paddingLeft: "10%", paddingRight: "10%" }}>
                        <Grid item xl={12} style={{ width: "100%" }}>
                            <Card style={{ width: "100%", padding: 10, boxSizing: "border-box", display: "flex", flexDirection: "column" }}>
                                <Typography variant="caption" style={{fontSize:"1em"}} >
                                            DONATORS:
                                </Typography>
                                <ul>
                                {
                                    campaign.transactions != null &&  Object.keys(campaign.transactions).length > 0?
                                        Object.keys(campaign.transactions).map(address => {
                                            return(
                                                    <li key={address}>
                                                        <Typography variant="p">
                                                            {address}: {campaign.transactions[address]} Algos
                                                        </Typography>

                                                    </li>
                                            )
                                        })
                                    :
                                    <Typography variant="p">
                                        No donators to show.
                                    </Typography>
                                }
                                </ul>

                            </Card>
                        </Grid>
                    </Grid>
               
            }
            <GridSpacer 
                height="10vh" 
            />
            <Loader show={showLoader} />

        </div>
    )
}