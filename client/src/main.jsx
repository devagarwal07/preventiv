import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// Import AOS
import AOS from 'aos'
import 'aos/dist/aos.css'

// Import icon libraries
import 'bootstrap-icons/font/bootstrap-icons.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

// Initialize AOS
AOS.init({
  duration: 600,
  easing: 'ease-in-out',
  once: true,
  mirror: false
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
