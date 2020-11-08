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
import { tsOptionalType } from '@babel/types';

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

const Billing = props => {
  const { itemTotal } = props;
  const classes = useStyles();
  const [menuList, setMenuList] = useState({});
  const [hasError, setErrors] = useState(false);
  // const [orderSaved, setOrderSaved] = useState(false);
  const [activeStep, setActiveStep] = useState(+2);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleReset = () => {
    setActiveStep(0);
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
  let totalPrice = 0;
  for (var key in itemTotal) {
    if (itemTotal.hasOwnProperty(key)) {
      totalPrice += itemTotal[key].total;
    }
  }
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
          <Typography className={classes.AddItemTxt} onClick={() => props.proceedToRedeem()}>
            Add More Items +
          </Typography>
        </div>

        {Object.keys(props.itemTotal).map(
          (menuData, menuIndex) =>
            props.itemTotal[menuData].total > 0 && (
              <Grid container className={classes.item} key={menuIndex}>
                <Grid>
                  <Typography className={classes.productName}>{props.itemTotal[menuData].name}</Typography>
                  <Divider />
                  <Grid>
                    {
                      <div className={classes.buttons}>
                        <Button
                          onClick={() =>
                            props.addItem(
                              menuData,
                              '',
                              props.itemTotal[menuData].perPlate,
                              props.itemTotal[menuData].name,
                            )
                          }
                        >
                          <AddIcon />
                        </Button>
                        <span style={{ marginLeft: 20 }}>
                          {(props.itemTotal[menuData] && props.itemTotal[menuData].number) || 0}
                        </span>
                        <Button
                          onClick={() =>
                            props.removeItem(
                              menuData,
                              '',
                              props.itemTotal[menuData].perPlate,
                              props.itemTotal[menuData].name,
                            )
                          }
                        >
                          <RemoveIcon />
                        </Button>
                      </div>
                    }
                    {props.itemTotal[menuData].total > 0 ? props.itemTotal[menuData].total : ''}
                  </Grid>
                </Grid>
              </Grid>
            ),
        )}

        <div className={classes.bill}>
          <Typography className={classes.billTxt}>Bill</Typography>
          <div className={classes.billing}>
            <div>Sub Total</div>
            <div className={classes.price}>Rs.{totalPrice}</div>
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
