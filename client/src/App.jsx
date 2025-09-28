import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import ErrorBox from './components/ErrorBox'
import SuccessBox from "./components/SuccessBox"
import { useAlertContext } from './context/AlertContext';
import LandingPage from './pages/LandingPage';

const App = () => {

  const { success, error } = useAlertContext();

  return (
    <div>
      {error && <ErrorBox error={error} />}
      {success && <SuccessBox success={success} />}

      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/:section' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/task-manager/:taskId' element={<Home />} />
      </Routes>

    </div>
  )
}

export default App