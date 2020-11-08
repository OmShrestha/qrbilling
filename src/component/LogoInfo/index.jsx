import { Badge, Card, CardContent, Typography } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const useStyles = makeStyles(theme => ({
  logo: {
    backgroundColor: '#F8F9F9',
    borderRadius: '5px',
    width: '25%',
  },
  info: {
    backgroundColor: '#F8F9F9',
    borderRadius: '5px',
    width: '74%',
  },
  img: {
    width: '100px',
    height: '100px',
    objectFit: 'contain',
  },
  card: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 16px',
  },

  arrow: {
    margin: '12px 0 0px 17px',
  },
  back: {
    cursor: 'pointer',
    margin: '8px 16px',
  },
  shape: {
    backgroundColor: 'white',
    width: 50,
    height: 50,
  },
  shapeCircle: {
    borderRadius: '50%',
  },
}));

const LogoInfo = ({ menuList, tableNumber }) => {
  const classes = useStyles();

  const circle = (
    <div className={clsx(classes.shape, classes.shapeCircle)}>
      <ArrowBackIosIcon className={classes.arrow} />
    </div>
  );
  return (
    <div>
      <Badge color="secondary" badgeContent={0} className={classes.back}>
        {circle}
      </Badge>
      <div className={classes.card}>
        {menuList && menuList.data && (
          <Card className={classes.logo}>
            <img src={menuList.data.logo} className={classes.img} />
          </Card>
        )}

        {menuList && menuList.data && (
          <Card className={classes.info}>
            <CardContent>
              <Typography>{menuList.data.name}</Typography>
            </CardContent>
            <CardContent>
              <Typography>Table No {tableNumber}</Typography>
            </CardContent>
            <CardContent>
              <Typography>Description</Typography>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default LogoInfo;
