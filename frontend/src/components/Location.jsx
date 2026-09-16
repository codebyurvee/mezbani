import { MapPin, ArrowRight } from "lucide-react";
function Location() {
  return (
      <section className="locations" id="locations">

        <div className="location-heading">
          <p className="overline">VISIT US</p>

          <h2>
            Your new
            <br />
            <i>favorite corner.</i>
          </h2>
        </div>

        <div className="location-card">

          <div>
            <MapPin size={21} />

            <h3>Downtown</h3>

            <p>
              18 Willow Street
              <br />
              Portland, OR
            </p>
          </div>

          <div>
            <span className="open">OPEN TODAY</span>

            <p>
              Mon — Fri
              <br />
              7:00 AM — 6:00 PM
            </p>

            <p>
              Sat — Sun
              <br />
              8:00 AM — 5:00 PM
            </p>
          </div>

          <a href="#home">
            Get directions
            <ArrowRight size={16} />
          </a>

        </div>
      </section>
  )}
  export default Location;