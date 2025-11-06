// Load Chromecast Sender API
(function() {
  const s = document.createElement("script");
  s.src = "https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1";
  document.head.appendChild(s);
})();

window.addEventListener("load", () => {

  function findThemeToggle() {
    // Try to locate the circular toggle button in top-right corner
    const buttons = document.querySelectorAll("button, img, div");

    let bestMatch = null;
    buttons.forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top < 100 && r.right > window.innerWidth - 120 && r.width <= 80 && r.height <= 80) {
        bestMatch = el;
      }
    });

    if (!bestMatch) return setTimeout(findThemeToggle, 600);
    injectCastButton(bestMatch);
  }

  function injectCastButton(themeBtn) {
    // Create Cast Button
    const castBtn = document.createElement("google-cast-launcher");
    castBtn.style.width = "36px";
    castBtn.style.height = "36px";
    castBtn.style.display = "block";
    castBtn.style.marginTop = "6px";
    castBtn.style.cursor = "pointer";
    castBtn.style.filter = "drop-shadow(0px 2px 6px rgba(0,0,0,0.5))";

    // Insert right under the theme toggle button
    themeBtn.parentElement.insertBefore(castBtn, themeBtn.nextSibling);

    console.log("✅ Cast Button Injected");
  }

  findThemeToggle();

  // Cast handling
  window.__onGCastApiAvailable = function(isAvailable) {
    if (!isAvailable) return;

    const ctx = cast.framework.CastContext.getInstance();
    ctx.setOptions({
      receiverApplicationId: chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
      autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
    });

    document.addEventListener("play", function(e){
      if (e.target.tagName !== "VIDEO") return;
      const stream = e.target.currentSrc;
      if (!stream) return;

      const mediaInfo = new chrome.cast.media.MediaInfo(stream, "application/x-mpegURL");
      const request = new chrome.cast.media.LoadRequest(mediaInfo);

      ctx.requestSession().then(() => {
        ctx.getCurrentSession()?.loadMedia(request);
      });
    }, true);
  };

});
