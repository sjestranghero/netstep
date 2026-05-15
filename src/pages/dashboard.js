import { supabase } from '../supabase.js'
import '../styles/dashboard.css'
import '../styles/lessons.css'
import { quizHTML, setupQuiz } from '../sections/quiz.js'
import { labHTML, setupLab } from '../sections/lab.js'
import { leaderboardHTML, setupLeaderboard } from '../sections/leaderboard.js'
import { resourcesHTML } from '../sections/resources.js'
import { lessonsHTML, setupLessons } from '../sections/lessons.js'
import { subnetDojoHTML, setupSubnetDojo } from '../sections/subnetdojo.js'
import { topoHTML, setupTopo } from '../sections/topology.js'

export async function renderDashboard() {
  const app = document.getElementById('app')

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    window.location.hash = ''
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
          <button class="ni" data-sec="dashboard"><span class="ni-ic">⊞</span> Dashboard</button>
          <button class="ni" data-sec="lessons"><span class="ni-ic">📖</span> Lessons</button>
          <button class="ni" data-sec="quiz"><span class="ni-ic">🎯</span> Quiz Mode <span class="ni-badge">New</span></button>
          <button class="ni" data-sec="lab"><span class="ni-ic">💻</span> CLI Lab</button>
          <div class="nav-label" style="margin-top:14px;">Community</div>
          <button class="ni" data-sec="subnet"><span class="ni-ic">🧮</span> Subnet Dojo</button>
          <button class="ni" data-sec="topology"><span class="ni-ic">🗺️</span> Net Topology</button>
          <button class="ni" data-sec="leaderboard"><span class="ni-ic">🏆</span> Leaderboard</button>
          <div class="nav-label" style="margin-top:14px;">More</div>
          <button class="ni" data-sec="resources"><span class="ni-ic">📚</span> Resources</button>
        </nav>
        <div class="dsb-foot">
          <div class="xp-wrap">
            <div class="xp-row">
              <span id="sb-level-label">Level 1 · Newcomer</span>
              <span id="sb-xp-label">0 / 100 XP</span>
            </div>
            <div class="xp-track"><div class="xp-bar" id="sb-xp-bar" style="width:0%"></div></div>
          </div>
          <button class="logout-btn" id="logout-btn">← Log out</button>
        </div>
      </aside>

      <main class="dm">

        <div id="sec-dashboard" class="ds">
          <div class="dtop">
            <div>
              <h1 class="dtitle">Welcome back, ${name} 👋</h1>
              <p class="dsub">Continue your CCNA prep journey</p>
            </div>
            <div class="streak-chip">🔥 Start your streak!</div>
          </div>
          <div class="stats-row">
            <div class="scard"><div class="sv" id="stat-lessons">—</div><div class="sl">Lessons done</div></div>
            <div class="scard"><div class="sv" id="stat-quiz-avg">—</div><div class="sl">Quiz avg score</div></div>
            <div class="scard"><div class="sv" id="stat-xp">—</div><div class="sl">Total XP</div></div>
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
        <div id="sec-subnet" class="ds">${subnetDojoHTML()}</div>
        <div id="sec-topology" class="ds">${topoHTML()}</div>
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
  setupSubnetDojo()
  setupTopo()

  // ─── LOAD STATS FROM SUPABASE ──────────────────────────────────────────────
  loadUserStats(user.id)
}

