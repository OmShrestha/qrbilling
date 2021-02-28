//Library
import React, { useState, useEffect } from "react";
import axios from "axios";

// REFERENCE Dont Delete
// REFERENCE Dont Delete
// REFERENCE Dont Delete
// REFERENCE Dont Delete
// REFERENCE Dont Delete
// REFERENCE Dont Delete
// REFERENCE Dont Delete
// REFERENCE Dont Delete
// REFERENCE Dont Delete
// REFERENCE Dont Delete
// REFERENCE Dont Delete
// REFERENCE Dont Delete
// REFERENCE Dont Delete
// REFERENCE Dont Delete
// REFERENCE Dont Delete
// REFERENCE Dont Delete
// REFERENCE Dont Delete
// REFERENCE Dont Delete
// REFERENCE Dont Delete
// REFERENCE Dont Delete
// REFERENCE Dont Delete
// REFERENCE Dont Delete
// REFERENCE Dont Delete

// material
import PropTypes from "prop-types";
import {
  Button,
  Tabs,
  Tab,
  Collapse,
  Grid,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@material-ui/core";
import { ExpandMore as ExpandMoreIcon } from "@material-ui/icons";

//Local
import ProductList from "./ItemDetail/component/ProductList";
import LogoInfo from "./LogoInfo";
import { API_BASE, API_BASE_V2 } from "../Constant";
import CustomSearchBar from "./SearchBar";
import BillingForm from "./Billing";
import styles from "./ItemDetail.style";
import { fetchCategory } from "../services/categoryService";
import CategoryCard from "./categoryCard/categoryCard";
import { fetchSubCategory } from "../services/subCategoryService";
import { fetchProduct } from "../services/fetchProductService";
import { ColumnsGap } from "react-bootstrap-icons";

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
  // const [subCategory, setSubCategory] = useState(null);
  const [value, setValue] = useState(0);
  const [hasError, setErrors] = useState(false);
  // const [orderSaved, setOrderSaved] = useState(false);
  const [menuList, setMenuList] = useState({});
  const [orderList, setOrderList] = useState({});
  const [itemTotal, setItemTotal] = useState({});
  const [redeem, setRedeem] = useState(false);
  const [categoryID, setCategoryID] = useState(null);
  const [products, setProducts] = useState(null);
  const [child, setChild] = useState(null);

  const query = new URLSearchParams(props.location.search);
  const proceedToRedeem = () => {
    setRedeem(!redeem);
  };

  //Get All The Main Category
  useEffect(() => {
    const getCategory = async () => {
      fetchCategory(props.match.params.id)
        .then((res) => setCategory(res.data.records))
        .catch((res) => console.log(res));
    };
    getCategory();
  }, [props.match.params.id]);

  //Get Sub Category after clicking in Main Category
  useEffect(() => {
    const getProducts = async () => {
      fetchProduct(props.match.params.id, categoryID)
        .then((res) => setProducts(res.data.data))
        .catch((err) => console.log(err));
    };
    getProducts();
  }, [props.match.params.id, categoryID]);

  //Handle Category Change
  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const fetchProductsHandler = async (id) => {
    fetchProduct(props.match.params.id, id);
  };

  //Fetch Sub Category when category card is clicked
  const fetchSubCategoryHandler = async (id, index, child) => {
    fetchSubCategory(props.match.params.id, id)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setValue(index);
    setChild(child);
  };

  //Important
  // async function saveOrder() {
  //   const requestOptions = {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(itemTotal),
  //   };
  //   fetch(API_BASE + "company/asset/order/create", requestOptions)
  //     .then((response) => response.json())
  //     .then((data) => setOrderSaved({ postId: data.id }));
  // }

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

  // async function fetchData() {
  //   const res = await fetch(
  //     API_BASE +
  //       `company/${props.match.params.id}/product&product_category=fcde1236-ab2d-4eea-a6be-26620781fff4`
  //   );
  //   res
  //     .json()
  //     .then((res) => setMenuList(res))
  //     .catch((err) => setErrors(err));
  // }

  // async function fetchOrders() {
  //   const res = await axios.get(
  //     API_BASE_V2 + `order/latest-asset-order/${query.get("table_no")}`
  //   );

  //   const status = res.data.status;
  //   let orderListOrderLines = [];

  //   res.data.order_lines.map((order) =>
  //     orderListOrderLines.push({
  //       company: props.match.params.id,
  //       id: null,
  //       product: order.product.id,
  //       product_code: order.product.product_code,
  //       product_name: order.product.name,
  //       quantity: order.quantity,
  //       status: order.status,
  //       rate: order.rate,
  //       total: order.total,
  //     })
  //   );

  //   const orders = {
  //     order_id: res.data.id,
  //     order_lines: orderListOrderLines,
  //     price_details: res.data.price_details,
  //   };

  //   status !== "COMPLETED" && status !== "CANCELLED"
  //     ? setOrderList(orders)
  //     : setOrderList({});
  // }

  useEffect(() => {
    // fetchData();
    // fetchOrders();
  }, []);

  let totalPrice = 0;
  for (var key in itemTotal) {
    if (itemTotal.hasOwnProperty(key)) {
      totalPrice += itemTotal[key].total;
    }
  }

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
                  <Tab label="All" {...a11yProps(0)} />
                  {category?.map((menuData, index) => (
                    <Tab
                      label={menuData.name}
                      {...a11yProps(index + 1)}
                      key={index + 1}
                    />
                  ))}
                </Tabs>

                {/* Category Card should render in 'all' tab */}
                {value === 0 && (
                  <CategoryCard
                    category={category}
                    click={(id, index, child) => {
                      fetchSubCategoryHandler(id, index, child);
                      setCategoryID(id);
                    }}
                  />
                )}
                {/* Category Card Ends Here */}

                {/* Tabs food menus */}
                {child?.map((children, index) => {
                  return (
                    <Accordion
                      onClick={() => fetchProductsHandler(children.id)}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography className={classes.heading}>
                          {children.name}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {products.map((product) => {
                          return (
                            <div>
                              {product.name}
                              {product.selling_price}
                            </div>
                          );
                        })}
                        {/* <ProductList
                          key={index}
                          className={classes.product}
                          product={item}
                          menuIndex={index}
                          index={index}
                          itemTotal={itemTotal}
                          addItem={addItem}
                          removeItem={removeItem}
                        /> */}
                      </AccordionDetails>
                    </Accordion>
                  );
                })}
                {/* {products?.map((product, index) => (
                  <TabPanel
                    className={classes.panel}
                    key={index + 1}
                    value={value}
                    index={index + 1}
                  >
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography className={classes.heading}>
                          {product.name}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <ProductList
                          key={index}
                          className={classes.product}
                          product={product}
                          menuIndex={index}
                          index={index}
                          itemTotal={itemTotal}
                          addItem={addItem}
                          removeItem={removeItem}
                        />
                      </AccordionDetails>
                    </Accordion>
                  </TabPanel>
                ))} */}
              </div>

              {/* View Order Button */}
              {/* <Grid container className={classes.orderBtnContainer}>
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
              </Grid> */}
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
