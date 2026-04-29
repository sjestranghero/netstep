import '../styles/subnetdojo.css'

const QUESTIONS = [
  {q:'How many usable hosts does a /24 network have?',opts:['254','255','256','252'],ans:0,exp:'/24 has 2^8 = 256 addresses. Subtract 2 = 254 usable hosts.'},
  {q:'What is the subnet mask for /26?',opts:['255.255.255.192','255.255.255.128','255.255.255.224','255.255.255.240'],ans:0,exp:'/26 = 26 network bits. Last octet: 128+64 = 192. So /26 = 255.255.255.192.'},
  {q:'A /28 network has how many usable hosts?',opts:['14','16','30','12'],ans:0,exp:'/28 has 4 host bits. 2^4 = 16 addresses. 16 - 2 = 14 usable hosts.'},
  {q:'What is the block size of a /26 network?',opts:['64','32','128','62'],ans:0,exp:'Block size = 2^host bits = 2^6 = 64. Subnets start at 0, 64, 128, 192.'},
  {q:'Which subnet does 192.168.1.130 belong to in a /26 network?',opts:['192.168.1.128','192.168.1.64','192.168.1.192','192.168.1.0'],ans:0,exp:'Block size 64. Subnets: 0-63, 64-127, 128-191. So 130 → 192.168.1.128.'},
  {q:'What is the broadcast address of 192.168.1.64/26?',opts:['192.168.1.127','192.168.1.128','192.168.1.63','192.168.1.191'],ans:0,exp:'Block 64, network .64, next subnet .128. Broadcast = .128 - 1 = .127.'},
  {q:'How many subnets from /24 using /27?',opts:['8','4','16','6'],ans:0,exp:'/27 borrows 3 bits from /24. 2^3 = 8 subnets.'},
  {q:'What is the wildcard mask for 255.255.255.0?',opts:['0.0.0.255','255.255.255.0','0.255.255.255','255.0.0.255'],ans:0,exp:'Wildcard = inverse of subnet mask. 255.255.255.0 → 0.0.0.255.'},
  {q:'A /30 network is used for what?',opts:['Point-to-point links','Large LANs','Server farms','Wireless networks'],ans:0,exp:'/30 gives 2 usable hosts — perfect for point-to-point router links.'},
  {q:'How many host bits does /29 have?',opts:['3','4','5','2'],ans:0,exp:'Host bits = 32 - 29 = 3. Gives 2^3 - 2 = 6 usable hosts.'},
  {q:'What is the CIDR notation for 255.255.255.240?',opts:['/28','/27','/29','/26'],ans:0,exp:'240 = 11110000 = 4 ones in last octet. 24 + 4 = /28.'},
  {q:'How many usable hosts does /30 provide?',opts:['2','4','6','8'],ans:0,exp:'/30 has 2 host bits. 2^2 = 4 addresses. 4 - 2 = 2 usable hosts.'},
  {q:'What is the network address of 192.168.5.77/27?',opts:['192.168.5.64','192.168.5.32','192.168.5.96','192.168.5.0'],ans:0,exp:'Block size /27 = 32. Subnets: 0,32,64,96. 77 falls in 64-95 → network 192.168.5.64.'},
  {q:'How many bits does IPv4 use?',opts:['32','16','64','128'],ans:0,exp:'IPv4 addresses are 32 bits written as four 8-bit octets.'},
  {q:'What prefix gives exactly 30 usable hosts?',opts:['/27','/26','/28','/25'],ans:0,exp:'/27 has 5 host bits. 2^5 - 2 = 30 usable hosts.'},
  {q:'What is the last usable host in 10.0.0.0/30?',opts:['10.0.0.2','10.0.0.1','10.0.0.3','10.0.0.4'],ans:0,exp:'Network=10.0.0.0, Broadcast=10.0.0.3. Usable: .1 and .2. Last usable = 10.0.0.2.'},
  {q:'How many subnets from /24 using /28?',opts:['16','8','32','4'],ans:0,exp:'/28 borrows 4 bits from /24. 2^4 = 16 subnets.'},
  {q:'Which is the correct formula for number of hosts?',opts:['2^h - 2','2^h','2^n - 2','2^n'],ans:0,exp:'Where h = host bits. Subtract 2 for network and broadcast addresses.'},
  {q:'What is the broadcast of 172.16.0.0/20?',opts:['172.16.15.255','172.16.0.255','172.16.255.255','172.16.16.0'],ans:0,exp:'/20 has 12 host bits. Block = 2^12 = 4096. Next subnet = 172.16.16.0. Broadcast = 172.16.15.255.'},
  {q:'What prefix gives 126 usable hosts?',opts:['/25','/24','/26','/27'],ans:0,exp:'/25 has 7 host bits. 2^7 - 2 = 126 usable hosts.'},
]

