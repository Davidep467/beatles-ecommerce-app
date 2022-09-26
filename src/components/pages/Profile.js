import styling from "../../components/Loading.module.css";
import { useEffect, useState } from 'react';
import LpsItem from './ShopSystem/LpsItem';
import ChangePass from './ChangePass';
const Profile = () => {
  const [lps, setLps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchLps = async () => {
      const entered = 'ObNnUVSCrJXG95tbWt08dbiOwna2/Orders/user'
      const query = `${entered}.json` //`${entered}.json`
      const response = await fetch(
        'https://beatles-app-default-rtdb.europe-west1.firebasedatabase.app/Users/' + query
      );
    

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json();
      console.log(responseData);
      const loadedLps = [];

      for (const user in responseData) {
        loadedLps.push({
          id: user,
          city: responseData[user].city,
         
          Price: responseData[user].Price,
          image: responseData[user].image,
       
        });
      }
   
      setLps(loadedLps);
      setIsLoading(false);
    };

    fetchLps().catch((error) => {
    
      // setHttpError(error.message);
    });
  }, []);


  
     const LpsList = lps.map((things) => (
    <LpsItem  
    key={things.id}
    id={things.id}
    city={things.city}

    Price={things.Price}
    image={things.image}
    />
  ));

  if (isLoading) {
    return (
      isLoading && <section className={styling.loadersec}>
      <div className={styling.loader}></div>
      </section>
    );
  }

  return (
    <section>
      
        <ul>{LpsList}</ul>
        <ChangePass />
    </section>
  );
};
  

   
    
     export default Profile ;
     


    //  import classes from "./Profile.module.css";

    //  import ChangePass from './ChangePass';
    //  const Profile = () => {
     
    //      return (
    //        <section className={classes.section}>
    //          <div className={classes.various}>
    //       <h2>YOUR PROFILE</h2>   
    //     <p>Data and data</p> <p>Data and data</p> <p>Data and data</p> <p>Data and data</p>
    //     </div>
    //  <ChangePass />
    //       </section>
    //      )
    //       }
    //       export default Profile ;    