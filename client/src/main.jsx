import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { TaskProvider } from './context/TaskContext.jsx'
import {UserProvider} from './context/userContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <TaskProvider>
       <UserProvider>
         <App />
       </UserProvider>
      </TaskProvider>
    </AuthProvider>
  </StrictMode>,
)
