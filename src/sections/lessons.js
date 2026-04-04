const LESSONS = [
  {
    id: 'osi',
    title: 'The OSI Model',
    topic: 'Network Fundamentals',
    duration: '8 min read',
    icon: '🗂️',
    color: '#E3EDF2',
    content: [
      {
        type: 'intro',
        text: 'The OSI (Open Systems Interconnection) model is a conceptual framework that standardizes how different network systems communicate. It has 7 layers, each with a specific job.'
      },
      {
        type: 'visual-osi',
      },
      {
        type: 'heading', text: 'The 7 Layers — Top to Bottom'
      },
      {
        type: 'layerlist',
        layers: [
          { num: 7, name: 'Application', color: '#FDECEA', desc: 'User-facing layer. HTTP, FTP, DNS, SMTP live here.', example: 'Your browser sending an HTTP request' },
          { num: 6, name: 'Presentation', color: '#FFF3D6', desc: 'Data formatting, encryption, compression. SSL/TLS.', example: 'Encrypting your login password with TLS' },
          { num: 5, name: 'Session', color: '#E8F5E9', desc: 'Manages sessions and connections between apps.', example: 'Maintaining a login session on a website' },
          { num: 4, name: 'Transport', color: '#E3EDF2', desc: 'End-to-end delivery. TCP (reliable) and UDP (fast).', example: 'TCP ensuring your file download is complete' },
          { num: 3, name: 'Network', color: '#EDE7F6', desc: 'Logical addressing and routing. IP addresses live here.', example: 'Your router forwarding a packet to 8.8.8.8' },
          { num: 2, name: 'Data Link', color: '#FFF3D6', desc: 'MAC addresses, frames, switches operate here.', example: 'A switch forwarding a frame by MAC address' },
          { num: 1, name: 'Physical', color: '#FDECEA', desc: 'Raw bits over cables, fiber, or wireless signals.', example: 'Electrical signals traveling through an Ethernet cable' },
        ]
      },
      {
        type: 'tip',
        text: '💡 Memory trick: "All People Seem To Need Data Processing" — Application, Presentation, Session, Transport, Network, Data Link, Physical.'
      }
    ]
  },
  {
    id: 'ip',
    title: 'IP Addressing & Subnetting',
    topic: 'Network Fundamentals',
    duration: '10 min read',
    icon: '🔢',
    color: '#FFF3D6',
    content: [
      {
        type: 'intro',
        text: 'An IP address is a unique identifier for a device on a network. IPv4 addresses are 32 bits long, written as four octets separated by dots — like 192.168.1.1.'
      },
      {
        type: 'heading', text: 'IP Address Classes'
      },
      {
        type: 'table',
        headers: ['Class', 'Range', 'Default Subnet Mask', 'Used For'],
        rows: [
          ['A', '1.0.0.0 – 126.255.255.255', '255.0.0.0 /8', 'Large networks'],
          ['B', '128.0.0.0 – 191.255.255.255', '255.255.0.0 /16', 'Medium networks'],
          ['C', '192.0.0.0 – 223.255.255.255', '255.255.255.0 /24', 'Small networks'],
          ['D', '224.0.0.0 – 239.255.255.255', 'N/A', 'Multicast'],
        ]
      },
      {
        type: 'heading', text: 'Subnetting in Plain English'
      },
      {
        type: 'text',
        text: 'Subnetting divides a large network into smaller sub-networks. This improves performance and security. A subnet mask tells you which part of the IP is the network and which part is the host.'
      },
      {
        type: 'visual-subnet'
      },
      {
        type: 'tip',
        text: '💡 Quick CIDR trick: /24 = 256 addresses (254 usable), /25 = 128 addresses (126 usable), /26 = 64 addresses (62 usable). Each step halves the hosts.'
      }
    ]
  },
  {
    id: 'tcp-udp',
    title: 'TCP vs UDP',
    topic: 'Transport Layer',
    duration: '6 min read',
    icon: '📦',
    color: '#E8F5E9',
    content: [
      {
        type: 'intro',
        text: 'TCP and UDP are the two main transport layer protocols. They both move data but in very different ways. Choosing the right one depends on whether you need reliability or speed.'
      },
      {
        type: 'visual-tcpudp'
      },
      {
        type: 'heading', text: 'Side by Side Comparison'
      },
      {
        type: 'table',
        headers: ['Feature', 'TCP', 'UDP'],
        rows: [
          ['Connection', 'Connection-oriented (3-way handshake)', 'Connectionless'],
          ['Reliability', 'Guaranteed delivery', 'No guarantee'],
          ['Speed', 'Slower (overhead)', 'Faster (no overhead)'],
          ['Order', 'Packets arrive in order', 'No ordering'],
          ['Use cases', 'HTTP, FTP, Email, SSH', 'DNS, VoIP, Video streaming, Gaming'],
        ]
      },
      {
        type: 'tip',
        text: '💡 Think of TCP as a phone call (you know the other person got your message) and UDP as a radio broadcast (you send it out and hope someone hears it).'
      }
    ]
  },
  {
    id: 'vlans',
    title: 'VLANs & Trunking',
    topic: 'Switching',
    duration: '7 min read',
    icon: '🔀',
    color: '#EDE7F6',
    content: [
      {
        type: 'intro',
        text: 'A VLAN (Virtual LAN) logically separates a physical network into multiple broadcast domains. Devices in different VLANs cannot communicate directly without a router or Layer 3 switch.'
      },
      {
        type: 'heading', text: 'Why Use VLANs?'
      },
      {
        type: 'bullets',
        items: [
          '🔒 Security — isolate sensitive departments (e.g. Finance VLAN)',
          '⚡ Performance — reduce broadcast traffic per segment',
          '🏗️ Flexibility — group devices by function, not location',
          '💰 Cost savings — one physical switch, multiple logical networks'
        ]
      },
      {
        type: 'heading', text: 'Access vs Trunk Ports'
      },
      {
        type: 'table',
        headers: ['Port Type', 'Carries', 'Used For'],
        rows: [
          ['Access Port', 'Traffic from ONE VLAN only', 'Connecting end devices (PCs, printers)'],
          ['Trunk Port', 'Traffic from MULTIPLE VLANs (tagged)', 'Switch-to-switch or switch-to-router links'],
        ]
      },
      {
        type: 'tip',
        text: '💡 Trunk ports use 802.1Q tagging to label which VLAN each frame belongs to as it travels between switches.'
      }
    ]
  }
]

