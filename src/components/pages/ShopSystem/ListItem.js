import classes from "./ListItem.module.css";
import { HashLink as Link } from "react-router-hash-link";
import React from "react";
const ListItem = (props) => {
  return (
    <div>
      <Link  className={classes.listitem} smooth to={`/Shop#${props.Title}`}>
        <p className={classes.titleitem}>	&#10162; <u>{props.Title}</u></p>
      </Link>
    </div>
  );
};

export default ListItem;
