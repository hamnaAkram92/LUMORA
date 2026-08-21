import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../context/StoreContext'

function Login() {
  const { login } = useStore()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  function handleLogin(e) {
    e.preventDefault()
    const result = login(email, password)

    if (result.error) {
      setMessage(result.error)
      return
    }

    navigate('/')
  }

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h1>Welcome Back ✨</h1>
        <p>Login to your Lumora account.</p>

        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" value={email}
            onChange={e => setEmail(e.target.value)} required />

          <input type="password" placeholder="Password" value={password}
            onChange={e => setPassword(e.target.value)} required />

          <button type="submit">Login</button>
        </form>

        {message && <p className="error-message">{message}</p>}

        <p className="auth-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  )
}

export default Login