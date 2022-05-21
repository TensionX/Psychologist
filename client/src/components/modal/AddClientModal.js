import React, { useRef, useState, useCallback, createElement } from "react";
import { useSelector, useDispatch } from "react-redux";
import style from "./AddModal.module.css";
import sprite from "../../img/sprite.svg";
import BtnGrey from "../buttons/BtnGrey";
import BtnWhite from "../buttons/BtnWhite";
import BtnBlue from "../buttons/BtnBlue";
import { styleBtn } from "./stylebtnModal";
import { addClientOperation } from "../../redux/user/user.operation";
import { useEffect } from "react";

const AddClientModal = ({
  name,
  togleModal,
  display,
  messageEdit,
  companyId,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {

  }, [dispatch]);

  const handleChange = (e) => {
    if (e.currentTarget.name === "firstName") {
        setFirstName(e.currentTarget.value);
    } else if(e.currentTarget.name === "lastName"){
        setLastName(e.currentTarget.value);
    } else if(e.currentTarget.name === "email"){
        setEmail(e.currentTarget.value);
    } else if(e.currentTarget.name === "password"){
        setPassword(e.currentTarget.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(addClientOperation({firstName, lastName, email, password}));
    togleModal();
  };

  return (
    <div className={style.bgModal}>
      <form onSubmit={handleSubmit} className={style.form}>
        <svg onClick={togleModal} className={style.icon}>
          <use href={sprite + "#icon-close"}></use>
        </svg>
        <h2 className={style.head}>{name}</h2>
        <label className={style.label}>
          First name
          <input
            onChange={handleChange}
            className={style.input}
            name="firstName"
            type="text"
            value={firstName}
            style={
              firstName.length > 0
                ? { border: "1px solid #d3d5da" }
                : { color: "#2b3135", border: "1px solid #ff8616" }
            }
          ></input>
        </label>
        <label className={style.label}>
          Last name
          <input
            onChange={handleChange}
            className={style.input}
            name="lastName"
            type="text"
            value={lastName}
            style={
              lastName.length > 0
                ? { border: "1px solid #d3d5da" }
                : { color: "#2b3135", border: "1px solid #ff8616" }
            }
          ></input>
        </label>
        <label className={style.label}>
          Email
          <input
            onChange={handleChange}
            className={style.input}
            name="email"
            type="email"
            value={email}
            style={
              email.length > 0
                ? { border: "1px solid #d3d5da" }
                : { color: "#2b3135", border: "1px solid #ff8616" }
            }
          ></input>
        </label>
        <label className={style.label}>
          Password
          <input
            onChange={handleChange}
            className={style.input}
            name="password"
            type="password"
            value={password}
            style={
              password.length >= 8
                ? { border: "1px solid #d3d5da" }
                : { color: "#2b3135", border: "1px solid #ff8616" }
            }
          ></input>
        </label>
        <div className={style.btnFlex}>
          <div onClick={togleModal}>
            <BtnWhite
              name={"Cancel"}
              iconStyle={{ display: "none" }}
              btnStyle={styleBtn.btnCancel}
            />
          </div>
          <BtnBlue
            type="submit"
            disable={
              !(firstName.length > 0 && lastName.length > 0 && email.length > 0 && password.length >= 8)
            }
            name={"Save"}
            iconStyle={{ display: "none" }}
            btnStyle={
                firstName.length > 0 && lastName.length > 0 && email.length > 0 && password.length >= 8
                    ? styleBtn.btnSave
                    : styleBtn.btnDisable
            }
          />
        </div>
      </form>
    </div>
  );
};

export default AddClientModal;
