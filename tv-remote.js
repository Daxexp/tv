// tv-remote.js (Full Enhanced Version)

window.addEventListener("DOMContentLoaded", () => {
  const channels = Array.from(document.querySelectorAll(".channel"));
  if (!channels.length) return;

  let currentIndex = 0;

  // === Inject style for glowing focus + TV dot fix ===
  const style = document.createElement("style");
  style.textContent = `
    body {
      caret-color: transparent !important;
      outline: none !important;
    }
    *:focus-visible {
      outline: none !important;
    }
    .channel {
      outline: none;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .channel:focus {
      transform: scale(1.08);
      box-shadow: 0 0 15px #ff0000, 0 0 20px #ff0000;
      border-radius: 10px;
      z-index: 1;
    }
  `;
  document.head.appendChild(style);

  // Make all focusable
  channels.forEach(el => el.setAttribute("tabindex", "-1"));
  document.body.setAttribute("tabindex", "-1");
  document.body.blur();

  function focusChannel(index) {
    if (index < 0 || index >= channels.length) return;
    channels[currentIndex].blur();
    channels[currentIndex].setAttribute("tabindex", "-1");
    currentIndex = index;
    channels[currentIndex].setAttribute("tabindex", "0");
    channels[currentIndex].focus();
    channels[currentIndex].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }

  function findChannelInDirection(direction) {
    const current = channels[currentIndex];
    const currentRect = current.getBoundingClientRect();

    let bestIndex = -1;
    let minDistance = Infinity;

    for (let i = 0; i < channels.length; i++) {
      if (i === currentIndex) continue;
      const rect = channels[i].getBoundingClientRect();

      let valid = false;
      let dist = Infinity;

      switch (direction) {
        case "up":
          valid = rect.bottom <= currentRect.top;
          dist = Math.hypot(rect.left - currentRect.left, rect.bottom - currentRect.top);
          break;
        case "down":
          valid = rect.top >= currentRect.bottom;
          dist = Math.hypot(rect.left - currentRect.left, rect.top - currentRect.bottom);
          break;
        case "left":
          valid = rect.right <= currentRect.left && Math.abs(rect.top - currentRect.top) < 50;
          dist = currentRect.left - rect.right;
          break;
        case "right":
          valid = rect.left >= currentRect.right && Math.abs(rect.top - currentRect.top) < 50;
          dist = rect.left - currentRect.right;
          break;
      }

      if (valid && dist < minDistance) {
        bestIndex = i;
        minDistance = dist;
      }
    }

    return bestIndex;
  }

  focusChannel(currentIndex);

  document.addEventListener("keydown", (e) => {
    let nextIndex = -1;

    switch (e.key) {
      case "ArrowRight":
        nextIndex = findChannelInDirection("right");
        break;
      case "ArrowLeft":
        nextIndex = findChannelInDirection("left");
        break;
      case "ArrowDown":
        nextIndex = findChannelInDirection("down");
        break;
      case "ArrowUp":
        nextIndex = findChannelInDirection("up");
        break;
      case "Enter": {
        const el = channels[currentIndex];
        let channelName = "";

        if (el.dataset.channel) {
          channelName = el.dataset.channel;
        } else if (el.querySelector("h2")) {
          channelName = el.querySelector("h2").textContent.trim();
        } else if (el.querySelector("img")?.alt) {
          channelName = el.querySelector("img").alt.trim();
        }

        if (channelName) {
          const encoded = encodeURIComponent(channelName);
          window.location.href = `player.html?channel=${encoded}`;
        } else {
          alert("No channel name found!");
        }
        return;
      }
      case "Backspace":
        window.location.href = "index.html";
        return;
    }

    // If direction key hit, move or loop
    if (nextIndex !== -1) {
      focusChannel(nextIndex);
    } else {
      if (e.key === "ArrowRight") focusChannel(0);
      if (e.key === "ArrowLeft") focusChannel(channels.length - 1);
    }
  });

  // === Lazy Load Thumbnails ===
  const lazyImages = document.querySelectorAll('img.lazy-img');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy-img');
          observer.unobserve(img);
        }
      });
    });
    lazyImages.forEach(img => observer.observe(img));
  } else {
    lazyImages.forEach(img => (img.src = img.dataset.src));
  }
});
