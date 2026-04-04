import { supabase } from '../supabase.js'
import '../styles/dashboard.css'
import '../styles/lessons.css'
import { quizHTML, setupQuiz } from '../sections/quiz.js'
import { labHTML, setupLab } from '../sections/lab.js'
import { leaderboardHTML, setupLeaderboard } from '../sections/leaderboard.js'
import { resourcesHTML } from '../sections/resources.js'
import { lessonsHTML, setupLessons } from '../sections/lessons.js'

export async function renderDashboard() {
  const app = document.getElementById('app')

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    import('./auth.js').then(m => m.renderAuth())
    return
  }

  const name = user.user_metadata?.full_name || user.email.split('@')[0]

app.innerHTML = `
    <div class="dw">
      <button class="toggle-btn" id="sidebar-toggle">☰</button>
      <div class="overlay" id="sidebar-overlay"></div>

      <aside class="dsb">
        <div class="dsb-logo">NetStep <span class="logo-pill">BETA</span></div>
        <nav class="dsb-nav">
          <div class="nav-label">Learn</div>
          <button class="ni active" data-sec="dashboard"><span class="ni-ic">⊞</span> Dashboard</button>
          <button class="ni" data-sec="lessons"><span class="ni-ic">📖</span> Lessons</button>
          <button class="ni" data-sec="quiz"><span class="ni-ic">🎯</span> Quiz Mode <span class="ni-badge">New</span></button>
          <button class="ni" data-sec="lab"><span class="ni-ic">💻</span> CLI Lab</button>
          <div class="nav-label" style="margin-top:14px;">Community</div>
          <button class="ni" data-sec="leaderboard"><span class="ni-ic">🏆</span> Leaderboard</button>
          <div class="nav-label" style="margin-top:14px;">More</div>
          <button class="ni" data-sec="resources"><span class="ni-ic">📚</span> Resources</button>
        </nav>
        <div class="dsb-foot">
          <div class="xp-wrap">
            <div class="xp-row"><span>Level 1 · Newcomer</span><span>0 / 100 XP</span></div>
            <div class="xp-track"><div class="xp-bar" style="width:0%"></div></div>
          </div>
          <button class="logout-btn" id="logout-btn">← Log out</button>
        </div>
      </aside>

      <main class="dm">

        <div id="sec-dashboard" class="ds active">
          <div class="dtop">
            <div>
              <h1 class="dtitle">Welcome back, ${name} 👋</h1>
              <p class="dsub">Continue your CCNA prep journey</p>
            </div>
            <div class="streak-chip">🔥 Start your streak!</div>
          </div>
          <div class="stats-row">
            <div class="scard"><div class="sv">0</div><div class="sl">Lessons done</div></div>
            <div class="scard"><div class="sv">—</div><div class="sl">Quiz avg score</div></div>
            <div class="scard"><div class="sv">0</div><div class="sl">Total XP</div></div>
          </div>
          <div class="sec-lbl">Your Learning Path</div>
          <div class="path-list">
            <div class="pc active-pc">
              <div class="pc-icon" style="background:#FFF3D6;">📡</div>
              <div class="pc-info">
                <div class="pc-title">1. Network Fundamentals</div>
                <div class="pc-meta">OSI model, IP addressing, subnetting</div>
                <div class="pc-prog"><div class="prog-track"><div class="prog-fill" style="width:0%;background:var(--y);"></div></div><span class="prog-pct">0%</span></div>
              </div>
              <span class="pc-tag" style="background:rgba(232,165,25,0.12);color:var(--y);">Start →</span>
            </div>
            <div class="pc locked-pc">
              <div class="pc-icon" style="background:#F0F4F7;">🔒</div>
              <div class="pc-info">
                <div class="pc-title">2. Switching &amp; VLANs</div>
                <div class="pc-meta">STP, VLAN config, trunking, EtherChannel</div>
                <div class="pc-prog"><div class="prog-track"><div class="prog-fill" style="width:0%;background:var(--mut);"></div></div><span class="prog-pct">0%</span></div>
              </div>
              <span class="pc-tag" style="background:#F0F4F7;color:var(--mut);">Locked</span>
            </div>
            <div class="pc locked-pc">
              <div class="pc-icon" style="background:#F0F4F7;">🔒</div>
              <div class="pc-info">
                <div class="pc-title">3. Routing Protocols</div>
                <div class="pc-meta">OSPF, EIGRP, BGP basics, static routes</div>
                <div class="pc-prog"><div class="prog-track"><div class="prog-fill" style="width:0%;background:var(--mut);"></div></div><span class="prog-pct">0%</span></div>
              </div>
              <span class="pc-tag" style="background:#F0F4F7;color:var(--mut);">Locked</span>
            </div>
            <div class="pc locked-pc">
              <div class="pc-icon" style="background:#F0F4F7;">🔒</div>
              <div class="pc-info">
                <div class="pc-title">4. Network Security</div>
                <div class="pc-meta">ACLs, firewalls, VPNs, threat basics</div>
                <div class="pc-prog"><div class="prog-track"><div class="prog-fill" style="width:0%;background:var(--mut);"></div></div><span class="prog-pct">0%</span></div>
              </div>
              <span class="pc-tag" style="background:#F0F4F7;color:var(--mut);">Locked</span>
            </div>
          </div>
        </div>

        <div id="sec-lessons" class="ds">${lessonsHTML()}</div>
        <div id="sec-quiz" class="ds">${quizHTML()}</div>
        <div id="sec-lab" class="ds">${labHTML()}</div>
        <div id="sec-leaderboard" class="ds">${leaderboardHTML()}</div>
        <div id="sec-resources" class="ds">${resourcesHTML()}</div>

      </main>
    </div>
  `

  setupHandlers()
  setupLessons()
  setupQuiz()
  setupLab()
  setupLeaderboard()
  setupPathCards()
}

function setupHandlers() {
  document.querySelectorAll('.ni').forEach(btn => {
    btn.addEventListener('click', () => {
      const sec = btn.dataset.sec
      document.querySelectorAll('.ds').forEach(s => s.classList.remove('active'))
      document.querySelectorAll('.ni').forEach(n => n.classList.remove('active'))
      document.getElementById('sec-' + sec).classList.add('active')
      btn.classList.add('active')

      // close sidebar on mobile after clicking a nav item
      if (window.innerWidth <= 768) {
        document.querySelector('.dsb').classList.remove('open')
        document.getElementById('sidebar-overlay').classList.remove('visible')
      }
    })
  })

  document.getElementById('logout-btn').addEventListener('click', async () => {
    await supabase.auth.signOut()
    import('./home.js').then(m => m.renderApp())
  })

  // toggle button
  document.getElementById('sidebar-toggle').addEventListener('click', () => {
    const sidebar = document.querySelector('.dsb')
    const overlay = document.getElementById('sidebar-overlay')
    sidebar.classList.toggle('open')
    overlay.classList.toggle('visible')
  })

  // close sidebar when clicking overlay
  document.getElementById('sidebar-overlay').addEventListener('click', () => {
    document.querySelector('.dsb').classList.remove('open')
    document.getElementById('sidebar-overlay').classList.remove('visible')
  })
}
