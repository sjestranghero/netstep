import '../styles/certguide.css'

export function certguideHTML() {
  return `
    <div class="dtop">
      <div>
        <h1 class="dtitle">Certification Guide</h1>
        <p class="dsub">Step-by-step roadmap to earn your Cisco cert in 2026</p>
      </div>
    </div>

    <div class="cg-wrap">

      <!-- Cert Selector Tabs -->
      <div class="cg-tabs">
        <button class="cg-tab active" data-cert="ccna">CCNA</button>
        <button class="cg-tab" data-cert="ccnp">CCNP Enterprise</button>
        <button class="cg-tab" data-cert="ccie">CCIE</button>
        <button class="cg-tab" data-cert="devnet">DevNet Associate</button>
        <button class="cg-tab" data-cert="cyberops">CyberOps Associate</button>
      </div>

      <!-- CCNA -->
      <div class="cg-panel active" data-panel="ccna">
        <div class="cg-hero">
          <div class="cg-hero-left">
            <div class="cg-badge ccna-badge">CCNA</div>
            <div>
              <h2 class="cg-cert-title">Cisco Certified Network Associate</h2>
              <p class="cg-cert-sub">Exam: 200-301 · Valid 3 years · No prerequisites</p>
              <div class="cg-tags">
                <span class="cg-tag">Networking Fundamentals</span>
                <span class="cg-tag">IP Services</span>
                <span class="cg-tag">Security</span>
                <span class="cg-tag">Automation</span>
              </div>
            </div>
          </div>
          <div class="cg-hero-right">
            <div class="cg-cost-card">
              <div class="cg-cost-label">Exam Fee</div>
              <div class="cg-cost-value">$330 <span class="cg-cost-unit">USD</span></div>
              <div class="cg-cost-note">via Pearson VUE · Global fixed price</div>
            </div>
            <div class="cg-cost-card">
              <div class="cg-cost-label">Total Budget (Est.)</div>
              <div class="cg-cost-value">$600–$3,000</div>
              <div class="cg-cost-note">Exam + study materials + courses</div>
            </div>
          </div>
        </div>

        <div class="cg-section-title">📋 Exam Scope (2026)</div>
        <div class="cg-scope-grid">
          <div class="cg-scope-card"><div class="cg-scope-pct">20%</div><div class="cg-scope-topic">Network Fundamentals</div><div class="cg-scope-desc">OSI/TCP-IP models, IPv4/IPv6, switching, cabling</div></div>
          <div class="cg-scope-card"><div class="cg-scope-pct">20%</div><div class="cg-scope-topic">Network Access</div><div class="cg-scope-desc">VLANs, trunking, STP, EtherChannel, wireless basics</div></div>
          <div class="cg-scope-card"><div class="cg-scope-pct">25%</div><div class="cg-scope-topic">IP Connectivity</div><div class="cg-scope-desc">Static routing, OSPFv2, first-hop redundancy</div></div>
          <div class="cg-scope-card"><div class="cg-scope-pct">10%</div><div class="cg-scope-topic">IP Services</div><div class="cg-scope-desc">NAT, NTP, DHCP, DNS, QoS, SNMP</div></div>
          <div class="cg-scope-card"><div class="cg-scope-pct">15%</div><div class="cg-scope-topic">Security Fundamentals</div><div class="cg-scope-desc">ACLs, VPNs, port security, AAA basics</div></div>
          <div class="cg-scope-card"><div class="cg-scope-pct">10%</div><div class="cg-scope-topic">Automation & Programmability</div><div class="cg-scope-desc">REST APIs, Python basics, Ansible, JSON, YANG</div></div>
        </div>

        <div class="cg-section-title">🗺️ Step-by-Step Guide</div>
        <div class="cg-steps">
          <div class="cg-step">
            <div class="cg-step-num">1</div>
            <div class="cg-step-body">
              <div class="cg-step-title">Create a Cisco account</div>
              <div class="cg-step-desc">Go to <strong>cisco.com</strong> → click "Sign In" → "Create Account". This is required to access Cisco U and schedule exams. It's free.</div>
            </div>
          </div>
          <div class="cg-step">
            <div class="cg-step-num">2</div>
            <div class="cg-step-body">
              <div class="cg-step-title">Study the exam topics</div>
              <div class="cg-step-desc">Download the official exam blueprint from <strong>cisco.com/go/ccna</strong>. Study using free resources: Cisco Networking Academy (skillsforall.com), Jeremy's IT Lab on YouTube, or paid platforms like CBT Nuggets / Udemy. Budget 100–150 hours of study time.</div>
            </div>
          </div>
          <div class="cg-step">
            <div class="cg-step-num">3</div>
            <div class="cg-step-body">
              <div class="cg-step-title">Practice with labs</div>
              <div class="cg-step-desc">Use <strong>Cisco Packet Tracer</strong> (free via Cisco NetAcad) or GNS3 for hands-on CLI practice. Aim to configure OSPF, VLANs, ACLs, and NAT from memory before booking your exam.</div>
            </div>
          </div>
          <div class="cg-step">
            <div class="cg-step-num">4</div>
            <div class="cg-step-body">
              <div class="cg-step-title">Create a Pearson VUE account</div>
              <div class="cg-step-desc">Go to <strong>pearsonvue.com/cisco</strong> → Create an account using the same email as your Cisco account. This is where you purchase your exam voucher and schedule your test date.</div>
            </div>
          </div>
          <div class="cg-step">
            <div class="cg-step-num">5</div>
            <div class="cg-step-body">
              <div class="cg-step-title">Purchase your exam voucher</div>
              <div class="cg-step-desc">Search for exam <strong>200-301 CCNA</strong> on Pearson VUE → pay <strong>$330 USD</strong>. Vouchers expire in 1 year — don't buy until you're close to ready. No refunds once purchased.</div>
            </div>
          </div>
          <div class="cg-step">
            <div class="cg-step-num">6</div>
            <div class="cg-step-body">
              <div class="cg-step-title">Schedule your exam</div>
              <div class="cg-step-desc">Choose between <strong>test center</strong> (in-person, usually in your nearest city) or <strong>OnVUE at home</strong> (online proctored, no extra cost). Pick a date 2–4 weeks out to give yourself final review time. You can reschedule up to 24–48 hours before with no penalty.</div>
            </div>
          </div>
          <div class="cg-step">
            <div class="cg-step-num">7</div>
            <div class="cg-step-body">
              <div class="cg-step-title">Take the exam</div>
              <div class="cg-step-desc">The CCNA is ~120 minutes, ~100 questions (MCQ, drag-and-drop, simlets). Passing score is around 825/1000. If you fail, you must wait <strong>5 calendar days</strong> before retaking (same full $330 fee).</div>
            </div>
          </div>
          <div class="cg-step">
            <div class="cg-step-num">8</div>
            <div class="cg-step-body">
              <div class="cg-step-title">Receive your certificate</div>
              <div class="cg-step-desc">Your CCNA is valid for <strong>3 years</strong>. You'll receive a digital badge via Credly. To renew: retake the CCNA ($330), pass a CCNP exam (automatically renews CCNA), or earn 30 Continuing Education credits through Cisco U (can be free).</div>
            </div>
          </div>
        </div>

        <div class="cg-tip-box">
          <div class="cg-tip-icon">💡</div>
          <div><strong>Philippine Tip:</strong> Check if your school is a <strong>Cisco Networking Academy</strong> partner — students often get up to 50% off exam vouchers. The Pearson VUE test center in Manila (Ortigas / BGC) is the most accessible for NCR-based students.</div>
        </div>
      </div>

      <!-- CCNP -->
      <div class="cg-panel" data-panel="ccnp">
        <div class="cg-hero">
          <div class="cg-hero-left">
            <div class="cg-badge ccnp-badge">CCNP</div>
            <div>
              <h2 class="cg-cert-title">Cisco Certified Network Professional — Enterprise</h2>
              <p class="cg-cert-sub">2 Exams: ENCOR (350-401) + 1 Concentration · Valid 3 years</p>
              <div class="cg-tags">
                <span class="cg-tag">Enterprise Networking</span>
                <span class="cg-tag">SD-WAN</span>
                <span class="cg-tag">Automation</span>
                <span class="cg-tag">Troubleshooting</span>
              </div>
            </div>
          </div>
          <div class="cg-hero-right">
            <div class="cg-cost-card">
              <div class="cg-cost-label">Core Exam (ENCOR)</div>
              <div class="cg-cost-value">$400 <span class="cg-cost-unit">USD</span></div>
              <div class="cg-cost-note">350-401 · Also qualifies for CCIE lab</div>
            </div>
            <div class="cg-cost-card">
              <div class="cg-cost-label">Concentration Exam</div>
              <div class="cg-cost-value">$300 <span class="cg-cost-unit">USD</span></div>
              <div class="cg-cost-note">Total: ~$700 for both exams</div>
            </div>
          </div>
        </div>

        <div class="cg-section-title">📋 ENCOR Core Scope (2026)</div>
        <div class="cg-scope-grid">
          <div class="cg-scope-card"><div class="cg-scope-pct">20%</div><div class="cg-scope-topic">Architecture</div><div class="cg-scope-desc">SD-Access, SD-WAN, Campus/WAN design</div></div>
          <div class="cg-scope-card"><div class="cg-scope-pct">25%</div><div class="cg-scope-topic">Virtualization</div><div class="cg-scope-desc">NFV, hypervisors, containers, VRF</div></div>
          <div class="cg-scope-card"><div class="cg-scope-pct">30%</div><div class="cg-scope-topic">Infrastructure</div><div class="cg-scope-desc">Layer 2/3, OSPF/EIGRP/BGP, QoS, multicast</div></div>
          <div class="cg-scope-card"><div class="cg-scope-pct">10%</div><div class="cg-scope-topic">Network Assurance</div><div class="cg-scope-desc">IP SLA, SPAN, NetFlow, DNA Center</div></div>
          <div class="cg-scope-card"><div class="cg-scope-pct">10%</div><div class="cg-scope-topic">Security</div><div class="cg-scope-desc">ZBFW, 802.1X, MACsec, TrustSec</div></div>
          <div class="cg-scope-card"><div class="cg-scope-pct">5%</div><div class="cg-scope-topic">Automation</div><div class="cg-scope-desc">Python, REST APIs, Ansible, Terraform</div></div>
        </div>

        <div class="cg-section-title">🎯 Concentration Options</div>
        <div class="cg-conc-grid">
          <div class="cg-conc-card"><div class="cg-conc-code">300-410</div><div class="cg-conc-name">ENARSI</div><div class="cg-conc-desc">Advanced routing & services (most popular)</div></div>
          <div class="cg-conc-card"><div class="cg-conc-code">300-415</div><div class="cg-conc-name">ENSDWI</div><div class="cg-conc-desc">SD-WAN solutions</div></div>
          <div class="cg-conc-card"><div class="cg-conc-code">300-420</div><div class="cg-conc-name">ENSLD</div><div class="cg-conc-desc">Enterprise network design</div></div>
          <div class="cg-conc-card"><div class="cg-conc-code">300-425</div><div class="cg-conc-name">ENWLSD</div><div class="cg-conc-desc">Wireless network design</div></div>
          <div class="cg-conc-card"><div class="cg-conc-code">300-430</div><div class="cg-conc-name">ENWLSI</div><div class="cg-conc-desc">Wireless network implementation</div></div>
          <div class="cg-conc-card"><div class="cg-conc-code">300-435</div><div class="cg-conc-name">ENAUTO</div><div class="cg-conc-desc">Automating enterprise solutions</div></div>
        </div>

        <div class="cg-section-title">🗺️ Step-by-Step Guide</div>
        <div class="cg-steps">
          <div class="cg-step"><div class="cg-step-num">1</div><div class="cg-step-body"><div class="cg-step-title">Have CCNA-level knowledge</div><div class="cg-step-desc">CCNA is no longer a prerequisite since 2020, but CCNP builds heavily on those concepts. Most candidates pass CCNA first before attempting CCNP.</div></div></div>
          <div class="cg-step"><div class="cg-step-num">2</div><div class="cg-step-body"><div class="cg-step-title">Choose your concentration</div><div class="cg-step-desc">ENARSI (300-410) is the most popular choice for general network engineers. Pick SD-WAN or wireless tracks if those are your specialty. You only need 1 concentration exam.</div></div></div>
          <div class="cg-step"><div class="cg-step-num">3</div><div class="cg-step-body"><div class="cg-step-title">Schedule and pass the ENCOR core exam (350-401)</div><div class="cg-step-desc">Via Pearson VUE — $400. This 120-minute exam covers all enterprise domains. Passing ENCOR also qualifies you to sit the CCIE lab exam in the future.</div></div></div>
          <div class="cg-step"><div class="cg-step-num">4</div><div class="cg-step-body"><div class="cg-step-title">Schedule and pass your concentration exam</div><div class="cg-step-desc">$300 via Pearson VUE. You have 3 years from passing ENCOR to complete a concentration. Passing any concentration automatically renews your CCNA too.</div></div></div>
          <div class="cg-step"><div class="cg-step-num">5</div><div class="cg-step-body"><div class="cg-step-title">Receive CCNP Enterprise certificate</div><div class="cg-step-desc">Valid for 3 years. To renew: pass any CCNP exam, earn 80 Cisco CE credits, or pass any CCIE/CCDE exam.</div></div></div>
        </div>

        <div class="cg-tip-box">
          <div class="cg-tip-icon">💡</div>
          <div><strong>Career note:</strong> CCNP-certified professionals in the US earn <strong>$70,000–$110,000/year</strong>. In the Philippines, CCNP holders in enterprise IT typically earn ₱60,000–₱120,000/month in senior network engineer roles.</div>
        </div>
      </div>

      <!-- CCIE -->
      <div class="cg-panel" data-panel="ccie">
        <div class="cg-hero">
          <div class="cg-hero-left">
            <div class="cg-badge ccie-badge">CCIE</div>
            <div>
              <h2 class="cg-cert-title">Cisco Certified Internetwork Expert</h2>
              <p class="cg-cert-sub">Written (shared with CCNP) + 8-hour Lab Exam · Expert level</p>
              <div class="cg-tags">
                <span class="cg-tag">Expert Level</span>
                <span class="cg-tag">Lab Exam</span>
                <span class="cg-tag">Most Respected Cisco Cert</span>
              </div>
            </div>
          </div>
          <div class="cg-hero-right">
            <div class="cg-cost-card">
              <div class="cg-cost-label">Written Exam (ENCOR)</div>
              <div class="cg-cost-value">$400 <span class="cg-cost-unit">USD</span></div>
              <div class="cg-cost-note">Shared with CCNP Enterprise</div>
            </div>
            <div class="cg-cost-card">
              <div class="cg-cost-label">8-Hour Lab Exam</div>
              <div class="cg-cost-value">$1,600–$1,900</div>
              <div class="cg-cost-note">At select Cisco labs worldwide</div>
            </div>
          </div>
        </div>

        <div class="cg-section-title">🗺️ Step-by-Step Guide</div>
        <div class="cg-steps">
          <div class="cg-step"><div class="cg-step-num">1</div><div class="cg-step-body"><div class="cg-step-title">Pass the CCNP ENCOR written exam (350-401)</div><div class="cg-step-desc">This $400 written exam also qualifies you for the CCIE lab. So passing ENCOR is your gateway to both CCNP and CCIE tracks simultaneously.</div></div></div>
          <div class="cg-step"><div class="cg-step-num">2</div><div class="cg-step-body"><div class="cg-step-title">Prepare intensively for the lab (1–3 years)</div><div class="cg-step-desc">The CCIE lab is 8 hours of hands-on configuration and troubleshooting. Most candidates spend 1–3 years preparing. Use rack rental services, Cisco dCloud, or cloud labs.</div></div></div>
          <div class="cg-step"><div class="cg-step-num">3</div><div class="cg-step-body"><div class="cg-step-title">Book your lab exam seat</div><div class="cg-step-desc">Only available at <strong>8 Cisco lab locations worldwide</strong> (including Sydney, Tokyo, Brussels, San Jose). Nearest to PH: Tokyo or Sydney. Book months in advance as seats fill fast.</div></div></div>
          <div class="cg-step"><div class="cg-step-num">4</div><div class="cg-step-body"><div class="cg-step-title">Choose lab format</div><div class="cg-step-desc"><strong>Cisco-provided kit:</strong> $1,900 — Cisco supplies all hardware. <strong>BYOD (Bring Your Own Device):</strong> $1,600 — you bring your own laptop/devices. Budget for flights + hotel if traveling abroad.</div></div></div>
          <div class="cg-step"><div class="cg-step-num">5</div><div class="cg-step-body"><div class="cg-step-title">Retake policy</div><div class="cg-step-desc">If you fail the lab, wait <strong>15 calendar days</strong> before retaking. Full $1,600–$1,900 fee per attempt. CCIE is valid for 3 years; renewed by passing any CCIE recert exam or earning CE credits.</div></div></div>
        </div>

        <div class="cg-tip-box">
          <div class="cg-tip-icon">⚠️</div>
          <div><strong>Reality check:</strong> CCIE is one of the most difficult IT certifications in the world. Total investment (exams + travel + study materials) often exceeds <strong>$10,000–$20,000</strong>. It's typically pursued after several years of real-world CCNP-level experience.</div>
        </div>
      </div>

      <!-- DevNet -->
      <div class="cg-panel" data-panel="devnet">
        <div class="cg-hero">
          <div class="cg-hero-left">
            <div class="cg-badge devnet-badge">DevNet</div>
            <div>
              <h2 class="cg-cert-title">Cisco Certified DevNet Associate</h2>
              <p class="cg-cert-sub">Exam: 200-901 DEVASC · Valid 3 years · No prerequisites</p>
              <div class="cg-tags">
                <span class="cg-tag">Network Automation</span>
                <span class="cg-tag">Python</span>
                <span class="cg-tag">REST APIs</span>
                <span class="cg-tag">DevOps</span>
              </div>
            </div>
          </div>
          <div class="cg-hero-right">
            <div class="cg-cost-card">
              <div class="cg-cost-label">Exam Fee</div>
              <div class="cg-cost-value">$300 <span class="cg-cost-unit">USD</span></div>
              <div class="cg-cost-note">via Pearson VUE · Exam 200-901</div>
            </div>
            <div class="cg-cost-card">
              <div class="cg-cost-label">Ideal For</div>
              <div class="cg-cost-value" style="font-size:1rem; font-weight:600;">Network + Dev</div>
              <div class="cg-cost-note">Software-defined networking focus</div>
            </div>
          </div>
        </div>

        <div class="cg-section-title">📋 Exam Scope (2026)</div>
        <div class="cg-scope-grid">
          <div class="cg-scope-card"><div class="cg-scope-pct">15%</div><div class="cg-scope-topic">Software Development</div><div class="cg-scope-desc">Python, data formats (JSON, XML, YAML), Git</div></div>
          <div class="cg-scope-card"><div class="cg-scope-pct">20%</div><div class="cg-scope-topic">Understanding APIs</div><div class="cg-scope-desc">REST, RESTCONF, NETCONF, gRPC</div></div>
          <div class="cg-scope-card"><div class="cg-scope-pct">15%</div><div class="cg-scope-topic">Cisco Platforms</div><div class="cg-scope-desc">DNA Center, Meraki, Webex, SD-WAN APIs</div></div>
          <div class="cg-scope-card"><div class="cg-scope-pct">15%</div><div class="cg-scope-topic">Application Deployment</div><div class="cg-scope-desc">Docker, Kubernetes, CI/CD, Ansible, Terraform</div></div>
          <div class="cg-scope-card"><div class="cg-scope-pct">20%</div><div class="cg-scope-topic">Infrastructure Automation</div><div class="cg-scope-desc">IaC, model-driven programmability, data models</div></div>
          <div class="cg-scope-card"><div class="cg-scope-pct">15%</div><div class="cg-scope-topic">Network Fundamentals</div><div class="cg-scope-desc">TCP/IP, routing basics, SDN concepts</div></div>
        </div>

        <div class="cg-tip-box">
          <div class="cg-tip-icon">💡</div>
          <div><strong>Who should take this?</strong> If you're interested in <strong>network automation, Python scripting, or DevOps for networking</strong>, DevNet Associate is the right cert. It pairs well with CCNA for a modern network engineer profile in 2026.</div>
        </div>
      </div>

      <!-- CyberOps -->
      <div class="cg-panel" data-panel="cyberops">
        <div class="cg-hero">
          <div class="cg-hero-left">
            <div class="cg-badge cyber-badge">CyberOps</div>
            <div>
              <h2 class="cg-cert-title">Cisco CyberOps Associate</h2>
              <p class="cg-cert-sub">Exam: 200-201 CBROPS · Valid 3 years · No prerequisites</p>
              <div class="cg-tags">
                <span class="cg-tag">SOC Operations</span>
                <span class="cg-tag">Threat Analysis</span>
                <span class="cg-tag">Incident Response</span>
                <span class="cg-tag">Forensics</span>
              </div>
            </div>
          </div>
          <div class="cg-hero-right">
            <div class="cg-cost-card">
              <div class="cg-cost-label">Exam Fee</div>
              <div class="cg-cost-value">$300 <span class="cg-cost-unit">USD</span></div>
              <div class="cg-cost-note">via Pearson VUE · Exam 200-201</div>
            </div>
            <div class="cg-cost-card">
              <div class="cg-cost-label">Ideal For</div>
              <div class="cg-cost-value" style="font-size:1rem; font-weight:600;">SOC Analysts</div>
              <div class="cg-cost-note">Cybersecurity operations career path</div>
            </div>
          </div>
        </div>

        <div class="cg-section-title">📋 Exam Scope (2026)</div>
        <div class="cg-scope-grid">
          <div class="cg-scope-card"><div class="cg-scope-pct">20%</div><div class="cg-scope-topic">Security Concepts</div><div class="cg-scope-desc">CIA triad, threat landscape, vulnerability management</div></div>
          <div class="cg-scope-card"><div class="cg-scope-pct">25%</div><div class="cg-scope-topic">Security Monitoring</div><div class="cg-scope-desc">SIEM, log analysis, packet analysis, NetFlow</div></div>
          <div class="cg-scope-card"><div class="cg-scope-pct">20%</div><div class="cg-scope-topic">Host-Based Analysis</div><div class="cg-scope-desc">Endpoint security, malware analysis, Windows/Linux</div></div>
          <div class="cg-scope-card"><div class="cg-scope-pct">20%</div><div class="cg-scope-topic">Network Intrusion Analysis</div><div class="cg-scope-desc">IDS/IPS, network attacks, evidence investigation</div></div>
          <div class="cg-scope-card"><div class="cg-scope-pct">15%</div><div class="cg-scope-topic">Security Policies & Procedures</div><div class="cg-scope-desc">Incident response, SOC playbooks, compliance</div></div>
        </div>

        <div class="cg-tip-box">
          <div class="cg-tip-icon">💡</div>
          <div><strong>Who should take this?</strong> If you want to work as a <strong>SOC Analyst or Cybersecurity Analyst</strong>, CyberOps Associate is your starting point. It's highly valued alongside CompTIA Security+ for entry-level blue team roles.</div>
        </div>
      </div>

      <!-- Certification Roadmap -->
      <div class="cg-section-title" style="margin-top:32px;">🛤️ Certification Roadmap</div>
      <div class="cg-roadmap">
        <div class="cg-roadmap-col">
          <div class="cg-roadmap-header entry">Entry Level</div>
          <div class="cg-roadmap-item">CCT (Cisco Certified Technician) — $125</div>
        </div>
        <div class="cg-roadmap-arrow">→</div>
        <div class="cg-roadmap-col">
          <div class="cg-roadmap-header assoc">Associate</div>
          <div class="cg-roadmap-item">CCNA — $330</div>
          <div class="cg-roadmap-item">DevNet Associate — $300</div>
          <div class="cg-roadmap-item">CyberOps Associate — $300</div>
        </div>
        <div class="cg-roadmap-arrow">→</div>
        <div class="cg-roadmap-col">
          <div class="cg-roadmap-header prof">Professional</div>
          <div class="cg-roadmap-item">CCNP Enterprise — $700</div>
          <div class="cg-roadmap-item">CCNP Security — $700</div>
          <div class="cg-roadmap-item">CCNP Data Center — $700</div>
          <div class="cg-roadmap-item">DevNet Professional — $700</div>
        </div>
        <div class="cg-roadmap-arrow">→</div>
        <div class="cg-roadmap-col">
          <div class="cg-roadmap-header expert">Expert</div>
          <div class="cg-roadmap-item">CCIE Enterprise — $2,300+</div>
          <div class="cg-roadmap-item">CCIE Security — $2,300+</div>
          <div class="cg-roadmap-item">CCDE — $2,300+</div>
        </div>
      </div>

    </div>
  `
}

export function setupCertguide() {
  const tabs = document.querySelectorAll('.cg-tab')
  const panels = document.querySelectorAll('.cg-panel')

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const cert = tab.dataset.cert

      tabs.forEach(t => t.classList.remove('active'))
      panels.forEach(p => p.classList.remove('active'))

      tab.classList.add('active')
      const target = document.querySelector(`.cg-panel[data-panel="${cert}"]`)
      if (target) target.classList.add('active')
    })
  })
}
