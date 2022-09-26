import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import classes from "./MainNavigation.module.css";
import logo from '../../assets/logo.png';
import AuthContext from "../../store/auth-context";
import CartContext from '../pages/ShopSystem/Cart/store/cart-context';
const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const isLoggedIn = authCtx.isLoggedIn;

  const { items } = cartCtx;
  const [isMobile, setMobile] = useState(window.innerWidth > 1200);
  const updateMedia = () => {
    setMobile(window.innerWidth > 500);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });
  const bumpclass = `${classes.li} ${btnIsHighlighted ? classes.bump : ''}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);


  const cartq = items.reduce((curNumber, item) => {
    return curNumber + item.quantity;
  }, 0);
  
  const logoutHandler = () => {
    authCtx.logout();
  };

  return (
    <header className={classes.header}>
     {isMobile ?  <NavLink className={classes.navhide}  exact to="/"><img className={classes.logoimg} src={logo} alt="The Beatles" /></NavLink>
     : <NavLink activeClassName={classes.active} className={classes.home} exact to="/">Home</NavLink>
     }
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <NavLink activeClassName={classes.active} to="Access">Access</NavLink>
            </li>
          )}

          {isLoggedIn && (
            <li>
              <NavLink activeClassName={classes.active} to="Dashboard">Dashboard</NavLink>
            </li>
          )}
         
           {isLoggedIn && (
            <li className={bumpclass}>
              <NavLink activeClassName={classes.active} to="Cart">Cart 
              {cartq !== 0 && <font className={classes.cartquant}>{cartq}</font>}</NavLink>
            </li>
          )}
        
            {isLoggedIn && (
            <li>
              <NavLink activeClassName={classes.active} to="/Shop">Shop</NavLink>
            </li>
          )}
          
          {isLoggedIn && (
            <li>
              <NavLink  to="/"><button className={classes.logout} onClick={logoutHandler}>Logout</button></NavLink> 
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
