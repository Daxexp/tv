window.addEventListener("DOMContentLoaded", () => {
  const channels = Array.from(document.querySelectorAll(".channel"));
  if (!channels.length) return;

  let currentIndex = 0;

  // Inject CSS to hide the default focus outline and caret cursor aggressively
  const style = document.createElement("style");
  style.textContent = `
    /* Hide blinking caret and outline on body */
    body, html {
      caret-color: transparent !important;
      outline: none !important;
    }
    /* Remove default focus ring for all elements */
    *:focus {
      outline: none !important;
    }
    /* Your glowing focus style */
    .channel {
      outline: none;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .channel:focus-visible, .channel:focus {
      transform: scale(1.08);
      box-shadow: 0 0 15px #ff0000, 0 0 20px #ff0000;
      border-radius: 10px;
      z-index: 1;
    }
  `;
  document.head.appendChild(style);

  // Prevent any browser cursor by hiding focus on body and html
  document.body.setAttribute("tabindex", "-1");
  document.body.blur();
  document.documentElement.setAttribute("tabindex", "-1");

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

  focusChannel(currentIndex);

  document.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowRight":
        focusChannel(Math.min(currentIndex + 1, channels.length - 1));
        break;
      case "ArrowLeft":
        focusChannel(Math.max(currentIndex - 1, 0));
        break;
      case "Enter":
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
  });
});
