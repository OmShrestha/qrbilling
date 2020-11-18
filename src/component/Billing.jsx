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
import Bill from '../component/ItemDetail/component/Bill';

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
  apply: {
    backgroundColor: '#a62a22',
    color: 'white',
    margin: '25px',
    borderRadius: '5px',
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
  steps: {
    flexDirection: 'column',
    fontFamily: 'SF Pro Display Regular',
    '&.MuiStepLabel-iconContainer, &.MuiStepIcon-text': {
      display: 'none',
      color: 'currentColor',
      fontSize: '0',
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
    fontFamily: 'SF Pro Display Regular',
  },
  billTxt: {
    fontWeight: 'bold',
    fontFamily: 'SF Pro Display Regular',
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
  select: {
    width: '75%',
    border: '1px solid #D0D3D5',
    borderRadius: '10px',
    '&.MuiInput-underline:after': {
      borderBottom: 'none',
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
    fontFamily: 'SF Pro Display Regular',
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
  cNd: {
    fontFamily: 'SF Pro Display Semibold',
    fontSize: '14px',
  },
}));

function getSteps() {
  return ['QR CODE', 'ORDER', 'CONFIRM', 'COMPLETE'];
}

const Billing = props => {
  const { itemTotal, menuList, tableNumber, companyId } = props;
  console.log(itemTotal, 'test');
  const classes = useStyles();
  const [couponeList, setCouponeList] = useState({});
  const [billingInfo, setBillingInfo] = useState({});
  const [hasError, setErrors] = useState(false);
  const [userDataError, setUserDataError] = useState({});
  // const [orderSaved, setOrderSaved] = useState(false);
  const [activeStep, setActiveStep] = useState(+3);
  const steps = getSteps();
  const [expanded, setExpanded] = useState('panel1');
  const [userData, setUserData] = useState(null);

  const handleReset = () => {
    setActiveStep(0);
  };

  async function fetchCouponeList() {
    const error = validatePhoneNumber();
    setUserDataError(error);
    if (Object.keys(error).length > 0) {
    } else {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone_number: userData && userData.phoneNumber,
          email: (userData && userData.email) || '',
        }),
      };
      fetch(API_BASE + `order-user-detail?company=${companyId}`, requestOptions)
        .then(response => response.json())
        .then(resCoupone => setCouponeList(resCoupone))
        .catch(err => setErrors(err));
    }
  }

  async function createOrder() {
    if (menuList.data.order && menuList.data.order.order_lines) {
      let billingData = billingInfo.data;
      billingData.order_lines = menuList.data.order.order_lines.concat(billingData.order_lines);
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...billingData,
          company: companyId,
          asset: tableNumber,
          id: menuList.data.order.id,
        }),
      };
      fetch(API_BASE + `company/${companyId}/order/${menuList.data.order.id}`, requestOptions)
        .then(response => response.json())
        .then(resCoupone => (resCoupone.success ? history.push('/Success') : () => {}))
        .catch(err => setErrors(err));
    } else {
      const billingData = billingInfo.data;
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...billingData,
          company: companyId,
          asset: tableNumber,
        }),
      };
      fetch(API_BASE + `company/${companyId}/order`, requestOptions)
        .then(response => response.json())
        .then(resCoupone => (resCoupone.success ? history.push('/Success') : () => {}))
        .catch(err => setErrors(err));
    }
  }

  async function verifyOrder(skip) {
    const error = validateUserInfo();
    setUserDataError(error);
    if (!skip && Object.keys(error).length > 0) {
    } else {
      let orderLine = [];
      Object.keys(itemTotal).map(data => {
        let newObj = {
          id: null,
          product: itemTotal[data].id,
          product_name: itemTotal[data].name,
          product_code: itemTotal[data].productCode,
          rate: itemTotal[data].perPlate,
          quantity: itemTotal[data].number,
          total: itemTotal[data].total,
          state: 'New',
          company: companyId,
          order: (menuList.data.order && menuList.data.order.id) || null,
        };
        orderLine.push(newObj);
      });
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company: companyId,
          asset: tableNumber,
          user: couponeList.data.user || null,
          name: (userData && userData.fullName) || couponeList.data.name || null,
          phone_number: userData && userData.phoneNumber,
          email: (userData && userData.email) || couponeList.data.email || null,
          voucher: (userData && userData.couponeId) || null,
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
  }

  async function verifyOrderApply(skip) {
    const error = {};
    setUserDataError(error);
    if (!skip && Object.keys(error).length > 0) {
    } else {
      let orderLine = [];
      Object.keys(itemTotal).map(data => {
        let newObj = {
          id: null,
          product: itemTotal[data].id,
          product_name: itemTotal[data].name,
          product_code: itemTotal[data].productCode,
          rate: itemTotal[data].perPlate,
          quantity: itemTotal[data].number,
          total: itemTotal[data].total,
          state: 'New',
          company: companyId,
          order: (menuList.data.order && menuList.data.order.id) || null,
        };
        orderLine.push(newObj);
      });
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company: companyId,
          asset: tableNumber,
          user: couponeList.data.user || null,
          name: (userData && userData.fullName) || couponeList.data.name || null,
          phone_number: userData && userData.phoneNumber,
          email: (userData && userData.email) || couponeList.data.email || null,
          voucher: (userData && userData.couponeId) || null,
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
  }

  useEffect(() => {
    if (couponeList && couponeList.data && couponeList.data.voucher && couponeList.data.voucher.length == 0) {
      verifyOrder(true);
    }
  }, [couponeList]);

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
    delete userDataError[event.target.name];
    userData = { ...userData, [event.target.name]: event.target.value };
    setUserData(userData);
  };
  const validatePhoneNumber = () => {
    const errors = {};
    if (!userData || !userData.phoneNumber) errors.phoneNumber = 'Phone is required';
    else if (!userData.phoneNumber.match(/^[0-9]{8,15}$/)) errors.phoneNumber = 'Not valid';
    return errors;
  };
  const validateUserInfo = () => {
    let errors = {};
    if (!userData || !userData.fullName) {
      errors.fullName = 'Name is required';
    }
    if (userData.email && !userData.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/))
      errors.email = 'Not valid';
    return errors;
  };

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
                  <StepLabel className={classes.steps}>{label}</StepLabel>
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
              <Typography className={classes.cNd}>
                {menuList.data.order &&
                  menuList.data.order.order_lines.map((item, index) => (
                    <div>
                      <Typography className={classes.productName} key={index}>
                        {item.product_name}
                      </Typography>
                      <span>{item.state}</span>
                    </div>
                  ))}
              </Typography>
            </AccordionDetails>
          </Accordion>

          {Object.keys(props.itemTotal).map(
            (menuData, menuIndex) =>
              props.itemTotal[menuData].total > 0 && (
                <Grid container className={classes.item} key={menuIndex}>
                  <div className={classes.order}>
                    <Typography className={classes.productName}>{props.itemTotal[menuData].name}</Typography>
                    <Grid>
                      {
                        <div className={classes.buttons}>
                          <Button
                            onClick={() =>
                              props.removeItem(
                                menuData,
                                '',
                                props.itemTotal[menuData].perPlate,
                                props.itemTotal[menuData].name,
                                props.itemTotal[menuData].id,
                                props.itemTotal[menuData].product_code,
                              )
                            }
                          >
                            <RemoveIcon />
                          </Button>
                          <span>{(props.itemTotal[menuData] && props.itemTotal[menuData].number) || 0}</span>
                          <Button
                            onClick={() =>
                              props.addItem(
                                menuData,
                                '',
                                props.itemTotal[menuData].perPlate,
                                props.itemTotal[menuData].name,
                                props.itemTotal[menuData].id,
                                props.itemTotal[menuData].product_code,
                              )
                            }
                          >
                            <AddIcon />
                          </Button>
                        </div>
                      }
                    </Grid>
                  </div>

                  <Divider className={classes.divider} />
                </Grid>
              ),
          )}
          <Bill
            classes={classes}
            billingInfo={billingInfo}
            totalPrice={totalPrice}
            serviceCharge={serviceCharge}
            taxCharge={taxCharge}
            grandTotal={grandTotal}
          />
        </div>

        {Object.keys(billingInfo).length == 0 && (
          <Grid className={classes.coupon}>
            {Object.keys(couponeList).length == 0 && (
              <div>
                <Typography className={classes.cNd}>Coupon & Discount</Typography>
                <div className={classes.input}>
                  <TextField
                    variant="outlined"
                    placeholder="Phone No."
                    className={classes.txtField}
                    name="phoneNumber"
                    value={(userData && userData.phoneNumber) || ''}
                    onChange={e => handleChange(e, userData)}
                  />
                  {userDataError && userDataError.phoneNumber && (
                    <p className="danger" style={{ color: 'red' }}>
                      {userDataError.phoneNumber}
                    </p>
                  )}
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
                {userDataError && userDataError.fullName && (
                  <p className="danger" style={{ color: 'red' }}>
                    {userDataError.fullName}
                  </p>
                )}
                <TextField
                  variant="outlined"
                  placeholder="Email Address"
                  className={classes.txtField}
                  name="email"
                  value={(userData && userData.email) || ''}
                  onChange={e => handleChange(e, userData)}
                />
                {userDataError && userDataError.email && (
                  <p className="danger" style={{ color: 'red' }}>
                    {userDataError.email}
                  </p>
                )}
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
                  className={classes.select}
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
                <Button variant="contained" onClick={() => verifyOrderApply()}>
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
            <Button variant="contained" className={classes.confirm} onClick={() => createOrder()}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Confirm Order'}
            </Button>
          </Grid>
        )}
      </div>
    </div>
  );
};

export default Billing;
