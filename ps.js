document.addEventListener("DOMContentLoaded", function () {
    // Check if the correct password is already stored in session storage
    if (sessionStorage.getItem('authenticated') !== 'true') {
        // Prompt for the password
        const password = prompt("Please enter the password to access the content:");

        // Verify the password
        if (verifyPassword(password)) {
            // Store the authenticated state in session storage
            sessionStorage.setItem('authenticated', 'true');
            // Show a success message with notification animation
            showSuccessNotification("Welcome_enjoy!");
        } else {
            window.location.href = "about:blank"; // Redirect to a blank page
        }
    }
});

// Function to verify the password
function verifyPassword(inputPassword) {
    // Encoded password (Base64 encoded)
    const encodedPassword = "ZGFzczk5"; // Base64 for "dass99"
    const decodedPassword = atob(encodedPassword); // Decode the password
    return inputPassword === decodedPassword;
}

// Function to create and show the success notification
function showSuccessNotification(message) {
    const notification = document.createElement('div');
    notification.style.position = 'fixed';
    notification.style.top = '20px'; 
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.backgroundColor = 'rgba(0, 128, 0, 0.7)';
    notification.style.color = 'white';
    notification.style.padding = '20px 40px';
    notification.style.borderRadius = '10px';
    notification.style.fontSize = '20px';
    notification.style.fontFamily = 'Arial, sans-serif';
    notification.style.zIndex = '9999';
    notification.style.opacity = '0';
    notification.style.transition = 'opacity 0.5s ease-in-out, top 0.5s ease-in-out';
    notification.innerHTML = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.top = '100px';
    }, 10);

    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.top = '20px';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 4000);
}
