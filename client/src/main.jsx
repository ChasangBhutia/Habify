import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { TaskProvider } from './context/TaskContext.jsx'
import { UserProvider } from './context/userContext.jsx'
import { HabitProvider } from './context/HabitContext.jsx'
import { AlertProvider } from './context/AlertContext.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AlertProvider>
        <AuthProvider>
          <TaskProvider>
            <UserProvider>
              <HabitProvider>
                <App />
              </HabitProvider>
            </UserProvider>
          </TaskProvider>
        </AuthProvider>
      </AlertProvider>
    </BrowserRouter>
  </StrictMode>,
)
