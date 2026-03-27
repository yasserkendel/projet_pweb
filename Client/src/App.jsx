import { useState } from "react"
import Navbar from "./components/navbar.jsx"
import AddProduct from "./pages/addproduct.jsx"
import ViewProducts from "./pages/viewproducts.jsx"

function App() {
  const [currentView, setCurrentView] = useState("view")

  return (
    <>
      <Navbar onNavigate={setCurrentView} currentView={currentView} />
      {currentView === "add" ? <AddProduct /> : <ViewProducts />}
    </>
  )
}

export default App