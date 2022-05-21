import { useEffect, useState } from "react";
import style from "./SignIn.module.css";
import sprite from "../../img/sprite.svg";
import { isValidEmail } from "../../helpers/helpers";
import { signInOperation } from "../../redux/user/user.operation";
import { useDispatch, useSelector } from "react-redux";
import { getErrorMsg, getLoading } from "../../redux/user/user.selectors";
import BtnBlue from "../buttons/BtnBlue";
import { stylebtnSign } from "./styleBtnSign";
import Container from "../container/Container";
import { signInError } from "../../redux/user/user.actions";
import Spiner from "../spiner/Spiner";
import { useSearchParams, useNavigate  } from "react-router-dom";

const SignIn = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {}, [dispatch]);

  const changePassword = (e) => {
    setPassword(e.currentTarget.value);
  }
  const changeEmail = (e) => {
    setEmail(e.currentTarget.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signInOperation({ email, password }));
    setEmail("");
    setPassword("");
  };

  const toSignUp = () => {
    navigate("/sign-up")
  }

  const loading = useSelector(getLoading);

  return (
    <Container>
      {loading ? (
        <div className={style.flexSpiner}>
          <Spiner style={{ color: "black", fontSize: "4em" }} />
        </div>
      ) : (
        <div className={style.authForm}>
          <h2 className={style.header}>Welcome to Psychologist</h2>
          <form onSubmit={handleSubmit} className={style.form}>
            <h3 className={style.formHeader}>Sign into your account</h3>
            <label className={style.label}>
              {" "}
              <span
                style={
                  email.length <= 0
                    ? { color: "#ff8616" }
                    : null
                }
                className={style.nameField}
              >
                Email
              </span>
              <input
                name="email"
                type="email"
                value={email}
                onChange={changeEmail}
                className={style.input}
                style={
                  email.length > 0
                    ? { border: "1px solid #d3d5da" }
                    : { color: "#2b3135", border: "1px solid #ff8616" }
                }
              ></input>
            </label>
            <label className={style.label}>
              {" "}
              <span
                style={
                  password.length < 8
                    ? { color: "#ff8616" }
                    : null
                }
                className={style.nameField}
              >
                Password
              </span>
              <input
                name="password"
                type="password"
                value={password}
                onChange={changePassword}
                style={
                  password.length < 8
                    ? { border: "1px solid #ff8616" }
                    : { color: "#2b3135", border: "1px solid #d3d5da" }
                }
                className={style.input}
              ></input>
            </label>
            <div className={style.btn}>
              <BtnBlue
                disable={!(password.length > 8)}
                name={"Sign In"}
                iconStyle={{ display: "none" }}
                btnStyle={
                  password.length >= 8 && email.length
                    ? stylebtnSign.active
                    : stylebtnSign.disable
                }
              />
            </div>
          </form>
          <BtnBlue
            onClick={toSignUp}
            name={"Sign Up"}
            iconStyle={{ display: "none" }}
            btnStyle={
                stylebtnSign.activeOutForm
            }
          />
        </div>
      )}
    </Container>
  );
};

export default SignIn;
