/* ═══════════════════════════════════════════════════════════
   ARC REACTOR ALARM CLOCK — MAIN SCRIPT
   Arc reactor canvas, world clocks, alarm management, audio
═══════════════════════════════════════════════════════════ */

"use strict";

// ── World Timezone Database ──────────────────────────────────
// format: { city, country, tz (IANA), flag }
const TZ_DATABASE = [
  // Americas
  { city:"New York",      country:"United States",  tz:"America/New_York",        flag:"🇺🇸" },
  { city:"Los Angeles",   country:"United States",  tz:"America/Los_Angeles",     flag:"🇺🇸" },
  { city:"Chicago",       country:"United States",  tz:"America/Chicago",         flag:"🇺🇸" },
  { city:"Toronto",       country:"Canada",         tz:"America/Toronto",         flag:"🇨🇦" },
  { city:"Vancouver",     country:"Canada",         tz:"America/Vancouver",       flag:"🇨🇦" },
  { city:"Mexico City",   country:"Mexico",         tz:"America/Mexico_City",     flag:"🇲🇽" },
  { city:"São Paulo",     country:"Brazil",         tz:"America/Sao_Paulo",       flag:"🇧🇷" },
  { city:"Buenos Aires",  country:"Argentina",      tz:"America/Argentina/Buenos_Aires", flag:"🇦🇷" },
  { city:"Santiago",      country:"Chile",          tz:"America/Santiago",        flag:"🇨🇱" },
  { city:"Bogotá",        country:"Colombia",       tz:"America/Bogota",          flag:"🇨🇴" },
  { city:"Lima",          country:"Peru",           tz:"America/Lima",            flag:"🇵🇪" },
  { city:"Caracas",       country:"Venezuela",      tz:"America/Caracas",         flag:"🇻🇪" },
  { city:"Havana",        country:"Cuba",           tz:"America/Havana",          flag:"🇨🇺" },
  // Europe
  { city:"London",        country:"United Kingdom", tz:"Europe/London",           flag:"🇬🇧" },
  { city:"Paris",         country:"France",         tz:"Europe/Paris",            flag:"🇫🇷" },
  { city:"Berlin",        country:"Germany",        tz:"Europe/Berlin",           flag:"🇩🇪" },
  { city:"Madrid",        country:"Spain",          tz:"Europe/Madrid",           flag:"🇪🇸" },
  { city:"Rome",          country:"Italy",          tz:"Europe/Rome",             flag:"🇮🇹" },
  { city:"Amsterdam",     country:"Netherlands",    tz:"Europe/Amsterdam",        flag:"🇳🇱" },
  { city:"Brussels",      country:"Belgium",        tz:"Europe/Brussels",         flag:"🇧🇪" },
  { city:"Zurich",        country:"Switzerland",    tz:"Europe/Zurich",           flag:"🇨🇭" },
  { city:"Vienna",        country:"Austria",        tz:"Europe/Vienna",           flag:"🇦🇹" },
  { city:"Warsaw",        country:"Poland",         tz:"Europe/Warsaw",           flag:"🇵🇱" },
  { city:"Prague",        country:"Czech Republic", tz:"Europe/Prague",           flag:"🇨🇿" },
  { city:"Stockholm",     country:"Sweden",         tz:"Europe/Stockholm",        flag:"🇸🇪" },
  { city:"Oslo",          country:"Norway",         tz:"Europe/Oslo",             flag:"🇳🇴" },
  { city:"Copenhagen",    country:"Denmark",        tz:"Europe/Copenhagen",       flag:"🇩🇰" },
  { city:"Helsinki",      country:"Finland",        tz:"Europe/Helsinki",         flag:"🇫🇮" },
  { city:"Athens",        country:"Greece",         tz:"Europe/Athens",           flag:"🇬🇷" },
  { city:"Bucharest",     country:"Romania",        tz:"Europe/Bucharest",        flag:"🇷🇴" },
  { city:"Budapest",      country:"Hungary",        tz:"Europe/Budapest",         flag:"🇭🇺" },
  { city:"Lisbon",        country:"Portugal",       tz:"Europe/Lisbon",           flag:"🇵🇹" },
  { city:"Dublin",        country:"Ireland",        tz:"Europe/Dublin",           flag:"🇮🇪" },
  { city:"Moscow",        country:"Russia",         tz:"Europe/Moscow",           flag:"🇷🇺" },
  { city:"Kyiv",          country:"Ukraine",        tz:"Europe/Kyiv",             flag:"🇺🇦" },
  { city:"Istanbul",      country:"Turkey",         tz:"Europe/Istanbul",         flag:"🇹🇷" },
  { city:"Reykjavik",     country:"Iceland",        tz:"Atlantic/Reykjavik",      flag:"🇮🇸" },
  // Middle East & Africa
  { city:"Dubai",         country:"UAE",            tz:"Asia/Dubai",              flag:"🇦🇪" },
  { city:"Riyadh",        country:"Saudi Arabia",   tz:"Asia/Riyadh",             flag:"🇸🇦" },
  { city:"Tehran",        country:"Iran",           tz:"Asia/Tehran",             flag:"🇮🇷" },
  { city:"Cairo",         country:"Egypt",          tz:"Africa/Cairo",            flag:"🇪🇬" },
  { city:"Nairobi",       country:"Kenya",          tz:"Africa/Nairobi",          flag:"🇰🇪" },
  { city:"Lagos",         country:"Nigeria",        tz:"Africa/Lagos",            flag:"🇳🇬" },
  { city:"Johannesburg",  country:"South Africa",   tz:"Africa/Johannesburg",     flag:"🇿🇦" },
  { city:"Casablanca",    country:"Morocco",        tz:"Africa/Casablanca",       flag:"🇲🇦" },
  { city:"Accra",         country:"Ghana",          tz:"Africa/Accra",            flag:"🇬🇭" },
  { city:"Addis Ababa",   country:"Ethiopia",       tz:"Africa/Addis_Ababa",      flag:"🇪🇹" },
  { city:"Dar es Salaam", country:"Tanzania",       tz:"Africa/Dar_es_Salaam",    flag:"🇹🇿" },
  { city:"Tel Aviv",      country:"Israel",         tz:"Asia/Jerusalem",          flag:"🇮🇱" },
  { city:"Baghdad",       country:"Iraq",           tz:"Asia/Baghdad",            flag:"🇮🇶" },
  { city:"Kuwait City",   country:"Kuwait",         tz:"Asia/Kuwait",             flag:"🇰🇼" },
  { city:"Doha",          country:"Qatar",          tz:"Asia/Qatar",              flag:"🇶🇦" },
  // Asia
  { city:"Kolkata",       country:"India",          tz:"Asia/Kolkata",            flag:"🇮🇳" },
  { city:"Mumbai",        country:"India",          tz:"Asia/Kolkata",            flag:"🇮🇳" },
  { city:"Delhi",         country:"India",          tz:"Asia/Kolkata",            flag:"🇮🇳" },
  { city:"Dhaka",         country:"Bangladesh",     tz:"Asia/Dhaka",              flag:"🇧🇩" },
  { city:"Karachi",       country:"Pakistan",       tz:"Asia/Karachi",            flag:"🇵🇰" },
  { city:"Kathmandu",     country:"Nepal",          tz:"Asia/Kathmandu",          flag:"🇳🇵" },
  { city:"Colombo",       country:"Sri Lanka",      tz:"Asia/Colombo",            flag:"🇱🇰" },
  { city:"Kabul",         country:"Afghanistan",    tz:"Asia/Kabul",              flag:"🇦🇫" },
  { city:"Tashkent",      country:"Uzbekistan",     tz:"Asia/Tashkent",           flag:"🇺🇿" },
  { city:"Almaty",        country:"Kazakhstan",     tz:"Asia/Almaty",             flag:"🇰🇿" },
  { city:"Beijing",       country:"China",          tz:"Asia/Shanghai",           flag:"🇨🇳" },
  { city:"Shanghai",      country:"China",          tz:"Asia/Shanghai",           flag:"🇨🇳" },
  { city:"Hong Kong",     country:"China",          tz:"Asia/Hong_Kong",          flag:"🇭🇰" },
  { city:"Tokyo",         country:"Japan",          tz:"Asia/Tokyo",              flag:"🇯🇵" },
  { city:"Seoul",         country:"South Korea",    tz:"Asia/Seoul",              flag:"🇰🇷" },
  { city:"Singapore",     country:"Singapore",      tz:"Asia/Singapore",          flag:"🇸🇬" },
  { city:"Bangkok",       country:"Thailand",       tz:"Asia/Bangkok",            flag:"🇹🇭" },
  { city:"Jakarta",       country:"Indonesia",      tz:"Asia/Jakarta",            flag:"🇮🇩" },
  { city:"Manila",        country:"Philippines",    tz:"Asia/Manila",             flag:"🇵🇭" },
  { city:"Kuala Lumpur",  country:"Malaysia",       tz:"Asia/Kuala_Lumpur",       flag:"🇲🇾" },
  { city:"Ho Chi Minh",   country:"Vietnam",        tz:"Asia/Ho_Chi_Minh",        flag:"🇻🇳" },
  { city:"Yangon",        country:"Myanmar",        tz:"Asia/Rangoon",            flag:"🇲🇲" },
  { city:"Ulaanbaatar",   country:"Mongolia",       tz:"Asia/Ulaanbaatar",        flag:"🇲🇳" },
  { city:"Taipei",        country:"Taiwan",         tz:"Asia/Taipei",             flag:"🇹🇼" },
  // Oceania
  { city:"Sydney",        country:"Australia",      tz:"Australia/Sydney",        flag:"🇦🇺" },
  { city:"Melbourne",     country:"Australia",      tz:"Australia/Melbourne",     flag:"🇦🇺" },
  { city:"Brisbane",      country:"Australia",      tz:"Australia/Brisbane",      flag:"🇦🇺" },
  { city:"Perth",         country:"Australia",      tz:"Australia/Perth",         flag:"🇦🇺" },
  { city:"Auckland",      country:"New Zealand",    tz:"Pacific/Auckland",        flag:"🇳🇿" },
  { city:"Fiji",          country:"Fiji",           tz:"Pacific/Fiji",            flag:"🇫🇯" },
  { city:"Honolulu",      country:"United States",  tz:"Pacific/Honolulu",        flag:"🇺🇸" },
  { city:"Anchorage",     country:"United States",  tz:"America/Anchorage",       flag:"🇺🇸" },
  // Atlantic
  { city:"Azores",        country:"Portugal",       tz:"Atlantic/Azores",         flag:"🇵🇹" },
  { city:"Cape Verde",    country:"Cape Verde",     tz:"Atlantic/Cape_Verde",     flag:"🇨🇻" },
  // UTC
  { city:"UTC",           country:"Universal",      tz:"UTC",                     flag:"🌐" },
];

