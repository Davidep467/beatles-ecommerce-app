import { React, useContext, useState, useRef, useEffect } from "react";
import styling from "../../../../components/Loading.module.css";
import classes from "./Cart.module.css";
import CartContext from "./store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import ClCaModal from "./ClCaModal";
import { CSSTransition } from "react-transition-group";
import cart from "../../../../assets/cart.jpg";
import "./styles.css";

const Cart = () => {
  const formRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [Submitted, setDidSubmit] = useState(false);
  const [isOrder, setOrder] = useState(false);
  const [isClear, setClear] = useState(false);
  const cartCtx = useContext(CartContext);
  const totalAmount = `£${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const bodyClasses = classes.cont;
  const checkform = `${classes.checkout} ${
    isOrder ? classes.checkoutclosed : ""
  }`;

  const [isMobile, setMobile] = useState(window.innerWidth > 1200);
  const updateMedia = () => {
    setMobile(window.innerWidth > 500);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });
  
  const startOrder = () => {
    setOrder(true);
    formRef.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  const stopOrderMobile = () => {
    setOrder(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const stopOrder = () => {
    setOrder(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const fromCartItemAddHandler = (item) => {
    cartCtx.addItemFromCart(item);
  };

  const ModalOpener = () => {
    setClear(true);
  };

  const ModalCloser = () => {
    setClear(false);
  };
  const CartClearer = () => {
    // window.confirm('Are you sure you wish to clear the cart?');
    cartCtx.clearCart();
    setClear(false);
  };

  const Submiting = (
    <section className={styling.loadersec}>
      <div className={styling.loader}></div>
    </section>
  );
  const Submited = (
    <h1 style={{ textAlign: "center" }}>Order Successfully Sent!</h1>
  );

  const submitOrderHandler = (userData) => {
    setIsSubmitting(true);
    fetch(
      "https://beatles-app-default-rtdb.europe-west1.firebasedatabase.app/Orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    )
      .then((res) => {
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
      })

      .catch((err) => {
        let errorMessage =
          "Something went wrong on our server! Please try again later.";
        alert(errorMessage);
      });
  };

  const CartList = (
    <div>
      {cartCtx.items.map((things) => (
        <CartItem
          key={things.id}
          id={things.id}
          Title={things.Title}
          quantity={things.quantity}
          Price={things.Price}
          image={things.image}
          onRemove={cartItemRemoveHandler.bind(null, things.id)}
          onAdd={fromCartItemAddHandler.bind(null, things)}
        />
      ))}
    </div>
  );

  return (
    <section className={bodyClasses}>
      
      <CSSTransition
        in={isClear}
        unmountOnExit
        onExited={ModalCloser}
        timeout={300}
        classNames="alert"
      >
        <ClCaModal onConfirming={CartClearer} onClosing={ModalCloser}>
          
          Sure?
        </ClCaModal>
      </CSSTransition>
      {hasItems && (
        <div>
          <div className={classes.cartlist}>
            <ul className={classes.list}> {CartList}</ul>
          </div>
          <h2 className={classes.total}>
            Total Order Amount: <u>{totalAmount}</u>
          </h2>

          {!isOrder && (
            <div className={classes.order}>
              <button onClick={startOrder}>Order Now</button>
              <button onClick={ModalOpener}>Clear Cart</button>
            </div>
          )}
          <div ref={formRef} className={checkform}>
           
          </div>
          {isOrder && !isSubmitting && (
            <div className={classes.close}>
              <div>
                <button onClick={isMobile ? stopOrderMobile : stopOrder}>Close</button>
                <Checkout onConfirm={submitOrderHandler} />
              </div>
            </div>
          )}

          <div>{isSubmitting && Submiting}</div>
        </div>
      )}

      <div>{!isSubmitting && Submitted && Submited}</div>

      <div>
        {!hasItems && !Submitted && (
          <h2 className={classes.empty}>Your Cart is Empty!</h2>
        )}
      </div>
      <img className={classes.bottomimg} src={cart} alt="" width="100%" />
    </section>
  );
};

export default Cart;
