import { BrowserRouter } from 'react-router'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthContextProvider } from './Contexts/AuthContext.jsx'
import { SideBarContextProvider } from './Contexts/SideBarContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <SideBarContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </SideBarContextProvider>
  </BrowserRouter>,
)
