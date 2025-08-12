# LyricVibe — Documentation

## Overview
LyricVibe is a pure HTML/CSS/JS single-file typing game that uses `localStorage` as the only persistent storage. It is responsive, accessible, and SEO-friendly (client-side). The app ships a small local song catalog with lyrics and allows adding custom songs.

---

## Contents
1. CSS reference — properties used and why
2. SEO meta & structured data — what we added and how to use them
3. JavaScript architecture — modules and data flow
4. Detailed function descriptions
5. Advanced features explained (audio mapping, offline fallback, local DB)
6. Sample usage snippets
7. Debugging tips and common issues

---

## 1 — CSS reference (properties used)

> This app intentionally keeps a consistent visual design. Below are key CSS properties we used, why they were used, and tips.

### Layout & spacing
- `display: grid` — used for `.app` to create a two-column layout (sidebar + main). Grid is robust and responsive-friendly.
- `grid-template-columns: 360px 1fr` — fixed sidebar width and flexible main area.
- `gap` — modern spacing between grid items.

### Visuals
- `background: linear-gradient(...)` — gradients for attractive backgrounds and "brand" colors.
- `box-shadow` — depth; used on `.card` to separate content from background.
- `border-radius` — soft rounded corners for modern look.

### Typography
- `font-family` — Poppins via Google Fonts for a modern sans-serif.
- `font-size` — relative sizes for readability; smaller sizes at mobile breakpoints.

### Controls & accessibility
- `:focus` outline — visible focus for keyboard users.
- `aria-*` attributes — (not CSS, but used in markup) important for screen readers.

### Responsive rules
- `@media (max-width: 980px)` and `@media (max-width: 600px)` adjust layout to single column and increase touch sizes.
- `flex-direction: column` on `.typing-row` for small screens keeps typing area usable.

### Interactive styles
- `transition` on `.song-item` to provide a subtle hover animation.
- `::placeholder` styles not used directly but supported by modern browsers if needed.

**Tip:** CSS uses variables (`--accent`, `--glass`, …) for color tokens — change them to rebrand.

---

## 2 — SEO & Metadata

### What we added
- `<title>` — important for search result titles.
- `<meta name="description">` — short summary used by search engines.
- `<meta name="robots" content="index,follow">` — default indexing instructions.
- `link rel="preconnect" href="https://fonts.gstatic.com"` — optimizes loading of Google Fonts.
- JSON-LD `<script type="application/ld+json">` — structured data for a WebApplication to help discoverability.

### How they help
- `title` & `meta description` control search snippet and click-through.
- JSON-LD gives search engines a structured representation of your app.
- `noscript` gives users fallback copy for disabled-JS environments.

### Server-side SEO note
- Pure client-side pages are less optimal for crawlers that don’t execute JS. For best SEO, serve HTML via SSR (Next.js / static pre-rendering). If you must remain static, include critical content (like song catalog) in the initial HTML where possible.

---

## 3 — JavaScript architecture

The JS is organized into modular responsibilities:

- **LocalDB**: Small wrapper around `localStorage` to namespace keys and handle JSON serialization.
- **SongManager**: CRUD operations for songs (prepopulated defaults + ability to add custom songs).
- **UserManager**: Stores the local profile (display name & best score).
- **Leaderboard**: Stores top scores (array).
- **GameController**: Orchestrates game flow: selection, typing events, audio mapping, scoring, timer, UI updates, and persistence.

Key design patterns:
- **Single source-of-truth**: `GameController.state` stores current game values.
- **Separation of concerns**: Song/User/Leader managers deal strictly with persistence and retrieval.
- **DOM updates**: Small helper functions (`_renderSongList`, `_renderLyrics`, `_updateStats`) keep DOM updates focused.

Performance considerations:
- Using per-character spans is simple and performant for moderate lyric sizes. For very large lyrics (long novels), consider per-word rendering.
- Debouncing `input` events prevents excessive reflow.

---

## 4 — Detailed function descriptions

Below are condensed descriptions. See the code for inline comments.

### LocalDB
- `get(key, fallback)`: returns parsed value for namespaced key.
- `set(key, value)`: JSON stringifies and stores value.
- `remove(key)`: deletes key.

### SongManager
- `list()`: returns array of songs.
- `save(song)`: creates/updates a song (assigns `id` if absent).
- `remove(id)`: deletes song by id.
- `findById(id)`: returns song or null.
- `search(query)`: case-insensitive search across title and artist.

### UserManager
- `save(name)`: persists user profile.
- `logout()`: clears profile.
- `get()`: returns current profile object.

### Leaderboard
- `add(entry)`: adds a score and trims to top N.
- `list()`: returns leaderboard.

### GameController (major methods)
- `_bindUI()` — connects DOM events to controller methods.
- `_renderSongList(query)` — render songs into `.song-list`.
- `_selectSong(song)` — sets current song, sets `audio.src` if preview available, and renders lyrics.
- `_renderLyrics(text)` — renders lyrics into per-character `span`s with `data-index`.
- `_onTyping()` — reads typed value, computes correctness prefix, updates spans, controls audio playback, schedules inactivity pause, updates stats, checks for completion.
- `_resumeAudioForProgress()` — maps typed progress to audio preview time and plays.
- `_pauseAudio()` — safely pauses audio element.
- `startGame()` / `endGame()` / `resetTyping()` — game lifecycle (timer, scoring).
- `_updateStats()` — updates Score, WPM, Accuracy, Progress.
- `_playCorrectTone()` / `_playWrongTone()` — small WebAudio clicks for feedback.
- `_showConfetti()` — simple confetti visual effect (non-heavy).

---

## 5 — Advanced features explained

### Audio mapping to typed progress
We map typed-character progress ratio to `audio.currentTime`:
