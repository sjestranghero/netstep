import '../styles/lab.css'

const LABS = {
  vlan: {
    title: 'VLAN Configuration',
    prompt: 'Switch#',
    steps: [
      { instruction: 'Enter global configuration mode.', command: 'configure terminal', hint: 'Type: configure terminal', response: 'Switch(config)#', prompt: 'Switch(config)#' },
      { instruction: 'Create VLAN 10.', command: 'vlan 10', hint: 'Type: vlan 10', response: 'Switch(config-vlan)#', prompt: 'Switch(config-vlan)#' },
      { instruction: 'Name the VLAN "STUDENTS".', command: 'name STUDENTS', hint: 'Type: name STUDENTS', response: 'Switch(config-vlan)#', prompt: 'Switch(config-vlan)#' },
      { instruction: 'Exit VLAN config mode.', command: 'exit', hint: 'Type: exit', response: 'Switch(config)#', prompt: 'Switch(config)#' },
      { instruction: 'Enter interface FastEthernet 0/1.', command: 'interface fa0/1', hint: 'Type: interface fa0/1', response: 'Switch(config-if)#', prompt: 'Switch(config-if)#' },
      { instruction: 'Assign the port to VLAN 10.', command: 'switchport access vlan 10', hint: 'Type: switchport access vlan 10', response: 'Switch(config-if)# VLAN 10 assigned to Fa0/1 ✅', prompt: 'Switch(config-if)#' },
    ]
  },
  ospf: {
    title: 'OSPF Setup',
    prompt: 'Router#',
    steps: [
      { instruction: 'Enter global configuration mode.', command: 'configure terminal', hint: 'Type: configure terminal', response: 'Router(config)#', prompt: 'Router(config)#' },
      { instruction: 'Enable OSPF with process ID 1.', command: 'router ospf 1', hint: 'Type: router ospf 1', response: 'Router(config-router)#', prompt: 'Router(config-router)#' },
      { instruction: 'Set the Router ID to 1.1.1.1.', command: 'router-id 1.1.1.1', hint: 'Type: router-id 1.1.1.1', response: 'Router(config-router)#', prompt: 'Router(config-router)#' },
      { instruction: 'Advertise network 192.168.1.0/24 in area 0.', command: 'network 192.168.1.0 0.0.0.255 area 0', hint: 'Type: network 192.168.1.0 0.0.0.255 area 0', response: 'Router(config-router)#', prompt: 'Router(config-router)#' },
      { instruction: 'Advertise network 10.0.0.0/8 in area 0.', command: 'network 10.0.0.0 0.255.255.255 area 0', hint: 'Type: network 10.0.0.0 0.255.255.255 area 0', response: 'Router(config-router)#', prompt: 'Router(config-router)#' },
      { instruction: 'Exit and save.', command: 'end', hint: 'Type: end', response: 'Router# OSPF configured successfully ✅', prompt: 'Router#' },
    ]
  },
  acl: {
    title: 'Standard ACL',
    prompt: 'Router#',
    steps: [
      { instruction: 'Enter global configuration mode.', command: 'configure terminal', hint: 'Type: configure terminal', response: 'Router(config)#', prompt: 'Router(config)#' },
      { instruction: 'Create standard ACL 10 to permit 192.168.1.0/24.', command: 'access-list 10 permit 192.168.1.0 0.0.0.255', hint: 'Type: access-list 10 permit 192.168.1.0 0.0.0.255', response: 'Router(config)#', prompt: 'Router(config)#' },
      { instruction: 'Enter interface GigabitEthernet 0/0.', command: 'interface gi0/0', hint: 'Type: interface gi0/0', response: 'Router(config-if)#', prompt: 'Router(config-if)#' },
      { instruction: 'Apply ACL 10 inbound.', command: 'ip access-group 10 in', hint: 'Type: ip access-group 10 in', response: 'Router(config-if)#', prompt: 'Router(config-if)#' },
      { instruction: 'Exit interface config.', command: 'exit', hint: 'Type: exit', response: 'Router(config)#', prompt: 'Router(config)#' },
      { instruction: 'Exit and save.', command: 'end', hint: 'Type: end', response: 'Router# ACL 10 applied to Gi0/0 inbound ✅', prompt: 'Router#' },
    ]
  },
  ssh: {
    title: 'SSH Hardening',
    prompt: 'Router#',
    steps: [
      { instruction: 'Enter global configuration mode.', command: 'configure terminal', hint: 'Type: configure terminal', response: 'Router(config)#', prompt: 'Router(config)#' },
      { instruction: 'Set the hostname to "NetStep-R1".', command: 'hostname NetStep-R1', hint: 'Type: hostname NetStep-R1', response: 'NetStep-R1(config)#', prompt: 'NetStep-R1(config)#' },
      { instruction: 'Set the domain name to "netstep.local".', command: 'ip domain-name netstep.local', hint: 'Type: ip domain-name netstep.local', response: 'NetStep-R1(config)#', prompt: 'NetStep-R1(config)#' },
      { instruction: 'Generate RSA crypto keys with 2048 bits.', command: 'crypto key generate rsa modulus 2048', hint: 'Type: crypto key generate rsa modulus 2048', response: 'NetStep-R1(config)# RSA keys generated (2048 bit)', prompt: 'NetStep-R1(config)#' },
      { instruction: 'Set SSH version to 2.', command: 'ip ssh version 2', hint: 'Type: ip ssh version 2', response: 'NetStep-R1(config)#', prompt: 'NetStep-R1(config)#' },
      { instruction: 'Enable SSH on VTY lines.', command: 'line vty 0 4', hint: 'Type: line vty 0 4', response: 'NetStep-R1(config-line)# SSH hardening complete ✅', prompt: 'NetStep-R1(config-line)#' },
    ]
  },
  static_route: {
    title: 'Static Routing',
    prompt: 'Router#',
    steps: [
      { instruction: 'Enter global configuration mode.', command: 'configure terminal', hint: 'Type: configure terminal', response: 'Router(config)#', prompt: 'Router(config)#' },
      { instruction: 'Add a static route to 192.168.2.0/24 via 10.0.0.2.', command: 'ip route 192.168.2.0 255.255.255.0 10.0.0.2', hint: 'Type: ip route 192.168.2.0 255.255.255.0 10.0.0.2', response: 'Router(config)#', prompt: 'Router(config)#' },
      { instruction: 'Add a default route via 203.0.113.1.', command: 'ip route 0.0.0.0 0.0.0.0 203.0.113.1', hint: 'Type: ip route 0.0.0.0 0.0.0.0 203.0.113.1', response: 'Router(config)#', prompt: 'Router(config)#' },
      { instruction: 'Exit configuration mode.', command: 'end', hint: 'Type: end', response: 'Router#', prompt: 'Router#' },
      { instruction: 'Verify the routing table.', command: 'show ip route', hint: 'Type: show ip route', response: 'Router# S 192.168.2.0/24 [1/0] via 10.0.0.2\n       S* 0.0.0.0/0 [1/0] via 203.0.113.1 ✅', prompt: 'Router#' },
    ]
  },
  dhcp: {
    title: 'DHCP Server Setup',
    prompt: 'Router#',
    steps: [
      { instruction: 'Enter global configuration mode.', command: 'configure terminal', hint: 'Type: configure terminal', response: 'Router(config)#', prompt: 'Router(config)#' },
      { instruction: 'Exclude the first 10 addresses from DHCP pool.', command: 'ip dhcp excluded-address 192.168.1.1 192.168.1.10', hint: 'Type: ip dhcp excluded-address 192.168.1.1 192.168.1.10', response: 'Router(config)#', prompt: 'Router(config)#' },
      { instruction: 'Create a DHCP pool named LAN.', command: 'ip dhcp pool LAN', hint: 'Type: ip dhcp pool LAN', response: 'Router(dhcp-config)#', prompt: 'Router(dhcp-config)#' },
      { instruction: 'Set the network to 192.168.1.0/24.', command: 'network 192.168.1.0 255.255.255.0', hint: 'Type: network 192.168.1.0 255.255.255.0', response: 'Router(dhcp-config)#', prompt: 'Router(dhcp-config)#' },
      { instruction: 'Set the default gateway to 192.168.1.1.', command: 'default-router 192.168.1.1', hint: 'Type: default-router 192.168.1.1', response: 'Router(dhcp-config)#', prompt: 'Router(dhcp-config)#' },
      { instruction: 'Set the DNS server to 8.8.8.8.', command: 'dns-server 8.8.8.8', hint: 'Type: dns-server 8.8.8.8', response: 'Router(dhcp-config)# DHCP pool LAN configured ✅', prompt: 'Router(dhcp-config)#' },
    ]
  },
  nat: {
    title: 'NAT Configuration',
    prompt: 'Router#',
    steps: [
      { instruction: 'Enter global configuration mode.', command: 'configure terminal', hint: 'Type: configure terminal', response: 'Router(config)#', prompt: 'Router(config)#' },
      { instruction: 'Enter inside interface Gi0/0.', command: 'interface gi0/0', hint: 'Type: interface gi0/0', response: 'Router(config-if)#', prompt: 'Router(config-if)#' },
      { instruction: 'Mark this interface as NAT inside.', command: 'ip nat inside', hint: 'Type: ip nat inside', response: 'Router(config-if)#', prompt: 'Router(config-if)#' },
      { instruction: 'Go to outside interface Gi0/1.', command: 'interface gi0/1', hint: 'Type: interface gi0/1', response: 'Router(config-if)#', prompt: 'Router(config-if)#' },
      { instruction: 'Mark this interface as NAT outside.', command: 'ip nat outside', hint: 'Type: ip nat outside', response: 'Router(config-if)#', prompt: 'Router(config-if)#' },
      { instruction: 'Create PAT overload rule using ACL 1.', command: 'ip nat inside source list 1 interface gi0/1 overload', hint: 'Type: ip nat inside source list 1 interface gi0/1 overload', response: 'Router(config)# NAT PAT configured successfully ✅', prompt: 'Router(config)#' },
    ]
  },
  spanning_tree: {
    title: 'Spanning Tree (STP)',
    prompt: 'Switch#',
    steps: [
      { instruction: 'Enter global configuration mode.', command: 'configure terminal', hint: 'Type: configure terminal', response: 'Switch(config)#', prompt: 'Switch(config)#' },
      { instruction: 'Set this switch as STP root for VLAN 10.', command: 'spanning-tree vlan 10 root primary', hint: 'Type: spanning-tree vlan 10 root primary', response: 'Switch(config)#', prompt: 'Switch(config)#' },
      { instruction: 'Set this switch as secondary root for VLAN 20.', command: 'spanning-tree vlan 20 root secondary', hint: 'Type: spanning-tree vlan 20 root secondary', response: 'Switch(config)#', prompt: 'Switch(config)#' },
      { instruction: 'Enable PortFast on access port Fa0/1.', command: 'interface fa0/1', hint: 'Type: interface fa0/1', response: 'Switch(config-if)#', prompt: 'Switch(config-if)#' },
      { instruction: 'Enable PortFast on this interface.', command: 'spanning-tree portfast', hint: 'Type: spanning-tree portfast', response: 'Switch(config-if)#', prompt: 'Switch(config-if)#' },
      { instruction: 'Exit and verify STP.', command: 'end', hint: 'Type: end', response: 'Switch# STP configured. Root bridge set for VLAN 10 ✅', prompt: 'Switch#' },
    ]
  }
}

