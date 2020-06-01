import React from "react";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";


function info({ value, from, rate, to }) {
  return (
    
    <Paper elevation={1} style={{ margin: "30px auto", padding: "30px"}}>
        
      <Typography
        variant="h6"
        display="block"
        color="primary"
        gutterBottom
      >
        1 {from.code} = {rate} {to.code}
      </Typography>
      <Typography variant="h4">
        {Number(value).toLocaleString("en-IN")}{" "}
        {from.code +
          " = " +
          (value * rate).toFixed(3).toLocaleString("en-IN") +
          " " +
          to.code}{" "}
      </Typography>
    </Paper>
  );
}

export default info;
