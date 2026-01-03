import "./Header.css";
import logo from "../../assets/logo.svg";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

function Header() {
  const location = useLocation();
  const menuRef = useRef(null);
  const [navigatorStyle, setNavigatorStyle] = useState({});

  const pageMap = {
    "/": "Home",
    "/about": "About",
    "/services": "Services",
    "/contact": "Contact",
  };

  const pageTitle = pageMap[location.pathname] || "Home";

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

  return (
    <header className="header">
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
            to="/about"
            className={({ isActive }) =>
              `header__menu-item ${isActive ? "active" : ""}`
            }
          >
            About
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

        <button className="header__signIn">Sign In</button>
      </div>

      <div className="header__divider" />

      <div className="header__title">
        <h1 className="header__clinic-name">SmileCare Dental Clinic</h1>
        <button className="header__book-app">Book Appointment</button>

        {/* dynamic page title */}
        <h2 className="header__page-title">{pageTitle}</h2>
      </div>
    </header>
  );
}

export default Header;
