document.addEventListener("DOMContentLoaded", function () {
    // Authorized referrer (e.g., your homepage or main page)
    const authorizedReferrer = "https://gosltv.pages.dev/";

    // Check if the referrer is valid
    if (!document.referrer || !document.referrer.startsWith(authorizedReferrer)) {
        // If the referrer is invalid, check for session-based authentication
        if (sessionStorage.getItem('access_granted') !== 'true') {
            // Redirect or block access if no valid session is found
            alert("Unauthorized access! You cannot directly access this page.");
            window.location.href = authorizedReferrer; // Redirect to homepage
            return;
        }
    }

    // If the user passes either the referrer check or session check, allow access
    console.log("Access granted to player.html");
});