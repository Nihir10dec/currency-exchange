import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { createMuiTheme , ThemeProvider} from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

function header() {
  const theme = createMuiTheme({
    palette: {
      primary: blue,
    },
  });
  
  return (
    <div>
      <ThemeProvider theme={theme}>
      <AppBar position="static" >
        <Toolbar>
          <Typography variant="h5" >CURRENCY EXCHANGE RATES </Typography> 
           
        </Toolbar>
      </AppBar>
      </ThemeProvider>
    </div>
  );
}

export default header;
