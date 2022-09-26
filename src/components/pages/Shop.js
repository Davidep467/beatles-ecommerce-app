import { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import classes from "../../components/Loading.module.css";
import LpsItem from "./ShopSystem/LpsItem";
import ListItem from "./ShopSystem/ListItem";
import styles from "./Shop.module.css";

const Shop = () => {
  const history = useHistory();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const [lps, setLps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLps = async () => {
      const response = await fetch(
        "https://beatles-app-default-rtdb.europe-west1.firebasedatabase.app/LPs.json"
      );

      const responseData = await response.json();

      const loadedLps = [];

      for (const key in responseData) {
        loadedLps.push({
          id: key,
          Title: responseData[key].Title,
          t1: responseData[key].t1,
          t2: responseData[key].t2,
          t3: responseData[key].t3,
          t4: responseData[key].t4,
          t5: responseData[key].t5,
          t6: responseData[key].t6,
          t7: responseData[key].t7,
          t8: responseData[key].t8,
          t9: responseData[key].t9,
          t10: responseData[key].t10,
          t11: responseData[key].t11,
          t12: responseData[key].t12,
          t13: responseData[key].t13,
          t14: responseData[key].t14,
          t15: responseData[key].t15,
          t16: responseData[key].t16,
          t17: responseData[key].t17,
          t18: responseData[key].t18,
          t19: responseData[key].t19,
          t20: responseData[key].t20,
          t21: responseData[key].t21,
          t22: responseData[key].t22,
          t23: responseData[key].t23,
          t24: responseData[key].t24,
          t25: responseData[key].t25,
          t26: responseData[key].t26,
          t27: responseData[key].t27,
          t28: responseData[key].t28,
          t29: responseData[key].t29,
          t30: responseData[key].t30,
          Price: responseData[key].Price,
          Listen: responseData[key].Listen,
          image: responseData[key].image,
          ndimage: responseData[key].ndimage,
          rdimage: responseData[key].rdimage,
          Description: responseData[key].Description,
        });
      }

      setLps(loadedLps);
      setIsLoading(false);
    };

    fetchLps().catch((err) => {
      let errorMessage =
        "Something went wrong on our server! Please try again later.";
      alert(errorMessage);
      history.replace("/");
    });
  }, [history]);
  const containerClasses = `${styles.container} ${
    isLoading ? styles.containerbis : ""
  }`;

  if (isLoading) {
    return (
      <div className={containerClasses}>
        <section className={classes.loadersec}>
          <div className={classes.loader}></div>
        </section>
      </div>
    );
  }

  const LpsList = lps.map((things) => (
    <LpsItem
      key={things.id}
      id={things.id}
      Title={things.Title}
      t1={things.t1}
      t2={things.t2}
      t3={things.t3}
      t4={things.t4}
      t5={things.t5}
      t6={things.t6}
      t7={things.t7}
      t8={things.t8}
      t9={things.t9}
      t10={things.t10}
      t11={things.t11}
      t12={things.t12}
      t13={things.t13}
      t14={things.t14}
      t15={things.t15}
      t16={things.t16}
      t17={things.t17}
      t18={things.t18}
      t19={things.t19}
      t20={things.t20}
      t21={things.t21}
      t22={things.t22}
      t23={things.t23}
      t24={things.t24}
      t25={things.t25}
      t26={things.t16}
      t27={things.t27}
      t28={things.t28}
      t29={things.t29}
      t30={things.t30}
      Price={things.Price}
      image={things.image}
      Listen={things.Listen}
      ndimage={things.ndimage}
      rdimage={things.rdimage}
      Description={things.Description}
    />
  ));

  const AlbumList = lps.map((things) => (
    <ListItem key={things.id} id={things.id} Title={things.Title} />
  ));

  return (
    <Fragment>
      <section className={styles.container}>
        <aside className={styles.albummenu}>
          <ul>{AlbumList}</ul>
        </aside>
        <main className={styles.list}>
          <button className={styles.gototopbut} onClick={scrollToTop}>
            	&#8682;
          </button>
          <ul>{LpsList}</ul>
        </main>
      </section>
      
    </Fragment>
  );
};

export default Shop;
