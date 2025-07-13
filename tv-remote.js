window.addEventListener("load", () => {
  const channels = Array.from(document.querySelectorAll(".channel"));

  if (channels.length === 0) return;

  let currentIndex = 0;

  // Inject CSS for red focus border
  const style = document.createElement("style");
  style.textContent = `
    .channel:focus {
      outline: 3px solid #ff0000 !important;
    }
  `;
  document.head.appendChild(style);

  // Set initial tabindex and focus
  channels.forEach(el => el.removeAttribute("tabindex")); // Clean any leftovers
  channels[currentIndex].setAttribute("tabindex", "0");
  channels[currentIndex].focus();

  function focusChannel(index) {
    if (index < 0 || index >= channels.length) return;

    // Remove previous focus
    channels[currentIndex].blur();
    channels[currentIndex].removeAttribute("tabindex");

    // Set new focus
    currentIndex = index;
    channels[currentIndex].setAttribute("tabindex", "0");
    channels[currentIndex].focus();
  }

  document.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowRight":
        focusChannel((currentIndex + 1) % channels.length);
        break;
      case "ArrowLeft":
        focusChannel((currentIndex - 1 + channels.length) % channels.length);
        break;
      case "ArrowDown":
        focusChannel((currentIndex + 3) % channels.length); // adjust per row
        break;
      case "ArrowUp":
        focusChannel((currentIndex - 3 + channels.length) % channels.length);
        break;
      case "Enter":
        channels[currentIndex].click();
        break;
    }
  });
});
