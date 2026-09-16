import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Marquee from "./components/Marquee.jsx";
import Features from "./components/Features.jsx";
import Menu from "./components/Menu.jsx";
import ProductCard from "./components/ProductCard.jsx";
import Story from "./components/Story.jsx";
import Location from "./components/Location.jsx";
import NewsLetter from "./components/NewsLetter.jsx";
import Footer from "./components/Footer.jsx";

import Cart from "./components/Cart.jsx";
import Checkout from "./components/Checkout.jsx";

import AdminLogin from "./components/AdminLogin.jsx";
import AdminOrders from "./components/AdminOrders.jsx";

const products = [
  {
    id: 1,
    name: "Espresso",
    category: "Espresso",
    price: 3.5,
    description: "Rich, balanced and beautifully concentrated.",
    image:
      "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 2,
    name: "Cortado",
    category: "Espresso",
    price: 4.5,
    description: "Velvety milk and a double shot of espresso.",
    image:
      "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 3,
    name: "Pour Over",
    category: "Brewed",
    price: 5,
    description: "Clean, aromatic and made to order.",
    image:
      "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 4,
    name: "Cold Brew",
    category: "Cold",
    price: 4.75,
    description: "Smooth, refreshing and steeped for sixteen hours.",
    image:
      "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 5,
    name: "Oat Latte",
    category: "Espresso",
    price: 5.5,
    description: "Silky oat milk with our house espresso blend.",
    image:
      "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 6,
    name: "Iced Mocha",
    category: "Cold",
    price: 5.75,
    description: "Chocolate, espresso and cold milk over ice.",
    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=85",
  },
];

const categories = ["All", "Espresso", "Brewed", "Cold"];


/* =========================
   CUSTOMER WEBSITE
========================= */

function CustomerHome() {
  const [category, setCategory] = useState("All");

  const [cart, setCart] = useState([]);

  const [isCartOpen, setIsCartOpen] = useState(false);

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const visibleProducts =
    category === "All"
      ? products
      : products.filter(
          (product) => product.category === category
        );


  // ADD TO CART
  function addToCart(product) {
    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });

    setIsCartOpen(true);
  }


  // INCREASE QUANTITY
  function increaseQuantity(productId) {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  }


  // DECREASE QUANTITY
  function decreaseQuantity(productId) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }


  // REMOVE PRODUCT
  function removeFromCart(productId) {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== productId)
    );
  }


  // TOTAL ITEMS
  const cartItemCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );


  // TOTAL PRICE
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );


  // OPEN CHECKOUT
  function openCheckout() {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  }

  async function sendOrderConfirmation(order) {
    try {
      const response = await fetch(
        `${API_URL}/send-order-notification-to-owner/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customer_name: order.customer.name,
            customer_phone: order.customer.phone,
            item_name: order.items
              .map((item) => `${item.name} x ${item.quantity}`)
              .join(", "),
            address: order.customer.address,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to send WhatsApp notification");
      }

      console.log("WHATSAPP NOTIFICATION SENT:", data);
    } catch (error) {
      console.error("WHATSAPP ERROR:", error);
    }
  }


  // PLACE ORDER
  async function placeOrder(order) {
    try {
      const response = await fetch(
        `${API_URL}/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(order),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to place order");
      }

      const data = await response.json();

      console.log("SERVER RESPONSE:", data);

      await sendOrderConfirmation(order);

      alert("Order placed successfully! ☕");

      setIsCheckoutOpen(false);
      setCart([]);

    } catch (error) {
      console.error("ORDER ERROR:", error);

      alert("Something went wrong. Please try again.");
    }
  }


  return (
    <>
      <Navbar />

      <main>
        <Hero />

        <Marquee />

        <Features />

        <Menu
          categories={categories}
          category={category}
          setCategory={setCategory}
        />

        <section
          className="products"
          aria-label="Coffee menu"
        >
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))}
        </section>

        <Story />

        <Location />

        <NewsLetter />
      </main>

      <Footer />


      {/* CART */}
      <Cart
        cart={cart}
        isOpen={isCartOpen}
        closeCart={() => setIsCartOpen(false)}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        removeFromCart={removeFromCart}
        total={cartTotal}
        openCheckout={openCheckout}
      />


      {/* CHECKOUT */}
      {isCheckoutOpen && (
        <Checkout
          cart={cart}
          total={cartTotal}
          closeCheckout={() => {
            setIsCheckoutOpen(false);
            setCart([]);
          }}
          placeOrder={placeOrder}
        />
      )}


      {/* FLOATING CART */}
      <button
        className="floating-cart"
        onClick={() => setIsCartOpen(true)}
      >
        🛒

        {cartItemCount > 0 && (
          <span>{cartItemCount}</span>
        )}
      </button>
    </>
  );
}


/* =========================
   ADMIN PROTECTED ROUTE
========================= */

function ProtectedAdminRoute({ children }) {
  const isAdminLoggedIn =
    localStorage.getItem("adminLoggedIn") === "true";

  if (!isAdminLoggedIn) {
    return <Navigate to="/admin" replace />;
  }

  return children;
}


/* =========================
   MAIN APP
========================= */

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* CUSTOMER WEBSITE */}
        <Route
          path="/"
          element={<CustomerHome />}
        />


        {/* ADMIN LOGIN */}
        <Route
          path="/admin"
          element={<AdminLogin />}
        />


        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminOrders />
            </ProtectedAdminRoute>
          }
        />


        {/* UNKNOWN URL */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;