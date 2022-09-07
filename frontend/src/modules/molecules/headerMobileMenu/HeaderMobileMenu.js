import { ChevronRight } from "@mui/icons-material";
import { Divider, IconButton, List, ListItem, SwipeableDrawer } from "@mui/material";
import React from "react";
import HeaderMenuButton from "../../atoms/headerMenuButton/HeaderMenuButton";

export default function HeaderMobileMenu(props) {
    return (
        <SwipeableDrawer
            anchor="right"
            open={props.open}
            onOpen={() => props.setOpen(true)}
            onClose={() => props.setOpen(false)}
        >
            <div
                onClick={() => props.setOpen(false)}
                onKeyPress={() => props.setOpen(false)}
                role="button"
                tabIndex={0}
            >
                <IconButton>
                    <ChevronRight />
                </IconButton>
            </div>
            <Divider />
            <List>
                {props.navActive.map((item) => (
                    <ListItem key={item.name}>
                        <HeaderMenuButton navActive={props.navActive} setNavActive={props.setNavActive} navigationLinks={props.navigationLinks} item={item}/>
                    </ListItem>
                ))}
            </List>
        </SwipeableDrawer>
    )
}