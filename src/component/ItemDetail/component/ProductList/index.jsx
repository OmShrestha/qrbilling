import {Button, Typography} from '@material-ui/core';
import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#ECECEC',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 16px',
  },
  buttons: {
    border: '1px solid black',
    borderRadius: '10px',
  },
  addOrder: {
    border: '1px solid black',
    borderRadius: '10px',
    fontSize: '13px',
    backgroundColor: 'white'
  },
  productName: {
    fontSize: '14px',
    color: '#0D0D0D'
  },
  productPrice: {
    fontSize: '14px',
    color: '#707070'
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
  return (
    <div className={classes.root}>
      <div>
        <Typography className={classes.productName}>{`${product.name}`}</Typography> <br />
        <Typography className={classes.productPrice}>{`Rs ${product.price}`}</Typography>
      </div>
      <div>
        {itemTotal[menuIndex.toString() + index.toString()] ? (
          <div className={classes.buttons}>
            <Button
              onClick={() =>
                addItem(
                  menuIndex.toString(),
                  index.toString(),
                  product.price,
                  product.name
                )
              }
            >
              <AddIcon />
            </Button>
            <span style={{marginLeft: 20}}>
              {(itemTotal[menuIndex.toString() + index.toString()] &&
                itemTotal[menuIndex.toString() + index.toString()].number) ||
                0}
            </span>
            <Button
              onClick={() =>
                removeItem(
                  menuIndex.toString(),
                  index.toString(),
                  product.price,
                  product.name
                )
              }
            >
              <RemoveIcon />
            </Button>
            <span style={{marginLeft: 20}}>
              Rs{' '}
              {(itemTotal[menuIndex.toString() + index.toString()] &&
                itemTotal[menuIndex.toString() + index.toString()].total) ||
                0}{' '}
            </span>
          </div>
        ) : (
          <Button
            className={classes.addOrder}
            onClick={() =>
              addItem(
                menuIndex.toString(),
                index.toString(),
                product.price,
                product.name,
                {open}
              )
            }
          >
            Add Order
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductList;
