import { ArrowRight } from "lucide-react";
function Features() { 
  return (
      <section className="feature">

        <div>
          <p className="overline">THE NOIR EXPERIENCE</p>

          <h2>
            Slow down.
            <br />
            <i>Stay awhile.</i>
          </h2>
        </div>

        <div className="feature-copy">
          <p>
            Good coffee deserves your full attention.
            No rush. No distractions. Just a beautifully
            brewed cup and a little time for yourself.
          </p>

          <a href="#locations">
            Find your nearest café
            <ArrowRight size={17} />
          </a>
        </div>

      </section>
  )}
  export default Features;