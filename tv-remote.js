window.addEventListener("DOMContentLoaded", () => {
  const channels = Array.from(document.querySelectorAll(".channel"));

  if (!channels.length) return;

  let currentIndex = 0;

  // Add CSS styling via JS
  const style = document.createElement("style");
  style.textContent = `
    .channel {
      outline: none;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .channel:focus {
      border: 3px solid #ffcc00 !important;
      transform: scale(1.08);
      box-shadow: 0 0 10px #ffcc00;
    }
  `;
  document.head.appendChild(style);

  // Ensure all .channel tiles are focusable
  channels.forEach(el => el.setAttribute("tabindex", "-1"));

  function focusChannel(index) {
    if (index < 0 || index >= channels.length) return;

    channels[currentIndex].blur();
    channels[currentIndex].setAttribute("tabindex", "-1");

    currentIndex = index;
    channels[currentIndex].setAttribute("tabindex", "0");
    channels[currentIndex].focus();

    // Smooth scroll into view
    channels[currentIndex].scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest"
    });
  }

  // Focus first tile
  focusChannel(currentIndex);

  // Handle remote key input
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      focusChannel(currentIndex + 1);
    } else if (e.key === "ArrowLeft") {
      focusChannel(currentIndex - 1);
    } else if (e.key === "Enter") {
      channels[currentIndex].click();
    }
  });
});
