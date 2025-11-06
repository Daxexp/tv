(function() {
  const s = document.createElement("script");
  s.src = "https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1";
  document.head.appendChild(s);
})();

window.__onGCastApiAvailable = function(isAvailable) {
  if (!isAvailable) return;

  const context = cast.framework.CastContext.getInstance();
  context.setOptions({
    receiverApplicationId: chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
    autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
  });

  console.log("✅ Chromecast Ready");
};

function enableVideoJsCasting(player) {
  player.on("play", function () {
    const stream = player.currentSource().src;
    if (!stream.includes(".m3u8")) return;

    const context = cast.framework.CastContext.getInstance();
    const mediaInfo = new chrome.cast.media.MediaInfo(stream, "application/x-mpegURL");
    const request = new chrome.cast.media.LoadRequest(mediaInfo);

    context.requestSession()
      .then(() => context.getCurrentSession()?.loadMedia(request))
      .catch(err => console.warn("Cast Failed:", err));
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const check = setInterval(() => {
    if (window.videojs && videojs.getAllPlayers().length > 0) {
      clearInterval(check);
      const player = videojs.getAllPlayers()[0];
      enableVideoJsCasting(player);
    }
  }, 500);
});