export function labHTML() {
  return `
    <div class="dtop">
      <div><h1 class="dtitle">CLI Lab 💻</h1><p class="dsub">Practice real Cisco IOS commands step by step</p></div>
    </div>

    <div id="lab-picker">
      <div class="sec-lbl">Beginner Labs</div>
      <div class="lab-grid">
        <button class="lab-card" data-lab="vlan">
          <div class="lab-ic" style="background:#E3EDF2;">🔀</div>
          <div class="lab-name">VLAN Configuration</div>
          <div class="lab-meta">Create VLANs and assign ports</div>
          <div class="lab-steps">6 steps</div>
        </button>
        <button class="lab-card" data-lab="static_route">
          <div class="lab-ic" style="background:#FFF3D6;">🗺️</div>
          <div class="lab-name">Static Routing</div>
          <div class="lab-meta">Configure static and default routes</div>
          <div class="lab-steps">5 steps</div>
        </button>
        <button class="lab-card" data-lab="dhcp">
          <div class="lab-ic" style="background:#E8F5E9;">📡</div>
          <div class="lab-name">DHCP Server Setup</div>
          <div class="lab-meta">Configure automatic IP assignment</div>
          <div class="lab-steps">6 steps</div>
        </button>
        <button class="lab-card" data-lab="spanning_tree">
          <div class="lab-ic" style="background:#EDE7F6;">🌳</div>
          <div class="lab-name">Spanning Tree (STP)</div>
          <div class="lab-meta">Set root bridge and PortFast</div>
          <div class="lab-steps">6 steps</div>
        </button>
      </div>

      <div class="sec-lbl" style="margin-top:24px;">Advanced Labs</div>
      <div class="lab-grid">
        <button class="lab-card" data-lab="ospf">
          <div class="lab-ic" style="background:#FDECEA;">🛣️</div>
          <div class="lab-name">OSPF Setup</div>
          <div class="lab-meta">Configure dynamic OSPF routing</div>
          <div class="lab-steps">6 steps</div>
        </button>
        <button class="lab-card" data-lab="acl">
          <div class="lab-ic" style="background:#FFF3D6;">🛡️</div>
          <div class="lab-name">Standard ACL</div>
          <div class="lab-meta">Create and apply access lists</div>
          <div class="lab-steps">6 steps</div>
        </button>
        <button class="lab-card" data-lab="nat">
          <div class="lab-ic" style="background:#E3EDF2;">🔁</div>
          <div class="lab-name">NAT Configuration</div>
          <div class="lab-meta">Configure PAT for internet access</div>
          <div class="lab-steps">6 steps</div>
        </button>
        <button class="lab-card" data-lab="ssh">
          <div class="lab-ic" style="background:#F0F4F7;">🔐</div>
          <div class="lab-name">SSH Hardening</div>
          <div class="lab-meta">Secure remote access setup</div>
          <div class="lab-steps">6 steps</div>
        </button>
      </div>
    </div>

    <div id="lab-active" style="display:none;">
      <div class="lab-header">
        <div class="qh-left">
          <button class="qh-back" id="lab-back">← Back</button>
          <span class="qh-topic" id="lab-title"></span>
        </div>
        <div class="qh-right">
          <span class="qh-stat">Step <span id="lab-step-num">1</span>/<span id="lab-step-total">6</span></span>
        </div>
      </div>
      <div class="qprog-wrap">
        <div class="qprog-track"><div class="qprog-fill" id="lab-prog-fill" style="width:0%"></div></div>
      </div>
      <div class="lab-body">
        <div class="lab-instruction-card">
          <div class="lab-step-label" id="lab-step-label">Step 1</div>
          <div class="lab-instruction" id="lab-instruction"></div>
          <div class="lab-hint" id="lab-hint" style="display:none;"></div>
          <button class="hint-btn" id="hint-btn">💡 Show hint</button>
        </div>
        <div class="terminal-wrap">
          <div class="terminal-bar">
            <span class="term-dot" style="background:#ff5f56;"></span>
            <span class="term-dot" style="background:#ffbd2e;"></span>
            <span class="term-dot" style="background:#27c93f;"></span>
            <span class="term-title">Cisco IOS Simulator</span>
          </div>
          <div class="terminal-output" id="terminal-output"></div>
          <div class="terminal-input-row">
            <span class="term-prompt" id="term-prompt">Switch#</span>
            <input class="term-input" id="term-input" type="text" placeholder="Type a command..." autocomplete="off" spellcheck="false"/>
          </div>
        </div>
      </div>
    </div>

    <div id="lab-complete" style="display:none;">
      <div class="results-card">
        <div class="res-emoji">🎓</div>
        <h2 class="res-title" id="lab-complete-title">Lab Complete!</h2>
        <div class="res-score" id="lab-complete-score"></div>
        <div class="res-breakdown" id="lab-complete-desc"></div>
        <button class="res-btn" id="lab-retry">Try again</button>
        <button class="res-btn res-btn-outline" id="lab-pick">Pick another lab</button>
      </div>
    </div>
  `
}

