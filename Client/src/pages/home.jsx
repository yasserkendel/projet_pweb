import { useEffect } from "react"

function Home() {
  return (
    <div style={{
      minHeight: "100vh", background: "var(--bg-color)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden",
      padding: "60px 24px", fontFamily: "'Montserrat', sans-serif",
      transition: "background 0.3s ease"
    }}>

      <style>{`
        @keyframes pulse-ring {
          0%,100% { opacity:0.4; transform:translate(-50%,-50%) scale(1); }
          50% { opacity:0.9; transform:translate(-50%,-50%) scale(1.03); }
        }
        @keyframes fade-up {
          from { opacity:0; transform:translateY(20px); }
          to { opacity:1; transform:translateY(0); }
        }
        @keyframes fade-in {
          from { opacity:0; } to { opacity:1; }
        }
        @keyframes float-up {
          0% { opacity:0; transform:translateY(0) scale(0); }
          20% { opacity:0.6; transform:translateY(-20px) scale(1); }
          100% { opacity:0; transform:translateY(-120px) scale(0.3); }
        }
          .ring { position:absolute; border-radius:50%; border:1px solid var(--border-color); animation:pulse-ring 6s ease-in-out infinite; transition: border 0.3s ease; }
        
        /* Light Mode Ring Visibility */
        .light-mode .ring { border-width: 2px; border-color: rgba(0, 0, 0, 0.1); }

        .eyebrow { font-weight:200; font-size:10px; letter-spacing:6px; color:var(--accent-color); text-transform:uppercase; margin-bottom:20px; animation:fade-up 1s ease 0.5s forwards; opacity:0; }
        
        /* Collection Exclusive Thicker in Light Mode */
        .light-mode .eyebrow { font-weight: 600; }

        .home-title { font-family:'Cormorant Garamond',serif; font-weight:300; font-size:clamp(42px,8vw,72px); color:var(--text-primary); text-align:center; line-height:1.1; margin-bottom:8px; animation:fade-up 1s ease 0.7s forwards; opacity:0; transition: color 0.3s ease; }
        .home-title em { font-style:italic; color:var(--accent-color); }

        .home-subtitle { font-family:'Cormorant Garamond',serif; font-style:italic; font-weight:300; font-size:16px; color:var(--text-secondary); text-align:center; margin-bottom:56px; letter-spacing:1px; animation:fade-up 1s ease 0.9s forwards; opacity:0; transition: color 0.3s ease; }
        
        /* Subtitle Thicker in Light Mode */
        .light-mode .home-subtitle { font-weight: 500; }
        .ring { position:absolute; border-radius:50%; border:1px solid var(--border-color); animation:pulse-ring 6s ease-in-out infinite; }
        .eyebrow { font-weight:200; font-size:10px; letter-spacing:6px; color:var(--accent-color); text-transform:uppercase; margin-bottom:20px; animation:fade-up 1s ease 0.5s forwards; opacity:0; }
        .home-title { font-family:'Cormorant Garamond',serif; font-weight:300; font-size:clamp(42px,8vw,72px); color:var(--text-primary); text-align:center; line-height:1.1; margin-bottom:8px; animation:fade-up 1s ease 0.7s forwards; opacity:0; transition: color 0.3s ease; }
        .home-title em { font-style:italic; color:var(--accent-color); }
        .home-subtitle { font-family:'Cormorant Garamond',serif; font-style:italic; font-weight:300; font-size:16px; color:var(--text-secondary); text-align:center; margin-bottom:56px; letter-spacing:1px; animation:fade-up 1s ease 0.9s forwards; opacity:0; transition: color 0.3s ease; }
        .btn-primary-home { padding:18px 36px; background:var(--accent-color); color:var(--bg-color); border:none; cursor:pointer; font-family:'Montserrat',sans-serif; font-weight:300; font-size:11px; letter-spacing:4px; text-transform:uppercase; transition:all 0.3s ease; }
        .btn-primary-home:hover { background:#e8c84a; transform:translateY(-2px); }
        .btn-secondary-home { padding:18px 36px; background:transparent; color:var(--text-primary); border:1px solid var(--border-color); cursor:pointer; font-family:'Montserrat',sans-serif; font-weight:300; font-size:11px; letter-spacing:4px; text-transform:uppercase; transition:all 0.3s ease; }
        .btn-secondary-home:hover { border-color:var(--accent-color); color:var(--accent-color); transform:translateY(-2px); }
        .gold-line { width:1px; height:60px; background:linear-gradient(to bottom,transparent,var(--accent-color),transparent); margin-bottom:32px; animation:fade-in 1.2s ease 0.2s forwards; opacity:0; }
        .particle { position:absolute; background:var(--accent-color); border-radius:50%; opacity:0; animation:float-up linear infinite; pointer-events:none; }
        .diamond-divider { display:flex; align-items:center; gap:16px; margin-top:48px; animation:fade-up 1s ease 1.3s forwards; opacity:0; }
        .div-line { width:48px; height:1px; background:var(--border-color); }
        .div-diamond { width:5px; height:5px; background:var(--accent-color); transform:rotate(45deg); opacity:0.6; }
      `}</style>

      <div className="ring" style={{ width:600, height:600, top:"50%", left:"50%", animationDelay:"0s" }} />
      <div className="ring" style={{ width:420, height:420, top:"50%", left:"50%", animationDelay:"1.5s" }} />
      <div className="ring" style={{ width:260, height:260, top:"50%", left:"50%", animationDelay:"3s" }} />

      {[...Array(18)].map((_, i) => (
        <div key={i} className="particle" style={{
          left: `${Math.random() * 100}%`,
          bottom: `${Math.random() * 30}%`,
          width: `${1 + Math.random() * 2}px`,
          height: `${1 + Math.random() * 2}px`,
          animationDuration: `${4 + Math.random() * 6}s`,
          animationDelay: `${Math.random() * 6}s`
        }} />
      ))}

      <div className="gold-line" />
      <p className="eyebrow">Collection Exclusive</p>
      <h1 className="home-title">Parfum<br /><em>Catalog</em></h1>
      <p className="home-subtitle">Discover the art of fine fragrance</p>

      <div className="diamond-divider">
        <div className="div-line" />
        <div className="div-diamond" />
        <div className="div-line" />
      </div>
    </div>
  )
}

export default Home