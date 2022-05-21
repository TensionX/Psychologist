import React, { useRef, useState, useCallback, createElement } from "react";
import { useSelector, useDispatch } from "react-redux";
import style from "./AddModal.module.css";
import sprite from "../../img/sprite.svg";
import BtnGrey from "../buttons/BtnGrey";
import BtnWhite from "../buttons/BtnWhite";
import BtnBlue from "../buttons/BtnBlue";
import { styleBtn } from "./stylebtnModal";
import { clientTestCommentOperation } from "../../redux/user/user.operation";
import { useEffect } from "react";

const CommentTestModal = ({
  name,
  togleModal,
  testId,
  display,
  messageEdit,
  companyId,
}) => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {

  }, [dispatch]);

  const handleChange = (e) => {
    if (e.currentTarget.name === "comment") {
      setComment(e.currentTarget.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(clientTestCommentOperation({assignId: testId, comment}));
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
          Your comment
          <textarea
            aria-rowcount={8}
            rows={8}
            onChange={handleChange}
            className={style.input}
            name="comment"
            value={comment}
            style={{
              resize: "vertical",
              height: "150px",
              minHeight: "150px",
              maxHeight: "650px"
            }}
          ></textarea>
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
              comment.length < 16
            }
            name={"Submit"}
            iconStyle={{ display: "none" }}
            btnStyle={
                  comment.length >= 16
                    ? styleBtn.btnSave
                    : styleBtn.btnDisable
            }
          />
        </div>
      </form>
    </div>
  );
};

export default CommentTestModal;
