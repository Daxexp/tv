window.addEventListener('load', function () {
  const tryFullscreen = () => {
    const videoEl = document.getElementById('videoPlayer');

    if (!videoEl) return;

    const requestFullScreen =
      videoEl.requestFullscreen ||
      videoEl.webkitRequestFullscreen ||
      videoEl.mozRequestFullScreen ||
      videoEl.msRequestFullscreen;

    if (requestFullScreen) {
      requestFullScreen.call(videoEl);
    }
  };

  // Wait until Video.js player is ready
  const player = videojs('videoPlayer');
  player.ready(() => {
    player.play().catch(() => {}); // Ignore autoplay errors
    setTimeout(tryFullscreen, 500); // slight delay before requesting fullscreen
  });
});
