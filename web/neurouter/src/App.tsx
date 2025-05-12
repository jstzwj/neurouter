import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import RootLayout from "./pages/layout"
import Home from "./pages/home"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
