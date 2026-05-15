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
          <button class="ni" data-sec="dashboard">
            <i class="ti ti-layout-dashboard" aria-hidden="true"></i> Dashboard
          </button>
          <button class="ni" data-sec="lessons">
            <i class="ti ti-book-2" aria-hidden="true"></i> Lessons
          </button>
          <button class="ni" data-sec="quiz">
            <i class="ti ti-target" aria-hidden="true"></i> Quiz Mode
            <span class="ni-badge">New</span>
          </button>
          <button class="ni" data-sec="lab">
            <i class="ti ti-terminal-2" aria-hidden="true"></i> CLI Lab
          </button>

          <div class="nav-label" style="margin-top:14px;">Tools</div>
          <button class="ni" data-sec="subnet">
            <i class="ti ti-calculator" aria-hidden="true"></i> Subnet Dojo
          </button>
          <button class="ni" data-sec="topology">
            <i class="ti ti-topology-star" aria-hidden="true"></i> Net Topology
          </button>

          <div class="nav-label" style="margin-top:14px;">Community</div>
          <button class="ni" data-sec="leaderboard">
            <i class="ti ti-trophy" aria-hidden="true"></i> Leaderboard
          </button>

          <div class="nav-label" style="margin-top:14px;">More</div>
          <button class="ni" data-sec="resources">
            <i class="ti ti-books" aria-hidden="true"></i> Resources
          </button>
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
            <i class="ti ti-logout" aria-hidden="true"></i> Log out
          </button>
        </div>
      </aside>

      <main class="dm">

