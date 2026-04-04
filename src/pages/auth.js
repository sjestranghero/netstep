import { supabase } from '../supabase.js'

export function renderAuth() {
  const app = document.getElementById('app')
  app.innerHTML = `
    <div class="auth-wrap">

      <div class="auth-left">
        <div class="auth-logo">NetStep <span class="logo-pill">BETA</span></div>
        <h2 class="auth-tagline">Learn networking.<br/>One step at a time.</h2>
        <p class="auth-desc">Join Filipino students preparing for CCNA and cybersecurity certifications. Free, guided, and actually fun.</p>
        <div class="auth-perks">
          <div class="perk"><span class="perk-icon">⚡</span> Guided step-by-step lessons</div>
          <div class="perk"><span class="perk-icon">🎯</span> Gamified quizzes and XP</div>
          <div class="perk"><span class="perk-icon">💻</span> CLI lab simulator</div>
          <div class="perk"><span class="perk-icon">🛡️</span> Teacher-verified content</div>
        </div>
      </div>

      <div class="auth-right">
        <div class="auth-card">

          <div class="auth-tabs">
            <button class="auth-tab active" id="tab-login" onclick="switchTab('login')">Log in</button>
            <button class="auth-tab" id="tab-signup" onclick="switchTab('signup')">Sign up</button>
          </div>

          <div id="form-login">
            <div class="form-group">
              <label>Email</label>
              <input type="email" id="login-email" placeholder="you@email.com" class="form-input"/>
            </div>
            <div class="form-group">
              <label>Password</label>
              <input type="password" id="login-password" placeholder="••••••••" class="form-input"/>
            </div>
            <div id="login-error" class="form-error"></div>
            <button class="btn-submit" id="login-btn" onclick="handleLogin()">Log in</button>
          </div>

          <div id="form-signup" style="display:none;">
            <div class="form-group">
              <label>Full name</label>
              <input type="text" id="signup-name" placeholder="Juan dela Cruz" class="form-input"/>
            </div>
            <div class="form-group">
              <label>Email</label>
              <input type="email" id="signup-email" placeholder="you@email.com" class="form-input"/>
            </div>
            <div class="form-group">
              <label>Password</label>
              <input type="password" id="signup-password" placeholder="At least 6 characters" class="form-input"/>
            </div>
            <div id="signup-error" class="form-error"></div>
            <div id="signup-success" class="form-success"></div>
            <button class="btn-submit" id="signup-btn" onclick="handleSignup()">Create account</button>
          </div>

          <p class="auth-back">
            <a href="#" onclick="showLanding()">← Back to home</a>
          </p>

        </div>
      </div>

    </div>
  `

  injectAuthStyles()
  setupAuthHandlers()
}

function setupAuthHandlers() {
  window.switchTab = (tab) => {
    document.getElementById('form-login').style.display = tab === 'login' ? 'block' : 'none'
    document.getElementById('form-signup').style.display = tab === 'signup' ? 'block' : 'none'
    document.getElementById('tab-login').classList.toggle('active', tab === 'login')
    document.getElementById('tab-signup').classList.toggle('active', tab === 'signup')
  }

  window.handleLogin = async () => {
    const email = document.getElementById('login-email').value
    const password = document.getElementById('login-password').value
    const errEl = document.getElementById('login-error')
    const btn = document.getElementById('login-btn')
    btn.textContent = 'Logging in...'
    btn.disabled = true
    errEl.textContent = ''
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      errEl.textContent = error.message
      btn.textContent = 'Log in'
      btn.disabled = false
    } else {
      btn.textContent = 'Success! Redirecting...'
      setTimeout(() => import('./dashboard.js').then(m => m.renderDashboard()), 800)
    }
  }

  window.handleSignup = async () => {
    const name = document.getElementById('signup-name').value
    const email = document.getElementById('signup-email').value
    const password = document.getElementById('signup-password').value
    const errEl = document.getElementById('signup-error')
    const successEl = document.getElementById('signup-success')
    const btn = document.getElementById('signup-btn')
    btn.textContent = 'Creating account...'
    btn.disabled = true
    errEl.textContent = ''
    const { error } = await supabase.auth.signUp({
      email, password,
      options: { data: { full_name: name } }
    })
    if (error) {
      errEl.textContent = error.message
      btn.textContent = 'Create account'
      btn.disabled = false
    } else {
      successEl.textContent = '✅ Account created! Check your email to confirm, then log in.'
      btn.textContent = 'Create account'
      btn.disabled = false
    }
  }

  window.showLanding = () => {
    import('./home.js').then(m => m.renderApp())
  }
}

