import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../context/StoreContext'

function Signup() {
  const { signUp } = useStore()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  function handleSignup(e) {
    e.preventDefault()
    const result = signUp(email, password)

    if (result.error) {
      setMessage(result.error)
      return
    }

    navigate('/')
  }

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h1>Create Account ✨</h1>
        <p>Join Lumora today.</p>

        <form onSubmit={handleSignup}>
          <input type="email" placeholder="Email" value={email}
            onChange={e => setEmail(e.target.value)} required />

          <input type="password" placeholder="Password" value={password}
            onChange={e => setPassword(e.target.value)}
            minLength="6" required />

          <button type="submit">Sign Up</button>
        </form>

        {message && <p className="error-message">{message}</p>}

        <p className="auth-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Signup