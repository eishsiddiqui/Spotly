import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth-context";

import "./NavLinks.css";

const NavLinks = () => {
  const { isLoggedIn, logout, userId } = useContext(AuthContext);
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" end>
          All Users
        </NavLink>
      </li>
      {isLoggedIn && (
        <li>
          <NavLink to={`/${userId}/places`}>My Places</NavLink>
        </li>
      )}
      {isLoggedIn && (
        <li>
          <NavLink to="/places/new">Add Place</NavLink>
        </li>
      )}

      {!isLoggedIn && (
        <li>
          <NavLink to="/auth">Login</NavLink>
        </li>
      )}
      {isLoggedIn && (
        <li>
          <button onClick={logout}>Logout</button>
        </li>
      )}
    </ul>
  );
};
export default NavLinks;