export function lessonsHTML() {
  return `
    <div class="dtop">
      <div><h1 class="dtitle">Lessons 📖</h1><p class="dsub">Read, learn, and understand the concepts</p></div>
    </div>

    <div id="lessons-picker">
      <div class="sec-lbl">Network Fundamentals</div>
      <div class="lessons-grid">
        ${LESSONS.map(l => `
          <button class="lesson-card" data-lesson="${l.id}">
            <div class="lesson-ic" style="background:${l.color};">${l.icon}</div>
            <div class="lesson-info">
              <div class="lesson-title">${l.title}</div>
              <div class="lesson-meta">${l.topic} · ${l.duration}</div>
            </div>
            <span class="lesson-arrow">→</span>
          </button>
        `).join('')}
      </div>
    </div>

    <div id="lesson-view" style="display:none;">
      <div class="lesson-view-header">
        <button class="qh-back" id="lesson-back">← Back to Lessons</button>
      </div>
      <div id="lesson-content" class="lesson-content"></div>
    </div>
  `
}

export function setupLessons() {
  document.querySelectorAll('.lesson-card').forEach(card => {
    card.addEventListener('click', () => {
      const lesson = LESSONS.find(l => l.id === card.dataset.lesson)
      if (lesson) showLesson(lesson)
    })
  })

  document.getElementById('lesson-back').addEventListener('click', () => {
    document.getElementById('lesson-view').style.display = 'none'
    document.getElementById('lessons-picker').style.display = 'block'
  })
}

function showLesson(lesson) {
  document.getElementById('lessons-picker').style.display = 'none'
  document.getElementById('lesson-view').style.display = 'block'

  const container = document.getElementById('lesson-content')
  let html = `
    <div class="lesson-hero" style="background:${lesson.color};">
      <div class="lesson-hero-icon">${lesson.icon}</div>
      <div class="lesson-hero-topic">${lesson.topic}</div>
      <h1 class="lesson-hero-title">${lesson.title}</h1>
      <div class="lesson-hero-meta">${lesson.duration}</div>
    </div>
    <div class="lesson-body">
  `

  lesson.content.forEach(block => {
    if (block.type === 'intro') {
      html += `<p class="lesson-intro">${block.text}</p>`
    } else if (block.type === 'heading') {
      html += `<h2 class="lesson-h2">${block.text}</h2>`
    } else if (block.type === 'text') {
      html += `<p class="lesson-p">${block.text}</p>`
    } else if (block.type === 'tip') {
      html += `<div class="lesson-tip">${block.text}</div>`
    } else if (block.type === 'bullets') {
      html += `<ul class="lesson-bullets">${block.items.map(i => `<li>${i}</li>`).join('')}</ul>`
    } else if (block.type === 'table') {
      html += `
        <div class="lesson-table-wrap">
          <table class="lesson-table">
            <thead><tr>${block.headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>
            <tbody>${block.rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody>
          </table>
        </div>
      `
    } else if (block.type === 'visual-osi') {
      html += buildOSIVisual()
    } else if (block.type === 'visual-subnet') {
      html += buildSubnetVisual()
    } else if (block.type === 'visual-tcpudp') {
      html += buildTCPUDPVisual()
    } else if (block.type === 'layerlist') {
      html += `<div class="layer-list">${block.layers.map(l => `
        <div class="layer-item" style="border-left:4px solid var(--b);">
          <div class="layer-num" style="background:${l.color};">Layer ${l.num}</div>
          <div class="layer-body">
            <div class="layer-name">${l.name}</div>
            <div class="layer-desc">${l.desc}</div>
            <div class="layer-example">📌 Example: ${l.example}</div>
          </div>
        </div>
      `).join('')}</div>`
    }
  })

  html += `</div>`
  container.innerHTML = html
}

