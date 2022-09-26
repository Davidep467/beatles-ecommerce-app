import classes from './CartItem.module.css';

const CartItem = (props) => {
  return (
    <div className={classes.cartitemcont}>
      <h3 className={classes.carttitle}>{props.Title}</h3>
      <p>
        <img style={{ width: "200px", height: "200px" }} alt={props.Title} src={props.image} />
      </p>
      <p>
        Price: £ <b>{props.Price}</b>
      </p>
      <p>
        Quantity you are going to buy: <b> {props.quantity}</b>
      </p>
      <button onClick={props.onRemove}>−</button>
      {props.quantity < 5 ? (
        <button onClick={props.onAdd}>+</button>
      ) : (
        " Max 5 items are available "
      )}
    </div>
  );
};

export default CartItem;
