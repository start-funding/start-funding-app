import { React, useState, useEffect } from "react";
import GridSpacer from "../../atoms/gridSpacer/GridSpacer";
import dayjs from 'dayjs';
import {  useParams } from 'react-router-dom';

import './campaign.scss'
import CampaignTopButtonsBar from "../../organisms/campaignTopButtonsBar/CampaignTopButtonsBar";
import CampaignImageAndDataSection from "../../organisms/campaignImageAndDataSection/CampaignImageAndDataSection";
import CampaignDescriptionSection from "../../organisms/campaignDescriptionSection/CampaignDescriptionSection";

import MockData from '../../../utils/mockData.json';

export default function Campaign(props) {
    // Form inputs
    const [file, setFile] = useState(null);
    const [campaignName, setCampaignName] = useState("");
    const [campaignTarget, setCampaignTarget] = useState(0);
    const [campaignEndingDate, setCampaignEndingDate] = useState(dayjs(new Date()));
    const [campaignDescription, setCampaignDescription] = useState("");
    
    // New campaig
    
    let campaignUpdated = {
        description: campaignDescription,
        image: file
    }

    let { id } = useParams();
    const [campaign, setCampaign] = useState({});
    const [editing, setEditing] = useState(false);
    const [userAddress, setUserAddress] = useState("addressowner");

    useEffect(() => {    
        (async () => {
            console.log(id)
            // Recupero dati campagna da axios
            let fetchedCampaign = MockData.top12.filter(campaign => campaign.id === parseInt(id))[0];

            // Setto lo stato
            setCampaign(fetchedCampaign)
        })();
    }, []);

    

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
                userAddress={userAddress}
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
                height="10vh" 
            />
        </div>
    )
}