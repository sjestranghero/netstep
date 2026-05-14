import '../styles/topology.css'

export function topoHTML() {
  return `
    <div class="topo-wrap">
      <div class="topo-top">
        <div>
          <h1 class="dtitle">🗺️ Network Topology Builder</h1>
          <p class="dsub">Drag devices · Draw cables · Complete the task · Earn XP</p>
        </div>
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
          <button class="topo-task-tab active" data-task="0">Basic LAN</button>
          <button class="topo-task-tab" data-task="1">Star topology</button>
          <button class="topo-task-tab" data-task="2">Router + 2 LANs</button>
          <button class="topo-task-tab" data-task="3">Server farm</button>
        </div>
      </div>

      <div class="topo-task-card" id="topo-task-card">
        <div class="topo-task-icon">📋</div>
        <div class="topo-task-info">
          <div class="topo-task-title" id="topo-task-title">Build a basic LAN</div>
          <div class="topo-task-desc" id="topo-task-desc">Place 1 router, 1 switch, and 2 PCs. Connect them all with cables.</div>
        </div>
        <button class="topo-check-btn" id="topo-check-btn">Check</button>
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

  // KEY FIX: sync canvas internal size to its displayed size
  function resizeCanvas() {
    const rect = wrap.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height
    draw()
  }

  // Run after layout is ready
  requestAnimationFrame(() => {
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
  })

  // KEY FIX: always get mouse position relative to canvas actual size
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
    {
      title: 'Build a basic LAN',
      desc: 'Place 1 router, 1 switch, and 2 PCs. Connect them all with cables.',
      check: (devices, connections) => {
        const counts = getCounts(devices)
        if ((counts.router || 0) < 1) return { ok: false, msg: 'Missing a router! Add at least 1 router.' }
        if ((counts.switch || 0) < 1) return { ok: false, msg: 'Missing a switch! Add at least 1 switch.' }
        if ((counts.pc || 0) < 2) return { ok: false, msg: 'Add at least 2 PCs as end devices.' }
        if (!allConnected(devices, connections)) return { ok: false, msg: 'Some devices have no cables! Connect everything.' }
        return { ok: true, msg: 'Basic LAN complete! Router → Switch → PCs. +25 XP earned!' }
      }
    },
    {
      title: 'Build a star topology',
      desc: 'Place 1 switch in the center and connect at least 4 PCs to it.',
      check: (devices, connections) => {
        const counts = getCounts(devices)
        if ((counts.switch || 0) < 1) return { ok: false, msg: 'Add a switch as the center of your star topology.' }
        if ((counts.pc || 0) < 4) return { ok: false, msg: 'Add at least 4 PCs connected to the switch.' }
        const sw = devices.find(d => d.type === 'switch')
        const swConns = connections.filter(c => c.a === sw.id || c.b === sw.id).length
        if (swConns < 4) return { ok: false, msg: 'Connect at least 4 devices to the switch.' }
        return { ok: true, msg: 'Star topology complete! All PCs connect to one central switch. +30 XP!' }
      }
    },
    {
      title: 'Router connecting 2 LANs',
      desc: 'Place 1 router, 2 switches, and 2 PCs per switch. Connect each switch to the router.',
      check: (devices, connections) => {
        const counts = getCounts(devices)
        if ((counts.router || 0) < 1) return { ok: false, msg: 'Add a router to connect the two LANs.' }
        if ((counts.switch || 0) < 2) return { ok: false, msg: 'Add 2 switches — one for each LAN.' }
        if ((counts.pc || 0) < 4) return { ok: false, msg: 'Add at least 4 PCs (2 per LAN).' }
        if (!allConnected(devices, connections)) return { ok: false, msg: 'Connect all devices with cables.' }
        return { ok: true, msg: 'Inter-LAN routing setup complete! Router connects two separate LANs. +35 XP!' }
      }
    },
    {
      title: 'Server farm',
      desc: 'Place 1 router, 1 switch, 2 servers, and 1 PC. Connect them all.',
      check: (devices, connections) => {
        const counts = getCounts(devices)
        if ((counts.router || 0) < 1) return { ok: false, msg: 'Add a router to the topology.' }
        if ((counts.switch || 0) < 1) return { ok: false, msg: 'Add a switch to connect the servers.' }
        if ((counts.server || 0) < 2) return { ok: false, msg: 'Add at least 2 servers.' }
        if ((counts.pc || 0) < 1) return { ok: false, msg: 'Add at least 1 PC as a client.' }
        if (!allConnected(devices, connections)) return { ok: false, msg: 'Connect all devices with cables.' }
        return { ok: true, msg: 'Server farm topology complete! Clients access servers through the switch. +30 XP!' }
      }
    }
  ]

  let devices = [], connections = [], mode = 'move'
  let dragging = null, dragOffX = 0, dragOffY = 0
  let cableFrom = null, nextId = 1, currentTask = 0
  let mouseX = 0, mouseY = 0

  const COLORS = { router: '#1C4B62', switch: '#27500A', pc: '#633806', server: '#3C3489' }
  const LABELS = { router: 'Router', switch: 'Switch', pc: 'PC', server: 'Server' }

  function getCounts(devs) {
    const c = {}
    devs.forEach(d => c[d.type] = (c[d.type] || 0) + 1)
    return c
  }

  function allConnected(devs, conns) {
    return devs.every(d => conns.some(c => c.a === d.id || c.b === d.id))
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
      move: 'Drag devices to reposition them',
      cable: 'Click a device to start a cable, then click another to connect',
      delete: 'Click a device or cable to delete it'
    }
    document.getElementById('topo-hint').textContent = hints[m]
    document.getElementById('topo-hint').style.display = 'block'
    setTimeout(() => { document.getElementById('topo-hint').style.display = 'none' }, 2000)
    draw()
  }

  document.getElementById('topo-move-btn').addEventListener('click', () => setMode('move'))
  document.getElementById('topo-cable-btn').addEventListener('click', () => setMode('cable'))
  document.getElementById('topo-delete-btn').addEventListener('click', () => setMode('delete'))
  document.getElementById('topo-clear-btn').addEventListener('click', () => {
    devices = []; connections = []; cableFrom = null
    document.getElementById('topo-feedback').className = 'topo-feedback'
    document.getElementById('topo-hint').style.display = 'block'
    document.getElementById('topo-hint').textContent = 'Drag devices onto the canvas to get started'
    draw()
  })

  document.querySelectorAll('.topo-task-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.topo-task-tab').forEach(t => t.classList.remove('active'))
      tab.classList.add('active')
      currentTask = parseInt(tab.dataset.task)
      const t = TASKS[currentTask]
      document.getElementById('topo-task-title').textContent = t.title
      document.getElementById('topo-task-desc').textContent = t.desc
      document.getElementById('topo-feedback').className = 'topo-feedback'
      devices = []; connections = []; cableFrom = null; draw()
    })
  })

  document.getElementById('topo-check-btn').addEventListener('click', () => {
    const result = TASKS[currentTask].check(devices, connections)
    const fb = document.getElementById('topo-feedback')
    fb.className = 'topo-feedback ' + (result.ok ? 'ok' : 'err')
    fb.textContent = result.ok ? '✅ ' + result.msg : '❌ ' + result.msg
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
    mouseX = pos.x
    mouseY = pos.y

    if (dragging) {
      dragging.x = Math.max(28, Math.min(canvas.width - 28, mouseX - dragOffX))
      dragging.y = Math.max(28, Math.min(canvas.height - 28, mouseY - dragOffY))
    }
    draw()

    // Draw live cable preview
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
        cableFrom = null
        draw()
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
    }
  }

  draw()
}