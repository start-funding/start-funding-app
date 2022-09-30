import React, { useState } from "react";
import { AppBar, Toolbar } from "@mui/material";
import './header.scss';
import HeaderDesktopMenu from "../../molecules/headerDesktopMenu/HeaderDesktopMenu";
import SiteLogo from "../../atoms/siteLogo/SiteLogo";
import MobileMenuIcon from "../../atoms/mobileMenuIcon/MobileMenuIcon";
import HeaderMobileMenu from "../../molecules/headerMobileMenu/HeaderMobileMenu";




export default function Header(props) {
  const [open, setOpen] = useState(false);
  return (
    <AppBar position="sticky" color="default" style={{ height: 90 }}>
      <Toolbar className="nav">
        {/* Site Logo */}
        <SiteLogo path={"/img/logo.png"} updateNavActive={props.updateNavActive} />

        {/* Menu desktop */}
        <HeaderDesktopMenu 
            navActive={props.navActive} 
            setNavActive={props.setNavActive} 
            navigationLinks={props.navigationLinks} 
            updateNavActive={props.updateNavActive}
        />

        {/* Mobile menu icon */}
        <MobileMenuIcon open={open} setOpen={setOpen} />
      </Toolbar>

      {/* Menu a tendina mobile */}
      <HeaderMobileMenu navActive={props.navActive} setNavActive={props.setNavActive} navigationLinks={props.navigationLinks} open={open} setOpen={setOpen} />
    </AppBar>
  );
}