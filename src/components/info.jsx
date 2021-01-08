import React, { useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { ThemeProvider, Typography , createMuiTheme } from "@material-ui/core";
import { deepOrange } from '@material-ui/core/colors';

function Info({ value, from, rate, to }) {
  const ref = React.createRef()
  useEffect(() => {
    
      ref.current.scrollIntoView({behaviour:'smooth'})
    
  });
  const theme = createMuiTheme({
    palette: {
      primary: deepOrange,
    }});

  return (
    <div ref={ref}>
      <Paper  elevation={1} style={{ margin: "30px auto", padding: "30px"}}>
        <ThemeProvider theme={theme}>
        <Typography
          variant="h6"
          display="block"
          color="primary"
          gutterBottom
        >
          1 {from.code} = {rate} {to.code}
        </Typography>
        </ThemeProvider>
        <Typography variant="h5">
          {Number(value).toLocaleString("en-IN")}{" "}
          {from.code +
            " = " +
            (value * rate).toFixed(3).toLocaleString("en-IN") +
            " " +
            to.code}{" "}
        </Typography>
      </Paper>
    </div>
    
  );
}

export default Info;
