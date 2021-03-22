import { Button, makeStyles } from "@material-ui/core";
import React from "react";

const styles = makeStyles((theme) => ({
  root: {
    position: "relative",
    padding: 20,
    width: "100vw",
  },
  input: {
    outline: "none",
    border: "none",
    backgroundColor: theme.palette.secondary.gray,
    padding: 5,
    paddingLeft: 15,
    borderRadius: 40,
    width: "80vw",
    fontSize: 12,
    height: 30,
    opacity: 0.8,
    fontFamily: "Poppins",
  },
  searchButton: {
    height: 30,
    borderRadius: 40,
    backgroundColor: theme.palette.primary.main,
    padding: (0, 5),
    color: theme.palette.secondary.main,
    position: "absolute",
    top: 0,
    right: 20,
    marginTop: 20,
    width: "20vw",
    textTransform: "none",
    fontFamily: "SF Pro display",
  },
}));

const CustomSearchBar = (props) => {
  const classes = styles();
  return (
    <div className={classes.root}>
      <input
        onChange={(e) => props.change(e)}
        className={classes.input}
        type="text"
        placeholder="Search Foods..."
        aria-label="Search"
      />
      <Button variant="contained" className={classes.searchButton}>
        Search
      </Button>
    </div>
  );
};

export default CustomSearchBar;