// ── State ────────────────────────────────────────────────────
let alarms        = [];         // loaded from server / localStorage
let firingAlarm   = null;       // currently ringing alarm
let selectedTone  = "arc";      // current tone selection
let selectedDays  = new Set();  // selected days in form
let pinnedTZs     = new Set(["UTC","America/New_York","Europe/London","Asia/Kolkata","Asia/Tokyo","Australia/Sydney"]);
let mainTZ        = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
let audioCtx      = null;       // Web Audio context
let alarmInterval = null;       // alarm sound interval

// ── Bootstrap ────────────────────────────────────────────────
window.addEventListener("DOMContentLoaded", () => {
  buildTZSelect();
  buildTZList();
  populateTZSearch();
  startClock();
  loadAlarms();
  setupDayPicker();
  setupTonePicker();
  setupTZSearch();
});

// ─────────────────────────────────────────────────────────────
// ARC REACTOR CANVAS CLOCK
// ─────────────────────────────────────────────────────────────
const canvas  = document.getElementById("arc-canvas");
const ctx     = canvas.getContext("2d");
const W = canvas.width, H = canvas.height, CX = W/2, CY = H/2;

// Visual constants
const COLORS = {
  arcCore:   "#00d4ff",
  arcDim:    "#003f55",
  arcGlow:   "rgba(0,212,255,",
  gold:      "#c8972a",
  goldDim:   "rgba(200,151,42,0.4)",
  dark:      "#020c12",
  panel:     "#0a1c28",
  red:       "#c0392b",
  safe:      "#00ffa3",
};

