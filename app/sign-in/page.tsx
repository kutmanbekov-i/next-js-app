'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const SignInPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (email === 'user@example.com' && password === 'password') {
      localStorage.setItem('isAuthenticated', 'true')
      router.push('/leads')
    } else {
      setErrorMessage('Invalid email or password')
    }
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h1>Sign In</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errorMessage && <p>{errorMessage}</p>}
        <button type="submit">Sign In</button>
      </form>
    </div>
  )
}

export default SignInPage
