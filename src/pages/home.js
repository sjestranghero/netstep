export function renderApp() {
  const app = document.getElementById('app')
  app.innerHTML = `
    <div class="landing">

      <nav class="nav">
        <div class="logo">NetStep <span class="logo-pill">BETA</span></div>
        <div class="nav-links">
          <a href="#">Features</a>
          <a href="#">About</a>
          <a href="#">Community</a>
        </div>
        <div class="nav-btns">
          <button class="bn1" id="btn-login">Log in</button>
          <button class="bn2" id="btn-start">Get started</button>
        </div>
      </nav>

      <section class="hero">
        <div class="hero-inner">
          <div class="hero-left">
            <div class="hero-tag">🇵🇭 Made for Filipino networking students</div>
            <h1>Master Networking. <em>Step by Step.</em></h1>
            <p>A guided platform for CCNA and cybersecurity prep — with gamified quizzes, a CLI lab simulator, and teacher-verified content. All free.</p>
            <div class="hero-btns">
              <button class="bp" id="btn-start2">Start learning free</button>
              <button class="bs">See how it works</button>
            </div>
            <div class="hero-stats">
              <div class="hs"><div class="hs-n">4</div><div class="hs-l">Learning paths</div></div>
              <div class="hs"><div class="hs-n">100+</div><div class="hs-l">Quiz questions</div></div>
              <div class="hs"><div class="hs-n">Free</div><div class="hs-l">Always</div></div>
            </div>
          </div>
          <div class="hero-right">
            <div class="qcard">
              <div class="qc-head">
                <span class="qc-title">🎯 Network Fundamentals</span>
                <span class="qc-badge">+10 XP</span>
              </div>
              <div class="qc-body">
                <div class="qc-q">Which OSI layer handles logical addressing?</div>
                <button class="qc-opt">A. Data Link Layer</button>
                <button class="qc-opt ok">B. Network Layer ✓</button>
                <button class="qc-opt no">C. Transport Layer ✗</button>
                <button class="qc-opt">D. Session Layer</button>
                <div class="qc-foot">
                  <span style="font-size:13px;">🔥</span>
                  <span class="qc-streak">3 streak</span>
                  <div class="qc-bar"><div class="qc-fill"></div></div>
                  <span class="qc-xp">45 XP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="features-section">
        <div class="features-inner">
          <div class="sec-eyebrow">What's inside</div>
          <div class="sec-h">Everything you need to pass</div>
          <div class="sec-sub">No prior experience needed. NetStep takes you from zero to certified.</div>
          <div class="feat-grid">
            <div class="fc"><div class="fc-ic" style="background:#FFF3D6;">⚡</div><h3>Guided Learning Paths</h3><p>Step-by-step modules built for beginners. Clear progress every day.</p></div>
            <div class="fc"><div class="fc-ic" style="background:#FDECEA;">🎯</div><h3>Gamified Quizzes</h3><p>Earn XP, maintain streaks, and climb the leaderboard.</p></div>
            <div class="fc"><div class="fc-ic" style="background:#E3EDF2;">💻</div><h3>CLI Lab Simulator</h3><p>Practice Cisco IOS commands safely. No hardware needed.</p></div>
            <div class="fc"><div class="fc-ic" style="background:#FFF3D6;">🛡️</div><h3>Teacher Moderation</h3><p>All content verified by real educators. Always accurate.</p></div>
            <div class="fc"><div class="fc-ic" style="background:#FDECEA;">🏆</div><h3>Section Leaderboard</h3><p>See your rank among classmates. Competition drives learning.</p></div>
            <div class="fc"><div class="fc-ic" style="background:#E3EDF2;">📶</div><h3>Works Offline</h3><p>Core lessons work even on slow connections. Built for PH.</p></div>
          </div>
        </div>
      </section>

      <section class="cta-band">
        <h2>Ready to pass your certification?</h2>
        <p>Join Filipino students already learning with NetStep. Free, guided, and it actually works.</p>
        <button class="cta-btn" id="btn-cta">Get started now — it's free</button>
      </section>

      <footer class="foot">
        <div class="foot-logo">NetStep</div>
        <div class="foot-txt">Made with 💛 for Filipino students · Free forever</div>
      </footer>

    </div>
  `

  injectStyles()

  document.getElementById('btn-login').addEventListener('click', goAuth)
  document.getElementById('btn-start').addEventListener('click', goAuth)
  document.getElementById('btn-start2').addEventListener('click', goAuth)
  document.getElementById('btn-cta').addEventListener('click', goAuth)
}

