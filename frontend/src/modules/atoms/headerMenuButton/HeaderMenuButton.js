import { Button } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

import './headerMenuButton.scss';

export default function HeaderMenuButton(props) {
    function updateNavActive(name) {
        props.navigationLinks.forEach(link => {
            if (link.name === name)
                link.active = true;
            else
                link.active = false;
        })
        props.setNavActive([...props.navigationLinks]);
    }

    return(
        <Button 
            component={NavLink} 
            to={props.item.href} 
            onClick={() => { updateNavActive(props.item.name) }} 
            className={!props.item.active ? "link nav-link-desktop" : "link nav-link-desktop-active"}
            >
          {props.item.name}
        </Button>
    )
}