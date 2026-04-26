import React, { useState } from "react";
import { useCart } from "./CartContext"
import CartPanel from "./CartPanel";
import { Link } from "react-router-dom";
const Navbar: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const { cart } = useCart()
    const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);

    const navLinks = [
        { name: 'Menu', href: '/menu' },
        { name: 'About Us', href: '/about' },
        { name: 'Contact', href: '/contact' },
        { name: 'Gallery', href: '/gallery' },
    ];
    return (
        <>
            <style>
                {`
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;500&display=swap');
 
        .nav-link {
          font-family: 'Jost', sans-serif;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #1a1a1a;
          text-decoration: none;
          display: block;
          padding: 1rem 1.1rem;
          position: relative;
          transition: color 0.2s ease;
        }
 
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0.6rem;
          left: 1.1rem;
          right: 1.1rem;
          height: 1.5px;
          background-color: #1a1a1a;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.25s ease;
        }
 
        .nav-link:hover::after {
          transform: scaleX(1);
        }
 
        .nav-link:hover {
          color: #000;
        }
          .cart-btn {
          background: #3d2410;
          color: #fdf6ec;
          border: none;
          padding: 0.45rem 1.1rem;
          border-radius: 50px;
          font-family: 'Jost', sans-serif;
          font-size: 0.78rem;
          font-weight: 400;
          letter-spacing: 0.06em;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.45rem;
          transition: background 0.18s;
          margin: 0 0.75rem;
        }
        .cart-btn:hover { background: #b85c5c; }
 
        .cart-badge {
          background: #b85c5c;
          color: white;
          border-radius: 50%;
          width: 18px;
          height: 18px;
          font-size: 0.68rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .mobile-nav .nav-link::after {
            display: none;
        }
      `}
            </style>
            <nav className="bg-pink font-sans font-semibold text-sm text-black tracking-wider p-1 uppercase sticky top-0 z-10 border-b-2 border-[#d4849f]">
                <div className="flex items-center justify-between">
                    <div className="hidden md:flex items-center">
                        <Link to="/" className="nav-link">
                            Home
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center">
                        {navLinks.map((link) => (
                            <Link key={link.name} to={link.href} className="nav-link">
                                {link.name}
                            </Link>
                        ))}
                        <button className="hidden md:flex cart-btn" onClick={() => setCartOpen(true)}>
                            🛒 Cart
                            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
                        </button>
                    </div>
                </div>
                <div className="flex md:hidden items-center">
                    <button
                        className="flex flex-col justify-center gap-1.25 bg-transparent border-0 cursor-pointer px-4 py-3"
                        onClick={() => setMenuOpen((p) => !p)}
                        aria-label="Toggle menu"
                    >
                        <span className="block w-6 h-0.5 bg-[#fdf6ec] transition-transform duration-250"
                            style={{ transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none" }} />
                        <span className="block w-6 h-0.5 bg-[#fdf6ec] transition-opacity duration-250"
                            style={{ opacity: menuOpen ? 0 : 1 }} />
                        <span className="block w-6 h-0.5 bg-[#fdf6ec] transition-transform duration-250"
                            style={{ transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none" }} />
                    </button>
                </div>

                {menuOpen && (
                    <div className="mobile-nav flex flex-col md:hidden border-t border-[#4a2a14] text-center">
                        <Link to="/" className="nav-link border-b border-[#4a2a14]">
                            Home
                        </Link>
                        {navLinks.map((link) => (
                            <Link key={link.name} to={link.href} className="nav-link border-b border-[#4a2a14]">
                                {link.name}
                            </Link>
                        ))}
                        <button
                            className="cart-btn"
                            style={{ padding: "0.45rem 0.75rem", width: "100px", margin: "0.5rem auto" }}
                            onClick={() => setCartOpen(true)}
                        >
                            🛒 Cart{totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
                        </button>
                    </div>
                )}
            </nav >
            <CartPanel open={cartOpen} onClose={() => setCartOpen(false)} />
        </>
    );
};

export default Navbar;