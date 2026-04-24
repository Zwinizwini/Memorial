import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './pages/App'
import { AlbumProvider, AuthProvider, MediaProvider } from './utils/Context'
import Account from './pages/Account'
import Banner from './components/Banner'
import Album from './pages/Album'
import AlbumAjouter from './pages/AlbumAjouter'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <MediaProvider>
          <AlbumProvider>
            <Banner/>
            <Routes>
              <Route path='/' element={<App />}/>
              <Route path="/account" element={<Account />}/>
              <Route path='/album/:id/:name' element={<Album />}/>
              <Route path='/album/ajouter' element={<AlbumAjouter />}/>
              <Route path="/*" element={<Error />}/>
            </Routes>
          </AlbumProvider>
        </MediaProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
