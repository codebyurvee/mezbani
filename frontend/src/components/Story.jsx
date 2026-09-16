import { ArrowRight } from "lucide-react";
function Story() {
  return (
    <section className="story" id="story">
        <div className="story-image">
          <img
            src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=1200&q=90"
            alt="Coffee shop interior"
          />
        </div>

        <div className="story-content">

          <p className="overline">OUR STORY</p>

          <h2>
            Rooted in
            <br />
            <i>better choices.</i>
          </h2>

          <p>
            We believe coffee should be simple, thoughtful and
            deeply connected to the people who make it possible.
          </p>

          <p>
            That's why we work with independent farms, roast in
            small batches and build spaces where people actually
            want to stay.
          </p>

          <a href="#locations" className="button secondary dark">
            Discover our story
            <ArrowRight size={17} />
          </a>

          <div className="values">

            <div>
              <span>01</span>
              <div>
                <strong>Thoughtfully sourced</strong>
                <p>Direct relationships with coffee growers.</p>
              </div>
            </div>

            <div>
              <span>02</span>
              <div>
                <strong>Small batch roasted</strong>
                <p>Every bean gets the attention it deserves.</p>
              </div>
            </div>

            <div>
              <span>03</span>
              <div>
                <strong>Community first</strong>
                <p>A place for conversations, ideas and pauses.</p>
              </div>
            </div>

          </div>

        </div>
    </section>
  );
}
export default Story;