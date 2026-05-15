import '../styles/topology.css'

export function topoHTML() {
  return `
    <div class="topo-wrap">
      <div class="topo-top">
        <div>
          <h1 class="dtitle">🗺️ Network Topology Builder</h1>
          <p class="dsub">Drag devices · Draw cables · Complete the task · Earn XP</p>
        </div>
        <div class="topo-xp-chip" id="topo-xp-chip">🏆 0 XP earned</div>
      </div>

      <div class="topo-toolbar">
        <span class="topo-tool-label">Add device</span>
        <div class="topo-device-btn" draggable="true" data-type="router">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="8" cy="8" r="6"/><circle cx="8" cy="8" r="2" fill="currentColor" stroke="none"/><line x1="8" y1="2" x2="8" y2="4"/><line x1="8" y1="12" x2="8" y2="14"/><line x1="2" y1="8" x2="4" y2="8"/><line x1="12" y1="8" x2="14" y2="8"/></svg>
          Router
        </div>
        <div class="topo-device-btn" draggable="true" data-type="switch">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="1" y="5" width="14" height="6" rx="1.5"/><circle cx="4" cy="8" r="1" fill="currentColor" stroke="none"/><circle cx="8" cy="8" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="8" r="1" fill="currentColor" stroke="none"/></svg>
          Switch
        </div>
        <div class="topo-device-btn" draggable="true" data-type="pc">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="2" y="2" width="12" height="9" rx="1"/><line x1="6" y1="11" x2="5" y2="14"/><line x1="10" y1="11" x2="11" y2="14"/><line x1="4" y1="14" x2="12" y2="14"/></svg>
          PC
        </div>
        <div class="topo-device-btn" draggable="true" data-type="server">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="2" y="2" width="12" height="4" rx="1"/><rect x="2" y="8" width="12" height="4" rx="1"/><circle cx="12" cy="4" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="10" r="1" fill="currentColor" stroke="none"/></svg>
          Server
        </div>
        <div class="topo-device-btn" draggable="true" data-type="firewall">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="2" y="3" width="12" height="10" rx="1"/><line x1="2" y1="7" x2="14" y2="7"/><line x1="6" y1="3" x2="6" y2="13"/><line x1="10" y1="3" x2="10" y2="13"/></svg>
          Firewall
        </div>
        <div class="topo-device-btn" draggable="true" data-type="ap">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="8" cy="11" r="2"/><path d="M4.5 8.5 a5 5 0 0 1 7 0"/><path d="M2.5 6.5 a8 8 0 0 1 11 0"/></svg>
          AP
        </div>
        <div class="topo-sep"></div>
        <button class="topo-mode-btn active" id="topo-move-btn">Move</button>
        <button class="topo-mode-btn" id="topo-cable-btn">Cable</button>
        <button class="topo-mode-btn" id="topo-delete-btn">Delete</button>
        <button class="topo-clear-btn" id="topo-clear-btn">Clear all</button>
      </div>

      <div class="topo-canvas-wrap" id="topo-canvas-wrap">
        <canvas id="topo-canvas"></canvas>
        <div class="topo-hint" id="topo-hint">Drag devices onto the canvas to get started</div>
      </div>

      <div class="topo-task-row">
        <div class="topo-task-tabs" id="topo-task-tabs">
          <button class="topo-task-tab active" data-task="0">
            <span class="tab-diff easy">Easy</span> Basic LAN
          </button>
          <button class="topo-task-tab" data-task="1">
            <span class="tab-diff easy">Easy</span> Star Topology
          </button>
          <button class="topo-task-tab" data-task="2">
            <span class="tab-diff medium">Med</span> Dual LAN
          </button>
          <button class="topo-task-tab" data-task="3">
            <span class="tab-diff medium">Med</span> Server Farm
          </button>
          <button class="topo-task-tab" data-task="4">
            <span class="tab-diff medium">Med</span> Secure Network
          </button>
          <button class="topo-task-tab" data-task="5">
            <span class="tab-diff medium">Med</span> Wireless LAN
          </button>
          <button class="topo-task-tab" data-task="6">
            <span class="tab-diff hard">Hard</span> Enterprise Edge
          </button>
          <button class="topo-task-tab" data-task="7">
            <span class="tab-diff hard">Hard</span> DMZ Setup
          </button>
        </div>
      </div>

      <div class="topo-task-card" id="topo-task-card">
        <div class="topo-task-icon">📋</div>
        <div class="topo-task-info">
          <div class="topo-task-title" id="topo-task-title">Build a basic LAN</div>
          <div class="topo-task-desc" id="topo-task-desc">Place 1 router, 1 switch, and 2 PCs. Connect them all with cables.</div>
        </div>
        <div class="topo-task-xp" id="topo-task-xp">+25 XP</div>
        <button class="topo-check-btn" id="topo-check-btn">Check ✓</button>
      </div>

      <div class="topo-feedback" id="topo-feedback"></div>
    </div>
  `
}

