import React, { useState} from "react";
import Info from "../components/info";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import currencyList from "../list";
import {ThemeProvider , createMuiTheme} from '@material-ui/core'
import { CircularProgress } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import SwapVerticalCircleRoundedIcon from '@material-ui/icons/SwapVerticalCircleRounded';
import { deepOrange } from '@material-ui/core/colors';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled"  {...props} />;
}

function Search() {
  const initial = {
    code: "",
    name: "",
  };
  const fromstart = {
    code: "INR",
    name: "Indian Rupee",
  };
  const [open, setOpen] = React.useState(false);
  const [from, setfrom] = useState(fromstart);
  const [to, setTo] = useState(initial);
  const [exrate, setexrate] = useState("");
  const [value, setvalue] = useState(1);
  
  const [info, setinfo] = useState(false);

  const [isFetching, setFetching] = useState(false);
  
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  function handleGetExchange(f,t) {
    // console.log(to,from);
    if (from.code.length > 0 && to.code.length > 0) {
      setFetching(true);
      let url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${f}&to_currency=${t}&apikey=SFM1VEYBLERUKAGV`;
      console.log(url);
      fetch(url)
        .then((data) => {
          return data.json();
        })
        .then((main) => {
          const rate = Number(
            main["Realtime Currency Exchange Rate"]["5. Exchange Rate"]
          );
          setexrate(rate.toPrecision(3));
          setinfo(true);
          setFetching(false);
         
        });
    } else {
      setinfo(false);
      
      setFetching(false);
      setOpen(true);
    }
  }
  const data = () => {
    if (info) {
      return <Info  value={value} from={from} to={to} rate={exrate} />;
    } else {
      return <h1>Select TO,From Correctly</h1>;
    }
  };

  function handleFrom(e) {
    setfrom(initial);
    setexrate("");
    setinfo(false);
    let name = e.target.innerText;
    if (name && name.length > 0) {
      const currency = currencyList.find((cur) => cur.name === name);
      setfrom(currency);
    }
  }

  function handleTo(e) {
    setTo(initial);
    setexrate("");
    setinfo(false);
    let name = e.target.innerText;
    if (name && name.length > 0) {
      const currency = currencyList.find((cur) => cur.name === name);
      setTo(currency);
    }
  }
  function handleSwap(){
   setinfo(false);
   let t=''
   t=from;
  //  console.log(t,from);  
   
   handleGetExchange(to.code,from.code); 
   setfrom(to)
   setTo(t)
  }
  const theme = createMuiTheme({
    palette: {
      primary:deepOrange,
      secondary: deepOrange,
    },
  });
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        
        margin: "auto",
      }}
    >
      {/* <Typography variant="body1" style={{padding:'1rem',color:'grey'}}>
        Welcome to CUREX, where you can find real time exchange rates for various currencies. <br/>
        
      </Typography> */}
      <ThemeProvider theme={theme}>
      <TextField
        id="standard-basic"
        style={{ width: 300, margin: "30px auto" }}
        label="Amount"
        type="number"
        value={value}
        onChange={(e) => {
          setvalue(e.target.value < 0 ? 0 : e.target.value);
         
        }}
      />
      {/* <label style={{ margin: "auto" }}>Select Currencies</label> */}
      <Autocomplete
        id="select-from"
        options={currencyList}
        getOptionLabel={(option) => option.name}
        style={{ width: 300, margin: "30px auto",fontSize:'small' }}
        onChange={(e,newValue) => {
          handleFrom(e);                  
        }}
        value={from}
        renderInput={(params) => (
          <TextField {...params} label="Convert From"  variant="outlined" color="secondary" />
        )}
      />
      
      <SwapVerticalCircleRoundedIcon
        onClick={handleSwap}
        color="secondary"
        style={{
          margin: "auto",
          fontSize: "2.5rem",
          cursor: "pointer",
          border: "1px solid grey",
          borderRadius: "50%",
        }}
      ></SwapVerticalCircleRoundedIcon>
      
      <Autocomplete
        id="select-to"
        
        options={currencyList}
        getOptionLabel={(option) => option.name}
        style={{ minWidth: 300, margin: "20px auto" }}
        onChange={(e) => {
          handleTo(e);
        }}
        value={to}
        renderInput={(params) => (
          <TextField {...params} label="Convert To" variant="outlined" color="secondary" />
        )}
      />
      
      <Button
        variant="contained"
        onClick={() => handleGetExchange(from.code,to.code)}
        style={{ margin: "auto" }}
        color="secondary"
      >
        Get Exchange Rate
      </Button>
      
      <CircularProgress
        style={{ margin: "20px auto", display: isFetching ? "block" : "none" }}
      />
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Please Select To,From Currencies
        </Alert>
      </Snackbar>
      </ThemeProvider>
      {info && value > 0 && from.name.length > 0 && to.name.length > 0
        ? data()
        : null}
    </div>
  );
}

export default Search;
