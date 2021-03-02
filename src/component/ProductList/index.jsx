import { Button, Divider, Typography } from "@material-ui/core";
import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#fff",
    display: "flex",
    justifyContent: "space-between",
    padding: "9px 20px",
    alignItems: "center",
    width: "100%",
  },
  buttons: {
    border: "1px solid black",
    borderRadius: "10px",
    fontFamily: "SF Pro Display",
    "& .MuiButton-root": {
      minWidth: "45px",
    },
  },
  addOrder: {
    border: "0.5px solid #707070",
    borderRadius: "10px",
    fontSize: "12px",
    fontWeight: 400,
    backgroundColor: "#A62A22",
    fontFamily: "SF Pro Display",
    color: "#fff",
    padding: "4px 8px",
  },
  productName: {
    fontSize: "16px",
    color: "#0D0D0D",
    fontFamily: "SF Pro Display",
    textTransform: "capitalize",
    opacity: 0.4,
  },
  productPrice: {
    fontFamily: "SF Pro Display",
    fontSize: "16px",
    color: "#707070",
  },
  viewImg: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: "5px",
  },
  viewTxt: {
    cursor: "pointer",
    fontFamily: "SF Pro Display",
    marginLeft: "5px",
    padding: "2px 5px",
    fontSize: "11px",
    backgroundColor: "#D6D6D6",
  },
  imgView: {
    position: "fixed" /* Stay in place */,
    zIndex: "1" /* Sit on top */,
    paddingTop: "100px" /* Location of the box */,
    left: "0",
    top: "0",
    width: "100%" /* Full width */,
    height: "100%" /* Full height */,
    overflow: "auto" /* Enable scroll if needed */,
    //backgroundColor: 'rgb(0,0,0)' /* Fallback color */,
    backgroundColor: "rgba(0,0,0,0.9)" /* Black w/ opacity */,
  },
  dividerColor: {
    background: "#ECECEC",
    width: "90%",
  },
});

const ProductList = ({
  open,
  product,
  menuIndex,
  index,
  itemTotal,
  addItem,
  removeItem,
}) => {
  const classes = useStyles();
  const [display, setDisplay] = useState(false);
  const handleViewImage = () => {
    setDisplay(!display);
  };
  return (
    <>
      <div className={classes.root}>
        <div className={classes.textBox}>
          <Typography
            className={classes.productName}
          >{`${product.name}`}</Typography>{" "}
          <div className={classes.viewImg}>
            <Typography
              className={classes.productPrice}
            >{`Rs ${product.selling_price}`}</Typography>
            {product.images.length > 0 && (
              <Typography className={classes.viewTxt} onClick={handleViewImage}>
                View Image
              </Typography>
            )}
            {display ? (
              <img
                src={product.images[0].image}
                alt="smth"
                className={classes.imgView}
                onClick={() => setDisplay(!display)}
              />
            ) : null}
          </div>
        </div>
        <div>
          {itemTotal[menuIndex.toString() + index.toString()] ? (
            <div className={classes.buttons}>
              <Button
                onClick={() =>
                  removeItem(
                    menuIndex.toString(),
                    index.toString(),
                    product.selling_price,
                    product.name,
                    product.id,
                    product.product_code
                  )
                }
              >
                <RemoveIcon />
              </Button>
              <span>
                {(itemTotal[menuIndex.toString() + index.toString()] &&
                  itemTotal[menuIndex.toString() + index.toString()].number) ||
                  0}
              </span>
              <Button
                onClick={() =>
                  addItem(
                    menuIndex.toString(),
                    index.toString(),
                    product.selling_price,
                    product.name,
                    product.id,
                    product.product_code
                  )
                }
              >
                <AddIcon />
              </Button>
            </div>
          ) : (
            <Button
              className={classes.addOrder}
              onClick={() =>
                addItem(
                  menuIndex.toString(),
                  index.toString(),
                  product.selling_price,
                  product.name,
                  product.id,
                  product.product_code,
                  { open }
                )
              }
            >
              Place Order
            </Button>
          )}
        </div>
      </div>
      <Divider
        variant="middle"
        orientation="horizontal"
        className={classes.dividerColor}
      />
    </>
  );
};

export default ProductList;
