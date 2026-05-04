import { Link, useLocation } from "react-router-dom";
import logo from "../../images/logo.svg";

export default function Header({ email, loggedIn, onLogout }) {
  const location = useLocation();

  return (
    <header className="header page__section">
      <img
        src={logo}
        alt="Around the U.S logo"
        className="logo header__logo"
      />

      <div className="header__menu">
        {loggedIn ? (
          <>
            <p className="header__email">{email}</p>
            <button onClick={onLogout} className="header__link">
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            {location.pathname === "/signin" && (
              <Link to="/signup" className="header__link">
                Registrarse
              </Link>
            )}

            {location.pathname === "/signup" && (
              <Link to="/signin" className="header__link">
                Iniciar sesión
              </Link>
            )}
          </>
        )}
      </div>
    </header>
  );
}



