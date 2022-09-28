
import classes from "./Dashboard.module.css";
import dash from '../../assets/dash.jpg';

const Dashboard = () => {
  return (
    <section className={classes.cont}>
       <div className={classes.welcome}> 
       <h1 className={classes.h1}>Welcome to your Dashboard!</h1>
       <h3 className={classes.h3}> You can now start to shop. Go to the Shop page, select your favorite albums and go to Cart 
          in order to submit your order.</h3><br/>
         
          </div>

      <img src={dash}  alt="" width="100%" />
    </section>
  );
};

export default Dashboard;
