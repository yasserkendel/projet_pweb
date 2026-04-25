import { useState, useEffect } from "react"
import ProductCard from "../components/productcard.jsx" 

function ViewProducts({ onNavigate }) {
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState("") // New state for search
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
      .then((data) => { setProducts(data); setLoading(false) })
      .catch(() => { setError("Could not load products."); setLoading(false) })
  }, [])

  // Fuzzy matching logic: checks name and description, case-insensitive
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
        .vp-back:hover { color:var(--accent-color); }
        
        /* Search Bar Styles */
        /* Base Search Bar Styles */
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

.search-input:focus {
  border-color: var(--accent-color);
  background: rgba(212, 175, 55, 0.08);
}

/* Light Mode "Pop" Overrides */
.light-mode .search-input {
  background: #fcfcfc;              /* Slight off-white to distinguish from background */
  border: 2px solid #000000;         /* Thick black border */
  font-weight: 600;                 /* Thicker text as requested previously */
  color: #000000;
  box-shadow: 4px 4px 0px var(--accent-color); /* The "Pop": a solid gold offset shadow */
}

.light-mode .search-input:focus {
  transform: translate(-2px, -2px); /* Slight lift effect on focus */
  box-shadow: 6px 6px 0px var(--accent-color);
  background: #ffffff;
}

.light-mode .search-input::placeholder {
  color: #000000;
  opacity: 0.5;
  font-weight: 500;
}
        .search-input::placeholder {
          color: var(--text-secondary);
          opacity: 0.6;
        }

        /* Light mode visibility fixes */
        .light-mode .vp-back { font-weight: 600; color: var(--text-primary); }
        .light-mode .search-input { font-weight: 500; border-width: 2px; }
        .light-mode .search-input::placeholder { color: #333; opacity: 0.8; }
        .light-mode h1 { font-weight: 500 !important; }

        .vp-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 24px;
          max-width: 1100px;
          margin: 0 auto;
        }
        .no-results {
          grid-column: 1 / -1;
          text-align: center;
          padding: 60px 0;
          color: var(--text-secondary);
          font-style: italic;
        }
      `}</style>

      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <button className="vp-back" onClick={() => onNavigate("home")} 
          style={{ animation: visible ? "vp-fade-up 0.8s ease 0.1s forwards" : "none", opacity: 0 }}>
          ← Back
        </button>
      </div>

      <div style={{ textAlign:"center", marginBottom:"40px", animation: visible ? "vp-fade-up 0.8s ease 0.2s forwards" : "none", opacity:0 }}>
        <p style={{ fontSize:"10px", fontWeight:200, letterSpacing:"6px", color:"var(--accent-color)", textTransform:"uppercase", marginBottom:"12px" }}>
          Our Selection
        </p>
        <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:300, fontSize:"42px", color:"var(--text-primary)", lineHeight:1.1, margin:0, transition: "color 0.3s ease" }}>
          The <em style={{ fontStyle:"italic", color:"var(--accent-color)" }}>Collection</em>
        </h1>
      </div>

      {/* Search Input Section */}
      <div className="search-container" style={{ animation: visible ? "vp-fade-up 0.8s ease 0.3s forwards" : "none" }}>
        <input 
          type="text"
          className="search-input"
          placeholder="SEARCH FOR A FRAGRANCE (E.G. 'GAZ', 'INTENSE')..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div style={{ display:"flex", alignItems:"center", gap:"12px", maxWidth:"1100px", margin:"0 auto 48px" }}>
        <div style={{ flex:1, height:"1px", background:"var(--border-color)" }} />
        <div style={{ width:"4px", height:"4px", background:"var(--accent-color)", transform:"rotate(45deg)", opacity:0.4 }} />
        <div style={{ flex:1, height:"1px", background:"var(--border-color)" }} />
      </div>

      {loading && (
        <p style={{ textAlign:"center", color:"var(--text-secondary)", fontSize:"11px", letterSpacing:"3px", textTransform:"uppercase" }}>
          Loading collection...
        </p>
      )}

      {error && (
        <p style={{ textAlign:"center", color:"#c0392b", fontSize:"11px", letterSpacing:"2px" }}>{error}</p>
      )}

      <div className="vp-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))
        ) : !loading && (
          <div className="no-results">
            No fragrances found matching "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  )
}

export default ViewProducts