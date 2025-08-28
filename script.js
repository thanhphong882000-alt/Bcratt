<!DOCTYPE html><html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Demo Baccarat (Offline • Học tập)</title>
  <style>
    :root { --bg: #0b1220; --panel: #121a2b; --accent: #5eead4; --text: #e5e7eb; --muted: #9ca3af; --danger:#ef4444; --ok:#10b981; }
    * { box-sizing: border-box; }
    body { margin:0; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, Ubuntu, Cantarell, Helvetica Neue, Arial, "Apple Color Emoji", "Segoe UI Emoji"; background: radial-gradient(1000px 500px at 50% -30%, #1b2440 0%, #0b1220 60%); color: var(--text); }
    .wrap { max-width: 1100px; margin: 24px auto; padding: 16px; }
    .hdr { display:flex; align-items:center; justify-content:space-between; gap:16px; }
    .brand { font-weight: 800; font-size: 24px; letter-spacing: .5px; }
    .tag { font-size:12px; color: var(--muted); }
    .panel { background: linear-gradient(180deg, #131c30 0%, #0f1626 100%); border:1px solid rgba(255,255,255,.06); border-radius: 16px; padding: 16px; box-shadow: 0 10px 30px rgba(0,0,0,.4); }
    .grid { display:grid; grid-template-columns: 1.2fr .8fr; gap:16px; }
    .table { position:relative; border-radius: 18px; padding: 16px; background: radial-gradient(600px 240px at 50% 0, #12223e, #0c1426 70%); border:1px dashed rgba(255,255,255,.08); min-height: 340px; overflow:hidden; }
    .zones { display:grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 8px; }
    .zone { border-radius: 14px; padding: 14px; text-align:center; border:1px solid rgba(255,255,255,.06); background: rgba(255,255,255,.03); cursor:pointer; transition:.2s; }
    .zone:hover { transform: translateY(-2px); background: rgba(94,234,212,.08); }
    .zone.active { outline:2px solid var(--accent); background: rgba(94,234,212,.12); }
    .zone .title { font-size:14px; letter-spacing:.4px; color:#cbd5e1; }
    .zone .payout { font-size:11px; color: var(--muted); }
    .cards { display:flex; gap:8px; justify-content:center; align-items:center; min-height: 120px; margin:10px 0 4px; }
    .card { width:72px; height:104px; border-radius:10px; background:#fff; position:relative; box-shadow:0 8px 20px rgba(0,0,0,.45); color:#111; display:flex; justify-content:center; align-items:center; font-weight:700; font-size:22px; }
    .card .suit { position:absolute; bottom:6px; right:8px; font-size:18px; opacity:.8; }
    .label { text-transform:uppercase; font-size:12px; color:#a5b4fc; letter-spacing:.6px; }
    .who { display:grid; grid-template-columns: 1fr 1fr; gap:12px; }
    .tot { font-size:13px; color:var(--muted); text-align:center; margin-bottom:6px; }
    .controls { display:flex; gap:10px; flex-wrap:wrap; align-items:center; }
    .btn { background:#101828; border:1px solid rgba(255,255,255,.08); color:#e5e7eb; padding:10px 14px; border-radius:12px; cursor:pointer; transition:.15s; font-weight:700; }
    .btn:hover { transform: translateY(-1px); border-color: rgba(94,234,212,.6); }
    .btn.primary { background: linear-gradient(90deg, #22d3ee, #14b8a6); color:#031318; }
    .stack { display:flex; gap:8px; align-items:center; flex-wrap:wrap; }
    .chip { width:44px; height:44px; border-radius:999px; display:flex; justify-content:center; align-items:center; background:#0f172a; border:2px solid rgba(255,255,255,.1); font-weight:800; cursor:pointer; }
    .chip.active { outline: 3px solid var(--accent); }
    .status { font-size:14px; color:#cbd5e1; min-height: 24px; }
    .side { display:grid; gap:16px; }
    .metric { display:flex; align-items:center; justify-content:space-between; font-weight:700; }
    .muted { color: var(--muted); font-weight:500; }
    .hist { display:grid; grid-template-columns: repeat(10, 1fr); gap:6px; }
    .dot { width:18px; height:18px; border-radius:999px; opacity:.9; }
    .dot.P { background:#60a5fa; }
    .dot.B { background:#f97316; }
    .dot.T { background:#22d3ee; }
    .warn { font-size:12px; color:#94a3b8; line-height:1.4; }
    .sep { height:1px; background: rgba(255,255,255,.08); margin:8px 0; }
    .small { font-size:12px; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="hdr">
      <div>
        <div class="brand">Baccarat Demo <span class="tag">(offline • học tập • không tiền thật)</span></div>
      </div>
      <div class="metric"><span class="muted">Phiên bản</span>&nbsp;<span>v0.1</span></div>
    </div><div class="grid">
  <div class="panel table">
    <div class="who">
      <div>
        <div class="label">Player</div>
        <div class="cards" id="player-cards"></div>
        <div class="tot" id="player-total">Tổng: 0</div>
      </div>
      <div>
        <div class="label">Banker</div>
        <div class="cards" id="banker-cards"></div>
        <div class="tot" id="banker-total">Tổng: 0</div>
      </div>
    </div>

    <div class="zones">
      <div class="zone" data-bet="PLAYER">
        <div class="title">Cược Player</div>
        <div class="payout">Trả 1 : 1</div>
      </div>
      <div class="zone" data-bet="BANKER">
        <div class="title">Cược Banker</div>
        <div class="payout">Trả 0.95 : 1 (5% commission)</div>
      </div>
      <div class="zone" data-bet="TIE">
        <div class="title">Cược Tie</div>
        <div class="payout">Trả 8 : 1</div>
      </div>
    </div>

    <div class="sep"></div>

    <div class="controls">
      <div class="stack" id="chips">
        <div class="chip" data-amt="5">5</div>
        <div class="chip" data-amt="25">25</div>
        <div class="chip" data-amt="50">50</div>
        <div class="chip" data-amt="100">100</div>
        <div class="chip" data-amt="250">250</div>
      </div>
      <button class="btn" id="clear">Xóa cược</button>
      <button class="btn primary" id="deal">Deal</button>
      <div class="status" id="status"></div>
    </div>
  </div>

  <div class="side">
    <div class="panel">
      <div class="metric"><span class="muted">Số dư</span><span id="balance">1000</span></div>
      <div class="metric"><span class="muted">Cược hiện tại</span><span id="bet-desc">—</span></div>
      <div class="metric small"><span class="muted">Số ván đã chơi</span><span id="hands">0</span></div>
      <div class="sep"></div>
      <div class="muted small">Lịch sử kết quả (10 ván gần nhất)</div>
      <div class="hist" id="history"></div>
    </div>

    <div class="panel">
      <div style="font-weight:700; margin-bottom:6px;">Ghi chú quan trọng</div>
      <div class="warn">
        • Đây là demo offline để học UI/logic, không kết nối tiền thật, không dùng cho cờ bạc hay lừa đảo.<br/>
        • Kết quả dựa trên bộ bài ngẫu nhiên cục bộ (pseudo-RNG) và luật rút chuẩn Baccarat mini.<br/>
        • Đừng triển khai bản này cho hoạt động trái pháp luật. Tự chịu trách nhiệm khi sử dụng sai mục đích.
      </div>
    </div>
  </div>
</div>

  </div>  <script>
    // ===== Utility: Deck & Cards =====
    const SUITS = ['♠', '♥', '♦', '♣'];
    const RANKS = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
    function makeDeck(decks=6){
      const d=[];
      for(let n=0;n<decks;n++){
        for(const s of SUITS){
          for(const r of RANKS){ d.push({rank:r,suit:s}); }
        }
      }
      // Fisher–Yates
      for(let i=d.length-1;i>0;i--){
        const j = Math.floor(Math.random()*(i+1));
        [d[i],d[j]]=[d[j],d[i]];
      }
      return d;
    }
    function cardVal(rank){
      if(rank==='A') return 1;
      if(['10','J','Q','K'].includes(rank)) return 0;
      return parseInt(rank,10);
    }
    function handTotal(hand){
      const sum = hand.reduce((t,c)=> t + cardVal(c.rank), 0);
      return sum % 10;
    }

    // ===== Game State =====
    const state = {
      deck: makeDeck(6),
      balance: 1000,
      bet: { side:null, amt:0 },
      hands: 0,
      history: [] // [{winner:'P'|'B'|'T'}]
    };

    // ===== DOM =====
    const el = sel => document.querySelector(sel);
    const els = sel => Array.from(document.querySelectorAll(sel));
    const playerEl = el('#player-cards');
    const bankerEl = el('#banker-cards');
    const pTotEl = el('#player-total');
    const bTotEl = el('#banker-total');
    const zones = els('.zone');
    const chips = els('.chip');
    const statusEl = el('#status');
    const balanceEl = el('#balance');
    const betDescEl = el('#bet-desc');
    const handsEl = el('#hands');
    const historyEl = el('#history');

    function renderCard(c){
      const div = document.createElement('div');
      div.className = 'card';
      div.innerHTML = `<div>${c.rank}</div><div class="suit">${c.suit}</div>`;
      // Color tweak for red suits
      if(c.suit==='♥' || c.suit==='♦'){ div.style.color = '#c81e1e'; }
      return div;
    }

    function updateMeta(){
      balanceEl.textContent = state.balance;
      betDescEl.textContent = state.bet.side ? `${state.bet.side} — ${state.bet.amt}` : '—';
      handsEl.textContent = state.hands;
      historyEl.innerHTML = '';
      for(const h of state.history.slice(-10)){
        const d = document.createElement('div');
        d.className = 'dot ' + h.winner;
        d.title = h.winner==='P'?'Player':h.winner==='B'?'Banker':'Tie';
        historyEl.appendChild(d);
      }
    }

    function needReshuffle(){ return state.deck.length < 52; }

    function draw(){
      if(state.deck.length===0) state.deck = makeDeck(6);
      return state.deck.pop();
    }

    function clearBoard(){ playerEl.innerHTML=''; bankerEl.innerHTML=''; pTotEl.textContent='Tổng: 0'; bTotEl.textContent='Tổng: 0'; statusEl.textContent=''; }

    // ===== Betting UI =====
    zones.forEach(z=>{
      z.addEventListener('click', ()=>{
        zones.forEach(x=>x.classList.remove('active'));
        z.classList.add('active');
        state.bet.side = z.dataset.bet;
        updateMeta();
      });
    });
    chips.forEach(c=>{
      c.addEventListener('click', ()=>{
        chips.forEach(x=>x.classList.remove('active'));
        c.classList.add('active');
        const amt = parseInt(c.dataset.amt,10);
        state.bet.amt = amt;
        updateMeta();
      });
    });

    el('#clear').addEventListener('click', ()=>{
      state.bet.side = null; state.bet.amt = 0; zones.forEach(x=>x.classList.remove('active')); chips.forEach(x=>x.classList.remove('active')); updateMeta(); statusEl.textContent='Đã xóa cược.';
    });

    // ===== Baccarat Engine (mini rules) =====
    function dealHand(){
      if(!state.bet.side || !state.bet.amt){ statusEl.textContent = 'Chọn cửa và mức cược đã.'; return; }
      if(state.bet.amt > state.balance){ statusEl.textContent = 'Số dư không đủ.'; return; }
      clearBoard();
      if(needReshuffle()) state.deck = makeDeck(6);
      const player = [draw(), draw()];
      const banker = [draw(), draw()];

      player.forEach(c=>playerEl.appendChild(renderCard(c)));
      banker.forEach(c=>bankerEl.appendChild(renderCard(c)));

      let pt = handTotal(player);
      let bt = handTotal(banker);
      pTotEl.textContent = 'Tổng: ' + pt; bTotEl.textContent = 'Tổng: ' + bt;

      // Naturals
      if(pt>=8 || bt>=8){
        // stand both
      } else {
        let playerDrew = false; let playerThird = null;
        if(pt<=5){ playerThird = draw(); player.push(playerThird); playerEl.appendChild(renderCard(playerThird)); pt = handTotal(player); pTotEl.textContent = 'Tổng: ' + pt; playerDrew = true; }
        // Banker action
        bt = handTotal(banker);
        if(!playerDrew){
          if(bt<=5){ const c = draw(); banker.push(c); bankerEl.appendChild(renderCard(c)); bt = handTotal(banker); bTotEl.textContent = 'Tổng: ' + bt; }
        } else {
          const v = cardVal(playerThird.rank);
          if(bt<=2){ const c = draw(); banker.push(c); bankerEl.appendChild(renderCard(c)); }
          else if(bt===3 && v!==8){ const c = draw(); banker.push(c); bankerEl.appendChild(renderCard(c)); }
          else if(bt===4 && (v>=2 && v<=7)){ const c = draw(); banker.push(c); bankerEl.appendChild(renderCard(c)); }
          else if(bt===5 && (v>=4 && v<=7)){ const c = draw(); banker.push(c); bankerEl.appendChild(renderCard(c)); }
          else if(bt===6 && (v===6 || v===7)){ const c = draw(); banker.push(c); bankerEl.appendChild(renderCard(c)); }
          bt = handTotal(banker); bTotEl.textContent = 'Tổng: ' + bt;
        }
      }

      // Decide winner
      pt = handTotal(player); bt = handTotal(banker);
      let winner = 'T';
      if(pt>bt) winner = 'P'; else if(bt>pt) winner = 'B';

      // Payouts
      state.balance -= state.bet.amt;
      let winText = '';
      if(state.bet.side==='PLAYER' && winner==='P'){
        state.balance += state.bet.amt * 2; winText = 'Thắng cửa Player (+' + state.bet.amt + ')';
      } else if(state.bet.side==='BANKER' && winner==='B'){
        const pay = state.bet.amt * (1 + 0.95); state.balance += pay; winText = 'Thắng cửa Banker (+' + Math.round(state.bet.amt*0.95) + ' sau commission)';
      } else if(state.bet.side==='TIE' && winner==='T'){
        state.balance += state.bet.amt * 9; winText = 'Thắng cửa Tie (+' + state.bet.amt*8 + ')';
      } else {
        winText = 'Thua ván này.';
      }
      statusEl.textContent = `Kết quả: ${winner==='P'?'Player':winner==='B'?'Banker':'Tie'}. ${winText}`;
      state.history.push({winner});
      state.hands += 1;
      updateMeta();
    }

    el('#deal').addEventListener('click', dealHand);

    // init
    updateMeta();
  </script></body>
</html>
