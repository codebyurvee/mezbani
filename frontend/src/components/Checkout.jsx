import { X } from "lucide-react";
import { useState } from "react";

function Checkout({ cart, total, closeCheckout, placeOrder }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    payment: "Cash on Delivery",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    console.log("PLACE ORDER BUTTON CLICKED");

    const order = {
      customer: formData,
      items: cart,
      total: total,
    };

    console.log("ORDER:", order);

    placeOrder(order);
  }

  return (
    <div className="checkout-overlay">
      <div className="checkout-box">

        <div className="checkout-header">
          <h2>Checkout</h2>

          <button
            className="checkout-close"
            onClick={closeCheckout}
          >
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>

          {/* CUSTOMER NAME */}
          <label>
            Name

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </label>


          {/* PHONE */}
          <label>
            Phone Number

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />
          </label>


          {/* ADDRESS */}
          <label>
            Delivery Address

            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your complete delivery address"
              rows="4"
              required
            />
          </label>


          {/* PAYMENT */}
          <label>
            Payment Method

            <select
              name="payment"
              value={formData.payment}
              onChange={handleChange}
            >
              <option value="Cash on Delivery">
                Cash on Delivery
              </option>

              <option value="Online Payment">
                Online Payment
              </option>
            </select>
          </label>


          {/* ORDER SUMMARY */}
          <div className="checkout-summary">

            <h3>Order Summary</h3>

            {cart.map((item) => (
              <div
                className="checkout-item"
                key={item.id}
              >
                <span>
                  {item.name} × {item.quantity}
                </span>

                <span>
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}

            <div className="checkout-total">
              <span>Total</span>

              <strong>
                ${total.toFixed(2)}
              </strong>
            </div>

          </div>


          {/* PLACE ORDER */}
          <button
            type="submit"
            className="place-order-button"
          >
            Place Order
          </button>

        </form>
      </div>
    </div>
  );
}

export default Checkout;