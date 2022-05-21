import sprite from "../../img/sprite.svg";
import style from "./BtnBlue.module.css";

const BtnBlue = ({ icon, name, iconStyle, btnStyle, disable, onClick, rowid }) => {
  return (
    <button rowid={rowid} onClick={onClick} disabled={disable} style={btnStyle} className={style.flex}>
      <p rowid={rowid}>{name}</p>
    </button>
  );
};

export default BtnBlue;
