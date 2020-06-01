import React from 'react'

import { Toolbar,Typography,AppBar } from '@material-ui/core';

function footer() {
    return (
        <AppBar position="static"  style={{backgroundColor:'#40514e'}}>
        <Toolbar>
        <Typography variant="button" align="justify" style={{margin:'auto'}} gutterBottom>
        Created by Bharat Rathore
      </Typography>
        </Toolbar>
      </AppBar>
    )
}

export default footer
