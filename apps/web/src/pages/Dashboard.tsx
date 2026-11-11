
import { useState } from 'react'
import {
  BookOpen,
  CalendarDays,
  ChevronDown,
  GraduationCap,
  Home,
  LogOut,
  Menu,
  MessageCircle,
  Search,
  Settings,
  UserRound,
  Users,
  Wallet,
  X,
} from 'lucide-react'

type PeerUpUser = {
  id?: string
  firstName?: string
  lastName?: string
  name?: string
  email?: string
  role?: string
}

type DashboardProps = {
  user: PeerUpUser
  onSignOut: () => void
}

const navigation = [
  { label: 'Overview', icon: Home },
  { label: 'Find a tutor', icon: Search },
  { label: 'My sessions', icon: CalendarDays },
  { label: 'Messages', icon: MessageCircle },
  { label: 'Become a tutor', icon: GraduationCap },
]

export default function Dashboard({ user, onSignOut }: DashboardProps) {
  const [activePage, setActivePage] = useState('Overview')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const displayName =
    [user.firstName, user.lastName].filter(Boolean).join(' ') ||
    user.name ||
    user.email?.split('@')[0] ||
    'Student'

  const initials = displayName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')

  function selectPage(label: string) {
    setActivePage(label)
    setMobileMenuOpen(false)
  }

  return (
    <div className="dashboard-shell">
      {mobileMenuOpen && (
        <button
          className="dashboard-mobile-backdrop"
          aria-label="Close navigation"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <aside className={`dashboard-sidebar ${mobileMenuOpen ? 'is-open' : ''}`}>
        <a className="dashboard-brand" href="/" aria-label="Peer Up home">
          <span className="dashboard-brand-mark">P</span>
          <span>peer up</span>
        </a>

        <div className="dashboard-campus-label">YOUR LEARNING SPACE</div>

        <nav className="dashboard-navigation" aria-label="Main navigation">
          {navigation.map(({ label, icon: Icon }) => (
            <button
              className={`dashboard-nav-item ${activePage === label ? 'active' : ''}`}
              key={label}
              onClick={() => selectPage(label)}
            >
              <Icon size={19} strokeWidth={1.8} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="dashboard-sidebar-bottom">
          <div className="dashboard-help-card">
            <div className="dashboard-help-icon">
              <BookOpen size={20} />
            </div>
            <strong>Learning is better together.</strong>
            <p>Find support for your next difficult course.</p>
            <button onClick={() => selectPage('Find a tutor')}>
              Explore tutors <span aria-hidden="true">→</span>
            </button>
          </div>

          <button
            className="dashboard-nav-item dashboard-settings"
            onClick={() => selectPage('Settings')}
          >
            <Settings size={19} strokeWidth={1.8} />
            <span>Settings</span>
          </button>

          <div className="dashboard-user">
            <div className="dashboard-avatar">{initials || 'S'}</div>
            <div className="dashboard-user-info">
              <strong>{displayName}</strong>
              <span>{user.role || 'Student'}</span>
            </div>
            <button
              className="dashboard-signout-icon"
              onClick={onSignOut}
              aria-label="Sign out"
              title="Sign out"
            >
              <LogOut size={17} />
            </button>
          </div>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <button
            className="dashboard-menu-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <div className="dashboard-breadcrumb">
            <span>Peer Up</span>
            <span className="dashboard-breadcrumb-divider">/</span>
            <strong>{activePage}</strong>
          </div>

          <button
            className="dashboard-topbar-profile"
            onClick={() => selectPage('Profile')}
          >
            <div className="dashboard-avatar dashboard-avatar-small">
              {initials || 'S'}
            </div>
            <span>{displayName}</span>
            <ChevronDown size={16} />
          </button>
        </header>

        <div className="dashboard-content">
          {activePage === 'Overview' ? (
            <>
              <div className="dashboard-welcome-row">
                <div>
                  <div className="dashboard-eyebrow">
                    YOUR CAMPUS. YOUR COMMUNITY.
                  </div>
                  <h1>Welcome back, {displayName}.</h1>
                  <p>
                    Make progress on your goals, one learning session at a time.
                  </p>
                </div>
                <button
                  className="dashboard-primary-button"
                  onClick={() => selectPage('Find a tutor')}
                >
                  <Search size={17} />
                  Find a tutor
                </button>
              </div>

              <section className="dashboard-banner">
                <div className="dashboard-banner-copy">
                  <span>YOUR NEXT STEP</span>
                  <h2>Every expert was once a student.</h2>
                  <p>
                    Connect with a fellow student who can help you understand
                    your courses and study with confidence.
                  </p>
                  <button onClick={() => selectPage('Find a tutor')}>
                    Explore tutoring <span aria-hidden="true">→</span>
                  </button>
                </div>
                <div className="dashboard-banner-art" aria-hidden="true">
                  <div className="dashboard-art-circle">
                    <Users size={66} strokeWidth={1.15} />
                  </div>
                  <div className="dashboard-art-book">
                    <BookOpen size={33} strokeWidth={1.5} />
                  </div>
                </div>
              </section>

              <div className="dashboard-section-heading">
                <div>
                  <h2>Your learning space</h2>
                  <p>Quick access to your Peer Up activities.</p>
                </div>
              </div>

              <section className="dashboard-quick-grid">
                <button
                  className="dashboard-quick-card"
                  onClick={() => selectPage('Find a tutor')}
                >
                  <span className="dashboard-quick-icon icon-purple">
                    <Search size={21} />
                  </span>
                  <strong>Find a tutor</strong>
                  <span>Discover help for your courses.</span>
                  <span className="dashboard-card-arrow">Explore →</span>
                </button>

                <button
                  className="dashboard-quick-card"
                  onClick={() => selectPage('My sessions')}
                >
                  <span className="dashboard-quick-icon icon-green">
                    <CalendarDays size={21} />
                  </span>
                  <strong>My sessions</strong>
                  <span>Keep track of your learning time.</span>
                  <span className="dashboard-card-arrow">View sessions →</span>
                </button>

                <button
                  className="dashboard-quick-card"
                  onClick={() => selectPage('Messages')}
                >
                  <span className="dashboard-quick-icon icon-yellow">
                    <MessageCircle size={21} />
                  </span>
                  <strong>Messages</strong>
                  <span>Stay connected with your peers.</span>
                  <span className="dashboard-card-arrow">Open messages →</span>
                </button>
              </section>

              <section className="dashboard-bottom-grid">
                <div className="dashboard-panel">
                  <div className="dashboard-panel-heading">
                    <div>
                      <h2>Upcoming sessions</h2>
                      <p>Your next learning commitments.</p>
                    </div>
                    <button onClick={() => selectPage('My sessions')}>
                      View all
                    </button>
                  </div>
                  <div className="dashboard-empty-state">
                    <div className="dashboard-empty-icon">
                      <CalendarDays size={24} />
                    </div>
                    <strong>No upcoming sessions yet</strong>
                    <p>
                      Book a tutor to get your next learning session started.
                    </p>
                    <button onClick={() => selectPage('Find a tutor')}>
                      Find a tutor
                    </button>
                  </div>
                </div>

                <div className="dashboard-panel dashboard-progress-panel">
                  <div className="dashboard-panel-heading">
                    <div>
                      <h2>Your next milestone</h2>
                      <p>Start building your learning routine.</p>
                    </div>
                  </div>
                  <div className="dashboard-milestone">
                    <div className="dashboard-milestone-icon">
                      <GraduationCap size={25} />
                    </div>
                    <div>
                      <strong>Book your first session</strong>
                      <p>
                        Find a tutor for a course you want to understand better.
                      </p>
                    </div>
                  </div>
                  <button
                    className="dashboard-secondary-button"
                    onClick={() => selectPage('Find a tutor')}
                  >
                    Get started
                  </button>
                </div>
              </section>
            </>
          ) : (
            <section className="dashboard-placeholder-page">
              <div className="dashboard-placeholder-icon">
                {activePage === 'My sessions' ? (
                  <CalendarDays size={29} />
                ) : activePage === 'Messages' ? (
                  <MessageCircle size={29} />
                ) : activePage === 'Become a tutor' ? (
                  <GraduationCap size={29} />
                ) : activePage === 'Profile' ? (
                  <UserRound size={29} />
                ) : activePage === 'Settings' ? (
                  <Settings size={29} />
                ) : activePage === 'Wallet' ? (
                  <Wallet size={29} />
                ) : (
                  <Search size={29} />
                )}
              </div>
              <div className="dashboard-eyebrow">PEER UP</div>
              <h1>{activePage}</h1>
              <p>
                {activePage === 'Find a tutor'
                  ? 'Tutor discovery will connect to your verified tutor profiles and course listings.'
                  : activePage === 'My sessions'
                    ? 'Your booked tutoring sessions will appear here.'
                    : activePage === 'Messages'
                      ? 'Your conversations with students and tutors will appear here.'
                      : activePage === 'Become a tutor'
                        ? 'You will be able to submit your academic evidence and apply to become a tutor here.'
                        : activePage === 'Profile'
                          ? 'Your account details will appear here.'
                          : activePage === 'Settings'
                            ? 'Manage your account preferences here.'
                            : 'This section is ready for the next development step.'}
              </p>
              {activePage === 'Profile' && (
                <div className="dashboard-profile-details">
                  <div>
                    <span>Name</span>
                    <strong>{displayName}</strong>
                  </div>
                  <div>
                    <span>Email</span>
                    <strong>{user.email || 'No email returned by server'}</strong>
                  </div>
                  <div>
                    <span>Account type</span>
                    <strong>{user.role || 'Student'}</strong>
                  </div>
                </div>
              )}
              <button
                className="dashboard-primary-button"
                onClick={() => selectPage('Overview')}
              >
                Return to overview
              </button>
            </section>
          )}
        </div>
      </main>
    </div>
  )
}
