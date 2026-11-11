
import { useState } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import Dashboard from './pages/Dashboard'
import './App.css'

const API_URL = 'http://localhost:3000/api'

type PeerUpUser = {
  id?: string
  firstName?: string
  lastName?: string
  name?: string
  email?: string
  role?: string
}

function App() {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<PeerUpUser | null>(() => {
    const storedUser = localStorage.getItem('peerup_user')

    if (!storedUser) return null

    try {
      return JSON.parse(storedUser) as PeerUpUser
    } catch {
      localStorage.removeItem('peerup_user')
      return null
    }
  })

  async function handleGoogleSuccess(credential: string) {
    setLoading(true)
    setMessage('Signing you in...')

    try {
      const response = await fetch(`${API_URL}/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken: credential }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Google sign-in failed.')
      }

      if (!data.accessToken || !data.refreshToken || !data.user) {
        throw new Error('The server did not return the expected login information.')
      }

      localStorage.setItem('peerup_access_token', data.accessToken)
      localStorage.setItem('peerup_refresh_token', data.refreshToken)
      localStorage.setItem('peerup_user', JSON.stringify(data.user))

      setUser(data.user as PeerUpUser)
      setMessage('')
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.',
      )
    } finally {
      setLoading(false)
    }
  }

  function handleSignOut() {
    localStorage.removeItem('peerup_access_token')
    localStorage.removeItem('peerup_refresh_token')
    localStorage.removeItem('peerup_user')

    setUser(null)
    setMessage('')
  }

  
if (user) {
  return <Dashboard user={user} onSignOut={handleSignOut} />
}

  return (
    <main className="auth-page">
      <header className="site-header">
        <a className="brand" href="/" aria-label="Peer Up home">
          <span className="brand-mark">P</span>
          <span>peer up</span>
        </a>
        <span className="header-note">Learn together. Grow together.</span>
      </header>

      <section className="auth-layout">
        <div className="intro-panel">
          <p className="eyebrow">YOUR CAMPUS. YOUR COMMUNITY.</p>
          <h1>
            Good learning happens <span>together.</span>
          </h1>
          <p className="intro-copy">
            Find student tutors who understand your courses, or share what you
            know and earn by helping other students succeed.
          </p>

          <div className="benefit-list">
            <div className="benefit">
              <span className="benefit-number">01</span>
              <div>
                <strong>Find your people</strong>
                <p>Connect with students who know your courses.</p>
              </div>
            </div>

            <div className="benefit">
              <span className="benefit-number">02</span>
              <div>
                <strong>Learn on your terms</strong>
                <p>Choose tutoring that fits your schedule.</p>
              </div>
            </div>

            <div className="benefit">
              <span className="benefit-number">03</span>
              <div>
                <strong>Make your knowledge count</strong>
                <p>Become a tutor and earn by helping other students.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="auth-card">
          <p className="card-kicker">WELCOME TO PEER UP</p>
          <h2>Your next step starts here.</h2>
          <p className="card-description">
            Sign in to find tutors, manage sessions, and connect with your
            learning community.
          </p>

          <div className="google-area">
            <GoogleLogin
              onSuccess={(response) => {
                if (response.credential) {
                  void handleGoogleSuccess(response.credential)
                } else {
                  setMessage('Google did not return an ID token. Please try again.')
                }
              }}
              onError={() =>
                setMessage('Google sign-in was unsuccessful. Please try again.')
              }
              text="continue_with"
              shape="rectangular"
              size="large"
              width="320"
            />
          </div>

          {loading && <p className="status-message">Signing you in...</p>}

          {message && (
            <p className="status-message" role="status">
              {message}
            </p>
          )}

          <p className="terms">
            By continuing, you agree to use Peer Up respectfully and
            responsibly.
          </p>
        </div>
      </section>

      <footer className="site-footer">
        <span>Peer Up</span>
        <span>Built for students, by students.</span>
      </footer>
    </main>
  )
}

export default App