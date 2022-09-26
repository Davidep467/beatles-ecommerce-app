import { Fragment, useContext } from "react";
import AuthContext from "../store/auth-context";
import { Link } from "react-router-dom";
import classes from "./TopPage.module.css";
import home from "../assets/home.jpg";

const TopPage = () => {
  const authCtx = useContext(AuthContext);
  return (
    <Fragment>
      <div className={classes.cont}>
        <h1 className={classes.bigtitle}>BUY ORIGINAL BEATLES LPs</h1>

        <h2 className={classes.smalltitle}>
          Login or Register to access our store and buy your original Beatles
          old records from the 60s{" "}
        </h2>
        <Link to={authCtx.isLoggedIn ? "/Shop" : "/Access"}>
          <button className={classes.gobutton}>GO</button>{" "}
        </Link>
      </div>
      <img src={home} alt="" width="100%" />
    </Fragment>
  );
};
export default TopPage;
