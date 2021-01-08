import React from 'react'

import { Toolbar,Typography,AppBar } from '@material-ui/core';
import { createMuiTheme , ThemeProvider} from '@material-ui/core/styles';
import { blue} from '@material-ui/core/colors';

function footer() {
  const theme = createMuiTheme({
    palette: {
      primary: blue,
    },
  })
  
  ;
    return (
      <ThemeProvider theme={theme}>
        <AppBar position="static" >
        <Toolbar>
        <Typography variant="button" align="justify" style={{margin:'auto'}} gutterBottom>
        Developed by <strong><a href="https://www.linkedin.com/in/nihir-shah/" style={{color:'white', textDecoration:'None'}}>Nihir Shah</a></strong>
      </Typography>
        </Toolbar>
      </AppBar>
      </ThemeProvider>  
    )
}

export default footer
