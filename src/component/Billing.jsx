import React, { useState, useEffect } from 'react';
import LogoInfo from './LogoInfo';

import { API_BASE } from '../Constant';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
  Select,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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
    borderRadius: '20px 20px 0px 0px',
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
    justifyContent: 'space-between',
    backgroundColor: '#ECECEC',
  },
  third: {
    borderRadius: '20px 20px 0px 0px',
    backgroundColor: '#ECECEC',
  },
  order: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: 'white',
    padding: '16px',
  },

  confirm: {
    backgroundColor: '#a62a22',
    color: 'white',
    margin: '25px',
    borderRadius: '5px',
    width: '80%',
  },
  stepper: {
    backgroundColor: '#ECECEC',
    borderRadius: '20px 20px 0px 0px',
    '& .MuiStepIcon-root.MuiStepIcon-completed': {
      color: 'green',
    },
    '& .MuiStepIcon-root.MuiStepIcon-active': {
      color: '#CECECE',
    },
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
    padding: '16px',
    marginTop: '16px',
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
    backgroundColor: '#ECECEC',
  },
  txtField: {
    border: '1px solid #D0D3D5',
    width: '75%',
    borderRadius: '10px',

    '& .MuiInputBase-input': {
      padding: '10px 14px',
    },
  },
  textfield: {
    padding: '16px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  continue: {
    backgroundColor: '#4EA23A',
    color: 'white',
  },
  processingTxt: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  input: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  continue: {
    backgroundColor: '#4EA23A',
    color: 'white',
    borderRadius: '5px',
  },
  divider: {
    border: '1px solid #D6D6D6',
    width: '327px',
    height: '0px',
  },
}));

function getSteps() {
  return ['QR CODE', 'ORDER', 'CONFIRM', 'COMPLETE'];
}

