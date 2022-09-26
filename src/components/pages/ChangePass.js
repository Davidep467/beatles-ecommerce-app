import { useState, useContext, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import classes from "./ChangePass.module.css";
import styling from "../../components/Loading.module.css";
import AuthContext from "../../store/auth-context";
import { caps, nums, chars } from "./passwordValidations";
import PassModal from "./PassModal";

const ChangePass = () => {
  const [input, setInput] = useState("");
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

  const history = useHistory();

  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isChanged, setChanged] = useState(false);

  const Closing = () => {
    setChanged(false);
    history.replace("/");
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;

    setIsLoading(true);

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBSS9k-MMZ9VN_OFtR1VoYi1QcGChcR3ms",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        setChanged(true);
        return res.json();
      } else {
        return res
          .json()
          .then((data) => {
            let errorMessage =
              "Something went wrong! Please log out and back in if you need to change your password again or try again later";
            throw new Error(errorMessage);
          })
          .catch((err) => {
            alert(err.message);
          });
      }
    });
  };
  return (
    <section>
      {isChanged && (
        <PassModal onClosing={Closing}> Password changed! </PassModal>
      )}
      <form className={classes.changepassform} onSubmit={submitHandler}>
        <h2>Insert New Password</h2>
        <div>
          <label>New Password</label>
          <input
            type="password"
            id="new-password"
            onChange={handleChange}
            value={input}
            minLength="6"
            ref={newPasswordInputRef}
            required
          />
        </div>
        <div>
          {!isLoading && (
            <button
              disabled={
                valid.uppercase === false ||
                valid.specialChar === false ||
                input.length < 6 ||
                valid.number === false
              }
              className={classes.passbut}
            >
              Change Password
            </button>
          )}

          {!isLoading &&
            (valid.uppercase === false ||
              valid.specialChar === false ||
              input.length < 6 ||
              valid.number === false) && (
              <p className={classes.passval}>
                {" "}
                Password must be at least 6 characters long, contain at least
                one uppercase letter, one number and one special characters
              </p>
            )}
          {isLoading && (
            <div className={classes.loaddiv}>
              <section className={styling.loadersec}>
                <div className={styling.loader}></div>
              </section>
            </div>
          )}
        </div>
      </form>
    </section>
  );
};

export default ChangePass;
