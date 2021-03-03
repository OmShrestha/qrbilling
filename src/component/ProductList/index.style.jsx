import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
    display: "flex",
    justifyContent: "space-between",
    padding: "9px 20px",
    alignItems: "center",
    width: "100%",
  },
  buttons: {
    border: `1px solid ${theme.palette.secondary.dark}`,
    borderRadius: "10px",
    fontFamily: "SF Pro Display",
    "& .MuiButton-root": {
      minWidth: "45px",
    },
  },
  addOrder: {
    border: `0.5px solid ${theme.palette.secondary.gray}`,
    borderRadius: "10px",
    fontSize: "12px",
    fontWeight: 400,
    backgroundColor: theme.palette.primary.main,
    fontFamily: "SF Pro Display",
    color: theme.palette.secondary.main,
    padding: "4px 8px",
  },
  productName: {
    fontSize: "16px",
    color: theme.palette.secondary.dark,
    fontFamily: "SF Pro Display",
    textTransform: "capitalize",
    opacity: 0.4,
  },
  productPrice: {
    fontFamily: "SF Pro Display",
    fontSize: "16px",
    color: "#9e9e9e",
  },
  viewImg: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: "5px",
  },
  viewTxt: {
    cursor: "pointer",
    fontFamily: "SF Pro Display",
    marginLeft: "5px",
    padding: "2px 5px",
    fontSize: "11px",
    backgroundColor: theme.palette.secondary.gray,
  },
  imgView: {
    position: "fixed" /* Stay in place */,
    zIndex: "1" /* Sit on top */,
    paddingTop: "100px" /* Location of the box */,
    left: "0",
    top: "0",
    width: "100%" /* Full width */,
    height: "100%" /* Full height */,
    overflow: "auto" /* Enable scroll if needed */,
    //backgroundColor: 'rgb(0,0,0)' /* Fallback color */,
    backgroundColor: "rgba(0,0,0,0.9)" /* Black w/ opacity */,
  },
  dividerColor: {
    background: theme.palette.secondary.gray,
    width: "90%",
  },
}));
