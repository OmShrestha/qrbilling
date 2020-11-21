import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  bill: {
    backgroundColor: '#FFFFFF',
    fontFamily: 'SF Pro Display Regular',
  },
  billTxt: {
    fontWeight: 'bold',
    fontFamily: 'SF Pro Display Regular',
    fontSize: '14px',
    padding: '16px 16px 8px',
    textTransform: 'uppercase'
  },
  billing: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '5px 16px',
    fontSize: '12px',
    textTransform: 'uppercase',
  },
  dot: {
    border: '1px dashed #707070',
    margin: '5px 0 -5px'
  },
  total: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '16px',
    fontSize: '12px',
    textTransform: 'uppercase',
    color: '#4EA23A',
    fontWeight: 700
  },
}))


const Bill = props => {
  const classes = useStyles();
  const { billingInfo, totalPrice, serviceCharge, taxCharge, grandTotal } = props;
  return (
    <div>
      <div className={classes.bill}>
        <Typography className={classes.billTxt}>Bill</Typography>
        <div className={classes.billing}>
          <div>Sub Total</div>
          <div className={classes.price}>
            Rs.
            {(billingInfo.data && billingInfo.data.service_charge) || totalPrice}
          </div>
        </div>
        <div container className={classes.billing}>
          <div>Restaurant service charge</div>
          <div className={classes.price}>
            Rs.
            {(billingInfo.data && billingInfo.data.service_charge_amount.toFixed(2)) || serviceCharge.toFixed(2)}
          </div>
        </div>
        <div className={classes.billing}>
          <div>VAT</div>
          <div className={classes.price}>
            Rs.
            {(billingInfo.data && billingInfo.data.taxed_amount.toFixed(2)) || taxCharge.toFixed(2)}
          </div>
        </div>
        {billingInfo.discount && (
          <div className={classes.billing}>
            <div>Discount</div>
            <div className={classes.price}>
              Rs.
              {(billingInfo.data && billingInfo.data.discount && billingInfo.data.discount.toFixed(2)) || 0}
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
  );
};

export default Bill;
