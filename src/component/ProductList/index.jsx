import { Button, Divider, Typography } from "@material-ui/core";
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
  // console.log(product.id);
  const prevOrder = previousOrder?.map((item) => item.product === product.id);

  console.log(prevOrder);
  return (
    <>
      <div className={classes.root}>
        <div className={classes.textBox}>
          {/* Name */}
          <Typography className={classes.productName}>
            {`${product.name}`}
          </Typography>
          <div className={classes.viewImg}>
            {/* Price */}
            <Typography className={classes.productPrice}>
              {`Rs ${product.selling_price}`}
            </Typography>
            {/* Image */}
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
          {itemTotal[menuIndex.toString() + index.toString()]?.number > 0 ||
          (prevOrder && !prevOrder[index] && previousOrder[index]?.quantity) ? (
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
              {(itemTotal[menuIndex.toString() + index.toString()] &&
                itemTotal[menuIndex.toString() + index.toString()].number) ||
                (prevOrder &&
                  !prevOrder[index] &&
                  previousOrder[index]?.quantity) ||
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
