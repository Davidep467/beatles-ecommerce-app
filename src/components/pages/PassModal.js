import classes from "./Modal.module.css";

const PassModal = (props) => {
  const Closing = (event) => {
    props.onClosing(event.target.value);
  };
  return (
    <div className={classes.modal}>
      <h1>{props.children}</h1>

      <button onClick={Closing}>Okay</button>
    </div>
  );
};
export default PassModal;
