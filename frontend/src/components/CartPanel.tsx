import React, { useEffect, useState } from "react";
import { useCart } from "./CartContext";

interface CartPanelProps {
  open: boolean;
  onClose: () => void;
}

const CartPanel: React.FC<CartPanelProps> = ({ open, onClose }) => {
  const { cart, changeQty, removeFromCart, clearCart } = useCart();
  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 480);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 480);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const panelWidth = isMobile ? "100vw" : "clamp(320px, 40vw, 420px)";

  const qtyBtnStyle: React.CSSProperties = {
    width: isMobile ? 32 : 26,
    height: isMobile ? 32 : 26,
    borderRadius: "50%",
    border: "1px solid #e0c8c8",
    background: "transparent",
    cursor: "pointer",
    fontSize: isMobile ? "1.1rem" : "1rem",
    color: "#8a5050",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.15s",
    flexShrink: 0,
  };

  const hoverDark = (e: React.MouseEvent<HTMLElement>) =>
    Object.assign((e.currentTarget as HTMLElement).style, {
      background: "#2a1a1a",
      color: "white",
      borderColor: "#2a1a1a",
    });
  const unhoverDark = (e: React.MouseEvent<HTMLElement>) =>
    Object.assign((e.currentTarget as HTMLElement).style, {
      background: "transparent",
      color: "#8a5050",
      borderColor: "#e0c8c8",
    });

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(42,26,26,0.45)",
          zIndex: 199,
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.3s",
          // Improve tap target on mobile
          WebkitTapHighlightColor: "transparent",
        }}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Your Order"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: panelWidth,
          background: "#fffaf7",
          borderLeft: isMobile ? "none" : "1px solid #f0e0e0",
          borderTop: isMobile ? "1px solid #f0e0e0" : "none",
          display: "flex",
          flexDirection: "column",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s cubic-bezier(.4,0,.2,1)",
          zIndex: 200,
          boxShadow: isMobile
            ? "-4px 0 40px rgba(44,26,14,0.14)"
            : "-6px 0 32px rgba(44,26,14,0.08)",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        <div
          style={{
            background: "rgb(253,230,230)",
            padding: isMobile ? "1rem 1.2rem" : "1.2rem 1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #f0d8d8",
            flexShrink: 0,
            paddingTop: isMobile
              ? `calc(1rem + env(safe-area-inset-top))`
              : "1.2rem",
          }}
        >
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: isMobile ? "1.25rem" : "1.4rem",
              fontWeight: 300,
              letterSpacing: "0.04em",
              color: "#2a1a1a",
              margin: 0,
            }}
          >
            Your Order
          </h2>
          <button
            onClick={onClose}
            aria-label="Close cart"
            style={{
              background: "none",
              border: "1px solid #d4a0a0",
              borderRadius: "50%",
              width: isMobile ? 36 : 30,
              height: isMobile ? 36 : 30,
              cursor: "pointer",
              fontSize: isMobile ? "1rem" : "0.9rem",
              color: "#8a5050",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.15s",
              flexShrink: 0,
              WebkitTapHighlightColor: "transparent",
            }}
            onMouseEnter={(e) =>
              Object.assign((e.currentTarget as HTMLElement).style, {
                background: "#b85c5c",
                color: "white",
                borderColor: "#b85c5c",
              })
            }
            onMouseLeave={(e) =>
              Object.assign((e.currentTarget as HTMLElement).style, {
                background: "none",
                color: "#8a5050",
                borderColor: "#d4a0a0",
              })
            }
          >
            ✕
          </button>
        </div>

        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: isMobile ? "0.75rem 1rem" : "1rem 1.2rem",
            // Momentum scrolling on iOS
            WebkitOverflowScrolling: "touch",
          }}
        >
          {cart.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                color: "#a07070",
                padding: "3rem 1rem",
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: isMobile ? "1rem" : "1.1rem",
                fontStyle: "italic",
                fontWeight: 300,
              }}
            >
              Your order is empty.
              <br />
              Add something to begin.
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: isMobile ? "0.65rem" : "0.8rem",
                  padding: isMobile ? "0.9rem 0" : "0.85rem 0",
                  borderBottom: "1px solid #f0e0e0",
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: isMobile ? 48 : 52,
                    height: isMobile ? 48 : 52,
                    borderRadius: 8,
                    objectFit: "cover",
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: isMobile ? "0.95rem" : "1rem",
                      fontWeight: 400,
                      color: "#2a1a1a",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontSize: "0.85rem",
                      color: "#b85c5c",
                      fontWeight: 500,
                      marginTop: 2,
                    }}
                  >
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: isMobile ? "0.45rem" : "0.35rem",
                    flexShrink: 0,
                  }}
                >
                  <button
                    style={qtyBtnStyle}
                    onClick={() => changeQty(item.id, -1)}
                    aria-label={`Decrease quantity of ${item.name}`}
                    onMouseEnter={hoverDark}
                    onMouseLeave={unhoverDark}
                  >
                    −
                  </button>
                  <span
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      minWidth: 20,
                      textAlign: "center",
                      color: "#2a1a1a",
                    }}
                  >
                    {item.quantity}
                  </span>
                  <button
                    style={qtyBtnStyle}
                    onClick={() => changeQty(item.id, 1)}
                    aria-label={`Increase quantity of ${item.name}`}
                    onMouseEnter={hoverDark}
                    onMouseLeave={unhoverDark}
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  title="Remove"
                  aria-label={`Remove ${item.name} from cart`}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#c08080",
                    cursor: "pointer",
                    // Bigger tap target on mobile
                    fontSize: isMobile ? "1rem" : "0.9rem",
                    padding: isMobile ? "0.4rem" : "0.2rem 0.3rem",
                    opacity: 0.55,
                    transition: "opacity 0.15s",
                    flexShrink: 0,
                    WebkitTapHighlightColor: "transparent",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.opacity = "1";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.opacity = "0.55";
                  }}
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div
            style={{
              padding: isMobile ? "1rem 1.2rem" : "1.2rem 1.5rem",
              borderTop: "1px solid #f0e0e0",
              background: "#fffaf7",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: "1rem",
              }}
            >
              <span
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "0.8rem",
                  fontWeight: 300,
                  color: "#8a5050",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Total
              </span>
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: isMobile ? "1.4rem" : "1.6rem",
                  fontWeight: 400,
                  color: "#2a1a1a",
                }}
              >
                ${total.toFixed(2)}
              </span>
            </div>

            <button
              style={{
                width: "100%",
                background: "#2a1a1a",
                color: "#fdf6ec",
                border: "none",
                padding: isMobile ? "1rem" : "0.85rem",
                borderRadius: 8,
                fontFamily: "'Jost', sans-serif",
                fontSize: "0.85rem",
                fontWeight: 400,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "background 0.18s",
                marginBottom: "0.6rem",
                WebkitTapHighlightColor: "transparent",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#b85c5c";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#2a1a1a";
              }}
            >
              Place Order
            </button>

            <button
              onClick={clearCart}
              style={{
                width: "100%",
                background: "transparent",
                color: "#a07070",
                border: "1px solid #e0c8c8",
                padding: isMobile ? "0.75rem" : "0.6rem",
                borderRadius: 8,
                fontFamily: "'Jost', sans-serif",
                fontSize: "0.78rem",
                fontWeight: 300,
                letterSpacing: "0.06em",
                cursor: "pointer",
                transition: "all 0.15s",
                WebkitTapHighlightColor: "transparent",
              }}
              onMouseEnter={(e) =>
                Object.assign((e.currentTarget as HTMLElement).style, {
                  borderColor: "#b85c5c",
                  color: "#b85c5c",
                })
              }
              onMouseLeave={(e) =>
                Object.assign((e.currentTarget as HTMLElement).style, {
                  borderColor: "#e0c8c8",
                  color: "#a07070",
                })
              }
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