function drawArcReactor(now) {
  ctx.clearRect(0, 0, W, H);

  const hour   = now.getHours()   % 12;
  const min    = now.getMinutes();
  const sec    = now.getSeconds();
  const ms     = now.getMilliseconds();

  // Smooth angles
  const secAngle  = ((sec + ms/1000) / 60) * Math.PI * 2 - Math.PI/2;
  const minAngle  = ((min + sec/60)  / 60) * Math.PI * 2 - Math.PI/2;
  const hourAngle = ((hour + min/60) / 12) * Math.PI * 2 - Math.PI/2;

  // ── Layer 0: Deep space background ────────────────
  const bgGrad = ctx.createRadialGradient(CX,CY,20, CX,CY,CX);
  bgGrad.addColorStop(0,   "#051a2e");
  bgGrad.addColorStop(0.5, "#020c18");
  bgGrad.addColorStop(1,   "#010810");
  ctx.fillStyle = bgGrad;
  ctx.beginPath(); ctx.arc(CX,CY,CX,0,Math.PI*2); ctx.fill();

  // ── Outer bezel ring ─────────────────────────────
  ctx.save();
  ctx.strokeStyle = COLORS.arcDim;
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.arc(CX,CY,CX-8,0,Math.PI*2); ctx.stroke();

  // Bezel tick marks (60 ticks)
  for (let i=0; i<60; i++) {
    const a   = (i/60)*Math.PI*2 - Math.PI/2;
    const isH = i%5===0;
    const r1  = CX - 8;
    const r2  = r1 - (isH ? 16 : 8);
    ctx.strokeStyle = isH ? COLORS.arcCore : COLORS.arcDim;
    ctx.lineWidth   = isH ? 2 : 1;
    ctx.globalAlpha = isH ? 0.9 : 0.35;
    ctx.beginPath();
    ctx.moveTo(CX + Math.cos(a)*r1, CY + Math.sin(a)*r1);
    ctx.lineTo(CX + Math.cos(a)*r2, CY + Math.sin(a)*r2);
    ctx.stroke();
  }
  ctx.restore();

  // ── Outer glow ring ───────────────────────────────
  ctx.save();
  ctx.strokeStyle = COLORS.arcCore;
  ctx.lineWidth   = 2;
  ctx.shadowBlur  = 30;
  ctx.shadowColor = COLORS.arcCore;
  ctx.globalAlpha = 0.4 + 0.1*Math.sin(Date.now()/600);
  ctx.beginPath(); ctx.arc(CX,CY,CX-12,0,Math.PI*2); ctx.stroke();
  ctx.restore();

  // ── Pentagon structure (Iron Man MK II reactor) ───
  drawPentagon(CX, CY, 148, 0.02);

  // ── Rotating outer ring segments ──────────────────
  drawRotatingRing(CX,CY, 178, 8,  0.3,  10, Date.now()/12000,      COLORS.arcCore, 0.5);
  drawRotatingRing(CX,CY, 162, 6, -0.4,   8, -Date.now()/8000,     COLORS.gold,    0.4);
  drawRotatingRing(CX,CY, 145, 4,  0.5,   6,  Date.now()/15000,    COLORS.arcCore, 0.3);

  // ── Hour ring (track) ─────────────────────────────
  ctx.save();
  ctx.strokeStyle = COLORS.arcDim;
  ctx.lineWidth = 6;
  ctx.globalAlpha = 0.5;
  ctx.beginPath(); ctx.arc(CX,CY,120,0,Math.PI*2); ctx.stroke();
  // Hour arc
  ctx.strokeStyle = COLORS.gold;
  ctx.lineWidth   = 6;
  ctx.globalAlpha = 0.9;
  ctx.lineCap     = "round";
  ctx.shadowBlur  = 15; ctx.shadowColor = COLORS.gold;
  ctx.beginPath();
  ctx.arc(CX,CY,120, -Math.PI/2, hourAngle);
  ctx.stroke();
  ctx.restore();

  // ── Minute ring ───────────────────────────────────
  ctx.save();
  ctx.strokeStyle = COLORS.arcDim;
  ctx.lineWidth = 5; ctx.globalAlpha = 0.4;
  ctx.beginPath(); ctx.arc(CX,CY,100,0,Math.PI*2); ctx.stroke();
  ctx.strokeStyle = COLORS.arcCore;
  ctx.lineWidth   = 5; ctx.globalAlpha = 0.9;
  ctx.lineCap     = "round";
  ctx.shadowBlur  = 20; ctx.shadowColor = COLORS.arcCore;
  ctx.beginPath();
  ctx.arc(CX,CY,100, -Math.PI/2, minAngle);
  ctx.stroke();
  ctx.restore();

  // ── Second ring (thin, fast) ──────────────────────
  ctx.save();
  ctx.strokeStyle = COLORS.arcDim;
  ctx.lineWidth = 2; ctx.globalAlpha = 0.3;
  ctx.beginPath(); ctx.arc(CX,CY,82,0,Math.PI*2); ctx.stroke();
  ctx.strokeStyle = "#ff3a3a";
  ctx.lineWidth   = 2; ctx.globalAlpha = 0.85;
  ctx.lineCap     = "round";
  ctx.shadowBlur  = 12; ctx.shadowColor = "#ff3a3a";
  ctx.beginPath();
  ctx.arc(CX,CY,82, -Math.PI/2, secAngle);
  ctx.stroke();
  ctx.restore();

  // ── Clock hand dots (at arc ends) ────────────────
  drawDot(CX + Math.cos(hourAngle)*120, CY + Math.sin(hourAngle)*120, 6, COLORS.gold,     20);
  drawDot(CX + Math.cos(minAngle)*100,  CY + Math.sin(minAngle)*100,  5, COLORS.arcCore,  25);
  drawDot(CX + Math.cos(secAngle)*82,   CY + Math.sin(secAngle)*82,   4, "#ff3a3a",       15);

  // ── Inner energy core ────────────────────────────
  const coreGrad = ctx.createRadialGradient(CX,CY,0, CX,CY,55);
  coreGrad.addColorStop(0,   `rgba(160,240,255,${0.6 + 0.15*Math.sin(Date.now()/400)})`);
  coreGrad.addColorStop(0.3, `rgba(0,212,255,${0.4 + 0.1*Math.sin(Date.now()/500)})`);
  coreGrad.addColorStop(0.7, "rgba(0,100,160,0.3)");
  coreGrad.addColorStop(1,   "rgba(0,0,0,0)");
  ctx.save();
  ctx.globalAlpha = 0.85;
  ctx.fillStyle = coreGrad;
  ctx.beginPath(); ctx.arc(CX,CY,55,0,Math.PI*2); ctx.fill();
  ctx.restore();

  // Core ring border
  ctx.save();
  ctx.strokeStyle = COLORS.arcCore;
  ctx.lineWidth   = 1.5;
  ctx.shadowBlur  = 20; ctx.shadowColor = COLORS.arcCore;
  ctx.globalAlpha = 0.8;
  ctx.beginPath(); ctx.arc(CX,CY,56,0,Math.PI*2); ctx.stroke();
  ctx.restore();

  // ── 12, 3, 6, 9 markers ──────────────────────────
  [[0,-1],[1,0],[0,1],[-1,0]].forEach(([dx,dy], i) => {
    const r = 135;
    ctx.save();
    ctx.font = `600 11px 'Orbitron'`;
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillStyle   = COLORS.arcCore;
    ctx.shadowBlur  = 10; ctx.shadowColor = COLORS.arcCore;
    ctx.globalAlpha = 0.9;
    ctx.fillText(["12","3","6","9"][i], CX+dx*r, CY+dy*r);
    ctx.restore();
  });
}