function buildOSIVisual() {
  const layers = [
    { n: 7, name: 'Application', color: '#FDECEA', tc: '#9E2A2B', proto: 'HTTP · FTP · DNS · SMTP' },
    { n: 6, name: 'Presentation', color: '#FFF3D6', tc: '#B07D10', proto: 'SSL/TLS · JPEG · MPEG' },
    { n: 5, name: 'Session', color: '#E8F5E9', tc: '#2E7D32', proto: 'NetBIOS · RPC · PPTP' },
    { n: 4, name: 'Transport', color: '#E3EDF2', tc: '#1C4B62', proto: 'TCP · UDP · SCTP' },
    { n: 3, name: 'Network', color: '#EDE7F6', tc: '#4527A0', proto: 'IP · ICMP · OSPF · BGP' },
    { n: 2, name: 'Data Link', color: '#FFF3D6', tc: '#B07D10', proto: 'Ethernet · 802.11 · ARP' },
    { n: 1, name: 'Physical', color: '#FDECEA', tc: '#9E2A2B', proto: 'Cables · Fiber · Radio waves' },
  ]
  return `
    <div class="visual-box">
      <div class="visual-title">OSI Model — 7 Layers</div>
      <div class="osi-stack">
        ${layers.map(l => `
          <div class="osi-layer" style="background:${l.color};">
            <div class="osi-num" style="color:${l.tc};">Layer ${l.n}</div>
            <div class="osi-name" style="color:${l.tc};">${l.name}</div>
            <div class="osi-proto">${l.proto}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `
}

function buildSubnetVisual() {
  return `
    <div class="visual-box">
      <div class="visual-title">How a /24 subnet works</div>
      <div class="subnet-visual">
        <div class="subnet-ip">
          <div class="subnet-label">IP Address</div>
          <div class="subnet-bits">
            <span class="subnet-net">192 . 168 . 1</span>
            <span class="subnet-dot"> . </span>
            <span class="subnet-host">25</span>
          </div>
          <div class="subnet-tags">
            <span class="subnet-tag-net">Network part (3 octets)</span>
            <span class="subnet-tag-host">Host part (1 octet)</span>
          </div>
        </div>
        <div class="subnet-info-row">
          <div class="subnet-info-card">
            <div class="si-label">Subnet Mask</div>
            <div class="si-val">255.255.255.0</div>
          </div>
          <div class="subnet-info-card">
            <div class="si-label">CIDR</div>
            <div class="si-val">/24</div>
          </div>
          <div class="subnet-info-card">
            <div class="si-label">Total Hosts</div>
            <div class="si-val">256</div>
          </div>
          <div class="subnet-info-card">
            <div class="si-label">Usable Hosts</div>
            <div class="si-val">254</div>
          </div>
        </div>
      </div>
    </div>
  `
}

function buildTCPUDPVisual() {
  return `
    <div class="visual-box">
      <div class="visual-title">TCP 3-Way Handshake vs UDP</div>
      <div class="tcpudp-wrap">
        <div class="tcpudp-col">
          <div class="tcpudp-header" style="background:#E3EDF2;color:#1C4B62;">TCP</div>
          <div class="tcpudp-body">
            <div class="handshake">
              <div class="hs-step"><span class="hs-arrow">→</span> SYN</div>
              <div class="hs-step"><span class="hs-arrow">←</span> SYN-ACK</div>
              <div class="hs-step"><span class="hs-arrow">→</span> ACK</div>
              <div class="hs-step hs-data"><span class="hs-arrow">⇄</span> Data Transfer</div>
            </div>
            <div class="tcpudp-tag" style="background:#E3EDF2;color:#1C4B62;">✅ Reliable · Ordered · Slower</div>
          </div>
        </div>
        <div class="tcpudp-col">
          <div class="tcpudp-header" style="background:#FFF3D6;color:#B07D10;">UDP</div>
          <div class="tcpudp-body">
            <div class="handshake">
              <div class="hs-step hs-data"><span class="hs-arrow">→</span> Data (no handshake)</div>
              <div class="hs-step hs-data"><span class="hs-arrow">→</span> Data</div>
              <div class="hs-step hs-data"><span class="hs-arrow">→</span> Data</div>
              <div class="hs-note">No acknowledgment</div>
            </div>
            <div class="tcpudp-tag" style="background:#FFF3D6;color:#B07D10;">⚡ Fast · No guarantee · Simple</div>
          </div>
        </div>
      </div>
    </div>
  `
}