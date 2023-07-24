import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';

export default function Header(){
  return (
    <>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography variant="h6">
          Blockchain Blocks <CurrencyBitcoinIcon />
            
          </Typography>        
        </Toolbar>
      </AppBar>
    </>
  );
};