<div id="sec-dashboard" class="ds">

          <!-- TOP BAR -->
          <div class="dtop">
            <div>
              <h1 class="dtitle">Welcome back, ${name} 👋</h1>
              <p class="dsub">Continue your CCNA prep journey — you're doing great!</p>
            </div>
            <div class="streak-chip">🔥 Start your streak!</div>
          </div>

          <!-- STAT CARDS -->
          <div class="stats-row">
            <div class="scard"><div class="sv" id="stat-lessons">—</div><div class="sl">Lessons done</div></div>
            <div class="scard"><div class="sv" id="stat-quiz-avg">—</div><div class="sl">Quiz avg score</div></div>
            <div class="scard"><div class="sv" id="stat-xp">—</div><div class="sl">Total XP</div></div>
          </div>

          <!-- MOTIVATIONAL BANNER -->
          <div class="mot-banner">
            <div class="mot-left">
              <div class="mot-emoji">💡</div>
              <div>
                <div class="mot-title">Did you know?</div>
                <div class="mot-text" id="mot-text">Loading tip...</div>
              </div>
            </div>
            <button class="mot-next" id="mot-next">Next tip →</button>
          </div>

          <!-- TWO COLUMN LAYOUT -->
          <div class="dash-cols">

            <!-- LEFT: LEARNING PATH -->
            <div class="dash-col-main">
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

            <!-- RIGHT: CERTIFICATION OVERVIEW -->
            <div class="dash-col-side">
              <div class="sec-lbl">Certification Roadmap</div>
              <div class="cert-list">
                <div class="cert-card cert-active">
                  <div class="cert-top">
                    <div class="cert-badge" style="background:#FFF3D6;color:#9a6e00;">CCNA</div>
                    <span class="cert-status-tag">You are here</span>
                  </div>
                  <div class="cert-name">Cisco Certified Network Associate</div>
                  <div class="cert-desc">Entry-level networking. Covers IP, routing, switching, security basics. Best first cert for any networking career.</div>
                  <div class="cert-meta">
                    <span>📅 ~3–6 months prep</span>
                    <span>📝 120 min · 100 questions</span>
                  </div>
                </div>

                <div class="cert-card">
                  <div class="cert-top">
                    <div class="cert-badge" style="background:#E3EDF2;color:#1C4B62;">CCNP</div>
                    <span class="cert-status-tag locked-tag">After CCNA</span>
                  </div>
                  <div class="cert-name">Cisco Certified Network Professional</div>
                  <div class="cert-desc">Advanced routing, switching, troubleshooting. Specializations in Enterprise, Security, or Data Center.</div>
                  <div class="cert-meta">
                    <span>📅 ~6–12 months prep</span>
                    <span>📝 Two exams required</span>
                  </div>
                </div>

                <div class="cert-card">
                  <div class="cert-top">
                    <div class="cert-badge" style="background:#FDECEA;color:#7a1c10;">Sec+</div>
                    <span class="cert-status-tag locked-tag">Cybersecurity path</span>
                  </div>
                  <div class="cert-name">CompTIA Security+</div>
                  <div class="cert-desc">Top cybersecurity entry cert. Covers threats, cryptography, identity, and network defense. DoD approved.</div>
                  <div class="cert-meta">
                    <span>📅 ~2–4 months prep</span>
                    <span>📝 90 min · 90 questions</span>
                  </div>
                </div>

                <div class="cert-card">
                  <div class="cert-top">
                    <div class="cert-badge" style="background:#EDE7F6;color:#3C3489;">CEH</div>
                    <span class="cert-status-tag locked-tag">Advanced security</span>
                  </div>
                  <div class="cert-name">Certified Ethical Hacker</div>
                  <div class="cert-desc">Offensive security mindset. Learn how attackers think to defend better. High demand in PH government and BPOs.</div>
                  <div class="cert-meta">
                    <span>📅 ~3–6 months prep</span>
                    <span>📝 125 questions · 4 hrs</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <!-- QUICK ACTION ROW -->
          <div class="sec-lbl" style="margin-top:28px;">Quick actions</div>
          <div class="quick-row">
            <button class="quick-card" onclick="document.querySelector('[data-sec=quiz]').click()">
              <i class="ti ti-target" aria-hidden="true"></i>
              <div class="quick-name">Take a quiz</div>
              <div class="quick-sub">Test your knowledge · Earn XP</div>
            </button>
            <button class="quick-card" onclick="document.querySelector('[data-sec=lab]').click()">
              <i class="ti ti-terminal-2" aria-hidden="true"></i>
              <div class="quick-name">CLI Lab</div>
              <div class="quick-sub">Practice Cisco commands</div>
            </button>
            <button class="quick-card" onclick="document.querySelector('[data-sec=subnet]').click()">
              <i class="ti ti-calculator" aria-hidden="true"></i>
              <div class="quick-name">Subnet Dojo</div>
              <div class="quick-sub">Drill subnetting fast</div>
            </button>
            <button class="quick-card" onclick="document.querySelector('[data-sec=topology]').click()">
              <i class="ti ti-topology-star" aria-hidden="true"></i>
              <div class="quick-name">Net Topology</div>
              <div class="quick-sub">Build network diagrams</div>
            </button>
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
  loadUserStats(user.id)
  setupMotivation()
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

    const statLessons = document.getElementById('stat-lessons')
    const statQuizAvg = document.getElementById('stat-quiz-avg')
    const statXp = document.getElementById('stat-xp')
    if (statLessons) statLessons.textContent = lessonsDone
    if (statXp) statXp.textContent = xp
    if (statQuizAvg) {
      statQuizAvg.textContent = quizzesDone > 0
        ? Math.round((xp / (quizzesDone * 200)) * 100) + '%'
        : '—'
    }

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
  if (xp < 100)  return { num: 1, name: 'Newcomer',   next: 100  }
  if (xp < 300)  return { num: 2, name: 'Apprentice', next: 300  }
  if (xp < 600)  return { num: 3, name: 'Technician', next: 600  }
  if (xp < 1000) return { num: 4, name: 'Engineer',   next: 1000 }
  if (xp < 1500) return { num: 5, name: 'Specialist', next: 1500 }
  return           { num: 6, name: 'Expert',     next: 2000 }
}

function navigateTo(sec) {
  window.location.hash = sec
  activateSection(sec)
}

function activateSection(sec) {
  const validSections = ['dashboard','lessons','quiz','lab','leaderboard','resources','subnet','topology']
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
      navigateTo(btn.dataset.sec)
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
    document.querySelector('.dsb').classList.toggle('open')
    document.getElementById('sidebar-overlay').classList.toggle('visible')
  })

  document.getElementById('sidebar-overlay').addEventListener('click', () => {
    document.querySelector('.dsb').classList.remove('open')
    document.getElementById('sidebar-overlay').classList.remove('visible')
  })

  window.addEventListener('hashchange', () => {
    const sec = window.location.hash.replace('#', '') || 'dashboard'
    activateSection(sec)
  })

  activateSection(window.location.hash.replace('#', '') || 'dashboard')
}

function setupPathCards() {
  const activeCard = document.querySelector('.active-pc')
  if (activeCard) {
    activeCard.style.cursor = 'pointer'
    activeCard.addEventListener('click', () => navigateTo('lessons'))
  }
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
  const textEl = document.getElementById('mot-text')
  const nextBtn = document.getElementById('mot-next')
  if (!textEl || !nextBtn) return
  textEl.textContent = tips[idx]
  nextBtn.addEventListener('click', () => {
    idx = (idx + 1) % tips.length
    textEl.textContent = tips[idx]
  })
}