const LESSONS = [
  {
    title: 'What is subnetting and why does it exist?',
    diff: 'Easy',
    content: `Subnetting divides a large network into smaller pieces called subnets. This reduces traffic, improves security, and makes better use of IP addresses.`,
    highlight: `192.168.1.0/24 → split into:\n192.168.1.0/26   (64 addresses)\n192.168.1.64/26  (64 addresses)\n192.168.1.128/26 (64 addresses)\n192.168.1.192/26 (64 addresses)`,
    formula: 'Usable hosts = 2^(32 - prefix) - 2'
  },
  {
    title: 'Binary and subnet masks explained',
    diff: 'Easy',
    content: `Every IP address is 32 bits long. A subnet mask tells the network which part is the network address and which part is the host address.`,
    highlight: `/24 = 255.255.255.0\nBinary: 11111111.11111111.11111111.00000000\n\n/26 = 255.255.255.192\nBinary: 11111111.11111111.11111111.11000000`,
    formula: '/26 → 26 ones = 6 host bits → 2^6 = 64 addresses → 62 usable'
  },
  {
    title: 'Network address, broadcast, and usable hosts',
    diff: 'Medium',
    content: `For any subnet, find three things: the network address (first IP), the broadcast address (last IP), and the usable host range.`,
    highlight: `Example: 192.168.1.0/26\nNetwork:   192.168.1.0\nBroadcast: 192.168.1.63\nUsable:    192.168.1.1 – 192.168.1.62\nTotal usable: 62 hosts`,
    formula: 'Block size = 2^(host bits) · Broadcast = Network + Block - 1'
  },
  {
    title: 'Subnetting a /24 network step by step',
    diff: 'Medium',
    content: `To divide 192.168.1.0/24 into 4 equal subnets, you need to borrow 2 bits. This changes /24 to /26. Block size = 64.`,
    highlight: `Subnet 1: 192.168.1.0/26   → .1 to .62   (BC: .63)\nSubnet 2: 192.168.1.64/26  → .65 to .126  (BC: .127)\nSubnet 3: 192.168.1.128/26 → .129 to .190 (BC: .191)\nSubnet 4: 192.168.1.192/26 → .193 to .254 (BC: .255)`,
    formula: 'Borrowed bits = log2(number of subnets needed)'
  },
  {
    title: 'VLSM — Variable Length Subnet Masking',
    diff: 'Hard',
    content: `VLSM allows using different subnet sizes from one IP block. Start with the largest subnet first, then work down to avoid wasting addresses.`,
    highlight: `From 192.168.1.0/24 allocate:\n50 hosts → /26 (62 usable) → 192.168.1.0/26\n25 hosts → /27 (30 usable) → 192.168.1.64/27\n10 hosts → /28 (14 usable) → 192.168.1.96/28\n2  hosts → /30 (2  usable) → 192.168.1.112/30`,
    formula: 'Always allocate largest subnets first to minimize waste'
  },
  {
    title: 'Wildcard masks for ACLs and OSPF',
    diff: 'Hard',
    content: `A wildcard mask is the inverse of a subnet mask. It is used in ACLs and OSPF network statements. 0 = must match, 1 = ignore.`,
    highlight: `Subnet mask:   255.255.255.0\nWildcard mask: 0.0.0.255\n\nSubnet mask:   255.255.255.192\nWildcard mask: 0.0.0.63`,
    formula: 'Wildcard = 255.255.255.255 - subnet mask'
  },
  {
    title: 'Fast exam tricks — the magic number method',
    diff: 'Medium',
    content: `The magic number method lets you find subnets instantly. Subtract the interesting octet of the mask from 256 to get the block size. Then count up in blocks.`,
    highlight: `/26 → mask = 255.255.255.192\nInteresting octet: 192\nMagic number: 256 - 192 = 64\nSubnets: 0, 64, 128, 192\n\n/27 → mask 224 → 256-224=32\nSubnets: 0,32,64,96,128,160,192,224`,
    formula: 'Magic number = 256 - interesting octet of subnet mask'
  },
]

