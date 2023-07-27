import React from 'react'
import './main.css'
import PortfolioCreateScreen from './pages/PortfolioCreateScreen'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Thepage from './pages/Thepage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={PortfolioCreateScreen} />
        <Route path="/pushme" Component={Thepage} />
      </Routes>
    </Router>
  )
}

export default App
