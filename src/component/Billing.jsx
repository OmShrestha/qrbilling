import React, { useState, useEffect } from 'react';
import LogoInfo from './LogoInfo';

import { API_BASE } from '../Constant';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Divider, Grid, TextField, Typography, Select, MenuItem } from '@material-ui/core';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { tsOptionalType } from '@babel/types';
import { verify } from 'crypto';

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
  const [couponeList, setCouponeList] = useState({});
  const [billingInfo, setBillingInfo] = useState({});
  const [hasError, setErrors] = useState(false);
  // const [orderSaved, setOrderSaved] = useState(false);
  const [activeStep, setActiveStep] = useState(+2);
  const steps = getSteps();
  const [userData, setUserData] = useState(null);

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

  async function fetchCouponeList() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone_number: '987654323', email: '' }),
    };
    fetch(API_BASE + 'order-user-detail?company=af174b04-b495-47c1-bc32-c0dff7170c34', requestOptions)
      .then(response => response.json())
      .then(resCoupone => setCouponeList(resCoupone))
      .catch(err => setErrors(err));
  }

  async function verifyOrder() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        company: 'af174b04-b495-47c1-bc32-c0dff7170c34',
        asset: '2d11f673-12f3-4df3-883e-6a3492a55aea',
        user: null,
        name: 'Shyam Shrestha',
        phone_number: 987009802,
        email: 'shyam@gmail.com',
        voucher: '964bdedf-2a00-499e-8020-59197597228e',
        tax: 13.0,
        bill: null,
        order_lines: [
          {
            id: null,
            product: '056d497c-6dde-4874-935e-3f91c17a1a06',
            product_name: 'chicken momo',
            product_code: 'momo12',
            rate: 150,
            quantity: 4,
            total: '600.00',
            state: 'New',
            company: 'af174b04-b495-47c1-bc32-c0dff7170c34',
            order: '509b9e29-664f-44b8-a984-62235a8bbdca',
          },
        ],
      }),
    };
    fetch(API_BASE + 'company/af174b04-b495-47c1-bc32-c0dff7170c34/order/verify', requestOptions)
      .then(response => response.json())
      .then(resCoupone => setBillingInfo(resCoupone))
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

  const handleChange = (event, userData) => {
    userData = { ...userData, [event.target.name]: event.target.value };
    setUserData(userData);
  };

  console.log(billingInfo);

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

        {Object.keys(billingInfo).length == 0 && (
          <Grid className={classes.coupon}>
            {Object.keys(couponeList).length == 0 && (
              <div>
                <Typography>Coupon & Discount</Typography>
                <TextField variant="outlined" placeholder="Phone No." className={classes.txtField} />
              </div>
            )}
            {couponeList && couponeList.data && !couponeList.data.voucher && (
              <div>
                <Typography>Register For Coupon</Typography>
                <TextField variant="outlined" placeholder="Full Name" className={classes.txtField} />
                <TextField variant="outlined" placeholder="Email Address" className={classes.txtField} />
              </div>
            )}
            {couponeList && couponeList.data && couponeList.data.voucher && (
              <div>
                <Typography>Coupon & Discount</Typography>
                <Select
                  name="couponeId"
                  native
                  value={(userData && userData.couponeId) || ''}
                  onChange={e => handleChange(e, userData)}
                  placeholder={'Select Coupone'}
                >
                  <option aria-label="None" value="" />
                  {couponeList.data.voucher.map((data, index) => (
                    <option value={data.id} key={index}>
                      {data.description}
                    </option>
                  ))}
                </Select>
              </div>
            )}
            {Object.keys(couponeList).length == 0 && (
              <Button variant="contained" onClick={() => fetchCouponeList()}>
                Continue
              </Button>
            )}
            {Object.keys(couponeList).length != 0 && (
              <Button variant="contained" onClick={() => verifyOrder()}>
                Apply
              </Button>
            )}
          </Grid>
        )}
        {Object.keys(billingInfo).length != 0 && (
          <Grid className={classes.btnGrid}>
            <Button variant="contained" className={classes.confirm} onClick={() => history.push('/:id/Success')}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Confirm Order'}
            </Button>
          </Grid>
        )}
      </div>
    </div>
  );
};

export default Billing;
