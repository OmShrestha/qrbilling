import React, { useState, useEffect } from 'react';
import LogoInfo from './LogoInfo';

import { API_BASE } from '../Constant';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Divider, Grid, TextField, Typography } from '@material-ui/core';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundImage: `url("https://www.scandichotels.com/imagevault/publishedmedia/qn6infvg30381stkubky/scandic-sundsvall-city-restaurant-verket-10.jpg")`,
  },
  secondary: {
    backgroundColor: '#ECECEC',
    borderRadius: '20px 20px 0px 0px',
  },
  confirm: {
    backgroundColor: '#a62a22',
    color: 'white',
  },
  stepper: {
    backgroundColor: '#ECECEC',
    borderRadius: '20px 20px 0px 0px',
  },
  itemCart: {
    backgroundColor: '#a62a22',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '16px',
  },
  itemCartTxt: {
    fontSize: '14px',
  },
  AddItemTxt: {
    fontSize: '12px',
  },
  productName: {
    fontWeight: 'bold',
    fontSize: '14px',
  },

  buttons: {
    border: '1px solid black',
    borderRadius: '10px',
  },
  second: {
    backgroundColor: '#FFFFFF',
  },
  bill: {
    backgroundColor: '#FFFFFF',
  },
  billTxt: {
    fontWeight: 'bold',
    fontSize: '14px',
    padding: '16px',
  },
  billing: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '16px',
    fontSize: '12px',
    textTransform: 'uppercase',
  },
  dot: {
    border: '1px dashed #707070',
  },
  coupon: {
    backgroundColor: '#FFFFFF',
  },
  total: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '16px',
    fontSize: '12px',
    textTransform: 'uppercase',
    color: '#4EA23A',
  },
  btnGrid: {
    width: '100%',
    textAlign: 'center',
  },
  txtField: {
    border: '1px solid #D0D3D5',
    width: '100%',

    '& .MuiInputBase-input': {
      padding: '10px 14px',
    },
  },
}));

function getSteps() {
  return ['QR CODE', 'ORDER', 'CONFIRM', 'COMPLETE'];
}

