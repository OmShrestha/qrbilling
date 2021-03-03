import { Grid, Typography } from "@material-ui/core";
import React, { useState } from "react";
import QRScanner from "./QRScanner";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    flexDirection: "column",
  },
  scanOrder: {
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    marginBottom: 8,
  },
  scan: {
    color: theme.palette.secondary.main,
    fontSize: "22pt",
  },
  order: {
    color: theme.palette.secondary.main,
    fontSize: "15pt",
  },
  qr: {
    alignItems: "center",
  },
}));

const Layout = (props) => {
  const [QRScannerSelected, setQRScannerSelected] = useState(true);
  const classes = useStyles(props);

  return (
    <Grid container className={classes.root}>
      <div className={classes.scanOrder}>
        <Typography className={classes.scan}> Scan The QR CODE</Typography>
        <Typography className={classes.order}>And Order Food</Typography>
      </div>
      {QRScannerSelected ? (
        <QRScanner className={classes.qr} />
      ) : (
        <img
          src="https://i.pinimg.com/originals/9b/56/2c/9b562ca0be290e80f201486a4fbcf849.png"
          alt="QR"
          onClick={() => setQRScannerSelected(!QRScannerSelected)}
        />
      )}
    </Grid>
  );
};

export default Layout;
