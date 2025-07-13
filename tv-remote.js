window.addEventListener("load", () => {
  const channels = Array.from(document.querySelectorAll(".channel"));

  if (channels.length === 0) return;

  let currentIndex = 0;

  // Inject VIU-style CSS focus effect
  const style = document.createElement("style");
  style.textContent = `
    .channel {
      outline: none;
      transition: transform 0.2s, border 0.2s;
    }
    .channel:focus {
      border: 3px solid #ffcc00 !important;
      transform: scale(1.08);
    }
  `;
  document.head.appendChild(style);

  // Ensure all channels can receive focus
  channels.forEach(el => el.setAttribute("tabindex", "-1"));

  function focusChannel(index) {
    if (index < 0 || index >= channels.length) return;

    channels[currentIndex].blur();
    currentIndex = index;
    channels[currentIndex].setAttribute("tabindex", "0");
    channels[currentIndex].focus();
    // Optional: scroll it into view
    channels[currentIndex].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }

  // Initial focus
  focusChannel(currentIndex);

  // Remote key handling
  document.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowRight":
        focusChannel(Math.min(currentIndex + 1, channels.length - 1));
        break;
      case "ArrowLeft":
        focusChannel(Math.max(currentIndex - 1, 0));
        break;
      case "Enter":
        channels[currentIndex].click();
        break;
    }
  });
});
