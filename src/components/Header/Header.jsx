function Header() {
  return (
    <header className="header">
      <img className="header__logo" />
      <p className="header__title">SmileCare</p>
      <div className="header__menu">
        <button className="header__menu-item">Home</button>
        <button className="header__menu-item">About</button>
        <button className="header__menu-item">Services</button>
        <button className="header__menu-item">Contact</button>
      </div>
      <button className="header__signIn">Sign In</button>
    </header>
  );
}
export default Header;
