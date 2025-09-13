import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/:section' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/task-manager/:taskId' element={<Home/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App