async function loadUserStats(userId) {
  try {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('xp, quizzes_done, lessons_done')
      .eq('id', userId)
      .single()

    if (error || !profile) return

    const xp = profile.xp || 0
    const quizzesDone = profile.quizzes_done || 0
    const lessonsDone = profile.lessons_done || 0

    // ── Stat cards ────────────────────────────────────────────────────────────
    const statLessons = document.getElementById('stat-lessons')
    const statQuizAvg = document.getElementById('stat-quiz-avg')
    const statXp = document.getElementById('stat-xp')
    if (statLessons) statLessons.textContent = lessonsDone
    if (statXp) statXp.textContent = xp

    // Quiz avg: only show if they've done at least one quiz
    if (statQuizAvg) {
      statQuizAvg.textContent = quizzesDone > 0
        ? Math.round((xp / (quizzesDone * 200)) * 100) + '%'
        : '—'
    }

    // ── Sidebar XP bar ────────────────────────────────────────────────────────
    const level = getLevelInfo(xp)
    const sbLevelLabel = document.getElementById('sb-level-label')
    const sbXpLabel = document.getElementById('sb-xp-label')
    const sbXpBar = document.getElementById('sb-xp-bar')
    if (sbLevelLabel) sbLevelLabel.textContent = `Level ${level.num} · ${level.name}`
    if (sbXpLabel) sbXpLabel.textContent = `${xp} / ${level.next} XP`
    if (sbXpBar) sbXpBar.style.width = Math.min(100, Math.round((xp / level.next) * 100)) + '%'

  } catch (err) {
    console.error('Failed to load user stats:', err)
  }
}

function getLevelInfo(xp) {
  if (xp < 100)  return { num: 1, name: 'Newcomer',    next: 100  }
  if (xp < 300)  return { num: 2, name: 'Apprentice',  next: 300  }
  if (xp < 600)  return { num: 3, name: 'Technician',  next: 600  }
  if (xp < 1000) return { num: 4, name: 'Engineer',    next: 1000 }
  if (xp < 1500) return { num: 5, name: 'Specialist',  next: 1500 }
  return           { num: 6, name: 'Expert',      next: 2000 }
}

function navigateTo(sec) {
  window.location.hash = sec
  activateSection(sec)
}

function activateSection(sec) {
  const validSections = ['dashboard', 'lessons', 'quiz', 'lab', 'leaderboard', 'resources', 'subnet', 'topology']
  const target = validSections.includes(sec) ? sec : 'dashboard'

  document.querySelectorAll('.ds').forEach(s => s.classList.remove('active'))
  document.querySelectorAll('.ni').forEach(n => n.classList.remove('active'))

  const secEl = document.getElementById('sec-' + target)
  const navEl = document.querySelector(`[data-sec="${target}"]`)

  if (secEl) secEl.classList.add('active')
  if (navEl) navEl.classList.add('active')
}

function setupHandlers() {
  document.querySelectorAll('.ni').forEach(btn => {
    btn.addEventListener('click', () => {
      const sec = btn.dataset.sec
      navigateTo(sec)

      if (window.innerWidth <= 768) {
        document.querySelector('.dsb').classList.remove('open')
        document.getElementById('sidebar-overlay').classList.remove('visible')
      }
    })
  })

  document.getElementById('logout-btn').addEventListener('click', async () => {
    await supabase.auth.signOut()
    window.location.hash = ''
    import('./home.js').then(m => m.renderApp())
  })

  document.getElementById('sidebar-toggle').addEventListener('click', () => {
    const sidebar = document.querySelector('.dsb')
    const overlay = document.getElementById('sidebar-overlay')
    sidebar.classList.toggle('open')
    overlay.classList.toggle('visible')
  })

  document.getElementById('sidebar-overlay').addEventListener('click', () => {
    document.querySelector('.dsb').classList.remove('open')
    document.getElementById('sidebar-overlay').classList.remove('visible')
  })

  window.addEventListener('hashchange', () => {
    const sec = window.location.hash.replace('#', '') || 'dashboard'
    activateSection(sec)
  })

  const initialSec = window.location.hash.replace('#', '') || 'dashboard'
  activateSection(initialSec)
}

function setupPathCards() {
  const activeCard = document.querySelector('.active-pc')
  if (activeCard) {
    activeCard.style.cursor = 'pointer'
    activeCard.addEventListener('click', () => {
      navigateTo('lessons')
    })
  }
}