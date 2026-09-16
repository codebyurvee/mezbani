import { Search, Menu, X } from "lucide-react";
import { useState } from "react";

function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <header className="navbar">
      <a href="#home" className="brand">
        <div className="brand-icon">☕</div>
        <div>
          <strong>Mezbani</strong>
          <span>COFFEE CO.</span>
        </div>
      </a>

      <nav className={mobileMenu ? "nav open" : "nav"}>
        <a href="#home" onClick={() => setMobileMenu(false)}>
          Home
        </a>
        <a href="#menu" onClick={() => setMobileMenu(false)}>
          Menu
        </a>
        <a href="#story" onClick={() => setMobileMenu(false)}>
          Our Story
        </a>
        <a href="#locations" onClick={() => setMobileMenu(false)}>
          Locations
        </a>
      </nav>

      <div className="nav-actions">
        <button className="icon-btn">
          <Search size={19} />
        </button>

        <button
          className="mobile-toggle"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          {mobileMenu ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}

export default Navbar;