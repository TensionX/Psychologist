import sprite from "../../img/sprite.svg";
import style from "./BtnGrey.module.css";

const BtnCopyLink = ({ name, icon, iconStyle, btnStyle, nameStyle }) => {
  return (
    <button style={btnStyle} className={style.flex}>
      <svg style={iconStyle}>
        <use href={sprite + [icon]}></use>
      </svg>
      <p style={nameStyle}>{name}</p>
    </button>
  );
};

export default BtnCopyLink;
