function Navbar({ onNavigate, currentView }) {
  return (
    <nav style={{
      position: "sticky",
      top: 0,
      zIndex: 100,
      background: "#0a0806",
      borderBottom: "1px solid rgba(212,175,55,0.15)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0 40px",
      height: "64px",
      fontFamily: "'Montserrat', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&family=Montserrat:wght@200;300;400&display=swap');
        .nav-logo {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-weight: 300;
          font-size: 22px;
          color: #d4af37;
          letter-spacing: 1px;
          cursor: pointer;
        }
        .nav-links {
          display: flex;
          gap: 40px;
          align-items: center;
        }
        .nav-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'Montserrat', sans-serif;
          font-weight: 300;
          font-size: 10px;
          letter-spacing: 4px;
          text-transform: uppercase;
          padding: 0;
          padding-bottom: 4px;
          transition: color 0.3s ease;
          position: relative;
        }
        .nav-btn::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background: #d4af37;
          transition: width 0.3s ease;
        }
        .nav-btn:hover::after { width: 100%; }
        .nav-btn.active { color: #d4af37; }
        .nav-btn.active::after { width: 100%; }
        .nav-btn.inactive { color: rgba(245,240,232,0.45); }
        .nav-btn.inactive:hover { color: #f5f0e8; }
      `}</style>

      <span className="nav-logo" onClick={() => onNavigate("home")}>
        Parfum
      </span>

      <div className="nav-links">
        <button
          className={`nav-btn ${currentView === "add" ? "active" : "inactive"}`}
          onClick={() => onNavigate("add")}
        >
          Add a Product
        </button>
        <button
          className={`nav-btn ${currentView === "view" ? "active" : "inactive"}`}
          onClick={() => onNavigate("view")}
        >
          View Collection
        </button>
      </div>
    </nav>
  )
}

export default Navbar