 import { Camera } from "lucide-react";
 function Footer() {
  return (

      <footer>

        <div className="footer-brand">
          <div className="brand-icon">☕</div>

          <div>
            <strong>MEZBANI</strong>
            <span>COFFEE CO.</span>
          </div>
        </div>

        <div className="footer-links">
          <a href="#menu">Menu</a>
          <a href="#story">Our Story</a>
          <a href="#locations">Locations</a>
          <a href="#home">Journal</a>
        </div>

        <div className="social">
          <Camera size={18} />
          <span>© 2026 Mezbani Coffee Co.</span>
        </div>

      </footer>
  )}
  export default Footer;