import React from "react";
import {
  Badge,
  Grid,
  IconButton,
  makeStyles,
  Collapse,
} from "@material-ui/core";
import { ShoppingCart as ShoppingCartIcon } from "@material-ui/icons";

const styles = makeStyles((theme) => ({
  orderBtnContainer: {
    zIndex: 999,
    position: "fixed",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    backgroundColor: theme.palette.primary.main,
    justifyContent: "center",
    bottom: 50,
    left: 10,
    "& .MuiCollapse-container": {
      flex: "1 0 auto",
    },
  },
  cartIcon: {
    color: theme.palette.secondary.main,
  },
}));

function CartIcon({ itemTotal, totalPrice, proceedToRedeem }) {
  const classes = styles();
  return (
    <Grid
      container
      style={{
        display: totalPrice > 0 ? "block" : "none",
      }}
      className={classes.orderBtnContainer}
    >
      <Collapse in={totalPrice > 0}>
        <IconButton onClick={proceedToRedeem}>
          <Badge badgeContent={Object.keys(itemTotal).length} color="secondary">
            <ShoppingCartIcon className={classes.cartIcon} />
          </Badge>
        </IconButton>
      </Collapse>
    </Grid>
  );
}

export default CartIcon;
