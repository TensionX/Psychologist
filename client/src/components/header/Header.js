import sprite from "../../img/sprite.svg";
import style from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/user/user.selectors";
import { logoutOperation } from "../../redux/user/user.operation";
import { Link } from "react-router-dom";

const Header = () => {
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const isAdmin = user.user.Creator == 0 ? true : false

  const logout = () => {
    dispatch(logoutOperation());
  };

  return (
    <div className={style.header}>
      <h1 style={{
        fontSize: "24px",
        fontWeight: "600"
      }}>Psychologist</h1>
      <div >
        {isAdmin ? (
          <Link className={style.nav} to="/">Clients</Link>
        ) : (<></>)}
        <Link className={style.nav} to="/tests">Tests</Link>
      </div>
      <div className={style.rightSide}>
        <p style={{paddingRight:'10px'}}>{user.user.FirstName + " " + user.user.LastName}</p>
        <svg onClick={() => logout()} className={style.logOut}>
          <use href={sprite + "#icon-logout"}></use>
        </svg>
      </div>
    </div>
  );
};

export default Header;
