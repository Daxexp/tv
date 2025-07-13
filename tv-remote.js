window.addEventListener("DOMContentLoaded", () => {
  const channels = Array.from(document.querySelectorAll(".channel"));
  if (!channels.length) return;

  let currentIndex = 0;

  // Inject glowing focus + Android TV fix
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

  // Remove Android TV cursor dot
  document.body.setAttribute("tabindex", "-1");
  document.body.blur();

  // Focus helper
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

  focusChannel(currentIndex); // Initial

  // Calculate how many items per row visually
  function getRowSize() {
    if (channels.length < 2) return 1;

    const firstTop = channels[0].getBoundingClientRect().top;
    for (let i = 1; i < channels.length; i++) {
      if (channels[i].getBoundingClientRect().top !== firstTop) {
        return i;
      }
    }
    return channels.length; // all in one row
  }

  document.addEventListener("keydown", (e) => {
    const rowSize = getRowSize();

    switch (e.key) {
      case "ArrowRight":
        focusChannel(Math.min(currentIndex + 1, channels.length - 1));
        break;
      case "ArrowLeft":
        focusChannel(Math.max(currentIndex - 1, 0));
        break;
      case "ArrowDown":
        focusChannel(Math.min(currentIndex + rowSize, channels.length - 1));
        break;
      case "ArrowUp":
        focusChannel(Math.max(currentIndex - rowSize, 0));
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
        break;
      }
      case "Backspace":
        window.location.href = "index.html";
        break;
    }
  });
});
