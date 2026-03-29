import { useState } from "react"
import Navbar from "./components/navbar.jsx"
import AddProduct from "./pages/addproduct.jsx"
import ViewProducts from "./pages/viewproducts.jsx"
import Home from "./pages/home.jsx"

function App() {
  const [currentView, setCurrentView] = useState("home")

  return (
    <>
      <Navbar onNavigate={setCurrentView} currentView={currentView} />
      {currentView === "home" && <Home />}
      {currentView === "add" && <AddProduct onNavigate={setCurrentView} />}
      {currentView === "view" && <ViewProducts />}
    </>
  )
}

export default App