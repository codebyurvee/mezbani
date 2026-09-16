import { Plus } from "lucide-react";

function ProductCard({ product, addToCart }) {
  return (
    <article className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />

        <button
          className="add-button"
          onClick={() => addToCart(product)}
          aria-label={`Add ${product.name}`}
        >
          <Plus size={20} />
        </button>
      </div>

      <div className="product-info">
        <div className="product-top">
          <span>{product.category}</span>

          <strong>${product.price.toFixed(2)}</strong>
        </div>

        <h3>{product.name}</h3>

        <p>{product.description}</p>
      </div>
    </article>
  );
}

export default ProductCard;