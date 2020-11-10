import {Button, makeStyles, Typography} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import LogoInfo from './LogoInfo';
import {API_BASE} from '../Constant';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `url("https://www.scandichotels.com/imagevault/publishedmedia/qn6infvg30381stkubky/scandic-sundsvall-city-restaurant-verket-10.jpg")`,
  },
  secondRoot: {
    borderRadius: '20px 20px 0px 0px',
    backgroundColor: '#ECECEC',
    height: '76vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  stepper: {
    backgroundColor: '#ECECEC',
    borderRadius: '20px 20px 0px 0px',
    '& .MuiStepIcon-root.MuiStepIcon-completed': {
      color: 'green',
    },
    '& .MuiStepIcon-root.MuiStepIcon-active': {
      color: '#CECECE',
    },
  },
  svg: {
    display: 'flex',
    justifyContent: 'center',
  },
  svgs: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  svgCp: {
    padding: '24px',
  },
  txt1: {
    color: '#000000',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: '28px',
    display: 'flex',
    justifyContent: 'center',
  },
  txt2: {
    color: '#000000',
    textTransform: 'uppercase',
    fontSize: '14px',
    display: 'flex',
    justifyContent: 'center',
  },
  btns: {
    display: 'flex',
    flexDirection: 'column',
    padding: '24px',
  },
  cpBtn: {
    marginBottom: '10px',
    backgroundColor: '#a62a22',
    color: 'white',
  },
  doneBtn: {
    backgroundColor: '#273238',
    color: 'white',
  },
}));

function getSteps() {
  return ['QR CODE', 'ORDER', 'CONFIRM', 'COMPLETE'];
}

const Success = ({props}) => {
  const classes = useStyles();
  const [menuList, setMenuList] = useState({});
  const [hasError, setErrors] = useState(false);
  const [activeStep, setActiveStep] = useState(+4);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  async function fetchData() {
    const res = await fetch(
      API_BASE + 'company/af174b04-b495-47c1-bc32-c0dff7170c34/menu'
    );
    res
      .json()
      .then((res) => setMenuList(res))
      .catch((err) => setErrors(err));
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={classes.root}>
      <LogoInfo menuList={menuList} props={props} />
      <div className={classes.secondRoot}>
        <Stepper activeStep={activeStep} className={classes.stepper}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div className={classes.txt}>
          <div className={classes.svg}>
            <img src="/complete.svg" alt="complete" className={classes.img} />
          </div>
          <Typography className={classes.txt1}>Order Success</Typography>
          <Typography className={classes.txt2}>
            Your food will arrive shortly
          </Typography>
        </div>
        <div className={classes.svgs}>
          <img className={classes.svgCp} src="/Cp.svg" alt="Cp" />
          <img src="/Discount.svg" alt="Cp" className={classes.svgs} />
        </div>
        <div className={classes.btns}>
          <Button variant="contained" className={classes.cpBtn}>
            Go To Cupponpro
          </Button>
          <Button variant="contained" className={classes.doneBtn}>
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Success;
