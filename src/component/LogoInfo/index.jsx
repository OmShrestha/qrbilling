import { Badge, Card, CardContent, Typography } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const useStyles = makeStyles(theme => ({
  back: {
    cursor: 'pointer',
    margin: '8px 16px',
  },
  shape: {
    backgroundColor: 'white',
    width: 30,
    height: 30,
  },
  shapeCircle: {
    borderRadius: '50%',
  },
  arrow: {
    margin: '5px 0 0px 10px',
    fontSize: '1rem'
  },
  card: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 16px 30px',
    margin: '18px 0 0'
  },
  logo: {
    backgroundColor: '#F8F9F9',
    borderRadius: '5px',
    width: '25%',
    height: '106px',
    marginRight: '8px'
  },
  img: {
    width: '106px',
    height: '106px',
    objectFit: 'cover',
  },
  info: {
    backgroundColor: '#F8F9F9',
    borderRadius: '5px',
    width: '72%',
    height: '106px',
  },
  cardContent:{
    padding: '6px 12px',
  },
  resName: {
    fontSize: '14pt',
    fontWeight: 'bold',
    lineHeight: '22px'
  },
  tableNumber: {
    fontSize: '12pt',
    lineHeight: '22px',
    marginBottom: '3px'
  },
  txt: {
    fontSize: '12pt',
    lineHeight: '22px'
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
            <CardContent className={classes.cardContent}>
              <Typography className={classes.resName}>{menuList.data.name}</Typography>
              <Typography className={classes.tableNumber}>Table No {tableNumber}</Typography>
              <Typography className={classes.txt}>Lorem ipsum, dolor sit amet consectetur adipisicing elit...</Typography>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default LogoInfo;
