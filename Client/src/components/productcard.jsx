function ProductCard({ product, index = 0 }) {
  return (
    <div style={{
      border: "1px solid var(--border-color)",
      background: "rgba(212,175,55,0.02)",
      overflow: "hidden",
      animation: `vp-fade-up 0.8s ease ${0.2 + index * 0.1}s forwards`,
      opacity: 0,
      transition: "border-color 0.3s ease, transform 0.3s ease, background 0.3s ease",
      cursor: "default"
    }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = "var(--accent-color)"
        e.currentTarget.style.transform = "translateY(-4px)"
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "var(--border-color)"
        e.currentTarget.style.transform = "translateY(0)"
      }}
    >
      <div style={{ width:"100%", height:"220px", overflow:"hidden" }}>
        <img
          src={`${import.meta.env.VITE_API_URL}${product.image}`}          alt={product.name}
          style={{
            width:"100%", height:"100%", objectFit:"cover",
            filter:"grayscale(20%)", transition:"transform 0.5s ease, filter 0.5s ease"
          }}
          onMouseEnter={e => { e.target.style.transform = "scale(1.05)"; e.target.style.filter = "grayscale(0%)" }}
          onMouseLeave={e => { e.target.style.transform = "scale(1)"; e.target.style.filter = "grayscale(20%)" }}
        />
      </div>

      <div style={{ padding:"24px" }}>
        <h3 style={{
          fontFamily:"'Cormorant Garamond',serif", fontWeight:300,
          fontSize:"22px", color:"var(--text-primary)", margin:"0 0 8px",
          transition: "color 0.3s ease"
        }}>
          {product.name}
        </h3>
<p style={{
  fontSize:"11px", 
  fontWeight: document.body.classList.contains('light-mode') ? 500 : 300, 
  color:"var(--text-secondary)",
  lineHeight:1.7, margin:"0 0 20px", letterSpacing:"0.5px",
  transition: "all 0.3s ease"
}}>
  {product.description}
</p>

        <div style={{
          display:"flex", justifyContent:"space-between", alignItems:"center",
          borderTop:"1px solid var(--border-color)", paddingTop:"16px"
        }}>
          <span style={{
            fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic",
            fontSize:"20px", color:"var(--accent-color)"
          }}>
            {Number(product.price).toLocaleString()} DA
          </span>
        </div>
      </div>
    </div>
  )
}

export default ProductCard