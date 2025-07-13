window.addEventListener("DOMContentLoaded", () => {
  const channels = Array.from(document.querySelectorAll(".channel"));
  if (!channels.length) return;

  let currentIndex = 0;
  const itemsPerRow = 4; // 🔧 Adjust this if your layout shows 3, 5, etc. per row

  // Inject style (neon focus + Android TV fix)
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

  channels.forEach(el => el.setAttribute("tabindex", "-1"));

  function focusChannel(index) {
    if (index < 0 || index >= channels.length) return;

    channels[currentIndex].blur();
    channels[currentIndex].setAttribute("tabindex", "-1");

    currentIndex = index;
    channels[currentIndex].setAttribute("tabindex", "0");
    channels[currentIndex].focus();

    channels[currentIndex].scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest"
    });
  }

  // Prevent Android TV dot
  document.body.setAttribute("tabindex", "-1");
  document.body.blur();

  focusChannel(currentIndex);

  document.addEventListener("keydown", (e) => {
    const key = e.key;

    if (key === "ArrowRight") {
      focusChannel(Math.min(currentIndex + 1, channels.length - 1));
    } else if (key === "ArrowLeft") {
      focusChannel(Math.max(currentIndex - 1, 0));
    } else if (key === "ArrowUp") {
      focusChannel(Math.max(currentIndex - itemsPerRow, 0));
    } else if (key === "ArrowDown") {
      focusChannel(Math.min(currentIndex + itemsPerRow, channels.length - 1));
    } else if (key === "Enter") {
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
    } else if (key === "Backspace") {
      window.history.back();
    } else if (key.toLowerCase() === "m") {
      const video = document.querySelector("video");
      if (video) {
        video.muted = !video.muted;
      }
    }
  });
});
