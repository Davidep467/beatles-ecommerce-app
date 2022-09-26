import classes from '../../../pages/Modal.module.css'
const ClCaModal = (props) => {

const Confirm = (event) => {
     props.onConfirming(event.target.value);
};
const Closing = (event) => {
    props.onClosing(event.target.value);
};
return (

    <div className={classes.modal}>
       <h1>{props.children}</h1>
       <button onClick={Confirm}>Yes</button>
       <button onClick={Closing}>No</button>
    </div>
)

}
export default ClCaModal;