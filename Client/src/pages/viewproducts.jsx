import { useState, useEffect } from "react"
import ProductCard from "../components/ProductCard" 

function ViewProducts({ onNavigate }) { // Added the prop here
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setVisible(true), 50) // For the fade-up animation
    
    fetch(`${import.meta.env.VITE_API_URL}/api/products`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch")
        return res.json()
      })
      .then((data) => { setProducts(data); setLoading(false) })
      .catch(() => { setError("Could not load products."); setLoading(false) })
  }, [])

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
        
        /* Light mode visibility fix */
        .light-mode .vp-back { font-weight: 600; color: var(--text-primary); }
        .light-mode h1 { font-weight: 500 !important; }
        .light-mode p { font-weight: 500 !important; }

        .vp-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 24px;
          max-width: 1100px;
          margin: 0 auto;
        }
      `}</style>

      {/* The Back Button */}
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <button 
          className="vp-back" 
          onClick={() => onNavigate("home")} 
          style={{ animation: visible ? "vp-fade-up 0.8s ease 0.1s forwards" : "none", opacity: 0 }}
        >
          ← Back
        </button>
      </div>

      <div style={{ textAlign:"center", marginBottom:"56px", animation: visible ? "vp-fade-up 0.8s ease 0.2s forwards" : "none", opacity:0 }}>
        <p style={{ fontSize:"10px", fontWeight:200, letterSpacing:"6px", color:"var(--accent-color)", textTransform:"uppercase", marginBottom:"12px" }}>
          Our Selection
        </p>
        <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:300, fontSize:"42px", color:"var(--text-primary)", lineHeight:1.1, margin:0, transition: "color 0.3s ease" }}>
          The <em style={{ fontStyle:"italic", color:"var(--accent-color)" }}>Collection</em>
        </h1>
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
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </div>
  )
}

export default ViewProducts