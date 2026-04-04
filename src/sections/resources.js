export function resourcesHTML() {
  return `
    <div class="dtop">
      <div>
        <h1 class="dtitle">Resources 📚</h1>
        <p class="dsub">Free study materials to help you pass</p>
      </div>
    </div>
    <div class="res-grid">
      <a class="res-box" href="https://www.ciscopress.com/store/ccna-200-301-official-cert-guide-library-9781587147142" target="_blank">
        <div class="res-box-icon" style="background:#FFF3D6;">📘</div>
        <div class="res-box-info">
          <div class="res-box-title">CCNA Official Study Guide</div>
          <div class="res-box-meta">Cisco Press · Free sample chapters</div>
        </div>
        <span class="res-box-tag">CCNA</span>
      </a>
      <a class="res-box" href="https://www.professormesser.com/network-plus/n10-008/n10-008-video/n10-008-training-course/" target="_blank">
        <div class="res-box-icon" style="background:#E3EDF2;">📗</div>
        <div class="res-box-info">
          <div class="res-box-title">Professor Messer Network+ Notes</div>
          <div class="res-box-meta">Free PDF study notes · All objectives</div>
        </div>
        <span class="res-box-tag">Network+</span>
      </a>
      <a class="res-box" href="https://www.subnet-calculator.com/subnet.php" target="_blank">
        <div class="res-box-icon" style="background:#FDECEA;">📊</div>
        <div class="res-box-info">
          <div class="res-box-title">Subnetting Cheat Sheet</div>
          <div class="res-box-meta">CIDR, subnet masks, wildcard masks</div>
        </div>
        <span class="res-box-tag">Subnetting</span>
      </a>
      <a class="res-box" href="https://www.cloudflare.com/learning/ddos/glossary/open-systems-interconnection-model-osi/" target="_blank">
        <div class="res-box-icon" style="background:#F0F4F7;">🗂️</div>
        <div class="res-box-info">
          <div class="res-box-title">OSI Model Reference Card</div>
          <div class="res-box-meta">All 7 layers, protocols, and devices</div>
        </div>
        <span class="res-box-tag">Fundamentals</span>
      </a>
      <a class="res-box" href="https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/fundamentals/command/cf_command_ref.html" target="_blank">
        <div class="res-box-icon" style="background:#E8F5E9;">💻</div>
        <div class="res-box-info">
          <div class="res-box-title">Cisco IOS Command Reference</div>
          <div class="res-box-meta">Official free Cisco CLI reference</div>
        </div>
        <span class="res-box-tag">CLI</span>
      </a>
      <a class="res-box" href="https://www.netacad.com/courses/packet-tracer" target="_blank">
        <div class="res-box-icon" style="background:#EDE7F6;">🔧</div>
        <div class="res-box-info">
          <div class="res-box-title">Cisco Packet Tracer</div>
          <div class="res-box-meta">Free network simulator · No hardware needed</div>
        </div>
        <span class="res-box-tag">Tools</span>
      </a>
    </div>
  `
}