function goAuth() {
  import('./auth.js').then(m => m.renderAuth())
}

function injectStyles() {
  if (document.getElementById('home-styles')) return
  const s = document.createElement('style')
  s.id = 'home-styles'
  s.textContent = `
    .landing { min-height: 100vh; }

    .nav {
      background: var(--b);
      padding: 14px 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .logo {
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 21px;
      color: #fff;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .logo-pill {
      background: var(--y);
      color: var(--b);
      font-size: 9px;
      font-weight: 900;
      padding: 2px 8px;
      border-radius: 20px;
      letter-spacing: .5px;
    }
    .nav-links a {
      font-size: 13px;
      font-weight: 700;
      color: rgba(255,255,255,0.6);
      text-decoration: none;
      margin-left: 28px;
      transition: color .2s;
    }
    .nav-links a:hover { color: #fff; }
    .nav-btns { display: flex; gap: 8px; }
    .bn1 {
      background: rgba(255,255,255,0.1);
      border: 1.5px solid rgba(255,255,255,0.25);
      color: #fff;
      font-size: 13px;
      font-weight: 800;
      padding: 7px 18px;
      border-radius: 8px;
      transition: all .2s;
    }
    .bn1:hover { background: rgba(255,255,255,0.18); }
    .bn2 {
      background: var(--y);
      color: var(--b);
      font-size: 13px;
      font-weight: 900;
      padding: 7px 18px;
      border-radius: 8px;
      border: none;
      transition: all .2s;
    }
    .bn2:hover { opacity: .88; }

    .hero { background: var(--b); padding: 64px 40px 72px; }
    .hero-inner {
      max-width: 1060px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      gap: 56px;
    }
    .hero-left { flex: 1; }
    .hero-tag {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(232,165,25,0.15);
      border: 1.5px solid rgba(232,165,25,0.3);
      color: var(--y);
      font-size: 12px;
      font-weight: 800;
      padding: 5px 14px;
      border-radius: 20px;
      margin-bottom: 22px;
    }
    .hero h1 {
      font-family: var(--font-display);
      font-size: clamp(30px, 4vw, 48px);
      font-weight: 700;
      color: #fff;
      line-height: 1.15;
      margin-bottom: 16px;
    }
    .hero h1 em { color: var(--y); font-style: normal; display: block; }
    .hero p {
      font-size: 15px;
      color: rgba(255,255,255,0.6);
      line-height: 1.75;
      margin-bottom: 32px;
      max-width: 440px;
    }
    .hero-btns { display: flex; gap: 10px; margin-bottom: 36px; }
    .bp {
      background: var(--r);
      color: #fff;
      font-size: 15px;
      font-weight: 900;
      padding: 13px 30px;
      border-radius: 10px;
      border: none;
      transition: all .2s;
    }
    .bp:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(205,51,24,0.4); }
    .bs {
      background: rgba(255,255,255,0.1);
      color: #fff;
      font-size: 15px;
      font-weight: 800;
      padding: 13px 30px;
      border-radius: 10px;
      border: 1.5px solid rgba(255,255,255,0.2);
      transition: all .2s;
    }
    .bs:hover { background: rgba(255,255,255,0.16); }
    .hero-stats {
      display: flex;
      background: rgba(255,255,255,0.07);
      border-radius: 12px;
      overflow: hidden;
      border: 1.5px solid rgba(255,255,255,0.1);
    }
    .hs { flex: 1; padding: 12px 20px; text-align: center; border-right: 1px solid rgba(255,255,255,0.1); }
    .hs:last-child { border-right: none; }
    .hs-n { font-family: var(--font-display); font-size: 22px; font-weight: 700; color: var(--y); }
    .hs-l { font-size: 11px; font-weight: 700; color: rgba(255,255,255,0.45); margin-top: 2px; }

    .hero-right { flex: 0 0 300px; }
    .qcard {
      background: rgba(255,255,255,0.08);
      border: 1.5px solid rgba(255,255,255,0.12);
      border-radius: 16px;
      overflow: hidden;
    }
    .qc-head {
      background: rgba(0,0,0,0.2);
      padding: 12px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .qc-title { font-size: 12px; font-weight: 800; color: rgba(255,255,255,0.8); }
    .qc-badge {
      background: var(--y);
      color: var(--b);
      font-size: 10px;
      font-weight: 900;
      padding: 3px 10px;
      border-radius: 20px;
    }
    .qc-body { padding: 16px; }
    .qc-q { font-size: 13px; font-weight: 800; color: #fff; margin-bottom: 12px; line-height: 1.5; }
    .qc-opt {
      display: block;
      width: 100%;
      padding: 9px 13px;
      border-radius: 8px;
      border: 1.5px solid rgba(255,255,255,0.1);
      font-size: 12px;
      font-weight: 700;
      color: rgba(255,255,255,0.65);
      margin-bottom: 7px;
      background: rgba(255,255,255,0.05);
      text-align: left;
    }
    .qc-opt.ok { border-color: #4CAF50; background: rgba(76,175,80,0.15); color: #81C784; }
    .qc-opt.no { border-color: var(--r); background: rgba(205,51,24,0.15); color: #EF9A9A; }
    .qc-foot {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 10px;
      padding-top: 10px;
      border-top: 1.5px solid rgba(255,255,255,0.08);
    }
    .qc-streak { font-size: 11px; font-weight: 800; color: var(--y); }
    .qc-bar { flex: 1; height: 5px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden; }
    .qc-fill { height: 100%; background: var(--y); border-radius: 3px; width: 40%; }
    .qc-xp { font-size: 11px; font-weight: 800; color: #fff; }

    .features-section { padding: 64px 40px; }
    .features-inner { max-width: 1060px; margin: 0 auto; }
    .sec-eyebrow {
      font-size: 11px;
      font-weight: 900;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: var(--r);
      margin-bottom: 8px;
    }
    .sec-h { font-family: var(--font-display); font-size: 28px; font-weight: 700; color: var(--b); margin-bottom: 8px; }
    .sec-sub { font-size: 14px; color: var(--mut); margin-bottom: 36px; }
    .feat-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 14px;
    }
    .fc {
      background: var(--card);
      border: 2px solid var(--bdr);
      border-radius: 14px;
      padding: 22px;
      transition: all .2s;
    }
    .fc:hover { border-color: var(--b); transform: translateY(-3px); box-shadow: 0 8px 24px rgba(28,75,98,0.1); }
    .fc-ic { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 19px; margin-bottom: 14px; }
    .fc h3 { font-size: 14px; font-weight: 800; color: var(--b); margin-bottom: 6px; }
    .fc p { font-size: 12px; color: var(--mut); line-height: 1.65; }

    .cta-band {
      background: var(--r);
      padding: 52px 40px;
      text-align: center;
    }
    .cta-band h2 { font-family: var(--font-display); font-size: 26px; font-weight: 700; color: #fff; margin-bottom: 8px; }
    .cta-band p { font-size: 14px; color: rgba(255,255,255,0.65); margin-bottom: 26px; }
    .cta-btn {
      background: var(--y);
      color: var(--b);
      font-size: 15px;
      font-weight: 900;
      padding: 13px 36px;
      border-radius: 10px;
      border: none;
      transition: all .2s;
    }
    .cta-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.2); }

    .foot {
      background: var(--b);
      padding: 20px 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .foot-logo { font-family: var(--font-display); font-weight: 700; color: #fff; font-size: 16px; }
    .foot-txt { font-size: 12px; color: rgba(255,255,255,0.4); }

    @media (max-width: 768px) {
      .hero-inner { flex-direction: column; }
      .hero-right { display: none; }
      .feat-grid { grid-template-columns: 1fr; }
      .nav-links { display: none; }
    }
  `
  document.head.appendChild(s)
}