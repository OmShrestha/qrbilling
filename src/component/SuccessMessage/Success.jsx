import { Button, Typography } from "@material-ui/core";
import React, { useState } from "react";
import LogoInfo from "../LogoInfo";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import { Link } from "react-router-dom";
import useStyles from "./Success.style";

function getSteps() {
  return ["QR CODE", "ORDER", "CONFIRM", "COMPLETE"];
}

const Success = ({ props }) => {
  const classes = useStyles();
  const [menuList, setMenuList] = useState({});
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
