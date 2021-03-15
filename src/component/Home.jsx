import { Grid, Typography, Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";

import QRScanner from "./QRScanner";
import { makeStyles } from "@material-ui/core/styles";
import { fetchAdvertisement } from "../services/advertisementService";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 20,
    paddingBottom: 20,
    display: "flex",
    backgroundColor: "#fff",
    justifyContent: "space-between",
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
  title: {
    fontSize: 40,
    fontWeight: 1000,
  },
  paragraph: {
    color: "#C4C4C4",
    fontWeight: 700,
    fontSize: "16px",
    marginBottom: 20,
  },
  mainAdd: {
    borderRadius: 10,
    width: "300px",
    height: "150px",
    objectFit: "cover",
  },
  secondAdd: {
    objectFit: "cover",
    borderRadius: 10,
    width: "300px",
    height: "100px",
  },
  qr: {
    alignItems: "center",
  },
  scanButton: {
    fontWeight: 700,
    fontSize: "24px",
    textTransform: "none",
    padding: "4px 8px",
  },
  scanContainer: {
    marginTop: 20,
  },
  imageTitle: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: 700,
    color: "#707070",
  },
}));

const Layout = (props) => {
  const [scan, setScan] = useState(false);
  const [ad, setAd] = useState(null);
  const classes = useStyles(props);

  const topAd = ad?.filter((item) => item.position === "TOP");
  const bottomAd = ad?.filter((item) => item.position === "BOTTOM");

  useEffect(() => {
    fetchAdvertisement()
      .then((res) => setAd(res.data.records))
      .catch((err) => alert(err));
  }, []);

  return (
    <Grid container className={classes.root}>
      <div>
        <Carousel
          animation="slide"
          indicators={false}
          navButtonsProps={{
            style: {
              backgroundColor: "transparent",
              color: "#000",
            },
          }}
        >
          {topAd?.map(({ id, image, title }) => (
            <div key={id}>
              <img src={image} alt={title} className={classes.mainAdd} />
              <p className={classes.imageTitle}>{title}</p>
            </div>
          ))}
        </Carousel>
      </div>
      <div className={classes.scanOrder}>
        <Typography
          style={{ color: scan ? "#707070" : "#000" }}
          className={classes.title}
        >
          Scan The QR
        </Typography>
        <Typography className={classes.paragraph}>And Order Food</Typography>
        {scan ? (
          <QRScanner className={classes.qr} />
        ) : (
          <Button
            className={classes.scanButton}
            variant="contained"
            color="primary"
            onClick={() => setScan(!scan)}
          >
            Scan
          </Button>
        )}
      </div>
      <div>
        <Carousel
          animation="slide"
          indicators={false}
          navButtonsProps={{
            style: {
              backgroundColor: "transparent",
              color: "#000",
            },
          }}
        >
          {bottomAd?.map(({ id, image, title }) => (
            <div key={id}>
              <img src={image} alt={title} className={classes.secondAdd} />
              <p className={classes.imageTitle}>{title}</p>
            </div>
          ))}
        </Carousel>
      </div>
    </Grid>
  );
};

export default Layout;
