import { Button, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import LogoInfo from './LogoInfo';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { BASE_URL } from '../Constant';
import { Link } from 'react-router-dom';
const useStyles = makeStyles(theme => ({
  root: {
    backgroundImage: `url("https://www.scandichotels.com/imagevault/publishedmedia/qn6infvg30381stkubky/scandic-sundsvall-city-restaurant-verket-10.jpg")`,
    fontFamily: 'SF Pro Display Regular',
  },
  secondRoot: {
    borderRadius: '20px 20px 0px 0px',
    padding: '18px 0',
    backgroundColor: '#ECECEC',
    height: '73vh',
    display: 'flex',
    flexDirection: 'column',
  },
  stepper: {
    backgroundColor: '#ECECEC',
    borderRadius: '20px 20px 0px 0px',
    padding: '0 24px',
    '& .MuiStepIcon-root.MuiStepIcon-completed': {
      color: 'green',
    },
    '& .MuiStepIcon-root.MuiStepIcon-active': {
      color: '#CECECE',
    },
  },
  steps: {
    flexDirection: 'column',
  },
  showCase: {
    flex: '1 0 auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  svg: {
    display: 'flex',
    justifyContent: 'center',
  },
  otherImages: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  cupponproSVG: {
    paddingLeft: '24px',
    width: '40%',
  },
  discountSVG: {
    width: '40%',
  },
  successText: {
    color: '#000000',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: '28px',
    display: 'flex',
    justifyContent: 'center',
  },
  successSubText: {
    color: '#000000',
    textTransform: 'uppercase',
    fontSize: '14px',
    display: 'flex',
    justifyContent: 'center',
  },
  btnGroups: {
    display: 'flex',
    padding: '0 24px',
    flexDirection: 'column',
  },
  btnCupponpro: {
    marginBottom: '10px',
    backgroundColor: '#a62a22',
    color: 'white',
  },
  btnDone: {
    backgroundColor: '#273238',
    color: 'white',
  },
}));

function getSteps() {
  return ['QR CODE', 'ORDER', 'CONFIRM', 'COMPLETE'];
}

const Success = ({ props }) => {
  const classes = useStyles();
  const [menuList, setMenuList] = useState({});
  const [hasError, setErrors] = useState(false);
  const [activeStep, setActiveStep] = useState(+4);
  const steps = getSteps();

  return (
    <div className={classes.root}>
      <LogoInfo menuList={menuList} props={props} />
      <div className={classes.secondRoot}>
        <Stepper activeStep={activeStep} className={classes.stepper}>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel className={classes.steps}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div className={classes.showCase}>
          <div className={classes.svg}>
            <img src="/complete.svg" alt="complete" className={classes.img} />
          </div>
          <div>
            <Typography className={classes.successText}>Order Success</Typography>
            <Typography className={classes.successSubText}>Your food will arrive shortly</Typography>
          </div>
          <div className={classes.otherImages}>
            <img className={classes.cupponproSVG} src="/Cp.svg" alt="Cp" />
            <img src="/Discount.svg" alt="Cp" className={classes.discountSVG} />
          </div>
        </div>
        <div className={classes.btnGroups}>
          <Button variant="contained" className={classes.btnCupponpro}>
            <a href={'https://cupponpro.com/'}>addEventListener Go To Cupponpro</a>
          </Button>
          <Button variant="contained" className={classes.btnDone}>
            <Link to={'/'}>Done</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Success;
