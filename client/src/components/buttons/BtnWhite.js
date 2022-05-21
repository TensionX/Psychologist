import sprite from "../../img/sprite.svg";
import style from "./BtnWhite.module.css";

const BtnWhite = ({ icon, name, iconStyle, btnStyle }) => {
  return (
    <button type="button" style={btnStyle} className={style.flex}>
      <svg style={iconStyle} className={style.icon}>
        <use href={sprite + [icon]}></use>
      </svg>
      <p className={style.name}>{name}</p>
    </button>
  );
};

export default BtnWhite;
