import React from 'react';
import { Typography } from '@material-ui/core';

const Bill = props => {
  const { classes, billingInfo, totalPrice, serviceCharge, taxCharge, grandTotal } = props;
  return (
    <div>
      <div className={classes.bill}>
        <Typography className={classes.billTxt}>Bill</Typography>
        <div className={classes.billing}>
          <div>Sub Total</div>
          <div className={classes.price}>
            Rs.
            {(billingInfo.data && billingInfo.data.total) + (billingInfo.data && billingInfo.data.discount_amount) ||
              totalPrice}
          </div>
        </div>
        {billingInfo.data && billingInfo.data.discount_amount > 0 && (
          <div className={classes.billing}>
            <div>Discount</div>
            <div className={classes.price}>
              Rs.
              {(billingInfo.data && billingInfo.data.discount_amount && billingInfo.data.discount_amount.toFixed(2)) ||
                0}
            </div>
          </div>
        )}
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

        <div className={classes.dot} />
        <div className={classes.total}>
          <div>Grand Total</div>
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
