import logo from "../images/logo.svg";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";

export default function Header(props) {
  const { onExitUser } = props;

  const currentUser = useContext(CurrentUserContext);

  const navigate = useNavigate();

  function onSignOut() {
    localStorage.removeItem("token");
    onExitUser();
    navigate("/signin", { replace: true });
  }

  return (
    <header className="header page__header">
      <img className="header__logo" src={logo} alt="Лого" />

      <Routes>
        <Route
          path="/"
          element={
            <div className="header__conteiner">
              <p className="header__email">{currentUser.email}</p>
              <Link to="/signin" className="header__link" onClick={onSignOut}>
                Выйти
              </Link>
            </div>
          }
        />
        <Route
          path="/signup"
          element={
            <Link to="/signin" className="header__link">
              Войти
            </Link>
          }
        />
        <Route
          path="/signin"
          element={
            <Link to="/signup" className="header__link">
              Регистрация
            </Link>
          }
        />
      </Routes>
    </header>
  );
}
