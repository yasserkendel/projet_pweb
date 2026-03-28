import { useState } from "react"
import Navbar from "./components/navbar.jsx"
import AddProduct from "./pages/addproduct.jsx"
import ViewProducts from "./pages/viewproducts.jsx"
import Home from "./pages/home.jsx"

function App() {
  const [currentView, setCurrentView] = useState("home")

  return (
    <>
      {currentView !== "home" && currentView !== "add" && (
        <Navbar onNavigate={setCurrentView} currentView={currentView} />
      )}
      {currentView === "home" && <Home onNavigate={setCurrentView} />}
      {currentView === "add" && <AddProduct onNavigate={setCurrentView} />}
      {currentView === "view" && <ViewProducts />}
    </>
  )
}

export default App