function drawPentagon(cx, cy, r, rotOffset) {
  const sides = 5;
  const time  = Date.now() / 20000;
  ctx.save();
  ctx.strokeStyle = "rgba(0,212,255,0.2)";
  ctx.lineWidth   = 1.5;
  ctx.shadowBlur  = 8; ctx.shadowColor = "rgba(0,212,255,0.5)";

  // Nested pentagons
  [r, r*0.72, r*0.5].forEach((pr, pi) => {
    ctx.globalAlpha = 0.15 + pi*0.05;
    ctx.beginPath();
    for (let i=0; i<sides; i++) {
      const a = (i/sides)*Math.PI*2 - Math.PI/2 + rotOffset + time*(pi%2?-1:1);
      const x = cx + Math.cos(a)*pr;
      const y = cy + Math.sin(a)*pr;
      i===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
    }
    ctx.closePath();
    ctx.stroke();
  });
  ctx.restore();
}

function drawRotatingRing(cx,cy, r, segCount, gap, segLen, rot, color, alpha) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth   = 2;
  ctx.globalAlpha = alpha;
  ctx.shadowBlur  = 8; ctx.shadowColor = color;
  ctx.lineCap     = "round";

  const segAngle = (Math.PI*2 - segCount*gap) / segCount;
  for (let i=0; i<segCount; i++) {
    const start = rot + i*(segAngle + gap);
    ctx.beginPath();
    ctx.arc(cx,cy,r, start, start + segAngle);
    ctx.stroke();
  }
  ctx.restore();
}