function injectAuthStyles() {
  if (document.getElementById('auth-styles')) return
  const s = document.createElement('style')
  s.id = 'auth-styles'
  s.textContent = `
    .auth-wrap {
      display: flex;
      min-height: 100vh;
    }
    .auth-left {
      flex: 1;
      background: var(--b);
      padding: 60px 52px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .auth-logo {
      font-family: var(--font-display);
      font-size: 22px;
      font-weight: 700;
      color: #fff;
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 48px;
    }
    .auth-tagline {
      font-family: var(--font-display);
      font-size: 34px;
      font-weight: 700;
      color: #fff;
      line-height: 1.2;
      margin-bottom: 16px;
    }
    .auth-desc {
      font-size: 14px;
      color: rgba(255,255,255,0.55);
      line-height: 1.75;
      margin-bottom: 36px;
      max-width: 360px;
    }
    .auth-perks {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .perk {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 14px;
      font-weight: 700;
      color: rgba(255,255,255,0.85);
    }
    .perk-icon {
      width: 32px;
      height: 32px;
      background: rgba(232,165,25,0.15);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 15px;
      flex-shrink: 0;
    }
    .auth-right {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px 24px;
      background: var(--bg);
    }
    .auth-card {
      width: 100%;
      max-width: 400px;
      background: var(--card);
      border: 2px solid var(--bdr);
      border-radius: 16px;
      padding: 32px;
      box-shadow: 0 8px 32px rgba(28,75,98,0.1);
    }
    .auth-tabs {
      display: flex;
      gap: 4px;
      background: var(--bg);
      border-radius: 10px;
      padding: 4px;
      margin-bottom: 28px;
    }
    .auth-tab {
      flex: 1;
      padding: 9px;
      border: none;
      background: none;
      color: var(--mut);
      font-size: 14px;
      font-weight: 700;
      border-radius: 8px;
      transition: all .2s;
    }
    .auth-tab.active {
      background: var(--card);
      color: var(--b);
      box-shadow: 0 1px 4px rgba(28,75,98,0.15);
    }
    .form-group { margin-bottom: 18px; }
    .form-group label {
      display: block;
      font-size: 13px;
      font-weight: 800;
      color: var(--txt);
      margin-bottom: 7px;
    }
    .form-input {
      width: 100%;
      padding: 11px 14px;
      background: var(--bg);
      border: 2px solid var(--bdr);
      border-radius: 8px;
      color: var(--txt);
      font-size: 14px;
      font-family: var(--font);
      outline: none;
      transition: border-color .2s;
    }
    .form-input:focus { border-color: var(--b); }
    .form-input::placeholder { color: var(--mut); }
    .form-error { font-size: 13px; color: var(--r); margin-bottom: 12px; min-height: 18px; font-weight: 700; }
    .form-success { font-size: 13px; color: #2E7D32; margin-bottom: 12px; min-height: 18px; line-height: 1.5; font-weight: 700; }
    .btn-submit {
      width: 100%;
      padding: 12px;
      background: var(--b);
      color: #fff;
      border: none;
      border-radius: 9px;
      font-size: 15px;
      font-weight: 900;
      transition: all .2s;
      margin-bottom: 8px;
    }
    .btn-submit:hover { opacity: .88; transform: translateY(-1px); }
    .btn-submit:disabled { opacity: .5; transform: none; }
    .auth-back {
      text-align: center;
      font-size: 13px;
      margin-top: 16px;
      color: var(--mut);
    }
    .auth-back a { color: var(--b); font-weight: 700; }
    @media (max-width: 700px) {
      .auth-left { display: none; }
    }
  `
  document.head.appendChild(s)
}