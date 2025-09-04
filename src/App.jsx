import { NavLink, Route, Routes } from 'react-router-dom'
import Catalog from './pages/Catalog.jsx'
import Admin from './pages/Admin.jsx'

export default function App() {
  return (
    <>
      <nav className="nav">
        <div className="brand">EverClean • MVP</div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <NavLink to="/" end>Catálogo</NavLink>
          <NavLink to="/admin">Admin</NavLink>
        </div>
      </nav>
      <main className="container">
        <Routes>
          <Route path="/" element={<Catalog />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
    </>
  )
}