const Billing = props => {
  const { itemTotal, menuList, tableNumber } = props;
  const classes = useStyles();
  const [couponeList, setCouponeList] = useState({});
  const [billingInfo, setBillingInfo] = useState({});
  const [hasError, setErrors] = useState(false);
  // const [orderSaved, setOrderSaved] = useState(false);
  const [activeStep, setActiveStep] = useState(+3);
  const steps = getSteps();
  const [expanded, setExpanded] = useState('panel1');
  const [userData, setUserData] = useState(null);

  // const handleNext = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  // };

  const handleReset = () => {
    setActiveStep(0);
  };

  // async function fetchData() {
  //   const res = await fetch(API_BASE + 'company/af174b04-b495-47c1-bc32-c0dff7170c34/menu');
  //   res
  //     .json()
  //     .then(res => setMenuList(res))
  //     .catch(err => setErrors(err));
  // }

  async function fetchCouponeList() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone_number: userData && userData.phoneNumber,
        email: (userData && userData.email) || '',
      }),
    };
    fetch(API_BASE + 'order-user-detail?company=af174b04-b495-47c1-bc32-c0dff7170c34', requestOptions)
      .then(response => response.json())
      .then(resCoupone => setCouponeList(resCoupone))
      .catch(err => setErrors(err));
  }

  async function verifyOrder() {
    let orderLine = [];
    Object.keys(itemTotal).map(data => {
      let newObj = {
        id: null,
        product: '056d497c-6dde-4874-935e-3f91c17a1a06',
        product_name: itemTotal[data].name,
        product_code: 'momo12',
        rate: itemTotal[data].perPlate,
        quantity: itemTotal[data].number,
        total: itemTotal[data].total,
        state: 'New',
        company: 'af174b04-b495-47c1-bc32-c0dff7170c34',
        order: '509b9e29-664f-44b8-a984-62235a8bbdca',
      };
      orderLine.push(newObj);
    });
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        company: 'af174b04-b495-47c1-bc32-c0dff7170c34',
        asset: '2d11f673-12f3-4df3-883e-6a3492a55aea',
        user: null,
        name: 'Shyam Shrestha',
        phone_number: userData && userData.phoneNumber,
        email: 'shyam@gmail.com',
        voucher: '964bdedf-2a00-499e-8020-59197597228e',
        tax: 13.0,
        bill: null,
        order_lines: orderLine,
      }),
    };
    fetch(API_BASE + 'company/af174b04-b495-47c1-bc32-c0dff7170c34/order/verify', requestOptions)
      .then(response => response.json())
      .then(resCoupone => setBillingInfo(resCoupone))
      .catch(err => setErrors(err));
  }

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const history = useHistory();
  let totalPrice = 0;
  for (var key in itemTotal) {
    if (itemTotal.hasOwnProperty(key)) {
      totalPrice += itemTotal[key].total;
    }
  }

  const handleAcordion = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleChange = (event, userData) => {
    userData = { ...userData, [event.target.name]: event.target.value };
    setUserData(userData);
  };

  console.log(billingInfo, 'rescopone');
  const serviceCharge = totalPrice * (menuList.data.service_charge / 100) || 0;
  const taxCharge = totalPrice * (menuList.data.tax / 100) || 0;
  const grandTotal = totalPrice + serviceCharge + taxCharge;

  return (
    <div className={classes.root}>
      <LogoInfo menuList={menuList} props={props} />
      <div className={classes.secondary}>
        <div className={classes.third}>
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
          <Accordion square expanded={expanded === 'panel1'} onChange={handleAcordion('panel1')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <div className={classes.processingTxt}>
                <Typography>Previous Order</Typography>
                <Typography>Processing</Typography>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>order</Typography>
            </AccordionDetails>
          </Accordion>

          {Object.keys(props.itemTotal).map(
            (menuData, menuIndex) =>
              props.itemTotal[menuData].total > 0 && (
                <Grid container className={classes.item} key={menuIndex}>
                  <div className={classes.order}>
                    <Typography className={classes.productName}>
                      {props.itemTotal[menuData].name} {props.itemTotal[menuData].total}
                    </Typography>
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
                    </Grid>
                  </div>

                  <Divider className={classes.divider} />
                </Grid>
              ),
          )}

          <div className={classes.bill}>
            <Typography className={classes.billTxt}>Bill</Typography>
            <div className={classes.billing}>
              <div>Sub Total</div>
              <div className={classes.price}>
                Rs.{(billingInfo.data && billingInfo.data.service_charge) || totalPrice}
              </div>
            </div>
            <div container className={classes.billing}>
              <div>Restaurant service charge</div>
              <div className={classes.price}>
                Rs.{(billingInfo.data && billingInfo.data.service_charge) || serviceCharge}
              </div>
            </div>
            <div className={classes.billing}>
              <div>VAT</div>
              <div className={classes.price}>
                Rs.{(billingInfo.data && billingInfo.data.taxed_amount.toFixed(2)) || taxCharge.toFixed(2)}
              </div>
            </div>
            {billingInfo.discount && (
              <div className={classes.billing}>
                <div>Discount</div>
                <div className={classes.price}>
                  Rs.{(billingInfo.data && billingInfo.data.discount && billingInfo.data.discount.toFixed(2)) || 0}
                </div>
              </div>
            )}
            <div className={classes.dot} />
            <div className={classes.total}>
              <div>Total</div>
              <div className={classes.price}>
                Rs.
                {(billingInfo.data && billingInfo.data.grand_total) || grandTotal.toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        {Object.keys(billingInfo).length == 0 && (
          <Grid className={classes.coupon}>
            {Object.keys(couponeList).length == 0 && (
              <div>
                <Typography>Coupon & Discount</Typography>
                <div className={classes.input}>
                  <TextField
                    variant="outlined"
                    placeholder="Phone No."
                    className={classes.txtField}
                    name="phoneNumber"
                    value={(userData && userData.phoneNumber) || ''}
                    onChange={e => handleChange(e, userData)}
                  />
                  {Object.keys(couponeList).length == 0 && (
                    <Button variant="contained" className={classes.continue} onClick={() => fetchCouponeList()}>
                      Continue
                    </Button>
                  )}
                </div>
              </div>
            )}
            {couponeList && couponeList.data && !couponeList.data.voucher && (
              <div>
                <Typography>Register For Coupon</Typography>
                <TextField
                  variant="outlined"
                  placeholder="Full Name"
                  className={classes.txtField}
                  name="fullName"
                  value={(userData && userData.fullName) || ''}
                  onChange={e => handleChange(e, userData)}
                />
                <TextField
                  variant="outlined"
                  placeholder="Email Address"
                  className={classes.txtField}
                  name="email"
                  value={(userData && userData.email) || ''}
                  onChange={e => handleChange(e, userData)}
                />
                <Button variant="contained" onClick={() => verifyOrder()}>
                  Continue
                </Button>
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
                <Button variant="contained" onClick={() => verifyOrder()}>
                  Apply
                </Button>
              </div>
            )}

            {/* {Object.keys(couponeList).length != 0 && (
              <Button variant="contained" onClick={() => verifyOrder()}>
                Apply
              </Button>
            )} */}
          </Grid>
        )}
        {Object.keys(billingInfo).length != 0 && (
          <Grid className={classes.btnGrid}>
            <Button variant="contained" className={classes.confirm} onClick={() => history.push('/Success')}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Confirm Order'}
            </Button>
          </Grid>
        )}
      </div>
    </div>
  );
};

export default Billing;
