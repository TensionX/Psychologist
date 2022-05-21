import React, { useRef, useState, useCallback, createElement } from "react";
import Select from 'react-select'
import { useSelector, useDispatch } from "react-redux";
import style from "./AddModal.module.css";
import sprite from "../../img/sprite.svg";
import BtnGrey from "../buttons/BtnGrey";
import BtnWhite from "../buttons/BtnWhite";
import BtnBlue from "../buttons/BtnBlue";
import BtnRed from "../buttons/BtnRed";
import { styleBtn } from "./stylebtnModal";
import { assignTestOperation } from "../../redux/user/user.operation";
import { useEffect } from "react";

const AssignTestsModal = ({
  name,
  togleModal,
  clients,
  testId,
  display,
  messageEdit,
  companyId,
}) => {
  const [clientId, setClientId] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
  }, [dispatch]);

  const handleChange = (e) => {
    setClientId(e.value)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(assignTestOperation({testId, clientId}));
    togleModal();
  };

  const options = clients.map((c) => {
    return {
      value: c.id,
      label: c.FirstName+" "+c.LastName
    }
  })

  return (
    <div className={style.bgModal}>
      <form className={style.form}>
        <svg onClick={togleModal} className={style.icon}>
          <use href={sprite + "#icon-close"}></use>
        </svg>
        <h2 className={style.head}>{name}</h2>
        <label className={style.label}>
          Client
          <Select onChange={handleChange} options={options}/>
        </label>
        <div style={{
            width: "100%"
          }} className={style.btnFlex}>
          <div style={{
            width: "30%"
          }} onClick={togleModal}>
            <BtnWhite
              name={"Cancel"}
              iconStyle={{ display: "none" }}
              btnStyle={{ height: "48px", width: "90%" }}
            />
          </div>
          <BtnBlue
            onClick={handleSubmit}
            disable={
              !(clientId)
            }
            name={"Save"}
            iconStyle={{ display: "none" }}
            btnStyle={
              clientId
                    ? styleBtn.btnSave
                    : styleBtn.btnDisable
            }
          />
        </div>
      </form>
    </div>
  );
};

export default AssignTestsModal;