const Billing = ({ props, product }) => {
  const classes = useStyles();
  const [menuList, setMenuList] = useState({});
  const [hasError, setErrors] = useState(false);
  // const [orderSaved, setOrderSaved] = useState(false);
  const [itemTotal, setItemTotal] = useState({});
  const [activeStep, setActiveStep] = useState(+2);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // };

  const handleReset = () => {
    setActiveStep(0);
  };

  // async function saveOrder() {
  //   const requestOptions = {
  //     method: 'POST',
  //     headers: {'Content-Type': 'application/json'},
  //     body: JSON.stringify(itemTotal),
  //   };
  //   fetch(API_BASE + 'company/asset/order/create', requestOptions)
  //     .then((response) => response.json())
  //     .then((data) => setOrderSaved({postId: data.id}));
  //   console.log(orderSaved, 'hehe');
  // }

  const addItem = (menuIndex, index, price, itemName) => {
    let newData = {
      ...itemTotal,
      [menuIndex + index]: {
        name: itemName,
        perPlate: price,
        number:
          itemTotal[menuIndex + index] && itemTotal[menuIndex + index].number
            ? itemTotal[menuIndex + index].number + 1
            : 0 + 1,
        total:
          itemTotal[menuIndex + index] && itemTotal[menuIndex + index].number
            ? (itemTotal[menuIndex + index].number + 1) * price
            : (0 + 1) * price,
      },
    };
    setItemTotal(newData);
  };

  const removeItem = (menuIndex, index, price, itemName) => {
    if (itemTotal[menuIndex + index] && itemTotal[menuIndex + index].number > 0) {
      let newData = {
        ...itemTotal,
        [menuIndex + index]: {
          name: itemName,
          perPlate: price,
          number:
            itemTotal[menuIndex + index] && itemTotal[menuIndex + index].number
              ? itemTotal[menuIndex + index].number - 1
              : 0 - 1,
          total:
            itemTotal[menuIndex + index] && itemTotal[menuIndex + index].number
              ? (itemTotal[menuIndex + index].number - 1) * price
              : (0 - 1) * price,
        },
      };
      setItemTotal(newData);
    }
  };

  async function fetchData() {
    const res = await fetch(API_BASE + 'company/af174b04-b495-47c1-bc32-c0dff7170c34/menu');
    res
      .json()
      .then(res => setMenuList(res))
      .catch(err => setErrors(err));
  }

  useEffect(() => {
    fetchData();
  }, []);

  const history = useHistory();

  return (
    <div className={classes.root}>
      <LogoInfo menuList={menuList} props={props} />
      <div className={classes.secondary}>
        <Grid className={classes.stepperContainer}>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div>
            {activeStep === steps.length ? (
              <div>
                <Typography className={classes.instructions}>All steps completed</Typography>
                <Button onClick={handleReset}>Reset</Button>
              </div>
            ) : null}
          </div>
        </Grid>
        <div className={classes.itemCart}>
          <Typography className={classes.itemCartTxt}>Items In Cart</Typography>
          <Typography className={classes.AddItemTxt}>Add More Items +</Typography>
        </div>

        {menuList &&
          menuList.data &&
          menuList.data.menu.map((menuData, menuIndex) => (
            <Grid container className={classes.item}>
              <Grid>
                <Typography className={classes.productName}>Test</Typography>
                <Divider />
              </Grid>
              {menuData.products.map((product, index) => (
                <Grid>
                  {
                    /* {itemTotal[menuIndex.toString() + index.toString()] ? (*/
                    <div className={classes.buttons}>
                      <Button
                        onClick={() => addItem(menuIndex.toString(), index.toString(), product.price, product.name)}
                      >
                        <AddIcon />
                      </Button>
                      <span style={{ marginLeft: 20 }}>
                        {(itemTotal[menuIndex.toString() + index.toString()] &&
                          itemTotal[menuIndex.toString() + index.toString()].number) ||
                          0}
                      </span>
                      <Button
                        onClick={() => removeItem(menuIndex.toString(), index.toString(), product.price, product.name)}
                      >
                        <RemoveIcon />
                      </Button>
                      {/* <span style={{marginLeft: 20}}>
                        Rs{' '}
                        {(itemTotal[menuIndex.toString() + index.toString()] &&
                          itemTotal[menuIndex.toString() + index.toString()]
                            .total) ||
                          0}{' '}
                      </span> */}
                    </div>
                    /*) : (
                    <Button
                      className={classes.addOrder}
                      onClick={() =>
                        addItem(
                          menuIndex.toString(),
                          index.toString(),
                          product.price,
                          product.name
                        )
                      }
                    >
                      Add Order
                    </Button>
                  )} */
                  }
                </Grid>
              ))}
            </Grid>
          ))}

        <div className={classes.bill}>
          <Typography className={classes.billTxt}>Bill</Typography>
          <div className={classes.billing}>
            <div>Sub Total</div>
            <div className={classes.price}>Rs.3000</div>
          </div>
          <div container className={classes.billing}>
            <div>Restaurant service charge</div>
            <div className={classes.price}>Rs.20</div>
          </div>
          <div className={classes.billing}>
            <div>VAT</div>
            <div className={classes.price}>Rs.10</div>
          </div>
          <div className={classes.dot} />
          <div className={classes.total}>
            <div>Total</div>
            <div className={classes.price}>Rs.3030</div>
          </div>
        </div>
        <Grid className={classes.coupon}>
          <Typography>Coupon & Discount</Typography>
          <TextField variant="outlined" placeholder="Phone No." className={classes.txtField} />
          <Button variant="contained">Continue</Button>
        </Grid>
        <Grid className={classes.btnGrid}>
          <Button variant="contained" className={classes.confirm} onClick={() => history.push('/:id/Success')}>
            {activeStep === steps.length - 1 ? 'Finish' : 'Confirm Order'}
          </Button>
        </Grid>
      </div>
    </div>
  );
};

export default Billing;
