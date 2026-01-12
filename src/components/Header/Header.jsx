import "./Header.css";
import logo from "../../assets/logo.svg";
import logoutIcon from "../../assets/logoutIcon.svg";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useUser } from "../../context/UserContext";

function Header({ onLoginClick }) {
  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const [navigatorStyle, setNavigatorStyle] = useState({});
  const { user, logout } = useUser();

  const pageMap = {
    "/": "Welcome to our Clinic",
    "/staff": "Our Staff",
    "/services": "Our Dental Services",
    "/dental-education": "Dental Education",
    "/contact": "Contact",
    "/profile": "Your Profile",
  };
  const pageTitle = pageMap[location.pathname] || "Home";
  const isProfilePage = location.pathname === "/profile";

  useEffect(() => {
    // query ACTIVE NavLink
    const activeLink = menuRef.current?.querySelector(
      ".header__menu-item.active"
    );

    if (activeLink) {
      const { offsetLeft, offsetWidth } = activeLink;

      // dynamically move navigator
      setNavigatorStyle({
        width: `${offsetWidth}px`,
        transform: `translateX(${offsetLeft}px)`,
      });
    }
  }, [location.pathname]);
  const onBookAppointmentClick = () => {
    // navigate to contact page
    navigate("/contact");
  };

  return (
    <header className={`header ${isProfilePage ? "header--profile" : ""}`}>
      <div className="header__spacer">
        <img
          className="header__logo"
          src={logo}
          alt="SmileCare Dental Clinic logo" //
        />

        <nav className="header__menu" ref={menuRef}>
          {/* use function form of className to add "active" */}
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `header__menu-item ${isActive ? "active" : ""}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/staff"
            className={({ isActive }) =>
              `header__menu-item ${isActive ? "active" : ""}`
            }
          >
            Our Staff
          </NavLink>

          <NavLink
            to="/services"
            className={({ isActive }) =>
              `header__menu-item ${isActive ? "active" : ""}`
            }
          >
            Services
          </NavLink>
          <NavLink
            to="/dental-education"
            className={({ isActive }) =>
              `header__menu-item ${isActive ? "active" : ""}`
            }
          >
            Dental Education
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `header__menu-item ${isActive ? "active" : ""}`
            }
          >
            Contact
          </NavLink>

          {/* single sliding navigator underline */}
          <span className="header__navigator" style={navigatorStyle} />
        </nav>

        {/* ✅ Dynamic Sign In / Logout */}
        {/* ✅ Dynamic Sign In / Logout */}
        {user ? (
          <div className="header__user">
            <button
              className="header__greeting"
              onClick={() => navigate("/profile")}
            >
              <span>Hello, {user.name}</span>
            </button>
            <button className="header__logout" onClick={logout}>
              Logout
            </button>
          </div>
        ) : (
          <button className="header__signIn" onClick={onLoginClick}>
            Sign In
          </button>
        )}
      </div>

      <div className="header__divider" />

      {!isProfilePage && (
        <div className="header__title">
          <h1 className="header__clinic-name">SmileCare Dental Clinic</h1>

          <button className="header__book-app" onClick={onBookAppointmentClick}>
            Book Appointment
          </button>

          {/* dynamic page title */}
          <h2 className="header__page-title">{pageTitle}</h2>
        </div>
      )}
    </header>
  );
}

export default Header;