export function setupTopo() {
  const canvas = document.getElementById('topo-canvas')
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  const wrap = document.getElementById('topo-canvas-wrap')

  function resizeCanvas() {
    const rect = wrap.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height
    draw()
  }

  requestAnimationFrame(() => {
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
  })

  function getPos(e) {
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    }
  }

  const TASKS = [
    // ── EASY ──────────────────────────────────────────────────────────────────
    {
      title: 'Build a Basic LAN',
      desc: 'Place 1 router, 1 switch, and 2 PCs. Connect them all with cables.',
      xp: 25,
      difficulty: 'easy',
      check: (devices, connections) => {
        const c = getCounts(devices)
        if ((c.router || 0) < 1) return { ok: false, msg: 'Missing a router. Add at least 1 router.' }
        if ((c.switch || 0) < 1) return { ok: false, msg: 'Missing a switch. Add at least 1 switch.' }
        if ((c.pc || 0) < 2)    return { ok: false, msg: 'Add at least 2 PCs as end devices.' }
        if (!allConnected(devices, connections)) return { ok: false, msg: 'Some devices have no cables. Connect everything.' }
        return { ok: true, msg: 'Basic LAN complete! Router → Switch → PCs. Classic LAN structure. +25 XP!' }
      }
    },
    {
      title: 'Build a Star Topology',
      desc: 'Place 1 switch in the center and connect at least 4 PCs to it (no router needed).',
      xp: 30,
      difficulty: 'easy',
      check: (devices, connections) => {
        const c = getCounts(devices)
        if ((c.switch || 0) < 1) return { ok: false, msg: 'Add a switch as the center of the star.' }
        if ((c.pc || 0) < 4)    return { ok: false, msg: 'Add at least 4 PCs.' }
        const sw = devices.find(d => d.type === 'switch')
        const swConns = connections.filter(cn => cn.a === sw.id || cn.b === sw.id).length
        if (swConns < 4) return { ok: false, msg: 'Connect at least 4 devices directly to the switch.' }
        return { ok: true, msg: 'Star topology complete! All PCs connect through one central switch. +30 XP!' }
      }
    },

    // ── MEDIUM ────────────────────────────────────────────────────────────────
    {
      title: 'Router Connecting 2 LANs',
      desc: 'Place 1 router, 2 switches, and 2 PCs per switch. Connect each switch to the router.',
      xp: 35,
      difficulty: 'medium',
      check: (devices, connections) => {
        const c = getCounts(devices)
        if ((c.router || 0) < 1) return { ok: false, msg: 'Add a router to connect the two LANs.' }
        if ((c.switch || 0) < 2) return { ok: false, msg: 'Add 2 switches — one for each LAN segment.' }
        if ((c.pc || 0) < 4)    return { ok: false, msg: 'Add at least 4 PCs (2 per LAN).' }
        const router = devices.find(d => d.type === 'router')
        const routerConns = connections.filter(cn => cn.a === router.id || cn.b === router.id).length
        if (routerConns < 2) return { ok: false, msg: 'The router must connect to both switches.' }
        if (!allConnected(devices, connections)) return { ok: false, msg: 'Connect all devices with cables.' }
        return { ok: true, msg: 'Inter-LAN routing complete! The router bridges two separate LANs. +35 XP!' }
      }
    },
    {
      title: 'Server Farm',
      desc: 'Place 1 router, 1 switch, 3 servers, and 2 PCs. Connect them all. Servers should connect through the switch.',
      xp: 35,
      difficulty: 'medium',
      check: (devices, connections) => {
        const c = getCounts(devices)
        if ((c.router || 0) < 1)  return { ok: false, msg: 'Add a router.' }
        if ((c.switch || 0) < 1)  return { ok: false, msg: 'Add a switch to connect the servers.' }
        if ((c.server || 0) < 3)  return { ok: false, msg: 'Add at least 3 servers.' }
        if ((c.pc || 0) < 2)      return { ok: false, msg: 'Add at least 2 PCs as clients.' }
        const sw = devices.find(d => d.type === 'switch')
        const servers = devices.filter(d => d.type === 'server')
        const serversThroughSwitch = servers.filter(s =>
          connections.some(cn => cn.a === s.id || cn.b === s.id)
        ).length
        if (serversThroughSwitch < 3) return { ok: false, msg: 'Connect all 3 servers to the switch.' }
        if (!allConnected(devices, connections)) return { ok: false, msg: 'Connect all devices with cables.' }
        return { ok: true, msg: 'Server farm complete! Clients access servers through a dedicated switch. +35 XP!' }
      }
    },
    {
      title: 'Secure Network with Firewall',
      desc: 'Place 1 firewall between the router and your internal switch. Add 1 router, 1 firewall, 1 switch, and 3 PCs. The firewall must connect to both the router and the switch.',
      xp: 40,
      difficulty: 'medium',
      check: (devices, connections) => {
        const c = getCounts(devices)
        if ((c.router   || 0) < 1)   return { ok: false, msg: 'Add a router (simulates internet uplink).' }
        if ((c.firewall || 0) < 1)   return { ok: false, msg: 'Add a firewall — this is the core of the task!' }
        if ((c.switch   || 0) < 1)   return { ok: false, msg: 'Add a switch for the internal LAN.' }
        if ((c.pc       || 0) < 3)   return { ok: false, msg: 'Add at least 3 PCs behind the firewall.' }
        const fw  = devices.find(d => d.type === 'firewall')
        const fwConns = connections.filter(cn => cn.a === fw.id || cn.b === fw.id).length
        if (fwConns < 2) return { ok: false, msg: 'The firewall must connect to the router AND the internal switch.' }
        if (!allConnected(devices, connections)) return { ok: false, msg: 'Connect all devices with cables.' }
        return { ok: true, msg: 'Secure network complete! Firewall sits between WAN and LAN — textbook perimeter security. +40 XP!' }
      }
    },
    {
      title: 'Wireless LAN (WLAN)',
      desc: 'Place 1 router, 1 switch, 2 access points (AP), and 3 PCs. Each AP must connect to the switch.',
      xp: 40,
      difficulty: 'medium',
      check: (devices, connections) => {
        const c = getCounts(devices)
        if ((c.router || 0) < 1) return { ok: false, msg: 'Add a router for WAN/DHCP.' }
        if ((c.switch || 0) < 1) return { ok: false, msg: 'Add a switch to backhaul the APs.' }
        if ((c.ap     || 0) < 2) return { ok: false, msg: 'Add at least 2 Access Points.' }
        if ((c.pc     || 0) < 3) return { ok: false, msg: 'Add at least 3 PCs (wireless clients).' }
        const aps = devices.filter(d => d.type === 'ap')
        const apConnected = aps.every(ap =>
          connections.some(cn => cn.a === ap.id || cn.b === ap.id)
        )
        if (!apConnected) return { ok: false, msg: 'Both APs must be connected to the switch via cable (wired backhaul).' }
        if (!allConnected(devices, connections)) return { ok: false, msg: 'Connect all devices with cables.' }
        return { ok: true, msg: 'WLAN complete! APs wired to switch provides wireless coverage across two zones. +40 XP!' }
      }
    },

    // ── HARD ──────────────────────────────────────────────────────────────────
    {
      title: 'Enterprise Edge Network',
      desc: 'Build a 3-tier network: 1 core router → 2 distribution switches → each distribution switch connects to 2 access switches → each access switch connects to 2 PCs. Place 1 server off one distribution switch.',
      xp: 60,
      difficulty: 'hard',
      check: (devices, connections) => {
        const c = getCounts(devices)
        if ((c.router || 0) < 1)  return { ok: false, msg: 'Add 1 core router at the top.' }
        if ((c.switch || 0) < 6)  return { ok: false, msg: 'Need at least 6 switches: 2 distribution + 4 access layer switches.' }
        if ((c.pc     || 0) < 8)  return { ok: false, msg: 'Add at least 8 PCs (2 per access switch).' }
        if ((c.server || 0) < 1)  return { ok: false, msg: 'Add at least 1 server connected to a distribution switch.' }
        const router = devices.find(d => d.type === 'router')
        const routerConns = connections.filter(cn => cn.a === router.id || cn.b === router.id).length
        if (routerConns < 2) return { ok: false, msg: 'Core router must connect to both distribution switches.' }
        if (!allConnected(devices, connections)) return { ok: false, msg: 'Connect all devices. No isolated nodes allowed.' }
        return { ok: true, msg: 'Enterprise 3-tier topology complete! Core → Distribution → Access is how real campuses are built. +60 XP!' }
      }
    },
    {
      title: 'DMZ (Demilitarized Zone)',
      desc: 'Build a DMZ: 1 router connects to 2 firewalls. One firewall protects the DMZ (1 server). The other protects the internal LAN (1 switch + 3 PCs). The DMZ server is accessible from outside; internal PCs are not.',
      xp: 60,
      difficulty: 'hard',
      check: (devices, connections) => {
        const c = getCounts(devices)
        if ((c.router   || 0) < 1) return { ok: false, msg: 'Add a router (represents the internet edge).' }
        if ((c.firewall || 0) < 2) return { ok: false, msg: 'Need 2 firewalls: one for the DMZ, one for the internal LAN.' }
        if ((c.server   || 0) < 1) return { ok: false, msg: 'Add at least 1 server in the DMZ.' }
        if ((c.switch   || 0) < 1) return { ok: false, msg: 'Add a switch for the internal LAN behind the second firewall.' }
        if ((c.pc       || 0) < 3) return { ok: false, msg: 'Add at least 3 PCs on the internal LAN.' }
        const router = devices.find(d => d.type === 'router')
        const routerConns = connections.filter(cn => cn.a === router.id || cn.b === router.id).length
        if (routerConns < 2) return { ok: false, msg: 'Router must connect to both firewalls (one per zone).' }
        const firewalls = devices.filter(d => d.type === 'firewall')
        const bothFwConnected = firewalls.every(fw =>
          connections.filter(cn => cn.a === fw.id || cn.b === fw.id).length >= 2
        )
        if (!bothFwConnected) return { ok: false, msg: 'Each firewall must connect to the router AND its zone (server or switch).' }
        if (!allConnected(devices, connections)) return { ok: false, msg: 'Connect all devices with cables.' }
        return { ok: true, msg: 'DMZ setup complete! Public servers in the DMZ, private LAN behind the second firewall — enterprise-grade security design. +60 XP!' }
      }
    }
  ]

  let devices = [], connections = [], mode = 'move'
  let dragging = null, dragOffX = 0, dragOffY = 0
  let cableFrom = null, nextId = 1, currentTask = 0
  let mouseX = 0, mouseY = 0, totalXp = 0
  const completedTasks = new Set()

  const COLORS = {
    router:   '#1C4B62',
    switch:   '#27500A',
    pc:       '#633806',
    server:   '#3C3489',
    firewall: '#7B1E1E',
    ap:       '#1A5C5C'
  }
  const LABELS = {
    router:   'Router',
    switch:   'Switch',
    pc:       'PC',
    server:   'Server',
    firewall: 'FW',
    ap:       'AP'
  }

  function getCounts(devs) {
    const c = {}
    devs.forEach(d => c[d.type] = (c[d.type] || 0) + 1)
    return c
  }

  function allConnected(devs, conns) {
    return devs.every(d => conns.some(c => c.a === d.id || c.b === d.id))
  }

  function updateTaskUI() {
    const t = TASKS[currentTask]
    document.getElementById('topo-task-title').textContent = t.title
    document.getElementById('topo-task-desc').textContent = t.desc
    document.getElementById('topo-task-xp').textContent = `+${t.xp} XP`
    document.getElementById('topo-feedback').className = 'topo-feedback'
  }

  // Drag from toolbar onto canvas
  document.querySelectorAll('.topo-device-btn').forEach(btn => {
    btn.addEventListener('dragstart', e => {
      e.dataTransfer.setData('type', btn.dataset.type)
    })
  })

  wrap.addEventListener('dragover', e => e.preventDefault())
  wrap.addEventListener('drop', e => {
    e.preventDefault()
    const type = e.dataTransfer.getData('type')
    if (!type) return
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    const x = Math.max(30, Math.min(canvas.width - 30, (e.clientX - rect.left) * scaleX))
    const y = Math.max(30, Math.min(canvas.height - 30, (e.clientY - rect.top) * scaleY))
    const id = nextId++
    devices.push({ id, type, x, y, name: LABELS[type] + ' ' + id })
    document.getElementById('topo-hint').style.display = 'none'
    draw()
  })

  function setMode(m) {
    mode = m
    cableFrom = null
    document.getElementById('topo-move-btn').classList.toggle('active', m === 'move')
    document.getElementById('topo-cable-btn').classList.toggle('active', m === 'cable')
    document.getElementById('topo-delete-btn').classList.toggle('active', m === 'delete')
    const hints = {
      move:   'Drag devices to reposition them',
      cable:  'Click a device to start a cable, then click another to connect',
      delete: 'Click a device or cable to delete it'
    }
    const hintEl = document.getElementById('topo-hint')
    hintEl.textContent = hints[m]
    hintEl.style.display = 'block'
    setTimeout(() => { hintEl.style.display = 'none' }, 2000)
    draw()
  }

  document.getElementById('topo-move-btn').addEventListener('click',   () => setMode('move'))
  document.getElementById('topo-cable-btn').addEventListener('click',  () => setMode('cable'))
  document.getElementById('topo-delete-btn').addEventListener('click', () => setMode('delete'))
  document.getElementById('topo-clear-btn').addEventListener('click',  () => {
    devices = []; connections = []; cableFrom = null
    document.getElementById('topo-feedback').className = 'topo-feedback'
    const hintEl = document.getElementById('topo-hint')
    hintEl.style.display = 'block'
    hintEl.textContent = 'Drag devices onto the canvas to get started'
    draw()
  })

  document.querySelectorAll('.topo-task-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.topo-task-tab').forEach(t => t.classList.remove('active'))
      tab.classList.add('active')
      currentTask = parseInt(tab.dataset.task)
      devices = []; connections = []; cableFrom = null
      updateTaskUI()
      draw()
    })
  })

  document.getElementById('topo-check-btn').addEventListener('click', () => {
    const task   = TASKS[currentTask]
    const result = task.check(devices, connections)
    const fb     = document.getElementById('topo-feedback')
    fb.className = 'topo-feedback ' + (result.ok ? 'ok' : 'err')
    fb.textContent = result.ok ? '✅ ' + result.msg : '❌ ' + result.msg

    if (result.ok && !completedTasks.has(currentTask)) {
      completedTasks.add(currentTask)
      totalXp += task.xp
      document.getElementById('topo-xp-chip').textContent = `🏆 ${totalXp} XP earned`
      // Mark tab as completed
      const tab = document.querySelector(`.topo-task-tab[data-task="${currentTask}"]`)
      if (tab) tab.classList.add('done')
    }
  })

  function getDeviceAt(x, y) {
    for (let i = devices.length - 1; i >= 0; i--) {
      if (Math.hypot(x - devices[i].x, y - devices[i].y) < 26) return devices[i]
    }
    return null
  }

  function getConnectionAt(x, y) {
    return connections.find(c => {
      const a = devices.find(d => d.id === c.a)
      const b = devices.find(d => d.id === c.b)
      if (!a || !b) return false
      return pointToSegment(x, y, a.x, a.y, b.x, b.y) < 8
    })
  }

  function pointToSegment(px, py, ax, ay, bx, by) {
    const dx = bx - ax, dy = by - ay
    const len2 = dx * dx + dy * dy
    if (len2 === 0) return Math.hypot(px - ax, py - ay)
    const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / len2))
    return Math.hypot(px - (ax + t * dx), py - (ay + t * dy))
  }

  canvas.addEventListener('mousemove', e => {
    const pos = getPos(e)
    mouseX = pos.x; mouseY = pos.y

    if (dragging) {
      dragging.x = Math.max(28, Math.min(canvas.width  - 28, mouseX - dragOffX))
      dragging.y = Math.max(28, Math.min(canvas.height - 28, mouseY - dragOffY))
    }
    draw()

    if (mode === 'cable' && cableFrom) {
      ctx.beginPath()
      ctx.moveTo(cableFrom.x, cableFrom.y)
      ctx.lineTo(mouseX, mouseY)
      ctx.strokeStyle = '#378ADD'
      ctx.lineWidth = 1.5
      ctx.setLineDash([5, 4])
      ctx.stroke()
      ctx.setLineDash([])
    }
  })

  canvas.addEventListener('mousedown', e => {
    const pos = getPos(e)
    const x = pos.x, y = pos.y
    const hit = getDeviceAt(x, y)

    if (mode === 'move') {
      if (hit) {
        dragging = hit
        dragOffX = x - hit.x
        dragOffY = y - hit.y
        canvas.style.cursor = 'grabbing'
      }
    } else if (mode === 'cable') {
      if (hit) {
        if (!cableFrom) {
          cableFrom = hit
        } else if (cableFrom.id !== hit.id) {
          const exists = connections.find(c =>
            (c.a === cableFrom.id && c.b === hit.id) ||
            (c.a === hit.id && c.b === cableFrom.id)
          )
          if (!exists) connections.push({ a: cableFrom.id, b: hit.id })
          cableFrom = null
          draw()
        }
      } else {
        cableFrom = null; draw()
      }
    } else if (mode === 'delete') {
      if (hit) {
        devices = devices.filter(d => d.id !== hit.id)
        connections = connections.filter(c => c.a !== hit.id && c.b !== hit.id)
        draw()
      } else {
        const conn = getConnectionAt(x, y)
        if (conn) { connections = connections.filter(c => c !== conn); draw() }
      }
    }
  })

  canvas.addEventListener('mouseup', () => {
    dragging = null
    canvas.style.cursor = 'default'
  })

  // Touch support for mobile
  canvas.addEventListener('touchstart', e => {
    e.preventDefault()
    const touch = e.touches[0]
    canvas.dispatchEvent(new MouseEvent('mousedown', { clientX: touch.clientX, clientY: touch.clientY }))
  }, { passive: false })
  canvas.addEventListener('touchmove', e => {
    e.preventDefault()
    const touch = e.touches[0]
    canvas.dispatchEvent(new MouseEvent('mousemove', { clientX: touch.clientX, clientY: touch.clientY }))
  }, { passive: false })
  canvas.addEventListener('touchend', e => {
    e.preventDefault()
    canvas.dispatchEvent(new MouseEvent('mouseup', {}))
  }, { passive: false })

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw connections
    connections.forEach(c => {
      const a = devices.find(d => d.id === c.a)
      const b = devices.find(d => d.id === c.b)
      if (!a || !b) return
      ctx.beginPath()
      ctx.moveTo(a.x, a.y)
      ctx.lineTo(b.x, b.y)
      ctx.strokeStyle = '#B4B2A9'
      ctx.lineWidth = 2
      ctx.setLineDash([])
      ctx.stroke()
    })

    // Draw devices
    devices.forEach(d => {
      const isSelected = cableFrom && cableFrom.id === d.id
      ctx.beginPath()
      ctx.arc(d.x, d.y, 22, 0, Math.PI * 2)
      ctx.fillStyle = isSelected ? COLORS[d.type] : '#fff'
      ctx.fill()
      ctx.strokeStyle = COLORS[d.type]
      ctx.lineWidth = isSelected ? 3 : 2
      ctx.stroke()
      drawIcon(d.type, d.x, d.y, isSelected ? '#fff' : COLORS[d.type])
      ctx.fillStyle = '#444'
      ctx.font = '500 11px system-ui'
      ctx.textAlign = 'center'
      ctx.fillText(d.name, d.x, d.y + 36)
    })
  }

  function drawIcon(type, x, y, color) {
    ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = 1.5
    if (type === 'router') {
      ctx.beginPath(); ctx.arc(x, y, 8, 0, Math.PI * 2); ctx.stroke()
      ctx.beginPath(); ctx.arc(x, y, 2.5, 0, Math.PI * 2); ctx.fill()
      ;[[0,-8],[0,8],[-8,0],[8,0]].forEach(([dx,dy]) => {
        ctx.beginPath(); ctx.moveTo(x+dx*0.5,y+dy*0.5); ctx.lineTo(x+dx,y+dy); ctx.stroke()
      })
    } else if (type === 'switch') {
      ctx.strokeRect(x-9,y-4,18,8)
      ;[-4,0,4].forEach(ox => { ctx.beginPath(); ctx.arc(x+ox,y,1.5,0,Math.PI*2); ctx.fill() })
    } else if (type === 'pc') {
      ctx.strokeRect(x-8,y-7,16,10)
      ctx.beginPath()
      ctx.moveTo(x-4,y+3); ctx.lineTo(x-5,y+7)
      ctx.moveTo(x+4,y+3); ctx.lineTo(x+5,y+7)
      ctx.moveTo(x-6,y+7); ctx.lineTo(x+6,y+7)
      ctx.stroke()
    } else if (type === 'server') {
      ctx.strokeRect(x-8,y-7,16,5); ctx.strokeRect(x-8,y,16,5)
      ctx.beginPath(); ctx.arc(x+5,y-4.5,1.5,0,Math.PI*2); ctx.fill()
      ctx.beginPath(); ctx.arc(x+5,y+2.5,1.5,0,Math.PI*2); ctx.fill()
    } else if (type === 'firewall') {
      ctx.strokeRect(x-9,y-7,18,14)
      ctx.beginPath(); ctx.moveTo(x-9,y); ctx.lineTo(x+9,y); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(x-3,y-7); ctx.lineTo(x-3,y+7); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(x+3,y-7); ctx.lineTo(x+3,y+7); ctx.stroke()
    } else if (type === 'ap') {
      ctx.beginPath(); ctx.arc(x,y+3,3,0,Math.PI*2); ctx.stroke()
      ctx.beginPath()
      ctx.arc(x,y+3,7,Math.PI*1.2,Math.PI*1.8,false)
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(x,y+3,11,Math.PI*1.25,Math.PI*1.75,false)
      ctx.stroke()
    }
  }

  updateTaskUI()
  draw()
}