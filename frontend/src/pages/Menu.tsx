import React, { useState, useEffect, useRef } from "react";
import { menuItems } from "./menuItems.ts";
import { useCart } from "../components/CartContext";
import CartPanel from "../components/CartPanel";

const MenuPage: React.FC = () => {
  const { cart, addToCart } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [flashedIds, setFlashedIds] = useState<Set<number>>(new Set());
  const [toast, setToast] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Total item count for the badge
  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);

  const handleAddToCart = (item: (typeof menuItems)[0]) => {
    addToCart(item);

    setFlashedIds((prev) => new Set(prev).add(item.id));
    setTimeout(() => {
      setFlashedIds((prev) => {
        const next = new Set(prev);
        next.delete(item.id);
        return next;
      });
    }, 1200);

    // Toast notification
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast(`${item.name} added`);
    setToastVisible(true);
    toastTimer.current = setTimeout(() => setToastVisible(false), 2000);
  };

  useEffect(() => () => { if (toastTimer.current) clearTimeout(toastTimer.current); }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Jost:wght@300;400;500&display=swap');

        .menu-card {
          background: #fff;
          border: 1px solid #f0e6e6;
          border-radius: 12px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 0.22s ease, box-shadow 0.22s ease;
          animation: cardFadeUp 0.4s ease both;
        }
        .menu-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 40px rgba(180,100,100,0.1);
        }
        .menu-card:nth-child(1) { animation-delay: 0.05s; }
        .menu-card:nth-child(2) { animation-delay: 0.10s; }
        .menu-card:nth-child(3) { animation-delay: 0.15s; }
        .menu-card:nth-child(4) { animation-delay: 0.20s; }

        @keyframes cardFadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .add-btn {
          background: #2a1a1a;
          color: #fdf6ec;
          border: none;
          padding: 0.45rem 1.1rem;
          border-radius: 50px;
          font-family: 'Jost', sans-serif;
          font-size: 0.8rem;
          font-weight: 400;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: background 0.18s, transform 0.1s;
        }
        .add-btn:hover  { background: #b85c5c; }
        .add-btn:active { transform: scale(0.96); }
        .add-btn.added  { background: #4a7c59; }

        .cart-toggle-btn {
          background: #2a1a1a;
          color: #fdf6ec;
          border: none;
          padding: 0.5rem 1.2rem;
          border-radius: 50px;
          font-family: 'Jost', sans-serif;
          font-size: 0.85rem;
          font-weight: 400;
          letter-spacing: 0.04em;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: background 0.18s;
        }
        .cart-toggle-btn:hover { background: #b85c5c; }

        .toast {
          position: fixed;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%) translateY(60px);
          background: #2a1a1a;
          color: #fdf6ec;
          padding: 0.6rem 1.4rem;
          border-radius: 50px;
          font-family: 'Jost', sans-serif;
          font-size: 0.82rem;
          font-weight: 300;
          letter-spacing: 0.04em;
          z-index: 300;
          opacity: 0;
          pointer-events: none;
          transition: transform 0.3s cubic-bezier(.4,0,.2,1), opacity 0.3s;
        }
        .toast.show {
          transform: translateX(-50%) translateY(0);
          opacity: 1;
        }
      `}</style>

      <main className="min-h-screen">
        <div className="page-heading">
          Menu
        </div>

        <div style={{
          padding: "2.5rem 2rem",
          display: "flex",
          justifyContent: "center",
          transition: "margin-right 0.35s cubic-bezier(.4,0,.2,1)",
          marginRight: cartOpen ? 360 : 0,
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "2rem",
            width: "100%",
            maxWidth: 1200,
          }}>
            {menuItems.map((item) => {
              const isFlashed = flashedIds.has(item.id);
              return (
                <div key={item.id} className="menu-card">
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block" }}
                    loading="lazy"
                  />
                  <div style={{
                    padding: "1.1rem 1.2rem 1.4rem",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.4rem",
                  }}>
                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1.2rem",
                      fontWeight: 400,
                      color: "#2a1a1a",
                      lineHeight: 1.3,
                    }}>
                      {item.name}
                    </div>
                    <div style={{
                      fontFamily: "'Jost', sans-serif",
                      fontSize: "0.95rem",
                      fontWeight: 500,
                      color: "#b85c5c",
                      letterSpacing: "0.02em",
                    }}>
                      ${item.price.toFixed(2)}
                    </div>
                    <div style={{
                      fontFamily: "'Jost', sans-serif",
                      fontSize: "0.82rem",
                      fontWeight: 300,
                      color: "#6a5050",
                      lineHeight: 1.6,
                      flex: 1,
                    }}>
                      {item.description}
                    </div>
                    <div className="flex justify-end mt-3">
                      <button
                        className={`add-btn${isFlashed ? " added" : ""}`}
                        onClick={() => handleAddToCart(item)}
                      >
                        {isFlashed ? "✓ Added" : "+ Add to Order"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={`toast${toastVisible ? " show" : ""}`}>{toast}</div>

      </main>
    </>
  );
};

export default MenuPage;