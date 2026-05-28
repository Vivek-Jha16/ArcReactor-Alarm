# ⚡ Arc Reactor Alarm Clock

> *"JARVIS, set an alarm."* — Tony Stark

A fully functional, Iron Man–themed alarm clock built with **Python Flask** + **HTML/CSS/JavaScript**. Features a live-animated Arc Reactor canvas clock, 80+ world timezones, synthesised alarm tones, and a Stark Industries HUD aesthetic.

---

![Arc Reactor Clock](https://img.shields.io/badge/theme-Iron%20Man%20Mk.II-00d4ff?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iIzAwZDRmZiIgZD0iTTEyIDJhMTAgMTAgMCAxIDAgMCAyMEExMCAxMCAwIDAgMCAxMiAyeiIvPjwvc3ZnPg==)
![Python](https://img.shields.io/badge/Python-3.8%2B-3776ab?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-3.0-000000?style=for-the-badge&logo=flask&logoColor=white)
![No DB needed](https://img.shields.io/badge/Database-JSON%20file-00ffa3?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

---

## 🎬 Features

### 🔵 Arc Reactor Canvas Clock
- **Animated Mark II reactor** drawn entirely on HTML5 Canvas — no images
- Smooth **hour / minute / second arcs** with neon glow
- Rotating **segmented outer rings** that spin at different speeds and directions
- **Nested spinning pentagons** at the reactor core
- Pulsing **energy core** with breathing radial gradient
- 60 **bezel tick marks**, cardinal labels (12 / 3 / 6 / 9)
- Live-updating **digital time overlay** in Orbitron font
- HUD corner brackets, CRT scanline overlay, and vignette

### 🌍 World Timezone System
- **80+ cities** across every continent and region
- Live-ticking time for every city, updated every second
- **Search bar** — filter by city, country, or IANA timezone string
- Click any city to **set it as the main clock's timezone**
- Clicked cities are **pinned to the top** with a 📌 indicator
- **Dropdown selector** with optgroup regions for the main display clock
- Covers: Americas, Europe, Africa, Middle East, Asia, Oceania, Pacific, Atlantic

### ⏰ Alarm System
| Feature | Detail |
|---|---|
| Time picker | Native `<input type="time">` |
| Label | Custom text up to 24 characters |
| Repeat days | Mon / Tue / Wed / Thu / Fri / Sat / Sun toggle |
| Alert tone | 3 synthesised tones (see below) |
| Timezone | Alarm fires in its own timezone |
| Toggle | Unique glowing arc-reactor on/off switch |
| Persistence | Saved to `alarms.json` via Flask; falls back to `localStorage` offline |
| Next alarm | Highlighted with a gold scanning bar |

### 🔊 Synthesised Alarm Tones (Web Audio API — no audio files)
| Tone | Sound Design |
|---|---|
| ⚡ **ARC** | Triple-burst sine sweep with soft distortion, descending from 880 Hz |
| 🤖 **JARVIS** | Sawtooth wave through bandpass formant filter + chime overtone |
| 🔵 **REPULSOR** | Deep bass thud (180→60 Hz) + high-frequency white noise sizzle |

### 🎨 UI / HUD
- **Stark Industries HUD** aesthetic — dark navy + cyan neon palette
- `Orbitron` display font, `Share Tech Mono` for data readouts, `Rajdhani` body
- CRT scanlines + radial vignette overlays
- Sticky status bar with live UTC clock and reactor power readout
- Full-screen **firing alarm overlay** with concentric pulse rings
- Responsive — adapts to tablet / mobile screen widths

---

## 📁 Project Structure

```
arclock/
│
├── app.py                  ← Flask server & REST API
├── requirements.txt        ← Python dependencies (just Flask)
├── alarms.json             ← Auto-created when first alarm is saved
├── README.md
│
├── templates/
│   └── index.html          ← Single-page app shell & HUD layout
│
└── static/
    ├── css/
    │   └── style.css       ← Full HUD stylesheet
    └── js/
        └── script.js       ← Canvas clock, world clocks, alarm engine, audio
```

---

## 🚀 Quick Start

### 1 — Clone the repo

```bash
git clone https://github.com/your-username/arc-reactor-clock.git
cd arc-reactor-clock
```

### 2 — Install Flask

```bash
pip install flask
# or
pip install -r requirements.txt
```

### 3 — Run

```bash
python app.py
```

### 4 — Open in browser

```
http://localhost:5000
```

That's it. No database setup. No environment variables. No build step.

---

## 🔌 API Reference

All endpoints are served by Flask on `localhost:5000`.

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Serves the main HTML page |
| `GET` | `/api/alarms` | Returns all saved alarms as JSON |
| `POST` | `/api/alarms` | Creates a new alarm |
| `PATCH` | `/api/alarms/<id>` | Toggles enabled/disabled |
| `DELETE` | `/api/alarms/<id>` | Deletes an alarm |
| `GET` | `/api/time` | Returns current server UTC time |

### POST `/api/alarms` — Request body

```json
{
  "time":     "07:30",
  "label":    "MISSION BRIEFING",
  "days":     ["Mon", "Tue", "Wed", "Thu", "Fri"],
  "sound":    "arc",
  "timezone": "Asia/Kolkata"
}
```

### Valid `sound` values
- `"arc"` — Electric arc burst
- `"jarvis"` — JARVIS voice formant
- `"repulsor"` — Repulsor blast

---

## 🌐 Supported Timezones (sample)

| Region | Cities |
|--------|--------|
| Americas | New York, Los Angeles, Toronto, São Paulo, Buenos Aires, Mexico City… |
| Europe | London, Paris, Berlin, Madrid, Rome, Moscow, Istanbul… |
| Asia | Kolkata, Tokyo, Beijing, Dubai, Singapore, Bangkok, Seoul… |
| Africa | Cairo, Lagos, Nairobi, Johannesburg, Casablanca… |
| Oceania | Sydney, Melbourne, Auckland, Honolulu… |
| UTC | Universal Coordinated Time |

Full list of **80+ cities** in `static/js/script.js` → `TZ_DATABASE` array.

---

## ➕ How to Add a New Timezone

Open `static/js/script.js` and add an entry to the `TZ_DATABASE` array:

```js
{ city:"Dhaka", country:"Bangladesh", tz:"Asia/Dhaka", flag:"🇧🇩" },
```

- `tz` must be a valid [IANA timezone identifier](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)
- Save the file and refresh — no restart needed

---

## ➕ How to Add a New Alarm Tone

In `static/js/script.js`, find the `playTone()` function and add a new `else if` branch:

```js
} else if (type === "unibeam") {
  const osc  = ac.createOscillator();
  const gain = ac.createGain();
  osc.connect(gain); gain.connect(ac.destination);
  osc.type = "square";
  osc.frequency.value = 1200;
  gain.gain.setValueAtTime(0.4, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
  osc.start(now); osc.stop(now + 0.55);
}
```

Then add a button in `templates/index.html` inside `#tone-picker`:

```html
<button class="tone-btn" data-tone="unibeam">🔆 UNIBEAM</button>
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Python 3 · Flask 3.0 |
| Storage | `alarms.json` (flat file) · `localStorage` (offline fallback) |
| Frontend | Vanilla HTML5 · CSS3 · JavaScript (ES2020) |
| Clock rendering | HTML5 Canvas 2D API |
| Audio | Web Audio API (synthesised — no audio files) |
| Fonts | Google Fonts — Orbitron, Share Tech Mono, Rajdhani |
| Timezone data | `Intl.DateTimeFormat` browser API + IANA database |

---

## 📋 Requirements

- Python **3.8 or higher**
- Flask **3.0** (`pip install flask`)
- A modern browser (Chrome, Firefox, Edge, Safari)
- No internet required after first load (fonts cached)

---

## 🧩 How It Works

```
Browser                          Flask Server
  │                                   │
  ├─ GET /  ──────────────────────►  index.html
  │                                   │
  ├─ Canvas draws Arc Reactor         │
  │   (requestAnimationFrame loop)    │
  │                                   │
  ├─ GET /api/alarms ──────────────► alarms.json → JSON response
  │                                   │
  ├─ POST /api/alarms ─────────────► append to alarms.json
  │                                   │
  ├─ Every second: check alarms       │
  │   → matches HH:MM + day?          │
  │   → fire Web Audio tone           │
  │   → show overlay                  │
  │                                   │
  └─ PATCH/DELETE /api/alarms/<id> ► update alarms.json
```

---

## 🤝 Contributing

1. Fork the repo
2. Create a branch: `git checkout -b feature/unibeam-tone`
3. Commit: `git commit -m "Add unibeam alarm tone"`
4. Push: `git push origin feature/unibeam-tone`
5. Open a Pull Request

---

## 📄 License

MIT License — do whatever you want with it.

---

<div align="center">

**Built with ❤️ and repulsor technology**

*"The Suit and I are one."*

⚡ [Live Demo](#) · 🐛 [Report Bug](../../issues) · 💡 [Request Feature](../../issues)

</div>