export function setupLab() {
  let currentLab = null
  let currentStep = 0

  document.querySelectorAll('.lab-card').forEach(card => {
    card.addEventListener('click', () => {
      currentLab = card.dataset.lab
      startLab(currentLab)
    })
  })

  function startLab(labKey) {
    const lab = LABS[labKey]
    currentStep = 0
    document.getElementById('lab-picker').style.display = 'none'
    document.getElementById('lab-complete').style.display = 'none'
    document.getElementById('lab-active').style.display = 'block'
    document.getElementById('lab-title').textContent = lab.title
    document.getElementById('lab-step-total').textContent = lab.steps.length
    document.getElementById('term-prompt').textContent = lab.prompt
    const output = document.getElementById('terminal-output')
    output.innerHTML = '<div class="term-line term-sys">Connected to ' + lab.title + ' simulator. Type the commands below to complete each step.</div>'
    showStep()
  }

  function showStep() {
    const lab = LABS[currentLab]
    const step = lab.steps[currentStep]
    const num = currentStep + 1
    document.getElementById('lab-step-num').textContent = num
    document.getElementById('lab-step-label').textContent = 'Step ' + num + ' of ' + lab.steps.length
    document.getElementById('lab-instruction').textContent = step.instruction
    document.getElementById('lab-hint').style.display = 'none'
    document.getElementById('hint-btn').style.display = 'inline-block'
    document.getElementById('lab-prog-fill').style.width = ((currentStep / lab.steps.length) * 100) + '%'
    document.getElementById('term-prompt').textContent = step.prompt || lab.prompt
    document.getElementById('term-input').value = ''
    document.getElementById('term-input').focus()
  }

  document.getElementById('hint-btn').addEventListener('click', () => {
    const step = LABS[currentLab].steps[currentStep]
    document.getElementById('lab-hint').textContent = step.hint
    document.getElementById('lab-hint').style.display = 'block'
    document.getElementById('hint-btn').style.display = 'none'
  })

  document.getElementById('term-input').addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return
    const input = document.getElementById('term-input').value.trim()
    if (!input) return
    const lab = LABS[currentLab]
    const step = lab.steps[currentStep]
    const output = document.getElementById('terminal-output')
    const prompt = document.getElementById('term-prompt').textContent

    const inputLine = document.createElement('div')
    inputLine.className = 'term-line'
    inputLine.innerHTML = '<span class="term-prompt-inline">' + prompt + '</span> ' + input
    output.appendChild(inputLine)

    if (input.toLowerCase().trim() === step.command.toLowerCase().trim()) {
      const respLine = document.createElement('div')
      respLine.className = 'term-line term-ok'
      respLine.textContent = step.response
      output.appendChild(respLine)
      output.scrollTop = output.scrollHeight
      document.getElementById('term-input').value = ''
      currentStep++
      if (currentStep >= lab.steps.length) setTimeout(() => showLabComplete(), 600)
      else showStep()
    } else {
      const errLine = document.createElement('div')
      errLine.className = 'term-line term-err'
      errLine.textContent = '% Invalid input: "' + input + '". Check your command and try again.'
      output.appendChild(errLine)
      document.getElementById('term-input').value = ''
      output.scrollTop = output.scrollHeight
    }
  })

  document.getElementById('lab-back').addEventListener('click', () => {
    document.getElementById('lab-active').style.display = 'none'
    document.getElementById('lab-picker').style.display = 'block'
  })

  function showLabComplete() {
    document.getElementById('lab-active').style.display = 'none'
    document.getElementById('lab-complete').style.display = 'block'
    const lab = LABS[currentLab]
    document.getElementById('lab-complete-title').textContent = lab.title + ' — Complete!'
    document.getElementById('lab-complete-score').textContent = 'All ' + lab.steps.length + ' steps completed'
    document.getElementById('lab-complete-desc').textContent = 'Great work! You just configured a real ' + lab.title + ' scenario using Cisco IOS commands.'
    document.getElementById('lab-retry').onclick = () => startLab(currentLab)
    document.getElementById('lab-pick').onclick = () => {
      document.getElementById('lab-complete').style.display = 'none'
      document.getElementById('lab-picker').style.display = 'block'
    }
  }
}