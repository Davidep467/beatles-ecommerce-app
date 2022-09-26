import { Link } from "react-router-dom";
import classes from "./Footer.module.css";
import logo from '../assets/logo.png';
const Footer = () => {
    return (
        <footer className={classes.footer}>
      <Link to="/"><img className={classes.logoimg} src={logo} alt="The Beatles"  /></Link>
     <ul>
     <li>BEATLES RECORDS SELLERS</li>
     <li>251 Menlove Avenue</li>
     <li>Liverpool</li>
     <li>L25 7SA</li>
     <li>United Kingdom</li>
     </ul>
     </footer>
    )
     }
     export default Footer;