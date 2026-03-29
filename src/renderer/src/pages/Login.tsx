import React, { useState, useEffect } from 'react'
import { Bot, Eye, EyeOff, Loader2 } from 'lucide-react'

interface LoginProps {
  onLogin: (user: { id: string; username: string; email: string; plan: string }) => void
}

export default function Login({ onLogin }: LoginProps): React.JSX.Element {
  const [mode, setMode] = useState<'login' | 'register'>('login')

  // Login state
  const [emailOrUsername, setEmailOrUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleWaiting, setGoogleWaiting] = useState(false)

  // Deep-Link Listener: gerki-app://auth?token=JWT
  useEffect(() => {
    const unsubSuccess = window.gerki.on('auth:deep-link-success', (data: unknown) => {
      const { user } = data as { user: { id: string; username: string; email: string; plan: string } }
      setGoogleWaiting(false)
      onLogin(user)
    })
    const unsubError = window.gerki.on('auth:deep-link-error', (data: unknown) => {
      const { error } = data as { error: string }
      setGoogleWaiting(false)
      setError(error ?? 'Google-Login fehlgeschlagen.')
    })
    return () => { unsubSuccess(); unsubError() }
  }, [onLogin])

  const handleGoogleLogin = async () => {
    setGoogleWaiting(true)
    setError('')
    await window.gerki.auth.loginWithGoogle()
    // Warte auf Deep-Link Callback (auth:deep-link-success / auth:deep-link-error)
  }

  // Register state
  const [regUsername, setRegUsername] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [regPassword, setRegPassword] = useState('')
  const [regPassword2, setRegPassword2] = useState('')
  const [showRegPassword, setShowRegPassword] = useState(false)

  const switchMode = (m: 'login' | 'register') => {
    setMode(m)
    setError('')
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!emailOrUsername.trim() || !password) return
    setError('')
    setLoading(true)
    try {
      const result = await window.gerki.auth.login(emailOrUsername.trim(), password)
      if (result.success && result.user) {
        onLogin(result.user)
      } else {
        setError(result.error ?? 'Anmeldung fehlgeschlagen.')
      }
    } catch {
      setError('Ein Fehler ist aufgetreten. Bitte versuche es erneut.')
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!regUsername.trim() || !regEmail.trim() || !regPassword) return
    if (regPassword !== regPassword2) {
      setError('Passwörter stimmen nicht überein.')
      return
    }
    if (regPassword.length < 8) {
      setError('Passwort muss mindestens 8 Zeichen haben.')
      return
    }
    setError('')
    setLoading(true)
    try {
      const result = await window.gerki.auth.register(regUsername.trim(), regEmail.trim(), regPassword)
      if (result.success && result.user) {
        onLogin(result.user)
      } else {
        setError(result.error ?? 'Registrierung fehlgeschlagen.')
      }
    } catch {
      setError('Ein Fehler ist aufgetreten. Bitte versuche es erneut.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen bg-bg flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mb-4">
            <Bot size={28} className="text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-white">Willkommen bei Gerki</h1>
          <p className="text-white/40 text-sm mt-1">Deine persönliche KI – lokal & privat</p>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-surface rounded-xl p-1 mb-6 border border-white/5">
          <button
            onClick={() => switchMode('login')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
              mode === 'login' ? 'bg-primary text-white' : 'text-white/40 hover:text-white/70'
            }`}
          >
            Anmelden
          </button>
          <button
            onClick={() => switchMode('register')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
              mode === 'register' ? 'bg-primary text-white' : 'text-white/40 hover:text-white/70'
            }`}
          >
            Registrieren
          </button>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          disabled={googleWaiting}
          className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-white/10
                     hover:bg-white/5 text-white/80 text-sm font-medium transition-colors mb-4 disabled:opacity-50"
        >
          {googleWaiting ? (
            <><Loader2 size={16} className="animate-spin" />Warte auf Browser-Login...</>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Mit Google anmelden
            </>
          )}
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-xs text-white/25">oder</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Login Form */}
        {mode === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm text-white/60 mb-1.5">E-Mail oder Nutzername</label>
              <input
                type="text"
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
                placeholder="du@beispiel.de"
                autoComplete="username"
                className="w-full bg-surface border border-white/10 rounded-xl px-4 py-3 text-white text-sm
                           placeholder:text-white/25 outline-none focus:border-primary/50 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm text-white/60 mb-1.5">Passwort</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full bg-surface border border-white/10 rounded-xl px-4 py-3 pr-12 text-white text-sm
                             placeholder:text-white/25 outline-none focus:border-primary/50 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !emailOrUsername.trim() || !password}
              className="w-full bg-primary hover:bg-primary/80 disabled:bg-white/10 disabled:text-white/30
                         text-white font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              {loading ? <><Loader2 size={16} className="animate-spin" />Anmelden...</> : 'Anmelden'}
            </button>
          </form>
        )}

        {/* Register Form */}
        {mode === 'register' && (
          <form onSubmit={handleRegister} className="space-y-3">
            <div>
              <label className="block text-sm text-white/60 mb-1.5">Nutzername</label>
              <input
                type="text"
                value={regUsername}
                onChange={(e) => setRegUsername(e.target.value)}
                placeholder="maxmustermann"
                autoComplete="username"
                className="w-full bg-surface border border-white/10 rounded-xl px-4 py-3 text-white text-sm
                           placeholder:text-white/25 outline-none focus:border-primary/50 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm text-white/60 mb-1.5">E-Mail</label>
              <input
                type="email"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                placeholder="du@beispiel.de"
                autoComplete="email"
                className="w-full bg-surface border border-white/10 rounded-xl px-4 py-3 text-white text-sm
                           placeholder:text-white/25 outline-none focus:border-primary/50 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm text-white/60 mb-1.5">Passwort</label>
              <div className="relative">
                <input
                  type={showRegPassword ? 'text' : 'password'}
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Mindestens 8 Zeichen"
                  autoComplete="new-password"
                  className="w-full bg-surface border border-white/10 rounded-xl px-4 py-3 pr-12 text-white text-sm
                             placeholder:text-white/25 outline-none focus:border-primary/50 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowRegPassword(!showRegPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showRegPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm text-white/60 mb-1.5">Passwort bestätigen</label>
              <input
                type={showRegPassword ? 'text' : 'password'}
                value={regPassword2}
                onChange={(e) => setRegPassword2(e.target.value)}
                placeholder="••••••••"
                autoComplete="new-password"
                className="w-full bg-surface border border-white/10 rounded-xl px-4 py-3 text-white text-sm
                           placeholder:text-white/25 outline-none focus:border-primary/50 transition-colors"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !regUsername.trim() || !regEmail.trim() || !regPassword || !regPassword2}
              className="w-full bg-primary hover:bg-primary/80 disabled:bg-white/10 disabled:text-white/30
                         text-white font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              {loading ? <><Loader2 size={16} className="animate-spin" />Registrieren...</> : 'Konto erstellen'}
            </button>

            <p className="text-center text-xs text-white/20 pt-1">
              Dein Konto wird lokal auf diesem Gerät gespeichert.
            </p>
          </form>
        )}

        <p className="text-center text-xs text-white/20 mt-6">
          Gespräche & Dateien bleiben lokal auf deinem PC.
        </p>
      </div>
    </div>
  )
}
