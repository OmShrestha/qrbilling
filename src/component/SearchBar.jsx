import { Button, makeStyles } from "@material-ui/core";
import React from "react";

const styles = makeStyles((theme) => ({
  root: {
    position: "relative",
    padding: 20,
  },
  input: {
    outline: "none",
    border: "none",
    backgroundColor: "#ECECEC",
    padding: 5,
    paddingLeft: 10,
    borderRadius: 40,
    width: "80vw",
  },
  searchButton: {
    borderRadius: 40,
    backgroundColor: "#A62A22",
    padding: (0, 5),
    color: "#fff",
    position: "absolute",
    top: 0,
    right: 20,
    marginTop: 20,
    width: 100,
  },
}));

const CustomSearchBar = (props) => {
  const classes = styles();
  return (
    <div className={classes.root}>
      <input
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
