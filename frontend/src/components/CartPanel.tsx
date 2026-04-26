import React, { useEffect } from "react";
import { useCart } from "./CartContext";

interface CartPanelProps {
  open: boolean;
  onClose: () => void;
}

const CartPanel: React.FC<CartPanelProps> = ({ open, onClose }) => {
  const { cart, changeQty, removeFromCart, clearCart } = useCart();
  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape" && open) onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const qtyBtnStyle: React.CSSProperties = {
    width: 26, height: 26,
    borderRadius: "50%",
    border: "1px solid #e0c8c8",
    background: "transparent",
    cursor: "pointer",
    fontSize: "1rem",
    color: "#8a5050",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.15s",
  };

  const hoverDark = (e: React.MouseEvent<HTMLElement>) =>
    Object.assign((e.currentTarget as HTMLElement).style, { background: "#2a1a1a", color: "white", borderColor: "#2a1a1a" });
  const unhoverDark = (e: React.MouseEvent<HTMLElement>) =>
    Object.assign((e.currentTarget as HTMLElement).style, { background: "transparent", color: "#8a5050", borderColor: "#e0c8c8" });

  return (
    <>
      {/* Backdrop overlay */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0,
          background: "rgba(42,26,26,0.45)",
          zIndex: 199,
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.3s",
        }}
      />

      {/* Slide-in panel */}
      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0, width: 360,
        background: "#fffaf7",
        borderLeft: "1px solid #f0e0e0",
        display: "flex",
        flexDirection: "column",
        transform: open ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.35s cubic-bezier(.4,0,.2,1)",
        zIndex: 200,
        boxShadow: "-6px 0 32px rgba(44,26,14,0.08)",
      }}>

        {/* ── Header ── */}
        <div style={{
          background: "rgb(253,230,230)",
          padding: "1.2rem 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #f0d8d8",
          flexShrink: 0,
        }}>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.4rem",
            fontWeight: 300,
            letterSpacing: "0.04em",
            color: "#2a1a1a",
            margin: 0,
          }}>
            Your Order
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "1px solid #d4a0a0",
              borderRadius: "50%",
              width: 30, height: 30,
              cursor: "pointer",
              fontSize: "0.9rem",
              color: "#8a5050",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => Object.assign((e.currentTarget as HTMLElement).style, { background: "#b85c5c", color: "white", borderColor: "#b85c5c" })}
            onMouseLeave={(e) => Object.assign((e.currentTarget as HTMLElement).style, { background: "none", color: "#8a5050", borderColor: "#d4a0a0" })}
          >
            ✕
          </button>
        </div>

        {/* ── Items ── */}
        <div style={{ flex: 1, overflowY: "auto", padding: "1rem 1.2rem" }}>
          {cart.length === 0 ? (
            <div style={{
              textAlign: "center",
              color: "#a07070",
              padding: "3rem 1rem",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.1rem",
              fontStyle: "italic",
              fontWeight: 300,
            }}>
              Your order is empty.<br />Add something to begin.
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} style={{
                display: "flex",
                alignItems: "center",
                gap: "0.8rem",
                padding: "0.85rem 0",
                borderBottom: "1px solid #f0e0e0",
              }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: 52, height: 52, borderRadius: 8, objectFit: "cover", flexShrink: 0 }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1rem",
                    fontWeight: 400,
                    color: "#2a1a1a",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}>
                    {item.name}
                  </div>
                  <div style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "0.85rem",
                    color: "#b85c5c",
                    fontWeight: 500,
                    marginTop: 2,
                  }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>

                {/* Quantity controls */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                  <button style={qtyBtnStyle} onClick={() => changeQty(item.id, -1)}
                    onMouseEnter={hoverDark} onMouseLeave={unhoverDark}>−</button>
                  <span style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    minWidth: 18,
                    textAlign: "center",
                    color: "#2a1a1a",
                  }}>
                    {item.quantity}
                  </span>
                  <button style={qtyBtnStyle} onClick={() => changeQty(item.id, 1)}
                    onMouseEnter={hoverDark} onMouseLeave={unhoverDark}>+</button>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  title="Remove"
                  style={{
                    background: "none", border: "none",
                    color: "#c08080", cursor: "pointer",
                    fontSize: "0.9rem", padding: "0.2rem 0.3rem",
                    opacity: 0.55, transition: "opacity 0.15s",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.55"; }}
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {/* ── Footer ── */}
        {cart.length > 0 && (
          <div style={{
            padding: "1.2rem 1.5rem",
            borderTop: "1px solid #f0e0e0",
            background: "#fffaf7",
            flexShrink: 0,
          }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: "1rem",
            }}>
              <span style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "0.8rem",
                fontWeight: 300,
                color: "#8a5050",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}>
                Total
              </span>
              <span style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.6rem",
                fontWeight: 400,
                color: "#2a1a1a",
              }}>
                ${total.toFixed(2)}
              </span>
            </div>

            <button
              style={{
                width: "100%", background: "#2a1a1a", color: "#fdf6ec",
                border: "none", padding: "0.85rem", borderRadius: 8,
                fontFamily: "'Jost', sans-serif", fontSize: "0.85rem",
                fontWeight: 400, letterSpacing: "0.1em", textTransform: "uppercase",
                cursor: "pointer", transition: "background 0.18s", marginBottom: "0.6rem",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#b85c5c"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#2a1a1a"; }}
            >
              Place Order
            </button>

            <button
              onClick={clearCart}
              style={{
                width: "100%", background: "transparent", color: "#a07070",
                border: "1px solid #e0c8c8", padding: "0.6rem", borderRadius: 8,
                fontFamily: "'Jost', sans-serif", fontSize: "0.78rem",
                fontWeight: 300, letterSpacing: "0.06em",
                cursor: "pointer", transition: "all 0.15s",
              }}
              onMouseEnter={(e) => Object.assign((e.currentTarget as HTMLElement).style, { borderColor: "#b85c5c", color: "#b85c5c" })}
              onMouseLeave={(e) => Object.assign((e.currentTarget as HTMLElement).style, { borderColor: "#e0c8c8", color: "#a07070" })}
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPanel;