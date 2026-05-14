import { supabase } from '../supabase.js'
import '../styles/quiz.css'

const QUESTIONS = {
  fundamentals: [
    { q: "Which OSI layer is responsible for logical addressing?", opts: ["Data Link","Network","Transport","Session"], ans: 1, exp: "The Network layer (Layer 3) handles logical addressing using IP addresses." },
    { q: "How many layers does the OSI model have?", opts: ["5","6","7","8"], ans: 2, exp: "The OSI model has 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, Application." },
    { q: "What is the default subnet mask for a Class C network?", opts: ["255.0.0.0","255.255.0.0","255.255.255.0","255.255.255.128"], ans: 2, exp: "Class C networks use /24 or 255.255.255.0, supporting up to 254 hosts." },
    { q: "Which protocol operates at the Transport layer and provides reliable delivery?", opts: ["UDP","IP","TCP","ICMP"], ans: 2, exp: "TCP provides reliable, connection-oriented delivery at Layer 4." },
    { q: "What device operates at Layer 2 of the OSI model?", opts: ["Router","Hub","Switch","Firewall"], ans: 2, exp: "Switches operate at Layer 2 and use MAC addresses to forward frames." },
    { q: "Which IP address range is reserved for loopback?", opts: ["10.0.0.0/8","127.0.0.0/8","192.168.0.0/16","172.16.0.0/12"], ans: 1, exp: "127.0.0.0/8 is reserved for loopback. 127.0.0.1 is the most commonly used loopback address." },
    { q: "What does ARP stand for?", opts: ["Address Resolution Protocol","Automatic Routing Protocol","Access Request Packet","Application Response Protocol"], ans: 0, exp: "ARP maps IP addresses to MAC addresses on a local network." },
    { q: "Which layer of the OSI model handles encryption and data formatting?", opts: ["Application","Session","Presentation","Transport"], ans: 2, exp: "The Presentation layer (Layer 6) handles encryption, compression, and data translation." },
    { q: "What is the size of an IPv4 address?", opts: ["16 bits","32 bits","64 bits","128 bits"], ans: 1, exp: "IPv4 addresses are 32 bits long, written as four 8-bit octets." },
    { q: "Which protocol is used to assign IP addresses automatically?", opts: ["DNS","FTP","DHCP","SNMP"], ans: 2, exp: "DHCP automatically assigns IP addresses to network devices." },
    { q: "What is the maximum number of hosts in a /24 network?", opts: ["254","255","256","512"], ans: 0, exp: "A /24 network has 256 addresses but 254 usable hosts." },
    { q: "Which layer does a router operate at?", opts: ["Layer 1","Layer 2","Layer 3","Layer 4"], ans: 2, exp: "Routers operate at Layer 3 and forward packets based on IP addresses." },
    { q: "What does DNS stand for?", opts: ["Dynamic Network System","Domain Name System","Data Node Service","Distributed Naming Server"], ans: 1, exp: "DNS translates domain names into IP addresses." },
    { q: "Which protocol is used to send email?", opts: ["IMAP","POP3","SMTP","FTP"], ans: 2, exp: "SMTP is used for sending emails between servers." },
    { q: "What is the broadcast address of 192.168.1.0/24?", opts: ["192.168.1.0","192.168.1.1","192.168.1.254","192.168.1.255"], ans: 3, exp: "The broadcast address is the last address in the subnet." },
    { q: "Which layer is responsible for end-to-end communication?", opts: ["Network","Transport","Session","Application"], ans: 1, exp: "The Transport layer handles end-to-end communication between hosts." },
    { q: "What type of address does a switch use to forward frames?", opts: ["IP address","MAC address","Port number","VLAN ID"], ans: 1, exp: "Switches use MAC addresses to make forwarding decisions at Layer 2." },
    { q: "What does ICMP stand for?", opts: ["Internet Control Message Protocol","Internal Connection Management Protocol","IP Control Message Protocol","Internet Communication Mode Protocol"], ans: 0, exp: "ICMP is used for diagnostic messages — ping uses ICMP echo requests." },
    { q: "Which private IP range belongs to Class A?", opts: ["192.168.0.0/16","172.16.0.0/12","10.0.0.0/8","169.254.0.0/16"], ans: 2, exp: "10.0.0.0/8 is the Class A private range." },
    { q: "What port does HTTPS use by default?", opts: ["80","443","8080","22"], ans: 1, exp: "HTTPS uses port 443. HTTP uses port 80." },
  ],
  switching: [
    { q: "What is the purpose of a VLAN?", opts: ["Increase bandwidth","Segment a network logically","Connect two routers","Assign IP addresses"], ans: 1, exp: "VLANs logically segment a network without requiring separate physical switches." },
    { q: "Which STP port state forwards traffic and learns MAC addresses?", opts: ["Blocking","Listening","Learning","Forwarding"], ans: 3, exp: "Only the Forwarding state allows a port to both learn MAC addresses and forward traffic." },
    { q: "What is a trunk port used for?", opts: ["Connecting end devices","Carrying multiple VLANs","Blocking STP loops","Assigning IP addresses"], ans: 1, exp: "Trunk ports carry traffic for multiple VLANs between switches using 802.1Q tagging." },
    { q: "What protocol prevents switching loops?", opts: ["OSPF","STP","VRRP","HSRP"], ans: 1, exp: "STP prevents Layer 2 loops by blocking redundant paths." },
    { q: "What is the native VLAN used for?", opts: ["Management traffic only","Untagged traffic on a trunk","Voice traffic","Encrypted traffic"], ans: 1, exp: "The native VLAN carries untagged frames on an 802.1Q trunk link." },
    { q: "Which command assigns a switch port to VLAN 10?", opts: ["vlan 10","switchport access vlan 10","interface vlan 10","set vlan 10"], ans: 1, exp: "The command switchport access vlan 10 assigns an access port to VLAN 10." },
    { q: "What does EtherChannel do?", opts: ["Routes between VLANs","Bundles multiple links into one logical link","Assigns VLANs dynamically","Encrypts switch traffic"], ans: 1, exp: "EtherChannel bundles multiple physical links into one logical link." },
    { q: "What is the Bridge ID composed of?", opts: ["IP address + MAC","Priority + MAC address","VLAN + Port","Switch name + IP"], ans: 1, exp: "The Bridge ID is made of a 2-byte priority value and the 6-byte MAC address." },
    { q: "Which VLAN is used for switch management by default?", opts: ["VLAN 0","VLAN 1","VLAN 99","VLAN 1000"], ans: 1, exp: "VLAN 1 is the default management VLAN on Cisco switches." },
    { q: "What does 802.1Q add to an Ethernet frame?", opts: ["IP header","VLAN tag","CRC checksum","Port number"], ans: 1, exp: "802.1Q inserts a 4-byte VLAN tag into the Ethernet frame header." },
    { q: "What is the default STP bridge priority?", opts: ["0","4096","32768","65535"], ans: 2, exp: "The default STP bridge priority is 32768." },
    { q: "Which port is always in forwarding state on the root bridge?", opts: ["Designated port","Root port","Alternate port","Blocked port"], ans: 0, exp: "All ports on the root bridge are designated ports and always forwarding." },
    { q: "What command verifies VLANs on a Cisco switch?", opts: ["show vlan brief","show interface trunk","show ip vlan","show vlan status"], ans: 0, exp: "The show vlan brief command displays all VLANs and their assigned ports." },
    { q: "What is inter-VLAN routing?", opts: ["Routing between routers","Allowing traffic between different VLANs","Blocking VLAN traffic","Creating VLANs automatically"], ans: 1, exp: "Inter-VLAN routing allows hosts on different VLANs to communicate." },
    { q: "What does RSTP stand for?", opts: ["Rapid Spanning Tree Protocol","Remote STP","Routing Spanning Tree Protocol","Redundant STP"], ans: 0, exp: "RSTP (802.1w) improves STP with faster convergence." },
    { q: "What is a MAC address table also called?", opts: ["ARP table","CAM table","Routing table","VLAN table"], ans: 1, exp: "The MAC address table on a switch is also called a CAM table." },
    { q: "Which STP state does a port start in?", opts: ["Forwarding","Learning","Listening","Blocking"], ans: 3, exp: "When a port first comes up, STP puts it in the Blocking state." },
    { q: "What is the purpose of PortFast in STP?", opts: ["Elect the root bridge faster","Skip STP states on access ports","Block trunk ports","Assign VLANs automatically"], ans: 1, exp: "PortFast skips Listening and Learning states on access ports connected to end devices." },
    { q: "Which protocol dynamically negotiates trunk links?", opts: ["STP","VTP","DTP","CDP"], ans: 2, exp: "DTP automatically negotiates trunking between Cisco switches." },
    { q: "What happens when a switch receives a frame with an unknown MAC address?", opts: ["Drops the frame","Sends it to all ports (floods)","Returns it to sender","Logs an error"], ans: 1, exp: "When the destination MAC is unknown, the switch floods the frame out all ports except the ingress port." },
  ],
  routing: [
    { q: "Which routing protocol uses Dijkstra's algorithm?", opts: ["EIGRP","RIP","OSPF","BGP"], ans: 2, exp: "OSPF uses Dijkstra's Shortest Path First algorithm to calculate the best route." },
    { q: "What is the administrative distance of a static route?", opts: ["0","1","90","110"], ans: 1, exp: "Static routes have an administrative distance of 1." },
    { q: "Which protocol is used for routing between autonomous systems on the internet?", opts: ["OSPF","EIGRP","BGP","RIP"], ans: 2, exp: "BGP is the protocol used to route traffic between autonomous systems." },
    { q: "What metric does RIP use?", opts: ["Bandwidth","Delay","Hop count","Cost"], ans: 2, exp: "RIP uses hop count as its metric. Maximum is 15; 16 is unreachable." },
    { q: "What does OSPF use to identify a router uniquely?", opts: ["IP address","MAC address","Router ID","Hostname"], ans: 2, exp: "OSPF uses a Router ID to uniquely identify each router." },
    { q: "Which type of route is automatically added when an interface is configured with an IP?", opts: ["Static route","Default route","Connected route","Dynamic route"], ans: 2, exp: "Connected routes are automatically added when an interface is configured and active." },
    { q: "What is a default route used for?", opts: ["Loop prevention","Routing to unknown destinations","VLAN routing","Address translation"], ans: 1, exp: "A default route forwards packets to unknown destinations, typically toward the internet." },
    { q: "EIGRP is considered what type of routing protocol?", opts: ["Distance vector","Link state","Path vector","Hybrid"], ans: 3, exp: "EIGRP is a hybrid protocol with both distance vector and link-state characteristics." },
    { q: "What is the OSPF hello interval on a broadcast network by default?", opts: ["5 seconds","10 seconds","30 seconds","60 seconds"], ans: 1, exp: "OSPF sends hello packets every 10 seconds on broadcast networks." },
    { q: "Which command shows the routing table on a Cisco router?", opts: ["show ip interface","show ip route","show running-config","show ip ospf"], ans: 1, exp: "The show ip route command displays the current routing table." },
    { q: "What is the administrative distance of OSPF?", opts: ["90","100","110","120"], ans: 2, exp: "OSPF has an administrative distance of 110." },
    { q: "What is the administrative distance of RIP?", opts: ["90","110","120","130"], ans: 2, exp: "RIP has an administrative distance of 120." },
    { q: "Which OSPF packet type is used to discover neighbors?", opts: ["DBD","LSR","Hello","LSU"], ans: 2, exp: "OSPF Hello packets are used to discover and maintain neighbor relationships." },
    { q: "What is route summarization used for?", opts: ["Encrypt routing updates","Reduce routing table size","Increase routing speed","Assign router IDs"], ans: 1, exp: "Route summarization combines multiple routes into one, reducing routing table size." },
    { q: "Which command creates a static default route on a Cisco router?", opts: ["ip route 0.0.0.0 0.0.0.0 [next-hop]","ip default-route [next-hop]","route default [next-hop]","ip route default [next-hop]"], ans: 0, exp: "ip route 0.0.0.0 0.0.0.0 [next-hop] creates a static default route." },
    { q: "What is the EIGRP administrative distance for internal routes?", opts: ["70","90","100","110"], ans: 1, exp: "EIGRP internal routes have an administrative distance of 90." },
    { q: "What does the 'O' prefix mean in a routing table?", opts: ["OSPF route","Outbound route","Optional route","Old route"], ans: 0, exp: "The 'O' prefix indicates a route learned via OSPF." },
    { q: "What is a routing loop?", opts: ["A backup path","A packet cycling endlessly between routers","A type of static route","A VPN tunnel"], ans: 1, exp: "A routing loop occurs when packets are forwarded in a circle, never reaching the destination." },
    { q: "Which feature prevents routing loops in distance vector protocols?", opts: ["OSPF areas","Split horizon","Route summarization","Hello packets"], ans: 1, exp: "Split horizon prevents a router from advertising a route back to the neighbor it learned it from." },
    { q: "What is the purpose of a floating static route?", opts: ["Replace dynamic routing","Serve as a backup route with higher AD","Speed up convergence","Filter routing updates"], ans: 1, exp: "A floating static route has a higher AD than the primary route, acting as a backup." },
  ],
  security: [
    { q: "What does an ACL do?", opts: ["Assigns IP addresses","Filters network traffic","Encrypts data","Routes packets"], ans: 1, exp: "ACLs filter traffic based on rules, permitting or denying packets." },
    { q: "Which type of firewall inspects the state of active connections?", opts: ["Packet filter","Stateful firewall","Proxy firewall","Application firewall"], ans: 1, exp: "Stateful firewalls track connection state and make decisions based on context." },
    { q: "What does VPN stand for?", opts: ["Virtual Private Network","Verified Public Node","Virtual Protocol Network","Validated Packet Node"], ans: 0, exp: "VPN creates an encrypted tunnel over a public network." },
    { q: "Which attack floods a network with traffic to make it unavailable?", opts: ["Phishing","Man-in-the-middle","DoS/DDoS","SQL injection"], ans: 2, exp: "DoS and DDoS attacks flood a target with traffic to exhaust resources." },
    { q: "What is the purpose of NAT?", opts: ["Encrypt traffic","Translate private IPs to public IPs","Assign VLANs","Filter packets"], ans: 1, exp: "NAT translates private IP addresses to a public IP for internet communication." },
    { q: "Which protocol provides secure remote access to a router CLI?", opts: ["Telnet","FTP","SSH","HTTP"], ans: 2, exp: "SSH provides encrypted remote access. Telnet sends data in plaintext." },
    { q: "What does a DMZ do in a network?", opts: ["Blocks all traffic","Hosts public-facing servers safely","Assigns IP addresses","Connects two VLANs"], ans: 1, exp: "A DMZ hosts public services while isolating the internal network." },
    { q: "Which type of ACL filters based on source IP only?", opts: ["Extended ACL","Named ACL","Standard ACL","Dynamic ACL"], ans: 2, exp: "Standard ACLs filter only based on source IP." },
    { q: "What is a common sign of a man-in-the-middle attack?", opts: ["Slow internet","Unexpected certificate warnings","High CPU usage","DNS working correctly"], ans: 1, exp: "Unexpected SSL/TLS certificate warnings often indicate a MITM attack." },
    { q: "What does IDS stand for?", opts: ["Internet Defense System","Intrusion Detection System","Internal Data Security","IP Defense Shield"], ans: 1, exp: "IDS monitors network traffic for suspicious activity and alerts administrators." },
    { q: "What is the difference between IDS and IPS?", opts: ["IDS blocks traffic, IPS detects","IPS blocks traffic, IDS only detects","They are the same","IDS is hardware, IPS is software"], ans: 1, exp: "IDS detects and alerts. IPS actively blocks malicious traffic inline." },
    { q: "What does AAA stand for in network security?", opts: ["Authentication Authorization Accounting","Access Audit Analysis","Address Assignment Algorithm","Automatic Admin Access"], ans: 0, exp: "AAA stands for Authentication, Authorization, and Accounting." },
    { q: "Which encryption protocol does WPA2 use?", opts: ["RC4","DES","AES","MD5"], ans: 2, exp: "WPA2 uses AES for strong wireless encryption." },
    { q: "What is a zero-day vulnerability?", opts: ["A vulnerability with no patch available","A network with no firewall","A router with default settings","An expired SSL certificate"], ans: 0, exp: "A zero-day is a vulnerability unknown to the vendor with no patch available." },
    { q: "What does HTTPS use to secure communication?", opts: ["FTP","TLS/SSL","IPSec","SNMP"], ans: 1, exp: "HTTPS uses TLS to encrypt web communications." },
    { q: "Which attack tricks users into revealing credentials via a fake website?", opts: ["DoS","Phishing","ARP poisoning","Brute force"], ans: 1, exp: "Phishing uses fake websites or emails to steal credentials." },
    { q: "What is port security on a Cisco switch used for?", opts: ["Block all traffic","Limit which MAC addresses can connect to a port","Assign VLANs","Enable SSH"], ans: 1, exp: "Port security restricts access to a switch port based on MAC address." },
    { q: "What is the purpose of a honeypot?", opts: ["Encrypt traffic","Decoy system to attract and study attackers","Block malware","Assign IP addresses"], ans: 1, exp: "A honeypot is a decoy system designed to lure attackers and study their behavior." },
    { q: "Which protocol secures communication between routers using encryption?", opts: ["OSPF","IPSec","STP","EIGRP"], ans: 1, exp: "IPSec provides encryption and authentication for IP communications." },
    { q: "What is social engineering in cybersecurity?", opts: ["Hacking using software tools","Manipulating people to reveal sensitive info","Breaking encryption","Network scanning"], ans: 1, exp: "Social engineering exploits human psychology rather than technical vulnerabilities." },
  ]
}

export function quizHTML() {
  return `
    <div class="dtop">
      <div>
        <h1 class="dtitle">Quiz Mode</h1>
        <p class="dsub">Test your knowledge · 20 questions per topic · Earn XP</p>
      </div>
      <div class="streak-chip">🔥 <span id="q-streak">0</span> streak</div>
    </div>

    <div id="quiz-picker">
      <div class="sec-lbl">Choose a topic</div>
      <div class="topic-grid">
        <button class="topic-card" data-topic="fundamentals">
          <div class="topic-ic" style="background:#FFF3D6;">📡</div>
          <div class="topic-name">Network Fundamentals</div>
          <div class="topic-meta">OSI, IP, subnetting, protocols</div>
          <div class="topic-count">20 questions</div>
        </button>
        <button class="topic-card" data-topic="switching">
          <div class="topic-ic" style="background:#E3EDF2;">🔀</div>
          <div class="topic-name">Switching &amp; VLANs</div>
          <div class="topic-meta">STP, VLAN, trunking, EtherChannel</div>
          <div class="topic-count">20 questions</div>
        </button>
        <button class="topic-card" data-topic="routing">
          <div class="topic-ic" style="background:#FDECEA;">🛣️</div>
          <div class="topic-name">Routing Protocols</div>
          <div class="topic-meta">OSPF, EIGRP, BGP, static routes</div>
          <div class="topic-count">20 questions</div>
        </button>
        <button class="topic-card" data-topic="security">
          <div class="topic-ic" style="background:#EDE7F6;">🛡️</div>
          <div class="topic-name">Network Security</div>
          <div class="topic-meta">ACLs, VPNs, threats, firewalls</div>
          <div class="topic-count">20 questions</div>
        </button>
      </div>
    </div>

    <div id="quiz-active" style="display:none;">
      <div class="quiz-header">
        <div class="qh-left">
          <button class="qh-back" id="quiz-back">← Back</button>
          <span class="qh-topic" id="qh-topic-name"></span>
        </div>
        <div class="qh-right">
          <span class="qh-stat">Q <span id="q-num">1</span>/<span id="q-total">20</span></span>
          <span class="qh-xp">⭐ <span id="q-xp">0</span> XP</span>
        </div>
      </div>
      <div class="qprog-wrap">
        <div class="qprog-track"><div class="qprog-fill" id="qprog-fill" style="width:0%"></div></div>
      </div>
      <div class="qcard-center">
        <div class="qcard2">
          <div class="qcard2-num" id="qcard-num">Question 1</div>
          <div class="qcard2-q" id="qcard-q"></div>
          <div class="qcard2-opts" id="qcard-opts"></div>
          <div class="qcard2-explain" id="qcard-explain" style="display:none;"></div>
          <button class="qcard2-next" id="qcard-next" style="display:none;">Next question →</button>
        </div>
      </div>
    </div>

    <div id="quiz-results" style="display:none;">
      <div class="results-card">
        <div class="res-emoji" id="res-emoji">🎉</div>
        <h2 class="res-title" id="res-title">Quiz Complete!</h2>
        <div class="res-score" id="res-score"></div>
        <div class="res-xp" id="res-xp"></div>
        <div class="res-xp-status" id="res-xp-status" style="font-size:12px;color:#7d8590;margin-top:4px;"></div>
        <div class="res-breakdown" id="res-breakdown"></div>
        <button class="res-btn" id="res-retry">Try again</button>
        <button class="res-btn res-btn-outline" id="res-pick">Pick another topic</button>
      </div>
    </div>
  `
}

export function setupQuiz() {
  let currentTopic = null
  let questions = []
  let currentIndex = 0
  let score = 0
  let xp = 0
  let streak = 0
  let answered = false

  document.querySelectorAll('.topic-card').forEach(card => {
    card.addEventListener('click', () => {
      currentTopic = card.dataset.topic
      startQuiz(currentTopic)
    })
  })

  function startQuiz(topic) {
    questions = [...QUESTIONS[topic]].sort(() => Math.random() - 0.5)
    currentIndex = 0; score = 0; xp = 0; streak = 0; answered = false
    document.getElementById('quiz-picker').style.display = 'none'
    document.getElementById('quiz-results').style.display = 'none'
    document.getElementById('quiz-active').style.display = 'block'
    const names = { fundamentals: 'Network Fundamentals', switching: 'Switching & VLANs', routing: 'Routing Protocols', security: 'Network Security' }
    document.getElementById('qh-topic-name').textContent = names[topic]
    document.getElementById('q-total').textContent = questions.length
    showQuestion()
  }

  function showQuestion() {
    answered = false
    const q = questions[currentIndex]
    const num = currentIndex + 1
    document.getElementById('qcard-num').textContent = 'Question ' + num
    document.getElementById('qcard-q').textContent = q.q
    document.getElementById('q-num').textContent = num
    document.getElementById('qprog-fill').style.width = ((currentIndex / questions.length) * 100) + '%'
    document.getElementById('qcard-explain').style.display = 'none'
    document.getElementById('qcard-next').style.display = 'none'
    const optsEl = document.getElementById('qcard-opts')
    optsEl.innerHTML = ''
    q.opts.forEach((opt, i) => {
      const btn = document.createElement('button')
      btn.className = 'qopt'
      btn.textContent = ['A','B','C','D'][i] + '. ' + opt
      btn.addEventListener('click', () => handleAnswer(i))
      optsEl.appendChild(btn)
    })
  }

  function handleAnswer(chosen) {
    if (answered) return
    answered = true
    const q = questions[currentIndex]
    const isCorrect = chosen === q.ans
    document.querySelectorAll('.qopt').forEach((btn, i) => {
      btn.disabled = true
      if (i === q.ans) btn.classList.add('opt-correct')
      else if (i === chosen && !isCorrect) btn.classList.add('opt-wrong')
    })
    if (isCorrect) { score++; streak++; xp += 10 + (streak > 2 ? 5 : 0) } else { streak = 0 }
    document.getElementById('q-streak').textContent = streak
    document.getElementById('q-xp').textContent = xp
    const expEl = document.getElementById('qcard-explain')
    expEl.style.display = 'block'
    expEl.innerHTML = '<span class="' + (isCorrect ? 'exp-correct' : 'exp-wrong') + '">' + (isCorrect ? '✅ Correct!' : '❌ Wrong!') + '</span> ' + q.exp
    document.getElementById('qcard-next').style.display = 'block'
  }

  document.getElementById('qcard-next').addEventListener('click', () => {
    currentIndex++
    if (currentIndex >= questions.length) showResults()
    else showQuestion()
  })

  document.getElementById('quiz-back').addEventListener('click', () => {
    document.getElementById('quiz-active').style.display = 'none'
    document.getElementById('quiz-picker').style.display = 'block'
  })

  // ─── SAVE XP TO SUPABASE ────────────────────────────────────────────────────
  async function saveResultsToSupabase() {
    const statusEl = document.getElementById('res-xp-status')
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        statusEl.textContent = '⚠️ Not logged in — XP not saved.'
        return
      }

      // Fetch current profile values
      const { data: profile, error: fetchError } = await supabase
        .from('profiles')
        .select('xp, quizzes_done')
        .eq('id', user.id)
        .single()

      if (fetchError) {
        // Profile row might not exist yet — create it
        await supabase.from('profiles').insert({
          id: user.id,
          xp: xp,
          quizzes_done: 1
        })
        statusEl.textContent = '✅ XP saved!'
        return
      }

      const newXp = (profile.xp || 0) + xp
      const newQuizzes = (profile.quizzes_done || 0) + 1

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ xp: newXp, quizzes_done: newQuizzes })
        .eq('id', user.id)

      if (updateError) {
        console.error('Supabase update error:', updateError)
        statusEl.textContent = '⚠️ Could not save XP. Try again.'
      } else {
        statusEl.textContent = `✅ XP saved! Total XP: ${newXp}`
      }
    } catch (err) {
      console.error('Failed to save XP:', err)
      statusEl.textContent = '⚠️ Could not save XP.'
    }
  }
  // ────────────────────────────────────────────────────────────────────────────

  function showResults() {
    document.getElementById('quiz-active').style.display = 'none'
    document.getElementById('quiz-results').style.display = 'block'
    const pct = Math.round((score / questions.length) * 100)
    document.getElementById('res-emoji').textContent = pct >= 80 ? '🎉' : pct >= 50 ? '💪' : '📖'
    document.getElementById('res-title').textContent = pct >= 80 ? 'Excellent work!' : pct >= 50 ? 'Good effort!' : 'Keep studying!'
    document.getElementById('res-score').textContent = score + ' / ' + questions.length + ' correct (' + pct + '%)'
    document.getElementById('res-xp').textContent = '+' + xp + ' XP earned'
    document.getElementById('res-xp-status').textContent = 'Saving...'
    document.getElementById('res-breakdown').textContent = pct >= 80 ? 'You clearly know this topic well. Try another one!' : pct >= 50 ? 'You are getting there. Review the ones you missed and try again.' : 'No worries — review the material and come back. You got this!'
    document.getElementById('res-retry').onclick = () => startQuiz(currentTopic)
    document.getElementById('res-pick').onclick = () => {
      document.getElementById('quiz-results').style.display = 'none'
      document.getElementById('quiz-picker').style.display = 'block'
    }

    // Save XP and quiz count to Supabase
    saveResultsToSupabase()
  }
}