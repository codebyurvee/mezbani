import { ArrowRight } from "lucide-react";
function NewsLetter() {
  return (  
      <section className="newsletter">

        <div>
          <p className="overline">THE WEEKLY POUR</p>

          <h2>
            Good things,
            <br />
            <i>delivered.</i>
          </h2>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Thanks for subscribing!");
          }}
        >
          <input
            type="email"
            placeholder="Your email address"
            required
          />

          <button type="submit">
            Subscribe
            <ArrowRight size={17} />
          </button>
        </form>

      </section>
  )}
  export default NewsLetter;