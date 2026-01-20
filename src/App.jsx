import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { supabase } from './lib/supabase';
import LinkButton from './components/LinkButton';
import Footer from './components/Footer';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

// Public Home Component
const Home = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLinks();
  }, []);

  // Fallback links (Used if DB is empty or fails)
  const FALLBACK_LINKS = [
    { text: 'Price List', href: 'https://bit.ly/49GUc7p', icon: '💰' },
    { text: 'WhatsApp', href: 'https://wa.me/639482890888', icon: '💬' },
    { text: 'Messenger', href: 'https://www.facebook.com/share/1DHD9MTd2a/?mibextid=wwXIfr', icon: '📨' },
    { text: 'Proof of delivery', href: 'https://www.facebook.com/share/17pEEVtLfi/?', icon: '📦' },
    { text: 'Facebook', href: 'https://www.facebook.com/share/1ARSUS6Ari/?mibextid=wwXIfr', icon: '👍' },
    { text: 'TikTok', href: 'https://www.tiktok.com/@pepgoodiesph?_r=1&_t=ZS-93BeFr1g2Ta', icon: '🎵' },
    { text: 'Support Group', href: 'https://chat.whatsapp.com/Djvi25eiyDV9tEOVREjLNT', icon: '👥' },
  ];

  const fetchLinks = async () => {
    try {
      const { data, error } = await supabase
        .from('links')
        .select('*')
        .order('order', { ascending: true });

      if (error) throw error;

      if (data && data.length > 0) {
        setLinks(data);
      } else {
        console.log('No links in DB, using fallback.');
        setLinks(FALLBACK_LINKS);
      }
    } catch (error) {
      console.error('Error fetching links (using fallback):', error);
      setLinks(FALLBACK_LINKS);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      {/* Background Decor handled by body css now */}

      {/* Header Section */}
      <header className="header animate-fade-in">
        <div className="logo-container">
          <img
            src="/pepgoodies-logo.png"
            alt="Pepgoodies PH Logo"
            className="logo-img"
          />
          <div className="logo-glow"></div>
        </div>

        <h1 className="brand-name">
          Pepgoodies PH
        </h1>
        <p className="brand-tagline">
          Recharge your body, mind and spirit.
        </p>
        <p className="brand-tagline-sub" style={{ fontSize: '0.9rem', opacity: 0.9, fontStyle: 'italic', marginTop: '0.5rem', maxWidth: '600px', marginInline: 'auto' }}>
          Reconnect. Revitalize. Recharge.
        </p>
      </header>

      {/* Links Section */}
      <main className="links-container">
        {loading ? (
          <div className="text-[var(--color-text-light)] opacity-70 italic mt-4">loading...</div>
        ) : links.length > 0 ? (
          links.map((link, index) => (
            <LinkButton
              key={link.id || index}
              text={link.text}
              href={link.href}
              icon={link.icon}
              delay={0.1 + (index * 0.05)}
            />
          ))
        ) : (
          <div className="text-[var(--color-text-light)] opacity-70 italic mt-4">
            No links available.
          </div>
        )}
      </main>

      {/* Contact Details Section */}
      <section className="contact-section animate-fade-in delay-300" style={{ textAlign: 'center', marginTop: '3rem', padding: '1rem', backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: '1rem', backdropFilter: 'blur(5px)' }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary-dark)', marginBottom: '1rem' }}>Contact Us</h3>

        <div style={{ marginBottom: '1rem' }}>
          <p><strong>Call/Text / WhatsApp:</strong></p>
          <p>0915 243 8881</p>
          <p>0948 2890 888</p>
          <p>0927 0721 888</p>
        </div>

        <div>
          <p><strong>Email:</strong></p>
          <p>pepgoodies@gmail.com</p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
