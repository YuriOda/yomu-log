import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faBook,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const MainNavigation = () => {
  return (
    <div className="main-navigation">
      <nav>
        <ul className="nav-ul">
          <li>
            <NavLink
              to="/new"
              className={({ isActive }) =>
                isActive ? "nav-active" : "nav-inactive"
              }
            >
              <FontAwesomeIcon icon={faCirclePlus} />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/book-shelf"
              className={({ isActive }) =>
                isActive ? "nav-active" : "nav-inactive"
              }
            >
              <FontAwesomeIcon icon={faBook} />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-active" : "nav-inactive"
              }
            >
              <FontAwesomeIcon icon={faHouse} className="icon-house" />
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MainNavigation;
