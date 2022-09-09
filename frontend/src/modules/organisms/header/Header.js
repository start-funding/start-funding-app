import React, { useState } from "react";
import { ChevronRight, Menu } from "@mui/icons-material";
import { AppBar, Button, Container, Divider, Hidden, IconButton, Link, List, ListItem, SwipeableDrawer, Toolbar } from "@mui/material";
import './header.scss';
import HeaderDesktopMenu from "../../molecules/headerDesktopMenu/HeaderDesktopMenu";
import SiteLogo from "../../atoms/siteLogo/SiteLogo";
import MobileMenuIcon from "../../atoms/mobileMenuIcon/MobileMenuIcon";
import HeaderMobileMenu from "../../molecules/headerMobileMenu/HeaderMobileMenu";

let navigationLinks = [
  { name: "HOME", href: "/", active: true },
  { name: "CREATE CAMPAIGN", href: "/createcampaign", active: false },
  { name: "CAMPAIGNS", href: "/campaigns", active: false }
];


export default function Header() {
  const [open, setOpen] = useState(false);

  const [navActive, setNavActive] = useState(navigationLinks);

  return (
    <AppBar position="sticky" color="default" style={{ height: 90 }}>
      <Toolbar className="nav">
        {/* Site Logo */}
        <SiteLogo path={"/img/logo.png"} />

        {/* Menu desktop */}
        <HeaderDesktopMenu navActive={navActive} setNavActive={setNavActive} navigationLinks={navigationLinks} />

        {/* Mobile menu icon */}
        <MobileMenuIcon open={open} setOpen={setOpen} />
      </Toolbar>

      {/* Menu a tendina mobile */}
      <HeaderMobileMenu navActive={navActive} setNavActive={setNavActive} navigationLinks={navigationLinks} open={open} setOpen={setOpen} />
    </AppBar>
  );
}