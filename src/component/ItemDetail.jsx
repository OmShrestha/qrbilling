import React, { useState, useEffect, useParams } from 'react';
import { ListGroup, ListGroupItem, Badge, Card, CardTitle, CardSubtitle, CardBody, Button } from 'reactstrap';
import { Accordion } from 'bootstrap';
import { PlusSquare, DashSquare } from 'react-bootstrap-icons';
import RedeemForm from './RedeemForm';
import { API_BASE } from '../Constant';

const ItemDetails = props => {
  const [hasError, setErrors] = useState(false);
  const [orderSaved, setOrderSaved] = useState(false);
  const [menuList, setMenuList] = useState({});
  const [itemTotal, setItemTotal] = useState({});
  const [redeem, setRedeem] = useState(false);

  const proceedToRedeem = () => {};

  async function saveOrder() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(itemTotal),
    };
    fetch(API_BASE + 'company/asset/order/create', requestOptions)
      .then(response => response.json())
      .then(data => setOrderSaved({ postId: data.id }));
    console.log(orderSaved, 'hehe');
  }

  const addItem = (highIndex, index, price, itemName) => {
    let newData = {
      ...itemTotal,
      [highIndex + index]: {
        name: itemName,
        perPlate: price,
        number:
          itemTotal[highIndex + index] && itemTotal[highIndex + index].number
            ? itemTotal[highIndex + index].number + 1
            : 0 + 1,
        total:
          itemTotal[highIndex + index] && itemTotal[highIndex + index].number
            ? (itemTotal[highIndex + index].number + 1) * price
            : (0 + 1) * price,
      },
    };
    setItemTotal(newData);
  };

  const removeItem = (highIndex, index, price, itemName) => {
    if (itemTotal[highIndex + index] && itemTotal[highIndex + index].number > 0) {
      let newData = {
        ...itemTotal,
        [highIndex + index]: {
          name: itemName,
          perPlate: price,
          number:
            itemTotal[highIndex + index] && itemTotal[highIndex + index].number
              ? itemTotal[highIndex + index].number - 1
              : 0 - 1,
          total:
            itemTotal[highIndex + index] && itemTotal[highIndex + index].number
              ? (itemTotal[highIndex + index].number - 1) * price
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
  const query = new URLSearchParams(props.location.search);

  return (
    <div>
      {redeem ? (
        <RedeemForm></RedeemForm>
      ) : (
        <div>
          <Card>
            <CardBody>
              <CardTitle>
                <strong>Hotel Om Palace</strong>
              </CardTitle>
              <CardSubtitle>Table No {query.get('table_no')}</CardSubtitle>
            </CardBody>
          </Card>
          {menuList &&
            menuList.data &&
            menuList.data.menu.map((menuData, highIndex) => (
              <ul className="list-group" key={highIndex}>
                <li className="list-group-item float-left active ">{menuData.category_name}</li>
                {menuData.products.map((menuItem, index) => (
                  <li className="list-group-item" key={index}>
                    {`${menuItem.name} (Rs ${menuItem.price})`}
                    {itemTotal[highIndex.toString() + index.toString()] ? (
                      <span>
                        <Badge
                          color="success"
                          className="ml-4"
                          type="button"
                          onClick={() => addItem(highIndex.toString(), index.toString(), menuItem.price, menuItem.name)}
                        >
                          <PlusSquare />
                        </Badge>
                        <span style={{ marginLeft: 20 }}>
                          {(itemTotal[highIndex.toString() + index.toString()] &&
                            itemTotal[highIndex.toString() + index.toString()].number) ||
                            0}
                        </span>
                        <Badge
                          color="danger"
                          className="ml-4"
                          type="button"
                          onClick={() =>
                            removeItem(highIndex.toString(), index.toString(), menuItem.price, menuItem.name)
                          }
                        >
                          <DashSquare />
                        </Badge>
                        <span style={{ marginLeft: 20 }}>
                          Rs{' '}
                          {(itemTotal[highIndex.toString() + index.toString()] &&
                            itemTotal[highIndex.toString() + index.toString()].total) ||
                            0}{' '}
                        </span>
                      </span>
                    ) : (
                      <Button
                        color="primary"
                        size="sm"
                        onClick={() => addItem(highIndex.toString(), index.toString(), menuItem.price, menuItem.name)}
                      >
                        Add Order
                      </Button>
                    )}
                  </li>
                ))}
              </ul>
            ))}
          <Button color="primary" size="lg" onClick={() => saveOrder()}>
            Proceed
          </Button>{' '}
        </div>
      )}
    </div>
  );
};

export default ItemDetails;
