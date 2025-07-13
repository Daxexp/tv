window.addEventListener("DOMContentLoaded", () => {
  const channels = Array.from(document.querySelectorAll(".channel"));

  if (!channels.length) return;

  let currentIndex = 0;

  // Inject minimal focus style without touching your original CSS
  const style = document.createElement("style");
  style.textContent = `
    .channel:focus {
      outline: 3px solid #ffcc00 !important;
    }
  `;
  document.head.appendChild(style);

  // Ensure all channels can receive focus
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

  // Initial focus
  focusChannel(currentIndex);

  // Key handling
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      focusChannel(Math.min(currentIndex + 1, channels.length - 1));
    } else if (e.key === "ArrowLeft") {
      focusChannel(Math.max(currentIndex - 1, 0));
    } else if (e.key === "Enter") {
      // Try to get channel name from image alt, text, or data attribute
      const el = channels[currentIndex];
      let channelName = "";

      // Priority: data-channel, h2 text, img alt
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
    }
  });
});
