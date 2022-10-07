import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loader(props) {
  return (

    <Box sx={{ display: props.show ? 'flex' : 'none', position: 'fixed', top: 0, width: "100%", height: "100%", justifyContent: "center", alignItems: "center", backgroundColor:"#00000038", zIndex:1000000000000 }}>
      <CircularProgress size={100} sx={{color:"#760101"}}/>
    </Box>
  );
}