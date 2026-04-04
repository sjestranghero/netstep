import { supabase } from '../supabase.js'
import '../styles/leaderboard.css'

export function leaderboardHTML() {
  return `
    <div class="dtop">
      <div>
        <h1 class="dtitle">Leaderboard</h1>
        <p class="dsub">Top students this week</p>
      </div>
      <div class="lb-filter-wrap">
        <button class="lb-filter active" data-filter="all">All time</button>
        <button class="lb-filter" data-filter="week">This week</button>
      </div>
    </div>

    <div class="lb-wrap">
      <div class="lb-podium" id="lb-podium">
        <div class="lb-loading">Loading rankings...</div>
      </div>

      <div class="lb-table-wrap">
        <div class="lb-table-head">
          <span>Rank</span>
          <span>Student</span>
          <span>XP</span>
          <span>Quizzes</span>
        </div>
        <div id="lb-list">
          <div class="lb-loading">Loading...</div>
        </div>
      </div>

      <div class="lb-you-card" id="lb-you-card" style="display:none;">
        <div class="lb-you-label">Your ranking</div>
        <div class="lb-you-content" id="lb-you-content"></div>
      </div>
    </div>
  `
}

export async function setupLeaderboard() {
  await loadLeaderboard()

  document.querySelectorAll('.lb-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.lb-filter').forEach(b => b.classList.remove('active'))
      btn.classList.add('active')
      loadLeaderboard()
    })
  })
}

async function loadLeaderboard() {
  const podiumEl = document.getElementById('lb-podium')
  const listEl = document.getElementById('lb-list')
  if (!podiumEl || !listEl) return

  podiumEl.innerHTML = '<div class="lb-loading">Loading rankings...</div>'
  listEl.innerHTML = '<div class="lb-loading">Loading...</div>'

  // Get current user
  const { data: { user } } = await supabase.auth.getUser()

  // Fetch all profiles ordered by XP
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('*')
    .order('xp', { ascending: false })
    .limit(20)

  if (error || !profiles || profiles.length === 0) {
    podiumEl.innerHTML = buildEmptyPodium()
    listEl.innerHTML = '<div class="lb-empty">No rankings yet. Complete quizzes to appear here!</div>'
    return
  }

  // Build podium (top 3)
  podiumEl.innerHTML = buildPodium(profiles.slice(0, 3))

  // Build full list
  listEl.innerHTML = profiles.map((p, i) => buildRow(p, i, user)).join('')

  // Show your card if you're not in top 20
  if (user) {
    const yourIndex = profiles.findIndex(p => p.id === user.id)
    const youCard = document.getElementById('lb-you-card')
    const youContent = document.getElementById('lb-you-content')
    if (youCard && youContent) {
      if (yourIndex === -1) {
        // Fetch their own profile
        const { data: myProfile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()
        if (myProfile) {
          youCard.style.display = 'block'
          youContent.innerHTML = `
            <span class="lb-you-rank">Unranked</span>
            <span class="lb-you-name">${myProfile.full_name || 'You'}</span>
            <span class="lb-you-xp">${myProfile.xp || 0} XP</span>
          `
        }
      } else {
        youCard.style.display = 'block'
        youContent.innerHTML = `
          <span class="lb-you-rank">#${yourIndex + 1}</span>
          <span class="lb-you-name">You</span>
          <span class="lb-you-xp">${profiles[yourIndex].xp || 0} XP</span>
        `
      }
    }
  }
}

function buildPodium(top) {
  if (top.length === 0) return buildEmptyPodium()

  const medals = ['🥇', '🥈', '🥉']
  const heights = ['120px', '90px', '75px']
  const order = top.length >= 2 ? [1, 0, 2] : [0]

  return `
    <div class="podium-row">
      ${order.filter(i => top[i]).map(i => `
        <div class="podium-col ${i === 0 ? 'podium-first' : ''}">
          <div class="podium-medal">${medals[i]}</div>
          <div class="podium-avatar" style="background:${avatarColor(i)}">
            ${getInitials(top[i].full_name || top[i].email || '?')}
          </div>
          <div class="podium-name">${top[i].full_name || 'Student'}</div>
          <div class="podium-xp">${top[i].xp || 0} XP</div>
          <div class="podium-base" style="height:${heights[i]};">
            <span class="podium-rank">#${i + 1}</span>
          </div>
        </div>
      `).join('')}
    </div>
  `
}

function buildEmptyPodium() {
  return `
    <div class="podium-row">
      ${['🥇','🥈','🥉'].map((m, i) => `
        <div class="podium-col ${i === 0 ? 'podium-first' : ''}">
          <div class="podium-medal">${m}</div>
          <div class="podium-avatar" style="background:#e0e0e0;color:#999;">?</div>
          <div class="podium-name" style="color:#aaa;">—</div>
          <div class="podium-xp" style="color:#ccc;">0 XP</div>
          <div class="podium-base" style="height:${['120px','90px','75px'][i]};">
            <span class="podium-rank">#${i+1}</span>
          </div>
        </div>
      `).join('')}
    </div>
  `
}

function buildRow(profile, index, currentUser) {
  const isYou = currentUser && profile.id === currentUser.id
  const rank = index + 1
  const medals = { 1: '🥇', 2: '🥈', 3: '🥉' }
  return `
    <div class="lb-row ${isYou ? 'lb-row-you' : ''}">
      <span class="lb-rank ${rank <= 3 ? 'lb-rank-top' : ''}">
        ${medals[rank] || rank}
      </span>
      <span class="lb-name-cell">
        <span class="lb-avatar-sm" style="background:${avatarColor(index)}">
          ${getInitials(profile.full_name || profile.email || '?')}
        </span>
        ${profile.full_name || 'Student'}
        ${isYou ? '<span class="lb-you-tag">You</span>' : ''}
      </span>
      <span class="lb-xp-cell">${profile.xp || 0} XP</span>
      <span class="lb-quiz-cell">${profile.quizzes_done || 0}</span>
    </div>
  `
}

function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
}

function avatarColor(index) {
  const colors = ['#FFF3D6', '#E3EDF2', '#FDECEA', '#F0F4F7', '#E8F5E9', '#EDE7F6']
  return colors[index % colors.length]
}