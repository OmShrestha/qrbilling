import {Button, Typography} from '@material-ui/core';
import React, {useState} from 'react';
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
    fontFamily: 'SF Pro Display',
  },
  addOrder: {
    border: '1px solid black',
    borderRadius: '10px',
    fontSize: '13px',
    backgroundColor: 'white',
    fontFamily: 'SF Pro Display',
  },
  productName: {
    fontSize: '14px',
    color: '#0D0D0D',
    fontFamily: 'SF Pro Display',
  },
  productPrice: {
    fontFamily: 'SF Pro Display',
    fontSize: '14px',
    color: '#707070',
  },
  viewImg: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  viewTxt: {
    cursor: 'pointer',
    fontFamily: 'SF Pro Display',
    marginLeft: '5px',
    fontSize: '11px',
    backgroundColor: '#D6D6D6',
  },
  imgView: {
    position: 'fixed' /* Stay in place */,
    zIndex: '1' /* Sit on top */,
    paddingTop: '100px' /* Location of the box */,
    left: '0',
    top: '0',
    width: '100%' /* Full width */,
    height: '100%' /* Full height */,
    overflow: 'auto' /* Enable scroll if needed */,
    backgroundColor: 'rgb(0,0,0)' /* Fallback color */,
    backgroundColor: 'rgba(0,0,0,0.9)' /* Black w/ opacity */,
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
    <div className={classes.root}>
      <div>
        <Typography
          className={classes.productName}
        >{`${product.name}`}</Typography>{' '}
        <br />
        <div className={classes.viewImg}>
          <Typography
            className={classes.productPrice}
          >{`Rs ${product.price}`}</Typography>

          <Typography className={classes.viewTxt} onClick={handleViewImage} >View Image</Typography>
          {display ? 
          <img src="/Cp" alt="smth" className={classes.imgView} />
          : null}
        </div>
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
            {/* <span style={{marginLeft: 20}}>
              Rs{' '}
              {(itemTotal[menuIndex.toString() + index.toString()] &&
                itemTotal[menuIndex.toString() + index.toString()].total) ||
                0}{' '}
            </span> */}
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
