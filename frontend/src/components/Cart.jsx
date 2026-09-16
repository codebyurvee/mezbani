import { Minus, Plus, Trash2, X } from "lucide-react";

function Cart({
  cart,
  isOpen,
  closeCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  total,
  openCheckout,
}) {
  if (!isOpen) return null;

  return (
    <div className="cart-overlay" onClick={closeCart}>
      <aside
        className="cart-drawer"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cart-header">
          <h2>Your Cart</h2>

          <button onClick={closeCart} className="cart-close">
            <X size={22} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <h3>Your cart is empty</h3>
            <p>Add some coffee to get started.</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} />

                  <div className="cart-item-info">
                    <h3>{item.name}</h3>

                    <p>${item.price.toFixed(2)}</p>

                    <div className="quantity-controls">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        <Minus size={15} />
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() => increaseQuantity(item.id)}
                      >
                        <Plus size={15} />
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-right">
                    <strong>
                      ${(item.price * item.quantity).toFixed(2)}
                    </strong>

                    <button
                      className="remove-item"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-total">
                <span>Total</span>
                <strong>${total.toFixed(2)}</strong>
              </div>

              <button
                className="checkout-button"
                onClick={openCheckout}
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

export default Cart;