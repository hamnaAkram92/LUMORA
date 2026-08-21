import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../context/StoreContext'

function Header() {
  const { user, logout, cartCount } = useStore()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <header className="header">
      <Link to="/" className="logo">✨ LUMORA</Link>

      <nav>
        <Link to="/">Home</Link>

        {user ? (
          <>
            <Link to="/add-product">Add Product</Link>
            <Link to="/cart">Cart 🛒 ({cartCount})</Link>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/cart">Cart 🛒 ({cartCount})</Link>
          </>
        )}
      </nav>
    </header>
  )
}

export default Header