import {ArrowRight} from "lucide-react";
function Hero() {
  return (
        <section className="hero" id="home">
        <div className="hero-content">

          <p className="overline">
            SPECIALTY COFFEE · EST. 2019
          </p>

          <h1>
            Coffee made
            <br />
            <i>beautifully.</i>
          </h1>

          <p className="hero-description">
            Thoughtfully sourced beans. Carefully roasted.
            Beautifully brewed for the moments that matter.
          </p>

          <div className="hero-buttons">
            <a href="#menu" className="button primary">
              Explore menu
              <ArrowRight size={17} />
            </a>

            <a href="#story" className="button secondary">
              Our story
            </a>
          </div>

          <div className="hero-meta">
            <span>
              <strong>01</strong> / 03
            </span>

            <div className="hero-line">
              <span></span>
            </div>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1400&q=90"
            alt="Premium coffee"
          />

          <div className="image-caption">
            <span>01</span>
            <p>
              Single origin
              <br />
              freshly roasted
            </p>
          </div>
        </div>
      </section>
  )}
  export default Hero;