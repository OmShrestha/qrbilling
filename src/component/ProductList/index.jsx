import { Button, Divider, Grid, Typography } from "@material-ui/core";
import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { useStyles } from "./index.style";

const ProductList = ({
  open,
  product,
  menuIndex,
  index,
  itemTotal,
  addItem,
  removeItem,
  previousOrder,
}) => {
  const classes = useStyles();
  const [display, setDisplay] = useState(false);
  const handleViewImage = () => {
    setDisplay(!display);
  };

  return (
    <>
      <Grid className={classes.root}>
        <Grid className={classes.textBox}>
          <Typography className={classes.productName}>
            {`${product.name}`}
          </Typography>
          <Grid className={classes.viewImg}>
            <Typography className={classes.productPrice}>
              {`Rs ${product.selling_price}`}
            </Typography>
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
          </Grid>
        </Grid>
        <Grid>
          {itemTotal[menuIndex.toString() + index.toString()]?.number > 0 ||
          previousOrder?.length > 0 ? (
            <Grid className={classes.buttons}>
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
              {(itemTotal[menuIndex.toString() + index.toString()] &&
                itemTotal[menuIndex.toString() + index.toString()].number) ||
                (previousOrder.length > 0 && previousOrder[0].quantity) ||
                0}
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
            </Grid>
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
        </Grid>
      </Grid>
      <Divider
        variant="middle"
        orientation="horizontal"
        className={classes.dividerColor}
      />
    </>
  );
};

export default ProductList;
