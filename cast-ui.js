(function addCastButtonUI() {
    const barCheck = setInterval(() => {
        const themeToggle = document.querySelector(".theme-toggle");
        if (!themeToggle) return;

        clearInterval(barCheck);

        const castBtn = document.createElement("div");
        castBtn.id = "castButton";
        castBtn.innerHTML = "📺 Cast";
        castBtn.style.cssText = `
            margin-top: 8px;
            background: #ff4b4b;
            padding: 6px 14px;
            border-radius: 6px;
            font-size: 15px;
            font-weight: bold;
            cursor: pointer;
            display: inline-block;
            box-shadow: 0 0 12px rgba(255,0,0,0.5);
            user-select: none;
        `;

        themeToggle.parentNode.appendChild(castBtn);

        castBtn.onclick = () => {
            if (!window.cast || !cast.framework) {
                alert("⏳ Cast is still loading… Try again in 2 seconds.");
                return;
            }
            cast.framework.CastContext.getInstance().requestSession();
        };

    }, 400);
})();
