import { Badge, Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import DummyLogo from "../../assets/Image 1.png";
import { Button } from "@material-ui/core";
import clsx from "clsx";
import { Lock as LockIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "8px 16px 30px",
    textAlign: "center",
  },
  img: {
    width: "106px",
    height: "106px",
    objectFit: "cover",
  },
  info: {
    marginTop: 12,
    backgroundColor: "#F8F9F9",
  },
  cardContent: {
    padding: "6px 12px",
  },
  resName: {
    fontSize: "14pt",
    fontWeight: 900,
    lineHeight: "22px",
  },
  tableNumber: {
    fontSize: "10pt",
    lineHeight: "15px",
    marginBottom: "3px",
    color: "grey",
  },
  buttons: {
    fontWeight: 700,
    fontSize: 10,
    borderColor: "#000",
    marginRight: 10,
    padding: "5px 20px",
  },
  filledButton: {
    color: "white",
    backgroundColor: "#A62A22",
  },
  lockIcon: {
    fontSize: 15,
  },
}));

const LogoInfo = ({ menuList, tableNumber, cartItems, goToCart }) => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.card}>
        {menuList && menuList.data && (
          <Card>
            <CardContent className={classes.cardContent}>
              {/* Logo */}
              <img
                src={menuList.data.logo || DummyLogo}
                className={classes.img}
                alt="Company Logo"
              />

              {/* Restaurant, Table Info */}
              <div className={classes.info}>
                <Typography className={classes.resName}>
                  {menuList.data.name}
                </Typography>
                <Typography variant="caption" className={classes.tableNumber}>
                  {menuList.data.asset.name}
                </Typography>
              </div>

              {/* Buttons */}
              <div>
                <Button
                  onClick={goToCart}
                  size="small"
                  variant="outlined"
                  className={classes.buttons}
                >
                  <LockIcon className={classes.lockIcon} />
                  Your Cart
                </Button>
                <Button
                  onClick={goToCart}
                  size="small"
                  variant="contained"
                  className={clsx(classes.buttons, classes.filledButton)}
                >
                  Check Out
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default LogoInfo;
