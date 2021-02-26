import React, { useState, useEffect } from "react";
import BillingForm from "./Billing";
import { API_BASE, API_BASE_V2 } from "../Constant";
import { useHistory } from "react-router-dom";

// material
import PropTypes from "prop-types";
import { Tabs, Tab, Collapse, Grid, CircularProgress } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import ProductList from "./ItemDetail/component/ProductList";
import LogoInfo from "./LogoInfo";
import axios from "axios";

import CustomSearchBar from "./SearchBar";
import styles from "./ItemDetail.style";
import { fetchCategory } from "../services/categoryService";
import CategoryCard from "./categoryCard/categoryCard";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    "aria-controls": `scrollable-prevent-tabpanel-${index}`,
  };
}

const ItemDetails = (props) => {
  const classes = styles();
  const [category, setCategory] = useState(null);
  const [value, setValue] = useState(0);
  const [hasError, setErrors] = useState(false);
  const [orderSaved, setOrderSaved] = useState(false);
  const [menuList, setMenuList] = useState({});
  const [orderList, setOrderList] = useState({});
  const [itemTotal, setItemTotal] = useState({});
  const [redeem, setRedeem] = useState(false);
  const [open, setOpen] = useState(false);

  const history = useHistory();
  const query = new URLSearchParams(props.location.search);

  const proceedToRedeem = () => {
    setRedeem(!redeem);
  };

  useEffect(() => {
    const getCategory = async () => {
      fetchCategory(props.match.params.id)
        .then((res) => setCategory(res.data.records))
        .catch((res) => console.log(res));
    };
    getCategory();
  }, [props.match.params.id]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function saveOrder() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(itemTotal),
    };
    fetch(API_BASE + "company/asset/order/create", requestOptions)
      .then((response) => response.json())
      .then((data) => setOrderSaved({ postId: data.id }));
  }

  const addItem = (menuIndex, index, price, itemName, id, productCode) => {
    let newData = {
      ...itemTotal,
      [menuIndex + index]: {
        id: id,
        productCode: productCode,
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

  const removeItem = (menuIndex, index, price, itemName, id, productCode) => {
    if (
      itemTotal[menuIndex + index] &&
      itemTotal[menuIndex + index].number > 0
    ) {
      let newData = {
        ...itemTotal,
        [menuIndex + index]: {
          id: id,
          productCode: productCode,
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
      if (itemTotal[menuIndex + index].number - 1 === 0) {
        setItemTotal(newData);
      } else {
        setItemTotal(newData);
      }
    }
  };

  async function fetchData() {
    const res = await fetch(
      API_BASE +
        `company/${props.match.params.id}/menu?asset=` +
        query.get("table_no")
    );
    res
      .json()
      .then((res) => setMenuList(res))
      .catch((err) => setErrors(err));
  }

  async function fetchOrders() {
    const res = await axios.get(
      API_BASE_V2 + `order/latest-asset-order/${query.get("table_no")}`
    );

    const status = res.data.status;
    let orderListOrderLines = [];

    res.data.order_lines.map((order) =>
      orderListOrderLines.push({
        company: props.match.params.id,
        id: null,
        product: order.product.id,
        product_code: order.product.product_code,
        product_name: order.product.name,
        quantity: order.quantity,
        status: order.status,
        rate: order.rate,
        total: order.total,
      })
    );

    const orders = {
      order_id: res.data.id,
      order_lines: orderListOrderLines,
      price_details: res.data.price_details,
    };

    status !== "COMPLETED" && status !== "CANCELLED"
      ? setOrderList(orders)
      : setOrderList({});
  }

  useEffect(() => {
    fetchData();
    fetchOrders();
  }, []);

  let totalPrice = 0;
  for (var key in itemTotal) {
    if (itemTotal.hasOwnProperty(key)) {
      totalPrice += itemTotal[key].total;
    }
  }

  console.log(orderList);
  return (
    <div>
      {hasError ? (
        <div className={classes.root}>
          <div className={classes.secondRoot}>No data found!</div>
        </div>
      ) : (
        <div className={classes.root}>
          <LogoInfo menuList={menuList} tableNumber={query.get("table_no")} />
          {redeem ? (
            <BillingForm
              itemTotal={itemTotal}
              addItem={addItem}
              removeItem={removeItem}
              proceedToRedeem={proceedToRedeem}
              menuList={menuList}
              orderList={orderList}
              tableNumber={query.get("table_no")}
              companyId={props.match.params.id}
              orderToken={query.get("token")}
            ></BillingForm>
          ) : (
            <div>
              <div className={classes.secondRoot}>
                {/* SearchBar Title */}
                <Typography className={classes.searchBarTitle}>
                  What do you want to eat today?
                </Typography>

                {/* SearchBar */}
                <CustomSearchBar />

                {/* Category Tabs */}
                <Tabs
                  className={classes.tabs}
                  value={value}
                  onChange={handleChange}
                  variant="scrollable"
                  scrollButtons="off"
                  aria-label="scrollable prevent tabs example"
                >
                  {menuList &&
                    menuList.data &&
                    menuList.data.menu.map((menuData, index) => (
                      <Tab
                        label={menuData.category_name}
                        {...a11yProps(index)}
                        key={index}
                      />
                    ))}
                </Tabs>

                {/* Category Card should render in 'all' tab */}
                <CategoryCard category={category} />
                {/* Category Card Ends Here */}

                {/* Tabs food menus */}
                {menuList &&
                  menuList.data &&
                  menuList.data.menu.map((menuData, menuIndex) => (
                    <TabPanel
                      className={classes.panel}
                      key={menuIndex}
                      value={value}
                      index={menuIndex}
                    >
                      {menuData.products.map((product, index) => (
                        <ProductList
                          key={index}
                          className={classes.product}
                          product={product}
                          menuIndex={menuIndex}
                          index={index}
                          itemTotal={itemTotal}
                          addItem={addItem}
                          removeItem={removeItem}
                        />
                      ))}
                    </TabPanel>
                  ))}
                {/* Tabs food menus ends here */}
              </div>

              {/* View Order Button */}
              <Grid container className={classes.orderBtnContainer}>
                {orderList &&
                  orderList.hasOwnProperty("order_lines") &&
                  (totalPrice < 0 || totalPrice === 0) && (
                    <Button
                      className={classes.orderBtn}
                      onClick={() => proceedToRedeem()}
                    >
                      View Order
                    </Button>
                  )}
              </Grid>
              {/* View Order Button ends Here */}

              {/* Checkout Button if order is added */}
              <Grid container className={classes.orderBtnContainer}>
                <Collapse in={totalPrice > 0} className={classes.Collapse}>
                  <div className={classes.checkoutContainer}>
                    <div>
                      <Typography className={classes.total}>Total</Typography>
                      <span className={classes.totalPrice}>
                        Rs {totalPrice}
                      </span>
                    </div>
                    <Button
                      className={classes.checkout}
                      onClick={() => proceedToRedeem()}
                    >
                      Check out
                    </Button>
                  </div>
                </Collapse>
              </Grid>
              {/* Checkout Button ends here */}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ItemDetails;
