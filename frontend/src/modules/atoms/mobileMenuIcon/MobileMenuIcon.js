import { Menu } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import React from "react";

export default function MobileMenuIcon(props) {
    return(
        <Box sx={{ display: { xs: 'block', sm: 'block', md: 'none', lg: 'none', xl: 'none' } }}>
            <IconButton onClick={() => props.setOpen(true)}>
              <Menu />
            </IconButton>
          </Box>
    )
}