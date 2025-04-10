document.addEventListener("DOMContentLoaded", function () {
    // Check if the correct password is already stored in session storage
    if (sessionStorage.getItem('authenticated') !== 'true') {
        // Prompt for the password
        const password = prompt("Please enter the password to access the content:");

        // Define the hashed password (SHA-256 hash for "dass99")
        const correctPasswordHash = "5b0697d9a9a8f3c5dbb6b5bcb54e3b6d6e2a5c1d0d3d5c7e9843e94c1d5a1e75";

        // Hash the entered password using a hashing function
        const hashedInput = hashPassword(password);

        // Check if the entered password's hash matches the correct hash
        if (hashedInput === correctPasswordHash) {
            // Store the authenticated state in session storage
            sessionStorage.setItem('authenticated', 'true');
            // Show a success message with notification animation
            showSuccessNotification("Welcome_enjoy!");
        } else {
            // If the password is incorrect, display an error message and exit the site
            alert("Incorrect password. You do not have access to this content.");
            window.location.href = "about:blank"; // Redirect to a blank page
        }
    }
});

// Function to hash the password using SHA-256
function hashPassword(password) {
    // Use the SubtleCrypto API to create a SHA-256 hash
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    return crypto.subtle.digest("SHA-256", data).then(hashBuffer => {
        // Convert the hash to a hexadecimal string
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    });
}

// Function to create and show the success notification (same as before)
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
