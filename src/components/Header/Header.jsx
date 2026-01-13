import "./Header.css";
import logo from "../../assets/logo.svg";
import menuIcon from "../../assets/menuIcon_mobile.svg";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useUser } from "../../context/UserContext";

function Header({ onLoginClick }) {
  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const { user, logout } = useUser();
  const [navigatorStyle, setNavigatorStyle] = useState({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isProfilePage = location.pathname === "/profile";

  const pageTitles = {
    "/": "Welcome to our Clinic",
    "/staff": "Our Staff",
    "/services": "Our Dental Services",
    "/dental-education": "Dental Education",
    "/contact": "Contact",
    "/profile": "Your Profile",
  };
  const pageTitle = pageTitles[location.pathname] || "Home";

  // Toggle mobile menu
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  // Navigate to Book Appointment
  const onBookAppointmentClick = () => navigate("/contact");

  // Desktop menu underline animation
  useEffect(() => {
    const activeLink = menuRef.current?.querySelector(
      ".header__menu-item.active"
    );
    if (activeLink) {
      const { offsetLeft, offsetWidth } = activeLink;
      setNavigatorStyle({
        width: `${offsetWidth}px`,
        transform: `translateX(${offsetLeft}px)`,
      });
    }
  }, [location.pathname]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.closest(".header__menu-mobile-btn")
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  // Menu links array
  const menuLinks = [
    { path: "/", label: "Home" },
    { path: "/staff", label: "Our Staff" },
    { path: "/services", label: "Services" },
    { path: "/dental-education", label: "Dental Education" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <header className={`header ${isProfilePage ? "header--profile" : ""}`}>
      {/* ===== TOP BAR ===== */}
      <div className="header__spacer">
        <img
          className="header__logo"
          src={logo}
          alt="SmileCare Dental Clinic logo"
        />

        {user && (
          <span
            className="header__greeting header__greeting--mobile"
            onClick={() => navigate("/profile")}
          >
            Hello, {user.name}
          </span>
        )}

        <nav className="header__menu" ref={menuRef}>
          {/* Desktop Menu */}
          <div className="header__menu-desktop">
            {menuLinks.map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                end={path === "/"}
                className={({ isActive }) =>
                  `header__menu-item ${isActive ? "active" : ""}`
                }
              >
                {label}
              </NavLink>
            ))}

            {user && (
              <span
                className="header__greeting header__greeting--desktop"
                onClick={() => navigate("/profile")}
              >
                Hello, {user.name}
              </span>
            )}

            <div className="header__desktop-auth">
              {user ? (
                <button className="header__logout" onClick={logout}>
                  Logout
                </button>
              ) : (
                <button className="header__signIn" onClick={onLoginClick}>
                  Sign In
                </button>
              )}
            </div>

            <span className="header__navigator" style={navigatorStyle} />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="header__menu-mobile-btn"
            onClick={toggleMobileMenu}
          >
            <img src={menuIcon} alt="Menu" />
          </button>
        </nav>
      </div>

      {/* ===== MOBILE MENU & OVERLAY ===== */}
      {isMobileMenuOpen && (
        <>
          <div
            className="header__mobile-overlay"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="header__mobile-menu" ref={mobileMenuRef}>
            {menuLinks.map(({ path, label }) => (
              <NavLink key={path} to={path} onClick={toggleMobileMenu}>
                {label}
              </NavLink>
            ))}

            <div className="header__mobile-auth">
              {user ? (
                <button
                  className="header__logout"
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Logout
                </button>
              ) : (
                <button
                  className="header__signIn"
                  onClick={() => {
                    onLoginClick();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </>
      )}

      {/* ===== TITLE SECTION ===== */}
      {!isProfilePage && (
        <>
          <div className="header__divider" />
          <div className="header__title">
            <h1 className="header__clinic-name">SmileCare Dental Clinic</h1>
            <button
              className="header__book-app"
              onClick={onBookAppointmentClick}
            >
              Book Appointment
            </button>
            <h2 className="header__page-title">{pageTitle}</h2>
          </div>
        </>
      )}
    </header>
  );
}

export default Header;
