import React from 'react'
import Home from './Pages/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Pages/Login';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App