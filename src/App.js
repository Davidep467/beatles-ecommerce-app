import { Route, Switch, Redirect} from "react-router-dom";
import React, { useContext, Suspense } from "react";
import Layout from "./components/layout/Layout";
import TopPage from "./components/TopPage";
import Footer from "./components/Footer";
import Dashboard from "./components/pages/Dashboard";
import Profile from "./components/pages/Profile";
import Access from "./components/pages/Access";
import NotFound from "./components/pages/NotFound";
import styling from "./components/Loading.module.css";
import AuthContext from "./store/auth-context";
import CartProvider from './components/pages/ShopSystem/Cart/store/CartProvider';

const Shop = React.lazy(() => import('./components/pages/Shop'));
const Cart = React.lazy(() => import('./components/pages/ShopSystem/Cart/Cart'));

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <CartProvider> 
    <Layout>
    <Suspense
        fallback={
          <section className={styling.loadersec}>
          <div className={styling.loader}></div>
        </section>
        }
      >
      <Switch>
      <Route path="/" exact>
      <TopPage />
          </Route>
       

      {!authCtx.isLoggedIn && (
          <Route path='/Access'>
            <Access />
          </Route>
        )}
   
        <Route path="/Dashboard">
          {authCtx.isLoggedIn && <Dashboard />}
          {!authCtx.isLoggedIn && <Redirect to="/Access" />}
        </Route>
        <Route path="/Shop">
          {authCtx.isLoggedIn && <Shop />}
          {!authCtx.isLoggedIn && <Redirect to="/Access" />}
        </Route>
        <Route path="/Profile">
          {authCtx.isLoggedIn && <Profile />}
          {!authCtx.isLoggedIn && <Redirect to="/Access" />}
        </Route>
        <Route path="/Cart">
          {authCtx.isLoggedIn && <Cart />}
          {!authCtx.isLoggedIn && <Redirect to="/Access" />}
        </Route>
   
       
        <Route path="*">
            <NotFound />
          </Route>   
        </Switch>
       

        <Footer />
     </Suspense>
    </Layout></CartProvider>
  );
}

export default App;
