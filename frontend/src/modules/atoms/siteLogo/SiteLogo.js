import React from "react";
import { Link } from "react-router-dom";

export default function SiteLogo(props) {
    return(
        <Link to="/">
            <img style={{width:200}} src={props.path} />
        </Link>
    )
}