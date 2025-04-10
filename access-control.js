document.addEventListener("DOMContentLoaded", function () {
    // Authorized referrer (e.g., your homepage or main page)
    const authorizedReferrer = "https://gosltv.pages.dev/";

    // Check if the referrer is valid
    if (!document.referrer || !document.referrer.startsWith(authorizedReferrer)) {
        // If the referrer is invalid, check for session-based authentication
        if (sessionStorage.getItem('access_granted') !== 'true') {
            // Create a full-screen overlay
            const overlay = document.createElement('div');
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'; // Semi-transparent black
            overlay.style.color = 'white';
            overlay.style.display = 'flex';
            overlay.style.flexDirection = 'column';
            overlay.style.justifyContent = 'center';
            overlay.style.alignItems = 'center';
            overlay.style.zIndex = '9999'; // Ensure it's on top of everything
            overlay.innerHTML = `
                <h1>Unauthorized Access</h1>
                <p>You cannot use this page. Please return to the homepage.</p>
                <a href="https://gosltv.pages.dev/" style="text-decoration: none; color: lightblue; font-size: 18px;">Go to Homepage</a>
            `;

            // Append the overlay to the body
            document.body.appendChild(overlay);

            // Disable all functionality on the page
            document.body.style.pointerEvents = 'none'; // Disable interaction with the entire page
            overlay.style.pointerEvents = 'all'; // Enable interaction with the overlay

            return; // Stop further execution
        }
    }

    // If the user passes either the referrer check or session check, allow access
    console.log("Access granted to player.html");
});
