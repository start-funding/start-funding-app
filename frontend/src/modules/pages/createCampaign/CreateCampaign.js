import { React, useState } from "react";
import dayjs from 'dayjs';
import GridSpacer from "../../atoms/gridSpacer/GridSpacer";
import CampaignTopButtonsBar from "../../organisms/campaignTopButtonsBar/CampaignTopButtonsBar";
import CampaignDescriptionSection from "../../organisms/campaignDescriptionSection/CampaignDescriptionSection";
import CampaignImageAndDataSection from "../../organisms/campaignImageAndDataSection/CampaignImageAndDataSection";
import './createCampaign.scss'

export default function CreateCampaign() {

    // Form inputs
    const [file, setFile] = useState(null);
    const [campaignName, setCampaignName] = useState("");
    const [campaignTarget, setCampaignTarget] = useState(0);
    const [campaignEndingDate, setCampaignEndingDate] = useState(dayjs(new Date()));
    const [campaignDescription, setCampaignDescription] = useState("");

    // New campaign
    let campaign = {
        name: campaignName,
        target: campaignTarget,
        endingDate: campaignEndingDate,
        description: campaignDescription,
        image: file
    }

    return (
        <div>
            <GridSpacer 
                height="5vh" 
            />

            {/* Top buttons bar */}
            <CampaignTopButtonsBar 
                campaignToSave={campaign}
                createCampaignPage={true}
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
                createCampaignPage={true}
            />
            <GridSpacer 
                height="2vh" 
            />

            {/* Campaign description */}
            <CampaignDescriptionSection 
                setCampaignDescription={setCampaignDescription}
                createCampaignPage={true}
            />
            <GridSpacer 
                height="10vh" 
            />
        </div>
    )
}