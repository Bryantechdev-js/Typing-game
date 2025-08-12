/**
 * @typedef {Object} Song
 * @property {string} title
 * @property {string} artist
 * @property {string} preview
 * @property {Array<string>} key
 */

(() => {
  /** @type {HTMLSelectElement} */ const genreSelect = document.getElementById("genreSelect");
  /** @type {HTMLSelectElement} */ const songSelect = document.getElementById("songSelect");
  /** @type {HTMLParagraphElement} */ const lyricsDisplay = document.getElementById("lyricsDisplay");
  /** @type {HTMLTextAreaElement} */ const typingInput = document.getElementById("typingInput");
  /** @type {HTMLAudioElement} */ const audioPlayer = document.getElementById("audioPlayer");
  /** @type {HTMLDivElement} */ const feedback = document.getElementById("feedback");

  const fallbackLyrics = `This is a default lyric.\nType to see how good you are!`;

  const genres = [
    { id: 14, name: "Pop" },
    { id: 20, name: "Alternative" },
    { id: 21, name: "Rock" },
    { id: 15, name: "R&B/Soul" },
  ];

  function initGenres() {
    genres.forEach(({ id, name }) => {
      const option = document.createElement("option");
      option.value = String(id);
      option.textContent = name;
      genreSelect.appendChild(option);
    });
  }

  function addDefaultSongOption() {
    const option = document.createElement("option");
    const defaultSong = { title: "Default Song", artist: "Unknown", preview: "" };
    option.value = JSON.stringify(defaultSong);
    option.textContent = "🎵 Default Song";
    songSelect.appendChild(option);
    songSelect.disabled = false;
    setLyrics(fallbackLyrics);
    typingInput.disabled = true;
  }

  async function loadSongs(genreId) {
    if (!genreId) {
      songSelect.innerHTML = '<option value="">Select Song</option>';
      songSelect.disabled = true;
      setLyrics(fallbackLyrics);
      typingInput.disabled = true;
      audioPlayer.pause();
      audioPlayer.src = "";
      audioPlayer.style.display = "none";
      return;
    }

    songSelect.innerHTML = '<option>Loading...</option>';
    songSelect.disabled = true;
    typingInput.disabled = true;

    try {
      const response = await fetch(
        `https://itunes.apple.com/search?term=top&genreId=${encodeURIComponent(genreId)}&entity=song&limit=10`
      );

      if (!response.ok) throw new Error(`Network response not ok: ${response.status}`);

      const data = await response.json();

      if (!data.results?.length) {
        addDefaultSongOption();
        return;
      }

      songSelect.innerHTML = "";
      data.results.forEach(({ trackName, artistName, previewUrl }) => {
        if (!trackName || !artistName) return;
        const option = document.createElement("option");
        const song = { title: trackName, artist: artistName, preview: previewUrl || "" };
        option.value = JSON.stringify(song);
        option.textContent = `${trackName} - ${artistName}`;
        songSelect.appendChild(option);
      });

      songSelect.disabled = false;
      typingInput.disabled = true;
      audioPlayer.pause();
      audioPlayer.src = "";
      audioPlayer.style.display = "none";
      setLyrics(fallbackLyrics);
    } catch (error) {
      console.error("Failed to load songs:", error);
      addDefaultSongOption();
    }
  }

  async function fetchLyrics(artist, title) {
    if (!artist || !title) return fallbackLyrics;

    try {
      const response = await fetch(
        `https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`
      );
      if (!response.ok) throw new Error(`Lyrics not found for ${artist} - ${title}`);

      const data = await response.json();
      return data.lyrics || fallbackLyrics;
    } catch {
      return fallbackLyrics;
    }
  }

  function escapeHtml(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\n/g, "<br>");
  }

  function renderLyricsWithHighlight(lyrics, typed) {
    let html = "";

    for (let i = 0; i < lyrics.length; i++) {
      const char = lyrics[i];
      if (i < typed.length) {
        if (typed[i] === char) {
          html += `<span class="highlight">${escapeHtml(char)}</span>`;
        } else {
          html += `<span style="color:#ff6666;">${escapeHtml(char)}</span>`;
        }
      } else {
        html += escapeHtml(char);
      }
    }

    lyricsDisplay.innerHTML = html;
    scrollLyricsIfNeeded(i => i >= typed.length);
  }

  // Smooth scroll lyrics container if caret moves out of view
  function scrollLyricsIfNeeded(conditionFn) {
    const container = lyricsDisplay.parentElement;
    if (!container) return;

    const highlights = lyricsDisplay.querySelectorAll(".highlight");
    if (highlights.length === 0) return;

    // Find first highlight after typed length to scroll into view
    for (let span of highlights) {
      if (conditionFn(Array.from(lyricsDisplay.childNodes).indexOf(span))) {
        span.scrollIntoView({ behavior: "smooth", block: "center" });
        break;
      }
    }
  }

  function setLyrics(lyricsText) {
    lyricsDisplay.textContent = lyricsText;
    typingInput.value = "";
    feedback.textContent = "";
    renderLyricsWithHighlight(lyricsText, "");
    typingInput.disabled = true;
  }

  async function onSongSelected(selectedValue) {
    if (!selectedValue) {
      setLyrics(fallbackLyrics);
      audioPlayer.pause();
      audioPlayer.src = "";
      audioPlayer.style.display = "none";
      typingInput.disabled = true;
      return;
    }

    const song = JSON.parse(selectedValue);

    if (song.preview) {
      audioPlayer.src = song.preview;
      audioPlayer.style.display = "block";
      try {
        await audioPlayer.play();
      } catch {
        // ignore
      }
    } else {
      audioPlayer.pause();
      audioPlayer.src = "";
      audioPlayer.style.display = "none";
    }

    const lyrics = await fetchLyrics(song.artist, song.title);
    setLyrics(lyrics);
    typingInput.disabled = false;
    typingInput.focus();
  }

  function updateFeedback(text, color, animationClass) {
    feedback.textContent = text;
    feedback.style.color = color;
    feedback.classList.add(animationClass);

    setTimeout(() => {
      feedback.classList.remove(animationClass);
    }, 600);
  }

  function onTypingInput() {
    const lyrics = lyricsDisplay.textContent || "";
    const typed = typingInput.value;

    renderLyricsWithHighlight(lyrics, typed);

    if (lyrics.startsWith(typed)) {
      updateFeedback("✅ Keep going!", "#4caf50", "bounce");
    } else {
      updateFeedback("❌ Mistake!", "#e53935", "shake");
    }
  }

  function setupEventListeners() {
    genreSelect.addEventListener("change", () => {
      loadSongs(genreSelect.value);
    });

    songSelect.addEventListener("change", () => {
      onSongSelected(songSelect.value);
    });

    typingInput.addEventListener("input", onTypingInput);
  }

  function init() {
    initGenres();
    setupEventListeners();
    setLyrics(fallbackLyrics);
  }

  // Add animation styles dynamically
  (() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        50% { transform: translateX(5px); }
        75% { transform: translateX(-5px); }
      }
      .shake {
        animation: shake 0.3s ease;
      }
      @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-12px); }
      }
      .bounce {
        animation: bounce 0.6s ease;
      }
      .highlight {
        background-color: #ff416c88;
        border-radius: 6px;
        transition: background-color 0.3s ease;
      }
    `;
    document.head.appendChild(style);
  })();

  init();
})();
// This script initializes the game and handles user interactions
// It dynamically loads songs, fetches lyrics, and manages user input
// The game allows users to type along with the song lyrics and provides feedback