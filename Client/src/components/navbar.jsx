function Navbar({ onNavigate, currentView }) {
  return (
    <nav>
      <button onClick={() => onNavigate("home")}>
        Home
      </button>
      <button onClick={() => onNavigate("add")}>
        Add a Product
      </button>
      <button onClick={() => onNavigate("view")}>
        View All Products
      </button>
    </nav>
  )
}

export default Navbar