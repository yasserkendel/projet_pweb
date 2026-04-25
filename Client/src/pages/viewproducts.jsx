import { useState, useEffect } from "react"
import ProductCard from "../components/productcard.jsx" 

function ViewProducts({ onNavigate }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setVisible(true), 50)
    
    fetch(`${import.meta.env.VITE_API_URL}/api/products`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch")
        return res.json()
      })
      .then((data) => { 
        setProducts(data)
        setLoading(false) 
      })
      .catch(() => { 
        setError("Could not load products.")
        setLoading(false) 
      })
  }, [])

  // jQuery Search Implementation
  useEffect(() => {
    if (!loading && products.length > 0) {
      // Use jQuery to handle the input event
      $("#product-search").on("keyup", function() {
        const value = $(this).val().toLowerCase();
        
        $(".product-item").filter(function() {
          // This looks at all text inside the card (name + description)
          const text = $(this).text().toLowerCase();
          $(this).toggle(text.indexOf(value) > -1);
        });
      });
    }

    // Cleanup listener on unmount
    return () => $("#product-search").off("keyup");
  }, [loading, products]);

  return (
    <div style={{
      minHeight: "100vh", background: "var(--bg-color)",
      padding: "48px 24px", fontFamily: "'Montserrat', sans-serif",
      transition: "background 0.3s ease"
    }}>
      <style>{`
        @keyframes vp-fade-up {
          from { opacity:0; transform:translateY(16px); }
          to { opacity:1; transform:translateY(0); }
        }
        
        .vp-back {
          display:inline-flex; align-items:center; gap:8px;
          background:none; border:none; color:var(--text-secondary);
          font-family:'Montserrat',sans-serif; font-size:10px;
          letter-spacing:3px; text-transform:uppercase; cursor:pointer;
          margin-bottom:40px; padding:0; transition:color 0.3s;
        }

        /* Search Bar Styles - With the "Pop" Fix */
        .search-container {
          max-width: 1100px;
          margin: 0 auto 40px;
          animation: vp-fade-up 0.8s ease 0.3s forwards;
          opacity: 0;
        }
        .search-input {
          width: 100%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-color);
          padding: 16px 24px;
          color: var(--text-primary);
          font-family: 'Montserrat', sans-serif;
          font-weight: 300;
          font-size: 13px;
          letter-spacing: 2px;
          outline: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Light Mode High-Contrast "Pop" */
        .light-mode .search-input {
          background: #fcfcfc;
          border: 2px solid #000000;
          font-weight: 600;
          color: #000000;
          box-shadow: 4px 4px 0px var(--accent-color);
        }
        .light-mode .search-input::placeholder { color: #000000; opacity: 0.6; }

        .vp-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 24px;
          max-width: 1100px;
          margin: 0 auto;
        }
      `}</style>

      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <button className="vp-back" onClick={() => onNavigate("home")} 
          style={{ animation: visible ? "vp-fade-up 0.8s ease 0.1s forwards" : "none", opacity: 0 }}>
          ← Back
        </button>
      </div>

    <div style={{ textAlign: "center", marginBottom: "40px", animation: visible ? "vp-fade-up 0.8s ease 0.2s forwards" : "none", opacity: 0 }}>
  <p style={{ fontSize: "10px", fontWeight: 200, letterSpacing: "6px", color: "var(--accent-color)", textTransform: "uppercase", marginBottom: "12px" }}>
    Our Selection
  </p>
  <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "42px", color: "var(--text-primary)", lineHeight: 1.1, margin: 0 }}>
    The <em style={{ fontStyle: "italic", color: "var(--accent-color)" }}>Collection</em>
  </h1>
</div>

      {/* The jQuery Search Bar */}
      <div className="search-container" style={{ animation: visible ? "vp-fade-up 0.8s ease 0.3s forwards" : "none" }}>
        <input 
          type="text"
          id="product-search"
          className="search-input"
          placeholder="SEARCH THE COLLECTION..."
        />
      </div>

      <div className="vp-grid">
        {products.map((product, index) => (
          <div key={product.id} className="product-item">
            <ProductCard product={product} index={index} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ViewProducts