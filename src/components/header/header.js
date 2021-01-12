import './header.css';

function Header(){
  return (
    <div className="Header">
      <header className="Header-site">
        <h1 className="Header-text">X.O</h1>
        <p className="Header-scroll-for-more">Scroll for more</p>
        <div className="Header-caret-down-block">
          <p className="Header-caret-down-1">&or;</p>
          <p className="Header-caret-down-2">&or;</p>
          <p className="Header-caret-down-3">&or;</p>
        </div>
      </header>
    </div>
  );
}

export default Header;
