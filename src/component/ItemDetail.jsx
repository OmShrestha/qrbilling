//Library
import React, { useState, useEffect } from "react";

// material
import PropTypes from "prop-types";
import {
  Tabs,
  Tab,
  Grid,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@material-ui/core";
import { ExpandMore as ExpandMoreIcon } from "@material-ui/icons";

//Local
import LogoInfo from "./LogoInfo";
import CustomSearchBar from "./SearchBar";
import BillingForm from "./Billing";
import styles from "./ItemDetail.style";
import ProductList from "./ProductList";
import CategoryCard from "./categoryCard/categoryCard";
import { fetchAllProduct, fetchProduct } from "../services/fetchProductService";
import { fetchCategory } from "../services/categoryService";
import { fetchCompanyData } from "../services/logoService";
import CartIcon from "./ItemDetail/component/CartIcon";
import { fetchAllOrders } from "../services/orderServices";

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

  const [value, setValue] = useState(0);
  const [mainCategory, setMainCategory] = useState(null);
  const [products, setProducts] = useState(null);
  const [hasError, setErrors] = useState(false);
  const [menuList, setMenuList] = useState({});
  // const [orderSaved, setOrderSaved] = useState(false);
  const [orderList, setOrderList] = useState({});
  const [itemTotal, setItemTotal] = useState({});
  const [redeem, setRedeem] = useState(false);
  const [subCategoryID, setSubCategoryID] = useState(null);
  const [child, setChild] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [allProducts, setAllProducts] = useState(null);
  const [filteredProducts, setfilteredProducts] = useState(null);

  const query = new URLSearchParams(props.location.search);
  const proceedToRedeem = () => {
    setRedeem(!redeem);
  };

  const handleSearchChange = (e) => {
    //go to all tab first
    setValue(0);

    let result = allProducts?.filter((product) =>
      product.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    e.target.value.length > 0
      ? setfilteredProducts(result)
      : setfilteredProducts(null);
  };

  //Handle Category Tab/Slider Change
  const handleTabChange = (event, newValue, isExpanded) => {
    setValue(newValue);
    setProducts(null);
    setSubCategoryID(null);
  };

  //Tooggling Accordians
  const handleAccordianChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  //Fetch when Products Accordian is clicked
  const fetchProductsHandler = async (currentID) => {
    subCategoryID !== currentID &&
      fetchProduct(props.match.params.id, currentID)
        .then((res) => setProducts(res.data.data))
        .then(() => setSubCategoryID(currentID))
        .catch((err) => alert(err));
  };

  useEffect(() => {
    fetchCompanyDataHandler();
    fetchAllProduct(props.match.params.id).then((res) =>
      setAllProducts(res.data.data)
    );
  }, []);

  const fetchCompanyDataHandler = () => {
    fetchCompanyData(props.match.params.id, query.get("table_no"))
      .then((res) => setMenuList(res.data))
      .catch((err) => setErrors(err));
  };

  //Save Orders
  // async function saveOrder() {
  //   const requestOptions = {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(itemTotal),
  //   };
  //   saveAllOrder(requestOptions).then((res) =>
  //     setOrderSaved({ postId: res.data.id })
  //   );
  // }

  // Get All Previous Orders
  async function fetchOrders() {
    let orderListOrderLines = [];
    const res = await fetchAllOrders(query.get("table_no"));
    const status = res.data.status;

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

  //Get All The Main Category
  useEffect(() => {
    const getMainCategory = async () => {
      fetchCategory(props.match.params.id)
        .then((res) => setMainCategory(res.data.records))
        .catch((res) => alert(res));
    };
    getMainCategory();
    fetchOrders();
  }, [props.match.params.id]);

  //Fetch Sub Category when category card is clicked
  const fetchSubCategoryHandler = async (id, index, child) => {
    setChild(null);
    setValue(index);
    child.length > 0 ? setChild(child) : fetchProductsHandler(id);
  };

  const addItem = (
    menuIndex,
    index,
    selling_price,
    itemName,
    id,
    productCode
  ) => {
    let newData = {
      ...itemTotal,
      [menuIndex + index]: {
        id: id,
        productCode: productCode,
        name: itemName,
        perPlate: selling_price,
        number:
          itemTotal[menuIndex + index] && itemTotal[menuIndex + index].number
            ? itemTotal[menuIndex + index].number + 1
            : 0 + 1,
        total:
          itemTotal[menuIndex + index] && itemTotal[menuIndex + index].number
            ? (itemTotal[menuIndex + index].number + 1) * selling_price
            : (0 + 1) * selling_price,
      },
    };
    setItemTotal(newData);
  };

  const removeItem = (
    menuIndex,
    index,
    selling_price,
    itemName,
    id,
    productCode
  ) => {
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
          perPlate: selling_price,
          number:
            itemTotal[menuIndex + index] && itemTotal[menuIndex + index].number
              ? itemTotal[menuIndex + index].number - 1
              : 0 - 1,
          total:
            itemTotal[menuIndex + index] && itemTotal[menuIndex + index].number
              ? (itemTotal[menuIndex + index].number - 1) * selling_price
              : (0 - 1) * selling_price,
        },
      };
      if (itemTotal[menuIndex + index].number - 1 === 0) {
        setItemTotal(newData);
      } else {
        setItemTotal(newData);
      }
    } else if (
      itemTotal[menuIndex + index] &&
      itemTotal[menuIndex + index].number === 0
    ) {
      const allItem = itemTotal;
      let key;
      for (key in allItem) {
        if (allItem[key] == [menuIndex + index]) {
          delete allItem[key];
        }
      }
      setItemTotal(allItem);
    }
  };

  console.log(itemTotal);

  const productList = products?.map((product, index) => {
    return (
      <Grid container direction="column" justify="center" key={index}>
        <Grid item xs={12}>
          <ProductList
            key={index}
            className={classes.product}
            product={product}
            menuIndex={value}
            index={index}
            itemTotal={itemTotal}
            addItem={addItem}
            removeItem={removeItem}
          />
        </Grid>
      </Grid>
    );
  });

  let totalPrice = 0;
  for (var key in itemTotal) {
    if (itemTotal.hasOwnProperty(key)) {
      totalPrice += itemTotal[key]?.total;
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
          <LogoInfo
            goToCart={proceedToRedeem}
            cartItems={Object.keys(itemTotal).length}
            menuList={menuList}
            tableNumber={query.get("table_no")}
          />
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
                <Typography className={classes.searchBarTitle}>
                  What do you want to eat today?
                </Typography>
                <CustomSearchBar
                  filters={filteredProducts}
                  change={(e) => handleSearchChange(e)}
                />

                <Tabs
                  className={classes.tabs}
                  value={value}
                  onChange={handleTabChange}
                  variant="scrollable"
                  scrollButtons="off"
                  aria-label="scrollable prevent tabs example"
                >
                  <Tab className={classes.tab} label="All" {...a11yProps(0)} />
                  {mainCategory?.map((menuData, index) => (
                    <Tab
                      className={classes.tab}
                      label={menuData.name}
                      {...a11yProps(index + 1)}
                      key={index + 1}
                      onClick={() =>
                        menuData.child.length > 0
                          ? setChild(menuData.child)
                          : (fetchProductsHandler(menuData.id), setChild(null))
                      }
                    />
                  ))}
                </Tabs>

                {/* Category Card should render in 'all' tab || in index 0*/}
                {value === 0 ? (
                  filteredProducts === null ? (
                    <CategoryCard
                      category={mainCategory}
                      click={(id, index, child) => {
                        fetchSubCategoryHandler(id, index, child);
                      }}
                    />
                  ) : (
                    //if index 0 and isSearching then render filtered product
                    filteredProducts?.map((product, index) => {
                      return (
                        <Grid
                          container
                          direction="column"
                          justify="center"
                          key={index}
                        >
                          <Grid item xs={12}>
                            <ProductList
                              key={index}
                              className={classes.product}
                              product={product}
                              menuIndex={value}
                              index={index}
                              itemTotal={itemTotal}
                              addItem={addItem}
                              removeItem={removeItem}
                            />
                          </Grid>
                        </Grid>
                      );
                    })
                  )
                ) : // If Has child then render with Accordian(Sub Category)
                child?.length > 0 ? (
                  child?.map((children, index) => {
                    return (
                      <Accordion
                        expanded={expanded === `panel${index}`}
                        onChange={handleAccordianChange(`panel${index}`)}
                        className={classes.accordian}
                        key={index}
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
                        <AccordionDetails
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          {productList}
                        </AccordionDetails>
                      </Accordion>
                    );
                  })
                ) : (
                  // If no child then directly render product List
                  productList
                )}
              </div>

              {/* Checkout Button if order is added */}
              <CartIcon
                itemTotal={itemTotal}
                totalPrice={totalPrice}
                proceedToRedeem={proceedToRedeem}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ItemDetails;
