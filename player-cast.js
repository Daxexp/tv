// Load Chromecast Sender API
(function() {
  const s = document.createElement("script");
  s.src = "https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1";
  document.head.appendChild(s);
})();

// Wait for video to appear
window.addEventListener("load", () => {

  function getVideo() {
    const video = document.querySelector("video");
    if (!video) return setTimeout(getVideo, 400);
    setupCasting(video);
  }

  getVideo();

  function setupCasting(video) {
    console.log("🎥 Player detected -> Ready for Chromecast");

    window.__onGCastApiAvailable = function(isAvailable) {
      if (!isAvailable) return;

      const ctx = cast.framework.CastContext.getInstance();
      ctx.setOptions({
        receiverApplicationId: chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
        autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
      });

      video.addEventListener("play", () => {
        const streamUrl = video.currentSrc;
        if (!streamUrl || !streamUrl.includes(".m3u8")) return;

        const mediaInfo = new chrome.cast.media.MediaInfo(streamUrl, "application/x-mpegURL");
        const request = new chrome.cast.media.LoadRequest(mediaInfo);

        ctx.requestSession()
          .then(() => ctx.getCurrentSession()?.loadMedia(request))
          .catch(err => console.warn("Cast Request Failed:", err));
      });
    };
  }
});
