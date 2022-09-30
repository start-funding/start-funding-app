import React from "react";
import { Link } from "react-router-dom";

export default function SiteLogo(props) {
    function handleCampaignClick() {
        props.updateNavActive('HOME');
    }
    return(
        <Link to="/" onClick={handleCampaignClick}>
            <img style={{width:200}} src={props.path}/>
        </Link>
    )
}