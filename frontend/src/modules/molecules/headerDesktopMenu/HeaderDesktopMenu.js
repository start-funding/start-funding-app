import { Box } from "@mui/material";
import React from "react";
import HeaderMenuButton from "../../atoms/headerMenuButton/HeaderMenuButton";

export default function HeaderDesktopMenu(props) {
    return (
        <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block' } }}>
            {props.navActive.map((item) => (
                <HeaderMenuButton navActive={props.navActive} setNavActive={props.setNavActive} navigationLinks={props.navigationLinks} item={item} key={item.name} />
            ))}
        </Box>
    )
}