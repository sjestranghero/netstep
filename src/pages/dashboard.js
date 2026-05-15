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

  const firstName = (user.user_metadata?.full_name || user.email.split('@')[0]).split(' ')[0]

  app.innerHTML = `
    <div class="dw">
      <button class="toggle-btn" id="sidebar-toggle"><i class="ti ti-menu-2"></i></button>
      <div class="overlay" id="sidebar-overlay"></div>

      <aside class="dsb">
        <div class="dsb-logo">
          <div class="dsb-logo-mark">
            <div class="dsb-logo-sq">N</div>
            <div>
              <span class="dsb-logo-name">NetStep</span>
              <span class="dsb-logo-pill">BETA</span>
            </div>
          </div>
        </div>

        <nav class="dsb-nav">
          <div class="nav-label">Learn</div>
          <button class="ni" data-sec="dashboard"><i class="ti ti-layout-dashboard"></i> Dashboard</button>
          <button class="ni" data-sec="lessons"><i class="ti ti-book-2"></i> Lessons</button>
          <button class="ni" data-sec="quiz"><i class="ti ti-target"></i> Quiz Mode <span class="ni-badge">New</span></button>
          <button class="ni" data-sec="lab"><i class="ti ti-terminal-2"></i> CLI Lab</button>

          <div class="nav-label" style="margin-top:12px;">Tools</div>
          <button class="ni" data-sec="subnet"><i class="ti ti-calculator"></i> Subnet Dojo</button>
          <button class="ni" data-sec="topology"><i class="ti ti-topology-star"></i> Net Topology</button>

          <div class="nav-label" style="margin-top:12px;">Community</div>
          <button class="ni" data-sec="leaderboard"><i class="ti ti-trophy"></i> Leaderboard</button>

          <div class="nav-label" style="margin-top:12px;">More</div>
          <button class="ni" data-sec="resources"><i class="ti ti-books"></i> Resources</button>
        </nav>

        <div class="dsb-foot">
          <div class="xp-wrap">
            <div class="xp-row">
              <span id="sb-level-label">Level 1 · Newcomer</span>
              <span id="sb-xp-label">0 / 100 XP</span>
            </div>
            <div class="xp-track"><div class="xp-bar" id="sb-xp-bar" style="width:0%"></div></div>
          </div>
          <button class="logout-btn" id="logout-btn">
            <i class="ti ti-logout"></i> Log out
          </button>
        </div>
      </aside>

      <main class="dm">

        <div id="sec-dashboard" class="ds">

          <div class="dash-header">
            <div>
              <h1 class="dtitle">Welcome back, ${firstName} 👋</h1>
              <p class="dsub">Continue your CCNA prep journey — you're doing great!</p>
            </div>
            <div class="streak-chip">🔥 Start your streak!</div>
          </div>

          <div class="stats-row">
            <div class="scard">
              <div class="scard-top">
                <div class="scard-icon" style="background:#f0fdf4;">📖</div>
              </div>
              <div class="sv" id="stat-lessons">0</div>
              <div class="sl">Lessons done</div>
            </div>
            <div class="scard">
              <div class="scard-top">
                <div class="scard-icon" style="background:#eff6ff;">🎯</div>
              </div>
              <div class="sv" id="stat-quizzes">0</div>
              <div class="sl">Quizzes taken</div>
            </div>
            <div class="scard">
              <div class="scard-top">
                <div class="scard-icon" style="background:#fffbeb;">⭐</div>
              </div>
              <div class="sv" id="stat-xp">0</div>
              <div class="sl">Total XP</div>
            </div>
          </div>

          <div class="mot-banner">
            <div class="mot-left">
              <div class="mot-emoji">💡</div>
              <div>
                <div class="mot-title">Did you know?</div>
                <div class="mot-text" id="mot-text"></div>
              </div>
            </div>
            <button class="mot-next" id="mot-next">Next tip →</button>
          </div>

          <div class="dash-cols">

            <div class="dash-col-main">
              <div class="sec-lbl">Your Learning Path</div>
              <div class="path-list">
                <div class="pc active-pc" id="path-fundamentals" style="cursor:pointer;">
                  <div class="pc-icon" style="background:#fffbeb;">📡</div>
                  <div class="pc-info">
                    <div class="pc-title">1. Network Fundamentals</div>
                    <div class="pc-meta">OSI model, IP addressing, subnetting</div>
                    <div class="pc-prog"><div class="prog-track"><div class="prog-fill" style="width:0%;background:#e8a519;"></div></div><span class="prog-pct">0%</span></div>
                  </div>
                  <span class="pc-tag" style="background:#fffbeb;color:#d97706;">Start →</span>
                </div>
                <div class="pc locked-pc">
                  <div class="pc-icon" style="background:#f9fafb;">🔒</div>
                  <div class="pc-info">
                    <div class="pc-title">2. Switching &amp; VLANs</div>
                    <div class="pc-meta">STP, VLAN config, trunking, EtherChannel</div>
                    <div class="pc-prog"><div class="prog-track"><div class="prog-fill" style="width:0%;background:#d1d5db;"></div></div><span class="prog-pct">0%</span></div>
                  </div>
                  <span class="pc-tag" style="background:#f3f4f6;color:#9ca3af;">Locked</span>
                </div>
                <div class="pc locked-pc">
                  <div class="pc-icon" style="background:#f9fafb;">🔒</div>
                  <div class="pc-info">
                    <div class="pc-title">3. Routing Protocols</div>
                    <div class="pc-meta">OSPF, EIGRP, BGP basics, static routes</div>
                    <div class="pc-prog"><div class="prog-track"><div class="prog-fill" style="width:0%;background:#d1d5db;"></div></div><span class="prog-pct">0%</span></div>
                  </div>
                  <span class="pc-tag" style="background:#f3f4f6;color:#9ca3af;">Locked</span>
                </div>
                <div class="pc locked-pc">
                  <div class="pc-icon" style="background:#f9fafb;">🔒</div>
                  <div class="pc-info">
                    <div class="pc-title">4. Network Security</div>
                    <div class="pc-meta">ACLs, firewalls, VPNs, threat basics</div>
                    <div class="pc-prog"><div class="prog-track"><div class="prog-fill" style="width:0%;background:#d1d5db;"></div></div><span class="prog-pct">0%</span></div>
                  </div>
                  <span class="pc-tag" style="background:#f3f4f6;color:#9ca3af;">Locked</span>
                </div>
              </div>

              <div class="sec-lbl" style="margin-top:26px;">Quick actions</div>
              <div class="quick-row">
                <button class="quick-card" id="qa-quiz">
                  <i class="ti ti-target"></i>
                  <div class="quick-name">Take a quiz</div>
                  <div class="quick-sub">Test knowledge · Earn XP</div>
                </button>
                <button class="quick-card" id="qa-lab">
                  <i class="ti ti-terminal-2"></i>
                  <div class="quick-name">CLI Lab</div>
                  <div class="quick-sub">Practice Cisco commands</div>
                </button>
                <button class="quick-card" id="qa-subnet">
                  <i class="ti ti-calculator"></i>
                  <div class="quick-name">Subnet Dojo</div>
                  <div class="quick-sub">Drill subnetting fast</div>
                </button>
                <button class="quick-card" id="qa-topology">
                  <i class="ti ti-topology-star"></i>
                  <div class="quick-name">Net Topology</div>
                  <div class="quick-sub">Build network diagrams</div>
                </button>
              </div>
            </div>

            <div class="dash-col-side">
              <div class="sec-lbl">Certification Roadmap</div>
              <div class="cert-list">
                <div class="cert-card cert-active">
                  <div class="cert-top">
                    <div class="cert-badge" style="background:#fffbeb;color:#92400e;">CCNA</div>
                    <span class="cert-status-tag">You are here</span>
                  </div>
                  <div class="cert-name">Cisco Certified Network Associate</div>
                  <div class="cert-desc">Entry-level networking. Covers IP, routing, switching, security basics.</div>
                  <div class="cert-meta"><span>📅 3–6 months</span><span>📝 120 min · 100 Qs</span></div>
                </div>
                <div class="cert-card">
                  <div class="cert-top">
                    <div class="cert-badge" style="background:#eff6ff;color:#1e40af;">CCNP</div>
                    <span class="cert-status-tag locked-tag">After CCNA</span>
                  </div>
                  <div class="cert-name">Cisco Certified Network Professional</div>
                  <div class="cert-desc">Advanced routing, switching, troubleshooting. Enterprise, Security, or DC track.</div>
                  <div class="cert-meta"><span>📅 6–12 months</span><span>📝 Two exams</span></div>
                </div>
                <div class="cert-card">
                  <div class="cert-top">
                    <div class="cert-badge" style="background:#fef2f2;color:#991b1b;">Sec+</div>
                    <span class="cert-status-tag locked-tag">Cybersecurity path</span>
                  </div>
                  <div class="cert-name">CompTIA Security+</div>
                  <div class="cert-desc">Top cybersecurity entry cert. Threats, cryptography, identity, and network defense.</div>
                  <div class="cert-meta"><span>📅 2–4 months</span><span>📝 90 min · 90 Qs</span></div>
                </div>
                <div class="cert-card">
                  <div class="cert-top">
                    <div class="cert-badge" style="background:#f5f3ff;color:#4c1d95;">CEH</div>
                    <span class="cert-status-tag locked-tag">Advanced security</span>
                  </div>
                  <div class="cert-name">Certified Ethical Hacker</div>
                  <div class="cert-desc">Offensive security. High demand in PH government and BPOs.</div>
                  <div class="cert-meta"><span>📅 3–6 months</span><span>📝 125 Qs · 4 hrs</span></div>
                </div>
              </div>
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
  setupSubnetDojo()
  setupTopo()
  setupMotivation()
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

    const xp          = profile.xp || 0
    const quizzesDone = profile.quizzes_done || 0
    const lessonsDone = profile.lessons_done || 0

    const elLessons = document.getElementById('stat-lessons')
    const elQuizzes = document.getElementById('stat-quizzes')
    const elXp      = document.getElementById('stat-xp')
    if (elLessons) elLessons.textContent = lessonsDone
    if (elQuizzes) elQuizzes.textContent = quizzesDone
    if (elXp)      elXp.textContent      = xp

    const level = getLevelInfo(xp)
    const elLvl = document.getElementById('sb-level-label')
    const elXpL = document.getElementById('sb-xp-label')
    const elBar = document.getElementById('sb-xp-bar')
    if (elLvl) elLvl.textContent = `Level ${level.num} · ${level.name}`
    if (elXpL) elXpL.textContent = `${xp} / ${level.next} XP`
    if (elBar) elBar.style.width = Math.min(100, Math.round((xp / level.next) * 100)) + '%'

  } catch (err) {
    console.error('Failed to load user stats:', err)
  }
}

function getLevelInfo(xp) {
  if (xp < 100)  return { num: 1, name: 'Newcomer',   next: 100  }
  if (xp < 300)  return { num: 2, name: 'Apprentice', next: 300  }
  if (xp < 600)  return { num: 3, name: 'Technician', next: 600  }
  if (xp < 1000) return { num: 4, name: 'Engineer',   next: 1000 }
  if (xp < 1500) return { num: 5, name: 'Specialist', next: 1500 }
  return           { num: 6, name: 'Expert',     next: 2000 }
}

function setupMotivation() {
  const tips = [
    'The CCNA 200-301 exam covers 6 domains — Network Fundamentals is worth 20% of your score. Master it first!',
    'Subnetting is the most tested skill on CCNA. Practice daily for 10 minutes and it becomes second nature.',
    'The average CCNA salary in the Philippines is ₱35,000–₱60,000/month. Certified engineers earn 40% more.',
    'You don\'t need to memorize everything. Understanding the OSI model deeply unlocks every other topic.',
    'Cisco Packet Tracer is free and lets you practice real configurations without buying hardware.',
    'The CCNA exam is 120 minutes, 100 questions. That\'s 72 seconds per question — practice speed too.',
    'Consistency beats intensity. 30 minutes of study every day beats 5 hours once a week.',
    'OSPF, EIGRP, and BGP are all on the exam — but OSPF is the most commonly tested routing protocol.',
    'ACLs are tricky because of wildcard masks. Think of wildcards as the inverse of subnet masks.',
    'After CCNA, CCNP Enterprise or CompTIA Security+ are the two most in-demand paths in PH tech.',
    'CLI Lab practice is the fastest way to pass — Cisco exams now include simulation questions.',
    'Every question you get wrong is telling you exactly what to study next. Wrong answers are progress.',
  ]
  let idx = Math.floor(Math.random() * tips.length)
  const textEl  = document.getElementById('mot-text')
  const nextBtn = document.getElementById('mot-next')
  if (!textEl || !nextBtn) return
  textEl.textContent = tips[idx]
  nextBtn.addEventListener('click', () => {
    idx = (idx + 1) % tips.length
    textEl.textContent = tips[idx]
  })
}

function navigateTo(sec) {
  window.location.hash = sec
  activateSection(sec)
}

function activateSection(sec) {
  const valid = ['dashboard','lessons','quiz','lab','leaderboard','resources','subnet','topology']
  const target = valid.includes(sec) ? sec : 'dashboard'
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
      navigateTo(btn.dataset.sec)
      if (window.innerWidth <= 768) {
        document.querySelector('.dsb').classList.remove('open')
        document.getElementById('sidebar-overlay').classList.remove('visible')
      }
    })
  })

  document.getElementById('qa-quiz')?.addEventListener('click',     () => navigateTo('quiz'))
  document.getElementById('qa-lab')?.addEventListener('click',      () => navigateTo('lab'))
  document.getElementById('qa-subnet')?.addEventListener('click',   () => navigateTo('subnet'))
  document.getElementById('qa-topology')?.addEventListener('click', () => navigateTo('topology'))
  document.getElementById('path-fundamentals')?.addEventListener('click', () => navigateTo('lessons'))

  document.getElementById('logout-btn').addEventListener('click', async () => {
    await supabase.auth.signOut()
    window.location.hash = ''
    import('./home.js').then(m => m.renderApp())
  })

  document.getElementById('sidebar-toggle').addEventListener('click', () => {
    document.querySelector('.dsb').classList.toggle('open')
    document.getElementById('sidebar-overlay').classList.toggle('visible')
  })
  document.getElementById('sidebar-overlay').addEventListener('click', () => {
    document.querySelector('.dsb').classList.remove('open')
    document.getElementById('sidebar-overlay').classList.remove('visible')
  })

  window.addEventListener('hashchange', () => {
    activateSection(window.location.hash.replace('#', '') || 'dashboard')
  })
  activateSection(window.location.hash.replace('#', '') || 'dashboard')
}