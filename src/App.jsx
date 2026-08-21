import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { StoreProvider, useStore } from './context/StoreContext'

import Header from './components/Header'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'

import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AddProduct from './pages/AddProduct'
import Cart from './pages/Cart'

function AppContent() {
  const { user } = useStore()

  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/add-product"
          element={
            <ProtectedRoute user={user}>
              <AddProduct />
            </ProtectedRoute>
          }
        />

        <Route path="/cart" element={<Cart />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}

function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  )
}

export default App