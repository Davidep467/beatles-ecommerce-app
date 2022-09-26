import classes from "./LpsItemForm.module.css";
import React, { useRef } from "react";

const LpsItemForm = (props) => {
  const quantityone = useRef("");

  function submitPreorder(event) {
    event.preventDefault();

    const enteredAmount = quantityone.current.value;
    const preord = +enteredAmount;

    props.onAddPreorder(preord);
  }

  return (
    <form onSubmit={submitPreorder}>
      <div className={classes.quantityform}>
        <label>Quantity</label>
        <select ref={quantityone}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>

      <button>Update Cart Quantity</button>
    </form>
  );
};
export default LpsItemForm;
