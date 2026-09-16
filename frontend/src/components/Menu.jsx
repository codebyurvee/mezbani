import { ArrowRight } from "lucide-react";
function Menu({ categories, category, setCategory }) {
  return (  

      <section className="menu-section" id="menu">

        <div className="section-header">

          <div>
            <p className="overline">THE MENU</p>

            <h2>
              Crafted for
              <br />
              <i>every mood.</i>
            </h2>
          </div>

          <div className="section-intro">
            <p>
              From bold espresso to refreshing cold brews,
              everything starts with exceptional ingredients.
            </p>

            <a href="#menu">
              View full menu <ArrowRight size={16} />
            </a>
          </div>

        </div>
         {/* FILTERS */}

        <div className="filters">
          {categories.map((item) => (
            <button
              key={item}
              className={category === item ? "active" : ""}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
        </section>
  )}
  export default Menu;