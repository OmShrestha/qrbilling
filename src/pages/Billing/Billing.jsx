import React, { useState, useEffect } from "react";

import { API_BASE, API_BASE_V2 } from "../../Constant";
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
  CircularProgress,
} from "@material-ui/core";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Bill from "../../component/ItemDetail/Bill";
import axios from "axios";
import useStyles from "./Billing.style";

function getSteps() {
  return ["QR CODE", "ORDER", "CONFIRM", "COMPLETE"];
}

const Billing = (props) => {
  const { itemTotal, menuList, orderList, tableNumber, companyId } = props;
  const classes = useStyles();
  const [couponeList, setCouponeList] = useState({});
  const [billingInfo, setBillingInfo] = useState({});
  const [hasError, setErrors] = useState(false);
  const [userDataError, setUserDataError] = useState({});
  const [activeStep, setActiveStep] = useState(+3);
  const steps = getSteps();
  const [expanded, setExpanded] = useState("panel1");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleReset = () => {
    setActiveStep(0);
  };

  async function fetchCouponeList() {
    setLoading(true);
    const phone_number = (userData && userData.phoneNumber) || "";

    fetch(
      API_BASE_V2 +
        `company/${companyId}/user-vouchers/?phone_number=${phone_number}`
    )
      .then((response) => response.json())
      .then((resCoupone) => setCouponeList(resCoupone))
      .catch((err) => setErrors(err));
  }

  async function createOrder() {
    setLoading(true);

    if (orderList && orderList.order_lines?.length > 0) {
      let billingData = billingInfo.data;
      const existingProductIds = orderList.order_lines.map(
        (item) => item.product
      );
      billingData.order_lines.forEach((item) => {
        if (existingProductIds.includes(item.product)) {
          const oldItemIndex = existingProductIds.indexOf(item.product);
          const oldItem = orderList.order_lines[oldItemIndex];
          orderList.order_lines[oldItemIndex] = {
            ...oldItem,
            quantity: parseInt(oldItem.quantity) + parseInt(item.quantity),
            new: parseInt(oldItem.new) + parseInt(item.quantity),
            cooking: parseInt(oldItem.cooking),
            served: parseInt(oldItem.served),
          };
        } else {
          orderList.order_lines.push({
            ...item,
            quantity: parseInt(item.quantity),
            new: parseInt(item.quantity),
            cooking: 0,
            served: 0,
            cancelled: 0,
          });
        }
      });
      const id = orderList.order_id;
      const requestOptions = {
        asset: billingData.asset,
        order_lines: orderList.order_lines,
        voucher: null,
      };

      axios
        .put(
          API_BASE_V2 + `order/${companyId}/master-qr-order/${id}/`,
          requestOptions
        )
        .then((response) =>
          response.status === 200 ? history.push("/Success") : () => {}
        )
        .catch((error) => {
          if (error.response.status === 400) {
            const errors = error.response.data.non_field_errors;

            errors.forEach((message) => {
              alert(message);
              setTimeout(() => window.location.assign("/"), 1000);
            });
          }
          setErrors(error);
        });
    } else {
      setLoading(true);
      let billingData = billingInfo.data;
      billingData.order_lines = billingData.order_lines.map((item) => {
        return {
          ...item,
          quantity: parseInt(item.quantity),
          new: parseInt(item.quantity),
          cooking: 0,
          served: 0,
          cancelled: 0,
        };
      });

      // ...item,
      const requestOptions = {
        asset: billingData.asset,
        order_lines: billingData.order_lines,
        voucher: null,
      };

      axios
        .post(
          API_BASE_V2 + `order/${companyId}/master-qr-order/`,
          requestOptions
        )
        .then((response) =>
          response.status === 201 ? history.push("/Success") : () => {}
        )
        .catch((error) => {
          if (error.response.status === 400) {
            const errors = error.response.data.non_field_errors;

            errors &&
              errors.forEach((message) => {
                alert(message);
                setTimeout(() => window.location.assign("/"), 1000);
              });
          }
          setErrors(error);
        });
    }
  }

  async function verifyOrder(skip) {
    setLoading(true);
    let orderLine = [];
    Object.keys(itemTotal).map((data) => {
      let newObj = {
        id: null,
        product: itemTotal[data].id,
        product_name: itemTotal[data].name,
        product_code: itemTotal[data].productCode,
        quantity: itemTotal[data].number,
        rate: itemTotal[data].perPlate,
        status: "NEW",
        total: itemTotal[data].total,
        company: companyId,
        order: (menuList.data.order && menuList.data.order.id) || null,
      };
      orderLine.push(newObj);
    });
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        company: companyId,
        asset: tableNumber,
        user: couponeList.records.user || null,
        name: (userData && userData.fullName) || couponeList.records.name || "",
        phone_number: userData && userData.phoneNumber,
        email: (userData && userData.email) || couponeList.records.email || "",
        voucher: (userData && userData.couponeId) || null,
        tax: menuList.data.tax,
        bill: null,
        order_lines: orderLine,
      }),
    };
    fetch(API_BASE + `company/${companyId}/order/verify`, requestOptions)
      .then((response) => response.json())
      .then((resCoupone) => setBillingInfo(resCoupone))
      .catch((err) => setErrors(err));
  }

  async function verifyOrderApply(skip) {
    setLoading(true);
    const error = {};
    setUserDataError(error);
    if (!skip && Object.keys(error).length > 0) {
    } else {
      let orderLine = [];
      Object.keys(itemTotal).map((data) => {
        let newObj = {
          id: null,
          product: itemTotal[data].id,
          product_name: itemTotal[data].name,
          product_code: itemTotal[data].productCode,
          rate: itemTotal[data].perPlate,
          quantity: itemTotal[data].number,
          total: itemTotal[data].total,
          company: companyId,
          order: (menuList.data.order && menuList.data.order.id) || null,
        };
        orderLine.push(newObj);
      });
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company: companyId,
          asset: tableNumber,
          user: couponeList.records.user || null,
          name:
            (userData && userData.fullName) || couponeList.records.name || "",
          phone_number: userData && userData.phoneNumber,
          email:
            (userData && userData.email) || couponeList.records.email || "",
          voucher: (userData && userData.couponeId) || null,
          tax: 13.0,
          bill: null,
          order_lines: orderLine,
        }),
      };
      fetch(API_BASE + `company/${companyId}/order/verify`, requestOptions)
        .then((response) => response.json())
        .then((resCoupone) => console.log(resCoupone, "{resCoupone}"))
        .catch((err) => setErrors(err));
    }
  }

  async function verifyOrderApplyNext() {
    setLoading(true);
    let orderLine = [];
    Object.keys(itemTotal).map((data) => {
      let newObj = {
        id: null,
        product: itemTotal[data].id,
        product_name: itemTotal[data].name,
        product_code: itemTotal[data].productCode,
        rate: itemTotal[data].perPlate,
        quantity: itemTotal[data].number,
        total: itemTotal[data].total,
        company: companyId,
        order: (menuList.data.order && menuList.data.order.id) || null,
      };
      orderLine.push(newObj);
    });
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        company: companyId,
        asset: tableNumber,
        user: menuList.data.order.user || null,
        name: menuList.data.order.name || "",
        phone_number: menuList.data.order.phone_number || "",
        email: menuList.data.order.email || "",
        voucher: (userData && userData.couponeId) || null,
        tax: menuList.data.tax,
        bill: null,
        order_lines: orderLine,
      }),
    };
    fetch(API_BASE + `company/${companyId}/order/verify`, requestOptions)
      .then((response) => response.json())
      .then((resCoupone) => setBillingInfo(resCoupone))
      .catch((err) => setErrors(err));
  }

  useEffect(() => {
    setLoading(false);
    if (
      couponeList &&
      couponeList.records &&
      couponeList.records.voucher &&
      couponeList.records.voucher.length === 0
    ) {
      verifyOrder(true);
    }
  }, [couponeList]);

  useEffect(() => {
    setLoading(false);
  }, [billingInfo]);

  const history = useHistory();
  let totalPrice = 0;
  for (var key in itemTotal) {
    if (itemTotal.hasOwnProperty(key)) {
      totalPrice += itemTotal[key].total;
    }
  }

  const handleAcordion = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleChange = (event, userData) => {
    delete userDataError[event.target.name];
    userData = { ...userData, [event.target.name]: event.target.value };
    setUserData(userData);
  };
  const validatePhoneNumber = () => {
    const errors = {};
    if (!userData || !userData.phoneNumber)
      errors.phoneNumber = "Phone is required";
    else if (!userData.phoneNumber.match(/^[0-9]{10}$/))
      errors.phoneNumber = "Not valid";
    return errors;
  };
  const validateUserInfo = () => {
    let errors = {};
    if (!userData || !userData.fullName) {
      errors.fullName = "Name is required";
    }
    if (
      userData.email &&
      !userData.email.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    )
      errors.email = "Not valid";
    return errors;
  };

  const serviceCharge = totalPrice * (menuList.data.service_charge / 100) || 0;
  const taxCharge = totalPrice * (menuList.data.tax / 100) || 0;
  const grandTotal = totalPrice + serviceCharge + taxCharge;

  return (
    <div className={classes.root}>
      <div className={classes.secondary}>
        <div className={classes.third}>
          <Grid className={classes.stepperContainer}>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map((label, index) => (
                <Step key={index}>
                  <StepLabel className={classes.steps}>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <div>
              {activeStep === steps.length ? (
                <div>
                  <Typography className={classes.instructions}>
                    All steps completed
                  </Typography>
                  <Button onClick={handleReset}>Reset</Button>
                </div>
              ) : null}
            </div>
          </Grid>
          <div className={classes.itemCart}>
            <Typography className={classes.itemCartTxt}>
              Items In Cart
            </Typography>
            <Typography
              className={classes.AddItemTxt}
              onClick={() => props.proceedToRedeem()}
            >
              Add More Items +
            </Typography>
          </div>
          <Accordion
            square
            expanded={expanded === "panel1"}
            onChange={handleAcordion("panel1")}
            className={classes.orderList}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <div className={classes.processingTxt}>
                <Typography>Previous Order</Typography>
              </div>
            </AccordionSummary>
            <AccordionDetails className={classes.detailList}>
              {orderList.order_lines && orderList.order_lines.length > 0 ? (
                orderList.order_lines.map(
                  (order, index) =>
                    order.status !== "CANCELLED" && (
                      <div className={classes.detailListItem} key={index}>
                        <Typography className={classes.productName} key={index}>
                          {order.product_name}
                        </Typography>
                        <span>{`${order.quantity} * ${order.rate}`}</span>
                      </div>
                    )
                )
              ) : (
                <div className={classes.detailListItem}>
                  <Typography>No previous order</Typography>
                </div>
              )}
            </AccordionDetails>
          </Accordion>

          {Object.keys(props.itemTotal).map(
            (menuData, menuIndex) =>
              props.itemTotal[menuData].total > 0 && (
                <Grid container className={classes.item} key={menuIndex}>
                  <div className={classes.order}>
                    <Typography className={classes.productName}>
                      {props.itemTotal[menuData].name}
                    </Typography>
                    {!Object.keys(billingInfo).length !== 0 && (
                      <Grid>
                        {
                          <div className={classes.buttons}>
                            <Button
                              onClick={() =>
                                props.removeItem(
                                  menuData,
                                  "",
                                  props.itemTotal[menuData].perPlate,
                                  props.itemTotal[menuData].name,
                                  props.itemTotal[menuData].id,
                                  props.itemTotal[menuData].product_code
                                )
                              }
                            >
                              <RemoveIcon />
                            </Button>
                            <span>
                              {(props.itemTotal[menuData] &&
                                props.itemTotal[menuData].number) ||
                                0}
                            </span>
                            <Button
                              onClick={() =>
                                props.addItem(
                                  menuData,
                                  "",
                                  props.itemTotal[menuData].perPlate,
                                  props.itemTotal[menuData].name,
                                  props.itemTotal[menuData].id,
                                  props.itemTotal[menuData].product_code
                                )
                              }
                            >
                              <AddIcon />
                            </Button>
                          </div>
                        }
                      </Grid>
                    )}
                  </div>

                  <Divider className={classes.divider} />
                </Grid>
              )
          )}
          <Bill
            billingInfo={billingInfo}
            totalPrice={totalPrice}
            serviceCharge={serviceCharge}
            taxCharge={taxCharge}
            grandTotal={grandTotal}
            previousGrandTotal={
              (orderList &&
                orderList.price_details &&
                orderList.price_details.grand_total) ||
              0
            }
            tax={menuList.data.tax}
            service={menuList.data.service_charge}
          />
        </div>

        {Object.keys(billingInfo).length === 0 && (
          <Grid className={classes.bottomContainer}>
            {grandTotal > 0 && Object.keys(couponeList).length === 0 && (
              <>
                <Typography
                  component="h5"
                  className={classes.bottomContainerTitle}
                >
                  Coupon & Discount
                </Typography>
                {(menuList.data.order &&
                  menuList.data.order.order_lines.length === 0) ||
                  (!menuList.data.order && (
                    <TextField
                      variant="outlined"
                      placeholder="Phone No."
                      className={classes.inputField}
                      name="phoneNumber"
                      value={(userData && userData.phoneNumber) || ""}
                      onChange={(e) => handleChange(e, userData)}
                    />
                  ))}
                {(menuList.data.order &&
                  menuList.data.order.order_lines.length === 0) ||
                  (!menuList.data.order &&
                    Object.keys(couponeList).length === 0 && (
                      <Button
                        variant="contained"
                        className={classes.btnGreen}
                        onClick={loading ? () => {} : () => fetchCouponeList()}
                      >
                        {loading ? <CircularProgress /> : "Continue"}
                      </Button>
                    ))}
                {menuList.data.order &&
                  menuList.data.order.order_lines.length > 0 && (
                    <Button
                      variant="contained"
                      onClick={
                        loading ? () => {} : () => verifyOrderApplyNext()
                      }
                      className={classes.btnGreen}
                    >
                      {loading ? <CircularProgress /> : "Continue"}
                    </Button>
                  )}
              </>
            )}
            {couponeList &&
              couponeList.records &&
              !couponeList.records.voucher && (
                <>
                  <Button
                    variant="contained"
                    onClick={loading ? () => {} : () => verifyOrder()}
                    className={classes.btnGreen}
                  >
                    {loading ? <CircularProgress /> : "Continue"}
                  </Button>
                </>
              )}
            {couponeList && couponeList.data && couponeList.data.voucher && (
              <>
                <Typography
                  component="h5"
                  className={classes.bottomContainerTitle}
                >
                  Coupon & Discount
                </Typography>
                <Select
                  name="couponeId"
                  native
                  className={classes.select}
                  value={(userData && userData.couponeId) || ""}
                  onChange={(e) => handleChange(e, userData)}
                  placeholder={"Select Coupone"}
                >
                  <option aria-label="None">Select Coupon</option>
                  {couponeList.data.voucher.map((data, index) => (
                    <option value={data.id} key={index}>
                      {data.description}
                    </option>
                  ))}
                </Select>
                <Button
                  variant="contained"
                  onClick={loading ? () => {} : () => verifyOrderApply()}
                >
                  {loading ? <CircularProgress /> : "Apply"}
                </Button>
              </>
            )}
          </Grid>
        )}
        {Object.keys(billingInfo).length !== 0 && (
          <Grid className={classes.btnGrid}>
            <Button
              variant="contained"
              className={classes.btnRed}
              onClick={loading ? () => {} : () => createOrder()}
            >
              {loading ? (
                <CircularProgress />
              ) : activeStep === steps.length - 1 ? (
                "Finish"
              ) : (
                "Confirm Order"
              )}
            </Button>
          </Grid>
        )}
      </div>
    </div>
  );
};

export default Billing;
