import { useState, useContext, useEffect } from "react";
import CartContext from "./Cart/store/cart-context";
import ImageHover from "./ImageHover";
import classes from "./LpsItem.module.css";
import LpsItemForm from "./LpsItemForm";
import { CSSTransition } from "react-transition-group";
import "./Cart/styles.css";
import MobileImageHover from './MobileImageHover';
const LpsItem = (props) => {
  const cartCtx = useContext(CartContext);
 
  const [isMobile, setMobile] = useState(window.innerWidth > 1200);
  const updateMedia = () => {
    setMobile(window.innerWidth > 500);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  const [isshrinked, setUnshrinked] = useState(false);

  const unShrink = () => {
    setUnshrinked(true);
  };
  const Shrink = () => {
    setUnshrinked(false);
  };

  const [isOver, setOver] = useState(false);
  const [isItems, setItems] = useState(true);

  const MouseOverHandler = () => {
    setOver(true);
  };

  const MouseOutHandler = () => {
    if(!isOver) {
    setOver(false);
    setItems(true);
    document.body.style.overflow = "auto";
  } 
  };
  const ItemsHandler = () => {
    setItems(false);
  };
  const addToCartHandler = (quantity) => {
    cartCtx.addItem({
      id: props.id,
      Title: props.Title,
      image: props.image,
      quantity: quantity,
      Price: props.Price,
    });
  };

  return (
    <div className={classes.container}>
      <aside className={classes.priceandtitle}>
        
        <h2 id={props.Title} className={classes.title}>
          {props.Title}  </h2>
          <div className={classes.shrinkanimclass}>
          <CSSTransition
          in={!isshrinked}
          unmountOnExit
          onExited={unShrink}
          timeout={300}
          classNames="item"
        ><div>
          {!isshrinked && (
            <button id="plusminus" type="button" onClick={unShrink}>
              &#9660;
            </button>
          )}</div></CSSTransition>
              <CSSTransition
          in={isshrinked}
          unmountOnExit
          onExited={Shrink}
          timeout={300}
          classNames="item"
        ><div>{isshrinked && (
            <button id="plusminus" type="button" onClick={Shrink}>
              &#9650;
            </button>
          )}</div></CSSTransition></div>
      
        <p>Price: £ {props.Price} </p>
        <LpsItemForm onAddPreorder={addToCartHandler} />
      </aside>

      <main>
        <CSSTransition
          in={isshrinked}
          unmountOnExit
          onExited={Shrink}
          timeout={300}
          classNames="item"
        >
          <div className={classes.item}>
            <CSSTransition
              in={isOver}
              unmountOnExit
              onEnter={ItemsHandler}
              onExited={MouseOutHandler}
              timeout={500}
              classNames="item"
            >
              <div   onMouseLeave={MouseOutHandler}>
                {isOver &&  <ImageHover {...props} />}
              </div>


      </CSSTransition>

            {isItems && isMobile && (
              <div>
                <img
                  onMouseOver={MouseOverHandler}
                  className={classes.cover}
                  alt=""
                  title={props.Title}
                  src={props.image}
                />
                <div className={classes.tracklist}>
                  <h4>Tracklist</h4>
<p>{props.t1}</p> <p> {props.t2}</p> <p>{props.t3}</p> <p>{props.t4}</p> <p>{props.t5}</p> <p>{props.t6}</p> <p>{props.t7}</p>
<p>{props.t8}</p> <p>{props.t9}</p> <p>{props.t10}</p> <p>{props.t11}</p> <p>{props.t12}</p> <p>{props.t13}</p> <p>{props.t14}</p>
<p>{props.t15}</p> <p>{props.t16}</p> <p>{props.t17}</p> <p>{props.t18}</p> <p>{props.t19}</p> <p>{props.t20}</p> <p>{props.t21}</p>
<p>{props.t22}</p> <p>{props.t23}</p> <p>{props.t24}</p> <p>{props.t25}</p> <p>{props.t26}</p> <p>{props.t27}</p> <p>{props.t28}</p>
<p>{props.t29}</p> <p>{props.t30}</p>
                </div>
              </div>
            )}
{isItems && !isMobile && (
<MobileImageHover {...props} />
)}
          </div>
        </CSSTransition>
      </main>
    </div>
  );
};

export default LpsItem;
