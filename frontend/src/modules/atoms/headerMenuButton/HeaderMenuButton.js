import { Button } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

import './headerMenuButton.scss';

export default function HeaderMenuButton(props) {


    return(
        <Button 
            component={NavLink} 
            to={props.item.href} 
            onClick={() => { props.updateNavActive(props.item.name) }} 
            className={!props.item.active ? "link nav-link-desktop" : "link nav-link-desktop-active"}
            >
          {props.item.name}
        </Button>
    )
}