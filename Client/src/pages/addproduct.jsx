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
      alert("Fragrance added to the collection!")
      onNavigate("view")
    } catch (err) {
      alert("Something went wrong.")
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
          outline:none; transition: all 0.3s ease; box-sizing:border-box;
        }

        /* Visibility Fix for Light Mode Inputs */
        .light-mode .ap-input { 
          border-bottom: 2px solid var(--border-color); 
          font-weight: 500; 
        }
        .light-mode .ap-input::placeholder { 
          color: #666666; 
          opacity: 0.8; 
        }

        .ap-input:focus { border-bottom-color:var(--accent-color); }
        .ap-input {
          width:100%; background:transparent; border:none;
          border-bottom:1px solid var(--border-color);
          color:var(--text-primary); font-family:'Montserrat',sans-serif;
          font-weight:300; font-size:14px; padding:10px 0;
          outline:none; transition:border-color 0.3s ease, color 0.3s ease; box-sizing:border-box;
        }
        .ap-input:focus { border-bottom-color:var(--accent-color); }
        .ap-input::placeholder { color:var(--text-secondary); opacity: 0.5; }
        .ap-textarea { resize:none; height:80px; }
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
          margin-bottom:40px; padding:0; transition:color 0.3s; align-self:flex-start;
        }
        .ap-back:hover { color:var(--accent-color); }
      `}</style>

      {/* Form Content follows the same pattern using var(--accent-color) and var(--text-primary) */}
      <button className="ap-back" onClick={() => onNavigate("home")} style={{ animation: visible ? "ap-fade-up 0.8s ease 0.1s forwards" : "none", opacity: 0 }}>
        Back
      </button>

      <div style={{ textAlign:"center", marginBottom:"48px", animation: visible ? "ap-fade-up 0.8s ease 0.2s forwards" : "none", opacity:0 }}>
        <p style={{ fontSize:"10px", fontWeight:200, letterSpacing:"6px", color:"var(--accent-color)", textTransform:"uppercase", marginBottom:"12px" }}>
          New Entry
        </p>
        <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:300, fontSize:"42px", color:"var(--text-primary)", lineHeight:1.1, margin:0, transition: "color 0.3s ease" }}>
          Add a <em style={{ fontStyle:"italic", color:"var(--accent-color)" }}>Fragrance</em>
        </h1>
      </div>

      <div style={{
        width:"100%", maxWidth:"520px",
        border:"1px solid var(--border-color)",
        padding:"40px", background:"rgba(212,175,55,0.03)",
        animation: visible ? "ap-fade-up 0.8s ease 0.4s forwards" : "none", opacity:0,
        boxSizing:"border-box"
      }}>
        <form onSubmit={handleSubmit}>
          {/* Inputs use the .ap-input class defined in the style tag above */}
          <div style={{ marginBottom:"28px" }}>
            <label style={{ display:"block", fontSize:"9px", fontWeight:300, letterSpacing:"4px", color:"var(--accent-color)", textTransform:"uppercase", marginBottom:"10px" }}>
              Product Name
            </label>
            <input className="ap-input" placeholder="e.g. Noir Intense" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <button type="submit" className="ap-btn">Add to Collection</button>
        </form>
      </div>
    </div>
  )
}

export default AddProduct