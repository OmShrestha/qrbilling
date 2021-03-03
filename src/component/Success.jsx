import { Button, makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";
import LogoInfo from "./LogoInfo";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `url("https://www.scandichotels.com/imagevault/publishedmedia/qn6infvg30381stkubky/scandic-sundsvall-city-restaurant-verket-10.jpg")`,
    fontFamily: "SF Pro Display Regular",
  },
  secondRoot: {
    borderRadius: "20px 20px 0px 0px",
    padding: "18px 0",
    backgroundColor: theme.palette.secondary.gray,
    height: "73vh",
    display: "flex",
    flexDirection: "column",
  },
  stepper: {
    backgroundColor: theme.palette.secondary.gray,
    borderRadius: "20px 20px 0px 0px",
    padding: "0 8px",
    "& .MuiStepIcon-root.MuiSvgIcon-root": {
      height: "0.7em",
      width: "0.7em",
    },
    "& .MuiStepIcon-root.MuiStepIcon-completed": {
      color: theme.palette.primary.dark,
    },
    "& .MuiStepIcon-root.MuiStepIcon-active": {
      color: theme.palette.secondary.gray,
    },
  },
  steps: {
    flexDirection: "column",
    "& .MuiStepLabel-label.MuiStepLabel-active, & .MuiStepLabel-label.MuiStepLabel-completed": {
      fontSize: "0.675rem",
      fontWeight: 700,
    },
  },
  showCase: {
    flex: "1 0 auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  svg: {
    display: "flex",
    justifyContent: "center",
  },
  otherImages: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  cupponproSVG: {
    paddingLeft: "24px",
    width: "40%",
  },
  discountSVG: {
    width: "40%",
  },
  successText: {
    color: theme.palette.secondary.dark,
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: "28px",
    display: "flex",
    justifyContent: "center",
  },
  successSubText: {
    color: theme.palette.secondary.dark,
    textTransform: "uppercase",
    fontSize: "14px",
    display: "flex",
    justifyContent: "center",
  },
  btnGroups: {
    display: "flex",
    padding: "0 24px",
    flexDirection: "column",
  },
  btnCupponpro: {
    marginBottom: "10px",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.main,
    },
    "& a, & a:hover, & a:focus": {
      color: theme.palette.secondary.main,
      textDecoration: "none",
    },
  },
  btnDone: {
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.secondary.main,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.secondary.dark,
    },
    "& a, & a:hover, & a:focus": {
      color: theme.palette.secondary.main,
      textDecoration: "none",
    },
    "button:focus": {
      outline: "none",
    },
  },
}));

function getSteps() {
  return ["QR CODE", "ORDER", "CONFIRM", "COMPLETE"];
}

const Success = ({ props }) => {
  const classes = useStyles();
  const [menuList, setMenuList] = useState({});
  //const [hasError, setErrors] = useState(false);
  const [activeStep, setActiveStep] = useState(+4);
  const steps = getSteps();

  return (
    <div className={classes.root}>
      <LogoInfo menuList={menuList} props={props} />
      <div className={classes.secondRoot}>
        <Stepper activeStep={activeStep} className={classes.stepper}>
          {steps.map((label) => (
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
            <Typography className={classes.successText}>
              Order Success
            </Typography>
            <Typography className={classes.successSubText}>
              Your food will arrive shortly
            </Typography>
          </div>
          <div className={classes.otherImages}>
            <img className={classes.cupponproSVG} src="/Cp.svg" alt="Cp" />
            <img src="/Discount.svg" alt="Cp" className={classes.discountSVG} />
          </div>
        </div>
        <div className={classes.btnGroups}>
          <Button variant="contained" className={classes.btnCupponpro}>
            <a href={"https://cupponpro.com/"}>Go To Cupponpro</a>
          </Button>
          <Link
            to={"/"}
            className={classes.btnDone}
            style={{ textAlign: "center" }}
          >
            <Button variant="contained" className={classes.btnDone}>
              Done
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
