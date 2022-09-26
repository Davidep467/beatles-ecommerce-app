import classes from "./Access.module.css";
import styling from "../../components/Loading.module.css";
import { useState, useContext, useRef } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import access from "../../assets/access.jpg";
import React, { useEffect } from "react";
import { caps, nums, chars } from "./passwordValidations";

const Access = () => {
  const [Access, setAccess] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const switchAuthModeHandler = (event) => {
    setAccess((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);
    let url;
    if (Access) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBSS9k-MMZ9VN_OFtR1VoYi1QcGChcR3ms";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBSS9k-MMZ9VN_OFtR1VoYi1QcGChcR3ms";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage =
              "Attempt failed! Please check your credentials!";

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        authCtx.login(data.idToken, expirationTime.toISOString());
        history.replace("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const [input, setInput] = useState("");
  const [inputlog, setInputlog] = useState("");
  const [maillog, setMaillog] = useState("");
  const [mailreg, setMailreg] = useState("");
  const [valid, setValid] = useState({
    uppercase: false,
    specialChar: false,
    number: false,
    length: false,
  });

  useEffect(() => {
    if (
      valid.uppercase === true &&
      valid.specialChar === true &&
      valid.length === true &&
      valid.number === true
    ) {
      setValid(true);
    }
  }, [valid]);

  const validateNums = (param) => nums.some((num) => param.includes(num));
  const validateCaps = (param) => caps.some((cap) => param.includes(cap));
  const validateChars = (param) => chars.some((char) => param.includes(char));
  const validateLength = () => input.length >= 6;

  const validate = (params) => {
    setValid({
      ...valid,
      number: validateNums(params),
      uppercase: validateCaps(params),
      specialChar: validateChars(params),
      length: validateLength(params),
    });
  };

  const handleChange = (event) => {
    setInput(event.target.value);

    validate(event.target.value);
  };

  const handleChangelog = (event) => {
    setInputlog(event.target.value);
  };
  const handleMailChangelog = (event) => {
    setMaillog(event.target.value);
  };

  const handleMailChangereg = (event) => {
    setMailreg(event.target.value);
  };


  return (
    <section className={classes.section}>
      {Access && (
        <form className={classes.accessform} onSubmit={submitHandler}>
          <h1>Login</h1>
          <div>
            <label>Your Email</label>
            <input
              type="email"
              id="email"
              value={maillog}
              onChange={handleMailChangelog}
              ref={emailInputRef}
            />
          </div>
          <br />
          <div>
            <label>Your Password</label>
            <input
              type="password"
              id="password"
              value={inputlog}
              onChange={handleChangelog}
              ref={passwordInputRef}
            />
          </div>
          <div className={classes.divbut}>
            {!isLoading && (
              <button disabled={!maillog || !inputlog} className={classes.one}>
                Login
              </button>
            )}
            {!isLoading && (
              <button
                className={classes.two}
                type="button"
                onClick={switchAuthModeHandler}
              >
                {Access && "Create New Account"}
              </button>
            )}
          
          </div>

          {isLoading && (
            <section className={styling.loadersec}>
              <div className={styling.loader}></div>
            </section>
          )}
        
          <p className={classes.credentials}>If you don't want to create a new account please use these credentials <br/>
           <b>Email</b>: test123456@test.com <br/>
           <b>Password</b>: faS99+95iii</p>
        </form>
      )}

      {!Access && (
        <form className={classes.accessform} onSubmit={submitHandler}>
          <h1>Register</h1>
          <div>
            <label>Your Email</label>
            <input
              type="email"
              id="email"
              value={mailreg}
              onChange={handleMailChangereg}
              ref={emailInputRef}
            />
          </div>
          <br />
          <div>
            <label>Your Password</label>
            <input
              type="password"
              id="password"
              onChange={handleChange}
              ref={passwordInputRef}
              value={input}
            />
          </div>
          {!Access &&
            (valid.uppercase === false ||
              valid.specialChar === false ||
              input.length < 6 ||
              valid.number === false) && (
              <p className={classes.passval}>
                Password must be at least 6 characters long, contain at least
                one uppercase letter, one number and one special characters
              </p>
            )}

          <div className={classes.divbut}>
            {!isLoading && (
              <button
                disabled={
                  !mailreg ||
                  valid.uppercase === false ||
                  valid.specialChar === false ||
                  input.length < 6 ||
                  valid.number === false
                }
                className={classes.one}
              >
                {!Access && "Sign Up"}
              </button>
            )}

            {!isLoading && (
              <button
                className={classes.two}
                type="button"
                onClick={switchAuthModeHandler}
              >
                {!Access && "Login"}
              </button>
            )}
          </div>
          {isLoading && (
            <section className={styling.loadersec}>
              <div className={styling.loader}></div>
            </section>
          )}
        </form>
      )}
       <img src={access} alt="" width="100%" />
    </section>
  );
};
export default Access;
