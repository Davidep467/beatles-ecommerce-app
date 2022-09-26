import { useRef } from "react";
import classes from "./Checkout.module.css";
const Checkout = (props) => {
  const nameInputRef = useRef("");
  const surnameInputRef = useRef("");
  const addressInputRef = useRef("");
  const poscodeInputRef = useRef("");
  const cityInputRef = useRef("");
  const countryInputRef = useRef("");

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredSurname = surnameInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredPosCode = poscodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredCountry = countryInputRef.current.value;

    props.onConfirm({
      name: enteredName,
      surname: enteredSurname,
      address: enteredAddress,
      postalCode: enteredPosCode,
      city: enteredCity,
      country: enteredCountry,
    });
  };

  return (
    <form className={classes.formship} onSubmit={confirmHandler}>
      <h2>Ship to</h2>
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" ref={nameInputRef} required />
      </div>
      <div>
        <label htmlFor="surname">Surname</label>
        <input type="text" id="surname" ref={surnameInputRef} required />
      </div>
      <div>
        <label htmlFor="address">Address</label>
        <input type="text" id="address" ref={addressInputRef} required />
      </div>
      <div>
        <label htmlFor="poscode">Postal Code</label>
        <input type="text" id="poscode" ref={poscodeInputRef} required />
      </div>
      <div>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} required />
      </div>
      <div>
        <label htmlFor="country">Country</label>
        <input type="text" id="country" ref={countryInputRef} required />
      </div>
      <button className={classes.shipbut}>Submit Order</button>
    </form>
  );
};

export default Checkout;