export function subnetDojoHTML() {
  return `
    <div class="dojo-wrap">
      <div class="dojo-top">
        <div>
          <h1 class="dtitle">🧮 Subnet Dojo</h1>
          <p class="dsub">Learn subnetting · Drill it fast · Beat the boss</p>
        </div>
        <div class="dojo-modes">
          <button class="dojo-tab active" data-tab="learn">📖 Learn</button>
          <button class="dojo-tab" data-tab="drill">⚡ Drill</button>
          <button class="dojo-tab" data-tab="boss">🎯 Boss</button>
        </div>
      </div>

      <!-- LEARN TAB -->
      <div id="dojo-learn" class="dojo-tab-content active">
        <div class="sec-lbl">7 lessons · Click to expand</div>
        <div class="dojo-lessons" id="dojo-lesson-list">
          ${LESSONS.map((l,i) => `
            <div class="dojo-lesson-item" data-idx="${i}">
              <div class="dojo-ln ${i===0?'done':''}">${i+1}</div>
              <div class="dojo-li-info">
                <div class="dojo-li-title">${l.title}</div>
                <div class="dojo-li-sub">${l.highlight.split('\n')[0]}</div>
              </div>
              <span class="dojo-diff ${l.diff==='Easy'?'d-easy':l.diff==='Hard'?'d-hard':'d-med'}">${l.diff}</span>
            </div>
            <div class="dojo-lesson-content" id="dlc-${i}">
              <p class="dlc-body">${l.content}</p>
              <div class="dlc-code">${l.highlight}</div>
              <div class="dlc-formula">${l.formula}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- DRILL TAB -->
      <div id="dojo-drill" class="dojo-tab-content" style="display:none;">
        <div id="drill-idle" class="dojo-idle">
          <div class="dojo-idle-icon">⚡</div>
          <div class="dojo-idle-title">Drill Mode</div>
          <div class="dojo-idle-sub">60 seconds · Answer as many as you can · +10 XP each</div>
          <button class="dojo-start-btn" id="drill-start-btn">Start drill</button>
        </div>
        <div id="drill-active" style="display:none;">
          <div class="dojo-stat-row">
            <div class="dojo-stat"><div class="dojo-stat-val" id="drill-timer">60</div><div class="dojo-stat-lbl">seconds</div></div>
            <div class="dojo-stat"><div class="dojo-stat-val" id="drill-correct">0</div><div class="dojo-stat-lbl">correct</div></div>
            <div class="dojo-stat"><div class="dojo-stat-val" id="drill-xp">0</div><div class="dojo-stat-lbl">XP</div></div>
          </div>
          <div class="dojo-timer-track"><div class="dojo-timer-fill" id="drill-bar"></div></div>
          <div class="dojo-qcard">
            <div class="dojo-qtag" id="drill-qtag">Question 1</div>
            <div class="dojo-qtext" id="drill-qtext"></div>
            <div class="dojo-opts" id="drill-opts"></div>
            <div class="dojo-explain" id="drill-explain"></div>
            <button class="dojo-next-btn" id="drill-next">Next →</button>
          </div>
        </div>
        <div id="drill-result" style="display:none;">
          <div class="dojo-result-card">
            <div class="dojo-res-emoji" id="dr-emoji">🎉</div>
            <div class="dojo-res-title" id="dr-title">Time's up!</div>
            <div class="dojo-res-sub" id="dr-sub"></div>
            <div class="dojo-res-stats">
              <div class="dojo-rs"><div class="dojo-rs-val" id="dr-c">0</div><div class="dojo-rs-lbl">correct</div></div>
              <div class="dojo-rs"><div class="dojo-rs-val" id="dr-w">0</div><div class="dojo-rs-lbl">wrong</div></div>
              <div class="dojo-rs"><div class="dojo-rs-val" id="dr-x">0</div><div class="dojo-rs-lbl">XP</div></div>
            </div>
            <button class="dojo-start-btn" id="drill-retry">Try again</button>
            <button class="dojo-back-btn" id="drill-back">Back</button>
          </div>
        </div>
      </div>

      <!-- BOSS TAB -->
      <div id="dojo-boss" class="dojo-tab-content" style="display:none;">
        <div id="boss-idle" class="dojo-idle">
          <div class="dojo-idle-icon">🎯</div>
          <div class="dojo-idle-title">Boss Round</div>
          <div class="dojo-idle-sub">10 questions · 3 lives · Lose a life per wrong answer · Beat it for a badge</div>
          <button class="dojo-start-btn" id="boss-start-btn">Enter boss round</button>
        </div>
        <div id="boss-active" style="display:none;">
          <div class="dojo-boss-header">
            <div class="dojo-lives" id="boss-lives"></div>
            <div class="dojo-boss-qnum">Q <span id="boss-qnum">1</span>/10</div>
          </div>
          <div class="dojo-timer-track"><div class="dojo-timer-fill" id="boss-bar" style="width:0%"></div></div>
          <div class="dojo-qcard">
            <div class="dojo-qtag">Boss Round</div>
            <div class="dojo-qtext" id="boss-qtext"></div>
            <div class="dojo-opts" id="boss-opts"></div>
            <div class="dojo-explain" id="boss-explain"></div>
            <button class="dojo-next-btn" id="boss-next">Next →</button>
          </div>
        </div>
        <div id="boss-result" style="display:none;">
          <div class="dojo-result-card">
            <div class="dojo-res-emoji" id="br-emoji">🏆</div>
            <div class="dojo-res-title" id="br-title"></div>
            <div class="dojo-res-sub" id="br-sub"></div>
            <div class="dojo-res-stats">
              <div class="dojo-rs"><div class="dojo-rs-val" id="br-c">0</div><div class="dojo-rs-lbl">correct</div></div>
              <div class="dojo-rs"><div class="dojo-rs-val" id="br-l">0</div><div class="dojo-rs-lbl">lives left</div></div>
              <div class="dojo-rs"><div class="dojo-rs-val" id="br-x">0</div><div class="dojo-rs-lbl">XP</div></div>
            </div>
            <button class="dojo-start-btn" id="boss-retry">Try again</button>
            <button class="dojo-back-btn" id="boss-back">Back</button>
          </div>
        </div>
      </div>
    </div>
  `
}

export function setupSubnetDojo() {
  setupLearnTab()
  setupDrillTab()
  setupBossTab()
}

function setupLearnTab() {
  document.querySelectorAll('.dojo-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.dojo-tab').forEach(t => t.classList.remove('active'))
      document.querySelectorAll('.dojo-tab-content').forEach(c => c.style.display = 'none')
      tab.classList.add('active')
      document.getElementById('dojo-' + tab.dataset.tab).style.display = 'block'
    })
  })

  document.querySelectorAll('.dojo-lesson-item').forEach(item => {
    item.addEventListener('click', () => {
      const idx = item.dataset.idx
      const content = document.getElementById('dlc-' + idx)
      const isOpen = content.classList.contains('open')
      document.querySelectorAll('.dojo-lesson-content').forEach(c => c.classList.remove('open'))
      document.querySelectorAll('.dojo-lesson-item').forEach(i => i.classList.remove('active'))
      if (!isOpen) {
        content.classList.add('open')
        item.classList.add('active')
      }
    })
  })
}

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

function setupDrillTab() {
  let timer, time, correct, wrong, xp, answered, qs, qi

  document.getElementById('drill-start-btn').addEventListener('click', startDrill)

  function startDrill() {
    document.getElementById('drill-idle').style.display = 'none'
    document.getElementById('drill-result').style.display = 'none'
    document.getElementById('drill-active').style.display = 'block'
    time = 60; correct = 0; wrong = 0; xp = 0; answered = false
    qs = shuffle(QUESTIONS); qi = 0
    updateDrillStats()
    showDrillQ()
    clearInterval(timer)
    timer = setInterval(() => {
      time--
      document.getElementById('drill-timer').textContent = time
      document.getElementById('drill-bar').style.width = (time / 60 * 100) + '%'
      if (time <= 10) document.getElementById('drill-bar').style.background = '#E24B4A'
      if (time <= 0) { clearInterval(timer); endDrill() }
    }, 1000)
  }

  function showDrillQ() {
    answered = false
    const q = qs[qi % qs.length]
    document.getElementById('drill-qtag').textContent = 'Question ' + (qi + 1)
    document.getElementById('drill-qtext').textContent = q.q
    document.getElementById('drill-explain').className = 'dojo-explain'
    document.getElementById('drill-next').style.display = 'none'
    const op = document.getElementById('drill-opts')
    op.innerHTML = ''
    shuffle(q.opts.map((o, i) => ({ o, i }))).forEach(({ o, i }) => {
      const b = document.createElement('button')
      b.className = 'dojo-opt'
      b.textContent = o
      b.addEventListener('click', () => pickDrill(b, i, q))
      op.appendChild(b)
    })
  }

  function pickDrill(btn, chosen, q) {
    if (answered) return
    answered = true
    document.querySelectorAll('#drill-opts .dojo-opt').forEach(b => {
      b.disabled = true
      if (b.textContent === q.opts[q.ans]) b.classList.add('opt-ok')
      else if (b === btn && chosen !== q.ans) b.classList.add('opt-bad')
    })
    if (chosen === q.ans) { correct++; xp += 10 } else wrong++
    updateDrillStats()
    const ex = document.getElementById('drill-explain')
    ex.textContent = q.exp; ex.className = 'dojo-explain show'
    document.getElementById('drill-next').style.display = 'block'
  }

  function updateDrillStats() {
    document.getElementById('drill-correct').textContent = correct
    document.getElementById('drill-xp').textContent = xp
  }

  document.getElementById('drill-next').addEventListener('click', () => {
    qi++; if (qi >= qs.length) qs = shuffle(QUESTIONS)
    showDrillQ()
  })

  function endDrill() {
    document.getElementById('drill-active').style.display = 'none'
    document.getElementById('drill-result').style.display = 'block'
    document.getElementById('dr-emoji').textContent = correct >= 8 ? '🎉' : correct >= 4 ? '💪' : '📖'
    document.getElementById('dr-title').textContent = correct >= 8 ? 'Amazing speed!' : correct >= 4 ? 'Good effort!' : 'Keep drilling!'
    document.getElementById('dr-sub').textContent = 'You answered ' + (correct + wrong) + ' questions in 60 seconds.'
    document.getElementById('dr-c').textContent = correct
    document.getElementById('dr-w').textContent = wrong
    document.getElementById('dr-x').textContent = xp
  }

  document.getElementById('drill-retry').addEventListener('click', startDrill)
  document.getElementById('drill-back').addEventListener('click', () => {
    clearInterval(timer)
    document.getElementById('drill-active').style.display = 'none'
    document.getElementById('drill-result').style.display = 'none'
    document.getElementById('drill-idle').style.display = 'block'
    document.getElementById('drill-bar').style.background = '#639922'
  })
}

function setupBossTab() {
  let bossQS, bossQ, bossLives, bossCorrect, bossXP, bossAnswered

  document.getElementById('boss-start-btn').addEventListener('click', startBoss)

  function startBoss() {
    document.getElementById('boss-idle').style.display = 'none'
    document.getElementById('boss-result').style.display = 'none'
    document.getElementById('boss-active').style.display = 'block'
    bossQS = shuffle(QUESTIONS).slice(0, 10)
    bossQ = 0; bossLives = 3; bossCorrect = 0; bossXP = 0; bossAnswered = false
    renderLives()
    showBossQ()
  }

  function renderLives() {
    const el = document.getElementById('boss-lives')
    el.innerHTML = ''
    for (let i = 0; i < 3; i++) {
      const d = document.createElement('div')
      d.className = 'dojo-life' + (i >= bossLives ? ' lost' : '')
      d.textContent = i < bossLives ? '♥' : '✕'
      el.appendChild(d)
    }
  }

  function showBossQ() {
    bossAnswered = false
    const q = bossQS[bossQ]
    document.getElementById('boss-qnum').textContent = bossQ + 1
    document.getElementById('boss-bar').style.width = ((bossQ / 10) * 100) + '%'
    document.getElementById('boss-qtext').textContent = q.q
    document.getElementById('boss-explain').className = 'dojo-explain'
    document.getElementById('boss-next').style.display = 'none'
    const op = document.getElementById('boss-opts')
    op.innerHTML = ''
    shuffle(q.opts.map((o, i) => ({ o, i }))).forEach(({ o, i }) => {
      const b = document.createElement('button')
      b.className = 'dojo-opt'
      b.textContent = o
      b.addEventListener('click', () => pickBoss(b, i, q))
      op.appendChild(b)
    })
  }

  function pickBoss(btn, chosen, q) {
    if (bossAnswered) return
    bossAnswered = true
    const isRight = chosen === q.ans
    document.querySelectorAll('#boss-opts .dojo-opt').forEach(b => {
      b.disabled = true
      if (b.textContent === q.opts[q.ans]) b.classList.add('opt-ok')
      else if (b === btn && !isRight) b.classList.add('opt-bad')
    })
    if (isRight) { bossCorrect++; bossXP += 15 }
    else { bossLives--; renderLives() }
    document.getElementById('boss-explain').textContent = q.exp
    document.getElementById('boss-explain').className = 'dojo-explain show'
    document.getElementById('boss-next').style.display = 'block'
    if (bossLives <= 0) setTimeout(endBoss, 800)
  }

  document.getElementById('boss-next').addEventListener('click', () => {
    bossQ++
    if (bossQ >= 10 || bossLives <= 0) { endBoss(); return }
    showBossQ()
  })

  function endBoss() {
    document.getElementById('boss-active').style.display = 'none'
    document.getElementById('boss-result').style.display = 'block'
    const won = bossQ >= 9 && bossLives > 0
    document.getElementById('br-emoji').textContent = won ? '🏆' : bossLives <= 0 ? '💀' : '💪'
    document.getElementById('br-title').textContent = won ? 'Boss defeated! Badge earned!' : bossLives <= 0 ? 'You ran out of lives!' : 'Almost there!'
    document.getElementById('br-sub').textContent = won ? 'All 10 questions cleared without running out of lives!' : 'Got ' + bossCorrect + '/10. Try again to earn the badge!'
    document.getElementById('br-c').textContent = bossCorrect
    document.getElementById('br-l').textContent = bossLives
    document.getElementById('br-x').textContent = bossXP
  }

  document.getElementById('boss-retry').addEventListener('click', startBoss)
  document.getElementById('boss-back').addEventListener('click', () => {
    document.getElementById('boss-active').style.display = 'none'
    document.getElementById('boss-result').style.display = 'none'
    document.getElementById('boss-idle').style.display = 'block'
  })
}