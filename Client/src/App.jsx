import { useState, useEffect } from "react"
import Navbar from "./components/navbar.jsx"
import AddProduct from "./pages/addproduct.jsx"
import ViewProducts from "./pages/viewproducts.jsx"
import Home from "./pages/home.jsx"

// ... existing imports

function App() {
  const [currentView, setCurrentView] = useState("home")
  const [isDarkMode, setIsDarkMode] = useState(true)

  useEffect(() => {
    if (!isDarkMode) {
      document.body.classList.add('light-mode')
    } else {
      document.body.classList.remove('light-mode')
    }
  }, [isDarkMode])

  const toggleTheme = () => setIsDarkMode(!isDarkMode)

  return (
    <>
      <Navbar 
        onNavigate={setCurrentView} 
        currentView={currentView} 
        toggleTheme={toggleTheme} 
        isDarkMode={isDarkMode} 
      />
      {currentView === "home" && <Home />}
      {currentView === "add" && <AddProduct onNavigate={setCurrentView} />}
      {/* Added the prop here */}
      {currentView === "view" && <ViewProducts onNavigate={setCurrentView} />} 
    </>
  )
}

export default App