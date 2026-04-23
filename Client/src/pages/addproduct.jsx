import { useState, useEffect } from "react"

function AddProduct({ onNavigate }) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [image, setImage] = useState("")
  const [errors, setErrors] = useState({})
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setVisible(true), 50)
  }, [])

  const validate = () => {
    const newErrors = {}
    if (!name.trim()) newErrors.name = "Product name is required"
    if (!description.trim()) newErrors.description = "Description is required"
    if (!price || isNaN(price) || price <= 0) newErrors.price = "Enter a valid price"
    if (!image.trim()) newErrors.image = "Image URL is required"
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const foundErrors = validate()
    if (Object.keys(foundErrors).length > 0) {
      setErrors(foundErrors)
      return
    }
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, price, image })
      })
      if (!response.ok) throw new Error("Failed to add product")
      setName(""); setDescription(""); setPrice(""); setImage(""); setErrors({})
      alert("Fragrance added to the collection!")
      onNavigate("view")
    } catch (err) {
      alert("Something went wrong. Is the server running?")
    }
  }

  return (
    <div style={{
      minHeight: "100vh", background: "var(--bg-color)",
      padding: "48px 24px", fontFamily: "'Montserrat', sans-serif",
      display: "flex", flexDirection: "column", alignItems: "center",
      transition: "background 0.3s ease"
    }}>
      <style>{`
        @keyframes ap-fade-up {
          from { opacity:0; transform:translateY(16px); }
          to { opacity:1; transform:translateY(0); }
        }
        .ap-input {
          width:100%; background:transparent; border:none;
          border-bottom:1px solid var(--border-color);
          color:var(--text-primary); font-family:'Montserrat',sans-serif;
          font-weight:300; font-size:14px; padding:10px 0;
          outline:none; transition:border-color 0.3s ease, color 0.3s ease;
          box-sizing:border-box;
        }
        .ap-input:focus { border-bottom-color:var(--accent-color); }
        .ap-input::placeholder { color:var(--text-secondary); opacity:0.5; }
        .ap-textarea { resize:none; height:80px; }
        .ap-input[type=number]::-webkit-outer-spin-button,
        .ap-input[type=number]::-webkit-inner-spin-button { -webkit-appearance:none; margin:0; }
        .ap-input[type=number] { -moz-appearance:textfield; }
        .light-mode .ap-input {
          border-bottom:2px solid var(--border-color);
          font-weight:500;
        }
        .light-mode .ap-input::placeholder { color:#666666; opacity:0.8; }
        .ap-btn {
          width:100%; padding:18px; background:var(--accent-color); color:var(--bg-color);
          border:none; cursor:pointer; font-family:'Montserrat',sans-serif;
          font-weight:300; font-size:11px; letter-spacing:4px;
          text-transform:uppercase; transition:all 0.3s ease; margin-top:8px;
        }
        .ap-btn:hover { background:#e8c84a; transform:translateY(-1px); }
        .ap-back {
          display:inline-flex; align-items:center; gap:8px;
          background:none; border:none; color:var(--text-secondary);
          font-family:'Montserrat',sans-serif; font-size:10px;
          letter-spacing:3px; text-transform:uppercase; cursor:pointer;
          margin-bottom:40px; padding:0; transition:color 0.3s;
          align-self:flex-start; position:sticky; top:24px; z-index:10;
        }
        .ap-back:hover { color:var(--accent-color); }
        .ap-label {
          display:block; font-size:9px; font-weight:300;
          letter-spacing:4px; color:var(--accent-color);
          text-transform:uppercase; margin-bottom:10px;
          transition:color 0.3s ease;
        }
        .light-mode .ap-label { font-weight:600; }
      `}</style>

      <button
        className="ap-back"
        onClick={() => onNavigate("home")}
        style={{ animation: visible ? "ap-fade-up 0.8s ease 0.1s forwards" : "none", opacity: 0 }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <line x1="12" y1="7" x2="2" y2="7" stroke="currentColor" strokeWidth="1"/>
          <polyline points="6,3 2,7 6,11" stroke="currentColor" strokeWidth="1" fill="none"/>
        </svg>
        Back
      </button>

      <div style={{
        textAlign:"center", marginBottom:"48px",
        animation: visible ? "ap-fade-up 0.8s ease 0.2s forwards" : "none", opacity:0
      }}>
        <p style={{ fontSize:"10px", fontWeight:200, letterSpacing:"6px", color:"var(--accent-color)", textTransform:"uppercase", marginBottom:"12px" }}>
          New Entry
        </p>
        <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:300, fontSize:"42px", color:"var(--text-primary)", lineHeight:1.1, margin:0, transition:"color 0.3s ease" }}>
          Add a <em style={{ fontStyle:"italic", color:"var(--accent-color)" }}>Fragrance</em>
        </h1>
      </div>

      <div style={{
        width:"100%", maxWidth:"520px",
        border:"1px solid var(--border-color)",
        padding:"40px", background:"rgba(212,175,55,0.03)",
        animation: visible ? "ap-fade-up 0.8s ease 0.4s forwards" : "none", opacity:0,
        boxSizing:"border-box", transition:"border-color 0.3s ease"
      }}>
        <form onSubmit={handleSubmit}>

          <div style={{ marginBottom:"28px" }}>
            <label className="ap-label">Product Name</label>
            <input className="ap-input" placeholder="e.g. Noir Intense"
              value={name} onChange={(e) => setName(e.target.value)} />
            {errors.name && <p style={{ fontSize:"10px", color:"#c0392b", letterSpacing:"1px", margin:"6px 0 0" }}>{errors.name}</p>}
          </div>

          <div style={{ marginBottom:"28px" }}>
            <label className="ap-label">Description</label>
            <textarea className="ap-input ap-textarea"
              placeholder="Describe the scent, notes, occasion..."
              value={description} onChange={(e) => setDescription(e.target.value)} />
            {errors.description && <p style={{ fontSize:"10px", color:"#c0392b", letterSpacing:"1px", margin:"6px 0 0" }}>{errors.description}</p>}
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"24px" }}>
            <div style={{ marginBottom:"28px" }}>
              <label className="ap-label">Price (DA)</label>
              <input className="ap-input" type="number" placeholder="e.g. 2500"
                value={price} onChange={(e) => setPrice(e.target.value)} />
              {errors.price && <p style={{ fontSize:"10px", color:"#c0392b", letterSpacing:"1px", margin:"6px 0 0" }}>{errors.price}</p>}
            </div>
            <div style={{ marginBottom:"28px" }}>
              <label className="ap-label">Image URL</label>
              <input className="ap-input" placeholder="https://..."
                value={image} onChange={(e) => setImage(e.target.value)} />
              {errors.image && <p style={{ fontSize:"10px", color:"#c0392b", letterSpacing:"1px", margin:"6px 0 0" }}>{errors.image}</p>}
            </div>
          </div>

          <div style={{ display:"flex", alignItems:"center", gap:"16px", margin:"8px 0 32px" }}>
            <div style={{ flex:1, height:"1px", background:"var(--border-color)" }} />
            <div style={{ width:"4px", height:"4px", background:"var(--accent-color)", transform:"rotate(45deg)", opacity:0.5 }} />
            <div style={{ flex:1, height:"1px", background:"var(--border-color)" }} />
          </div>

          <button type="submit" className="ap-btn">
            Add to Collection
          </button>

        </form>
      </div>
    </div>
  )
}

export default AddProduct