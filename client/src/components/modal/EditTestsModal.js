import React, { useRef, useState, useCallback, createElement } from "react";
import { useSelector, useDispatch } from "react-redux";
import uuid from 'react-uuid'
import style from "./AddModal.module.css";
import sprite from "../../img/sprite.svg";
import BtnGrey from "../buttons/BtnGrey";
import BtnWhite from "../buttons/BtnWhite";
import BtnBlue from "../buttons/BtnBlue";
import BtnRed from "../buttons/BtnRed";
import { styleBtn } from "./stylebtnModal";
import { editTestOperation } from "../../redux/user/user.operation";
import { useEffect } from "react";

const AddTestsModal = ({
  name,
  togleModal,
  data,
  testId,
  display,
  messageEdit,
  companyId,
}) => {
  const [questions, setQuestions] = useState({});
  const [testName, setTestName] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    for(let t of data){
      if(t.id === +testId){
        setTestName(t.name)
        for(let q of t.questions){
          addQuestionEdit(q)
        }
      }
    }
  }, [dispatch]);

  const handleChange = (e) => {
    if(questions[e.currentTarget.getAttribute('rowid')]){
      questions[e.currentTarget.getAttribute('rowid')].question = e.currentTarget.value;
      setQuestions({...questions})
    }
  };

  const handleChangeName = (e) => {
    setTestName(e.currentTarget.value)
  };

  const addQuestion = (e) => {
    const id = uuid()
    questions[id] = {
      question: "",
      id 
    }
    setQuestions({...questions})
  }

  const addQuestionEdit = (q) => {
    const id = uuid()
    questions[id] = {
      question: q.question,
      id 
    }
    setQuestions({...questions})
  }

  const removeQuestion = (e) => {
    delete questions[e.currentTarget.id]
    setQuestions({...questions})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(editTestOperation({questions, name: testName, id: testId}));
    togleModal();
  };

  return (
    <div className={style.bgModal}>
      <form className={style.form}>
        <svg onClick={togleModal} className={style.icon}>
          <use href={sprite + "#icon-close"}></use>
        </svg>
        <h2 className={style.head}>{name}</h2>
        <label className={style.label}>
          Test name
          <input 
            onChange={handleChangeName}
            className={style.input}
            type="text"
            value={testName}
          ></input>
        </label>
        {Object.entries(questions).map((q) => (
          <label key={q[1].id}  className={style.label}>
            Question
            <input 
              onChange={handleChange}
              className={style.input}
              type="text"
              value={q[1].question}
              rowid={q[1].id}
            ></input>
            <BtnRed 
              onClick={removeQuestion}
              name={"Remove"}
              iconStyle={{ display: "none" }}
              btnStyle={{
                borderColor: "red",
                padding: "5px",
                color: "white"
              }}
              rowid={q[1].id}
            />
            <hr/>
          </label>
        ))}
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
          <div style={{
            width: "30%"
          }} onClick={addQuestion}>
            <BtnWhite
              name={"Add question"}
              iconStyle={{ display: "none" }}
              btnStyle={{ height: "48px", width: "90%" }}
            />
          </div>
          <BtnBlue
            onClick={handleSubmit}
            disable={
              !(Object.entries(questions).length > 0)
            }
            name={"Save"}
            iconStyle={{ display: "none" }}
            btnStyle={
              Object.entries(questions).length > 0
                    ? styleBtn.btnSave
                    : styleBtn.btnDisable
            }
          />
        </div>
      </form>
    </div>
  );
};

export default AddTestsModal;
