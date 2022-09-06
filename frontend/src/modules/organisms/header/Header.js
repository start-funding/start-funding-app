import React, { useState } from "react";
import { ChevronRight, Menu } from "@mui/icons-material";
import { AppBar, Button, Container, Divider, Hidden, IconButton, Link, List, ListItem, SwipeableDrawer, Toolbar } from "@mui/material";
import {
  Link as NavLink
} from "react-router-dom";
import './header.scss';
import { Box } from "@mui/system";

const navigationLinks = [
  { name: "HOME", href: "/" },
  { name: "CREA CAMPAGNA", href: "/creacampagna" },
  { name: "CAMPAGNE", href: "/campagne" },
];


export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <AppBar position="sticky" color="default" style={{height:90}}>
        <Toolbar className="nav">
          <Link href="/">
            <img style={{width:200}} src="/img/logo.png" />
          </Link>
          <Box sx={{ display: { xs: 'none', sm: 'block', md: 'block', lg: 'block', xl: 'block' } }}>
            {navigationLinks.map((item) => (
   
              <Button component={NavLink} to={item.href}  className="link nav-link-desktop"  key={item.name}>
                {item.name}
              </Button>
            ))}
          </Box>
          <Box sx={{ display: { xs: 'block', sm: 'none', md: 'none', lg: 'none', xl: 'none' } }}>
            <IconButton onClick={() => setOpen(true)}>
              <Menu />
            </IconButton>
          </Box>
        </Toolbar>
      <SwipeableDrawer
        anchor="right"
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
      >
        <div
          onClick={() => setOpen(false)}
          onKeyPress={() => setOpen(false)}
          role="button"
          tabIndex={0}
        >
          <IconButton>
            <ChevronRight />
          </IconButton>
        </div>
        <Divider />
        <List>
          {navigationLinks.map((item) => (
            <ListItem key={item.name}>
              <Link
                className="link"
                color="textPrimary"
                variant="button"
                underline="none"
                href={item.href}
              >
                {item.name}
              </Link>
            </ListItem>
          ))}
        </List>
      </SwipeableDrawer>
    </AppBar>
  );
}