function drawDot(x,y,r,color,glow) {
  ctx.save();
  ctx.fillStyle   = color;
  ctx.shadowBlur  = glow;
  ctx.shadowColor = color;
  ctx.globalAlpha = 0.95;
  ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fill();
  ctx.restore();
}

// ─────────────────────────────────────────────────────────────
// CLOCK LOOP
// ─────────────────────────────────────────────────────────────
function startClock() {
  let frame;
  let lastSecond = -1;

  function tick() {
    // Get now in selected main timezone
    const now = getDateInTZ(mainTZ);
    const nowLocal = new Date(); // for canvas (uses local angle math)

    drawArcReactor(nowLocal);

    // Update digital time display
    const h = String(now.getHours()).padStart(2,"0");
    const m = String(now.getMinutes()).padStart(2,"0");
    const s = String(now.getSeconds()).padStart(2,"0");
    document.getElementById("main-time").textContent = `${h}:${m}:${s}`;

    // Update date
    const days   = ["SUNDAY","MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY"];
    const months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
    document.getElementById("main-date").textContent =
      `${days[now.getDay()]} · ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;

    // Update UTC bar
    const utcNow = new Date();
    const utcH   = String(utcNow.getUTCHours()).padStart(2,"0");
    const utcM   = String(utcNow.getUTCMinutes()).padStart(2,"0");
    const utcS   = String(utcNow.getUTCSeconds()).padStart(2,"0");
    document.getElementById("utc-clock").textContent = `UTC ${utcH}:${utcM}:${utcS}`;

    // Fake core temp (fun)
    document.getElementById("core-temp").textContent =
      `${(6850 + Math.sin(Date.now()/3000)*50).toFixed(0)}°K`;

    // Update world clock list every second
    if (now.getSeconds() !== lastSecond) {
      lastSecond = now.getSeconds();
      updateTZList();
      checkAlarms(now, utcNow);
    }

    frame = requestAnimationFrame(tick);
  }
  tick();
}

// Get a Date-like object adjusted for a given timezone
function getDateInTZ(tz) {
  try {
    const str = new Date().toLocaleString("en-US", { timeZone: tz });
    return new Date(str);
  } catch {
    return new Date();
  }
}

function formatTimeInTZ(tz) {
  try {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: tz, hour:"2-digit", minute:"2-digit", second:"2-digit",
      hour12: false
    }).format(new Date());
  } catch { return "--:--:--"; }
}

function getOffsetStr(tz) {
  try {
    const fmt = new Intl.DateTimeFormat("en-US", {
      timeZone: tz, timeZoneName: "shortOffset"
    });
    const parts = fmt.formatToParts(new Date());
    const off   = parts.find(p => p.type === "timeZoneName");
    return off ? off.value : "";
  } catch { return ""; }
}

// ─────────────────────────────────────────────────────────────
// TIMEZONE LIST (LEFT PANEL)
// ─────────────────────────────────────────────────────────────
function buildTZList(filter="") {
  const container = document.getElementById("tz-list");
  container.innerHTML = "";
  const q = filter.toLowerCase();

  // Sort: pinned first, then alphabetical
  const list = TZ_DATABASE
    .filter(t =>
      !q ||
      t.city.toLowerCase().includes(q) ||
      t.country.toLowerCase().includes(q) ||
      t.tz.toLowerCase().includes(q)
    )
    .sort((a,b) => {
      const ap = pinnedTZs.has(a.tz) ? 0 : 1;
      const bp = pinnedTZs.has(b.tz) ? 0 : 1;
      if (ap !== bp) return ap - bp;
      return a.city.localeCompare(b.city);
    });

  if (!list.length) {
    container.innerHTML = `<div style="text-align:center;padding:1rem;font-size:0.7rem;color:var(--arc-dim);font-family:var(--font-mono)">NO MATCH FOUND</div>`;
    return;
  }

  list.forEach(t => {
    const card    = document.createElement("div");
    card.className = `tz-card${pinnedTZs.has(t.tz) ? " pinned" : ""}`;
    card.innerHTML = `
      <div class="tz-card-left">
        <div class="tz-city">${t.flag} ${t.city}</div>
        <div class="tz-country">${t.country}</div>
      </div>
      <div style="text-align:right">
        <div class="tz-time" data-tz="${t.tz}">--:--:--</div>
        <div class="tz-offset">${getOffsetStr(t.tz)}</div>
        <div class="tz-pin">${pinnedTZs.has(t.tz) ? "📌" : "·"}</div>
      </div>`;

    // Click = set as main clock
    card.addEventListener("click", () => {
      mainTZ = t.tz;
      document.getElementById("main-tz").textContent = `${t.flag} ${t.city} · ${t.tz}`;
      document.getElementById("main-tz-select").value = t.tz;
      // Toggle pin
      if (pinnedTZs.has(t.tz)) pinnedTZs.delete(t.tz);
      else pinnedTZs.add(t.tz);
      buildTZList(document.getElementById("tz-search").value);
    });

    container.appendChild(card);
  });
}

function updateTZList() {
  document.querySelectorAll(".tz-time[data-tz]").forEach(el => {
    el.textContent = formatTimeInTZ(el.dataset.tz);
  });
}

function setupTZSearch() {
  document.getElementById("tz-search").addEventListener("input", e => {
    buildTZList(e.target.value);
  });
}

// ─────────────────────────────────────────────────────────────
// MAIN TIMEZONE SELECT (Center dropdown)
// ─────────────────────────────────────────────────────────────
function buildTZSelect() {
  const sel = document.getElementById("main-tz-select");

  // Group by region
  const regions = {};
  TZ_DATABASE.forEach(t => {
    const region = t.tz.split("/")[0] || "Other";
    if (!regions[region]) regions[region] = [];
    regions[region].push(t);
  });

  Object.keys(regions).sort().forEach(region => {
    const og = document.createElement("optgroup");
    og.label = region.toUpperCase();
    // Dedupe by tz
    const seen = new Set();
    regions[region].forEach(t => {
      if (seen.has(t.tz)) return;
      seen.add(t.tz);
      const opt       = document.createElement("option");
      opt.value       = t.tz;
      opt.textContent = `${t.flag} ${t.city} (${t.tz})`;
      og.appendChild(opt);
    });
    sel.appendChild(og);
  });

  sel.value = mainTZ;
  sel.addEventListener("change", () => {
    mainTZ = sel.value;
    const match = TZ_DATABASE.find(t => t.tz === mainTZ);
    document.getElementById("main-tz").textContent =
      match ? `${match.flag} ${match.city} · ${mainTZ}` : mainTZ;
  });

  // Set initial label
  const match = TZ_DATABASE.find(t => t.tz === mainTZ);
  document.getElementById("main-tz").textContent =
    match ? `${match.flag} ${match.city} · ${mainTZ}` : mainTZ;
}

function populateTZSelect() {
  // Already done in buildTZSelect
}

// ─────────────────────────────────────────────────────────────
// DAY PICKER
// ─────────────────────────────────────────────────────────────
function setupDayPicker() {
  document.querySelectorAll(".day-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const day = btn.dataset.day;
      if (selectedDays.has(day)) {
        selectedDays.delete(day);
        btn.classList.remove("active");
      } else {
        selectedDays.add(day);
        btn.classList.add("active");
      }
    });
  });
}

// ─────────────────────────────────────────────────────────────
// TONE PICKER
// ─────────────────────────────────────────────────────────────
function setupTonePicker() {
  document.querySelectorAll(".tone-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tone-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      selectedTone = btn.dataset.tone;
      previewTone(selectedTone);
    });
  });
}

// ─────────────────────────────────────────────────────────────
// ALARM MANAGEMENT
// ─────────────────────────────────────────────────────────────
async function loadAlarms() {
  try {
    const res = await fetch("/api/alarms");
    alarms = await res.json();
  } catch {
    // Offline fallback
    const stored = localStorage.getItem("arc_alarms");
    alarms = stored ? JSON.parse(stored) : [];
  }
  renderAlarms();
}

function saveLocal() {
  localStorage.setItem("arc_alarms", JSON.stringify(alarms));
}

async function addAlarm() {
  const time  = document.getElementById("al-time").value;
  const label = document.getElementById("al-label").value.trim() || "STARK PROTOCOL";

  if (!time) {
    flashInput("al-time");
    return;
  }

  const alarm = {
    id:       Date.now(),
    time,
    label:    label.toUpperCase(),
    days:     [...selectedDays],
    enabled:  true,
    sound:    selectedTone,
    timezone: mainTZ,
  };

  // Try server, fallback local
  try {
    const res = await fetch("/api/alarms", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify(alarm)
    });
    const data = await res.json();
    if (data.alarm) alarms.push(data.alarm);
    else alarms.push(alarm);
  } catch {
    alarms.push(alarm);
    saveLocal();
  }

  renderAlarms();
  document.getElementById("al-label").value = "";
  pulseArmButton();
}

function flashInput(id) {
  const el = document.getElementById(id);
  el.style.borderColor = "var(--danger)";
  el.style.boxShadow   = "0 0 12px rgba(255,58,58,0.4)";
  setTimeout(() => { el.style.borderColor=""; el.style.boxShadow=""; }, 1000);
}

function pulseArmButton() {
  const btn = document.getElementById("arm-btn");
  btn.style.boxShadow = "0 0 40px rgba(0,212,255,0.6)";
  btn.style.transform = "scale(0.97)";
  setTimeout(() => { btn.style.boxShadow=""; btn.style.transform=""; }, 400);
}

async function toggleAlarm(id) {
  const a = alarms.find(x => x.id === id);
  if (!a) return;
  a.enabled = !a.enabled;
  try {
    await fetch(`/api/alarms/${id}`, { method:"PATCH" });
  } catch { saveLocal(); }
  renderAlarms();
}

async function deleteAlarm(id) {
  alarms = alarms.filter(x => x.id !== id);
  try { await fetch(`/api/alarms/${id}`, { method:"DELETE" }); }
  catch { saveLocal(); }
  renderAlarms();
}

function renderAlarms() {
  const list = document.getElementById("alarm-list");
  document.getElementById("alarm-count").textContent = alarms.filter(a=>a.enabled).length;

  if (!alarms.length) {
    list.innerHTML = `<div class="alarm-empty">NO ALARM PROTOCOLS ACTIVE<br>ARM YOUR FIRST ALARM ABOVE</div>`;
    return;
  }

  // Find the next alarm
  const nextId = getNextAlarmId();

  list.innerHTML = alarms.map(a => {
    const isNext = a.id === nextId && a.enabled;
    const daysStr = a.days && a.days.length
      ? a.days.join(" · ")
      : "ONCE";
    const toneIcon = {arc:"⚡",jarvis:"🤖",repulsor:"🔵"}[a.sound] || "⚡";
    const tzMatch  = TZ_DATABASE.find(t => t.tz === (a.timezone||"UTC"));
    const tzFlag   = tzMatch ? tzMatch.flag : "🌐";

    return `
      <div class="alarm-item ${a.enabled?"enabled":"disabled"}" id="alarm-${a.id}">
        ${isNext ? '<div class="alarm-next"></div>' : ""}
        <div class="alarm-item-header">
          <div class="alarm-time-big">${a.time}</div>
          <div class="alarm-controls">
            <div class="alarm-toggle" onclick="toggleAlarm(${a.id})" title="${a.enabled?'Disable':'Enable'}"></div>
            <button class="alarm-delete" onclick="deleteAlarm(${a.id})" title="Delete">✕</button>
          </div>
        </div>
        <div class="alarm-label">${a.label}</div>
        <div class="alarm-meta">
          <span>${toneIcon} ${a.sound.toUpperCase()}</span>
          <span>📅 ${daysStr}</span>
          <span>${tzFlag} ${a.timezone||"UTC"}</span>
        </div>
      </div>`;
  }).join("");
}

function getNextAlarmId() {
  const now  = new Date();
  let   best = null, bestMs = Infinity;

  alarms.filter(a=>a.enabled).forEach(a => {
    const [h,m] = a.time.split(":").map(Number);
    const candidate = new Date();
    candidate.setHours(h, m, 0, 0);
    if (candidate <= now) candidate.setDate(candidate.getDate()+1);
    const diff = candidate - now;
    if (diff < bestMs) { bestMs = diff; best = a.id; }
  });
  return best;
}

// ─────────────────────────────────────────────────────────────
// ALARM CHECKING
// ─────────────────────────────────────────────────────────────
const DAY_NAMES = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function checkAlarms(nowInMainTZ, utcNow) {
  if (firingAlarm) return; // already ringing

  const H  = String(nowInMainTZ.getHours()).padStart(2,"0");
  const M  = String(nowInMainTZ.getMinutes()).padStart(2,"0");
  const HM = `${H}:${M}`;
  const dow = DAY_NAMES[nowInMainTZ.getDay()];

  alarms.forEach(a => {
    if (!a.enabled) return;
    if (a.time !== HM) return;
    if (nowInMainTZ.getSeconds() !== 0) return;

    // Day check
    if (a.days && a.days.length > 0) {
      // Compare against alarm's own timezone day
      try {
        const alarmNow  = getDateInTZ(a.timezone || mainTZ);
        const alarmDow  = DAY_NAMES[alarmNow.getDay()];
        if (!a.days.includes(alarmDow)) return;
      } catch { if (!a.days.includes(dow)) return; }
    }

    fireAlarm(a);
  });
}

function fireAlarm(alarm) {
  firingAlarm = alarm;

  // Show overlay
  document.getElementById("alarm-fire-label").textContent = alarm.label;
  document.getElementById("alarm-fire-time").textContent  = alarm.time;
  document.getElementById("alarm-overlay").classList.add("active");
  document.getElementById("alarm-ring").classList.add("firing");

  // Start audio
  startAlarmSound(alarm.sound);
}

function dismissAlarm() {
  firingAlarm = null;
  document.getElementById("alarm-overlay").classList.remove("active");
  document.getElementById("alarm-ring").classList.remove("firing");
  stopAlarmSound();

  // If no repeat days, disable alarm
  if (firingAlarm === null) {
    // already cleared above — check via overlay was dismissed
  }
}

// ─────────────────────────────────────────────────────────────
// WEB AUDIO ENGINE — Synthesised alarm sounds
// ─────────────────────────────────────────────────────────────
function getAudioCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}

function previewTone(type) {
  playTone(type, 0.5); // short preview
}

function startAlarmSound(type) {
  stopAlarmSound();
  playTone(type, 999);
  alarmInterval = setInterval(() => playTone(type, 999), 1800);
}

function stopAlarmSound() {
  clearInterval(alarmInterval);
  alarmInterval = null;
}

/**
 * type: "arc" | "jarvis" | "repulsor"
 * Synthesises each using different oscillator combos.
 */
function playTone(type, duration) {
  const ac  = getAudioCtx();
  const now = ac.currentTime;

  if (type === "arc") {
    // Pulsing electric arc — high-pitched oscillating sine
    [0, 0.12, 0.24].forEach((delay, i) => {
      const osc  = ac.createOscillator();
      const gain = ac.createGain();
      const dist = ac.createWaveShaper();

      // Soft distortion for texture
      const curve = new Float32Array(256);
      for (let i=0;i<256;i++) { const x=(i*2/256)-1; curve[i]=x*(3+10)/(1+10*Math.abs(x)); }
      dist.curve = curve;

      osc.connect(dist); dist.connect(gain); gain.connect(ac.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(880 + i*220, now + delay);
      osc.frequency.exponentialRampToValueAtTime(440, now + delay + 0.4);

      gain.gain.setValueAtTime(0, now + delay);
      gain.gain.linearRampToValueAtTime(0.3, now + delay + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.6);

      osc.start(now + delay);
      osc.stop(now + delay + 0.65);
    });

  } else if (type === "jarvis") {
    // JARVIS voice-like — descending sine sweep + formant filter
    const osc   = ac.createOscillator();
    const filt  = ac.createBiquadFilter();
    const gain  = ac.createGain();

    filt.type = "bandpass"; filt.frequency.value = 1200; filt.Q.value = 2;
    osc.connect(filt); filt.connect(gain); gain.connect(ac.destination);

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.8);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.25, now + 0.05);
    gain.gain.setValueAtTime(0.25, now + 0.6);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.0);

    osc.start(now); osc.stop(now + 1.1);

    // Secondary chime overtone
    const osc2  = ac.createOscillator();
    const gain2 = ac.createGain();
    osc2.connect(gain2); gain2.connect(ac.destination);
    osc2.type = "sine"; osc2.frequency.value = 1200;
    gain2.gain.setValueAtTime(0, now + 0.1);
    gain2.gain.linearRampToValueAtTime(0.15, now + 0.15);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
    osc2.start(now + 0.1); osc2.stop(now + 0.75);

  } else if (type === "repulsor") {
    // Repulsor blast — low frequency thud + high frequency sizzle
    const osc   = ac.createOscillator();
    const gain  = ac.createGain();
    osc.connect(gain); gain.connect(ac.destination);

    osc.type = "sine";
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.3);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.5, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.start(now); osc.stop(now + 0.4);

    // Sizzle
    const bufSize = ac.sampleRate * 0.15;
    const buffer  = ac.createBuffer(1, bufSize, ac.sampleRate);
    const data    = buffer.getChannelData(0);
    for (let i=0;i<bufSize;i++) data[i] = (Math.random()*2-1)*0.5;

    const noise   = ac.createBufferSource();
    const filt    = ac.createBiquadFilter();
    const gain2   = ac.createGain();
    noise.buffer  = buffer;
    filt.type     = "highpass"; filt.frequency.value = 3000;
    noise.connect(filt); filt.connect(gain2); gain2.connect(ac.destination);
    gain2.gain.setValueAtTime(0.3, now + 0.02);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    noise.start(now + 0.02); noise.stop(now + 0.28);
  }
}

// ─────────────────────────────────────────────────────────────
// POPULATE TZ SEARCH (build list on load)
// ─────────────────────────────────────────────────────────────
function populateTZSearch() {
  buildTZList();
}

// ─────────────────────────────────────────────────────────────
// EXPOSE GLOBALS for HTML onclick
// ─────────────────────────────────────────────────────────────
window.addAlarm     = addAlarm;
window.toggleAlarm  = toggleAlarm;
window.deleteAlarm  = deleteAlarm;
window.dismissAlarm = dismissAlarm;
