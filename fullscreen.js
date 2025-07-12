window.addEventListener('load', function () {
  const player = videojs('videoPlayer');

  player.ready(() => {
    player.play();

    const videoEl = document.getElementById('videoPlayer');

    const requestFullScreen =
      videoEl.requestFullscreen ||
      videoEl.webkitRequestFullscreen ||
      videoEl.mozRequestFullScreen ||
      videoEl.msRequestFullscreen;

    if (requestFullScreen) {
      requestFullScreen.call(videoEl);
    }
  });
});
