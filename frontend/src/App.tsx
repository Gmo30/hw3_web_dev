import { Route, Routes } from "react-router-dom"
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import ContactPage from './pages/Contact';
import GalleryPage from './pages/Gallery';
import MenuPage from './pages/Menu';
import { CartProvider } from "./components/CartContext";
import Navbar from "./components/NavBar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartPanel from "./components/CartPanel";
import { useState } from "react";

const App: React.FC = () => {
  const [cartOpen, setCartOpen] = useState(false);
  return (
    <div className="relative h-full">
      <CartProvider>
        <Header />
        <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/menu" element={<MenuPage />} />
        </Routes>
        <Footer />
        <CartPanel open={cartOpen} onClose={() => setCartOpen(false)} />
      </CartProvider>
    </div>
  );
};

export default App;