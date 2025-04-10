document.addEventListener("DOMContentLoaded", function () {
    // Redirect URL for incorrect password
    const exitURL = "https://example.com"; // Replace with your desired exit page

    // Maximum number of attempts
    const maxAttempts = 3;
    let attempts = 0;

    // Check if the correct password is already stored in session storage
    if (sessionStorage.getItem("authenticated") !== "true") {
        while (attempts < maxAttempts) {
            // Prompt for the password
            const password = prompt("Please enter the password to access the content:");

            // Define the hashed version of the correct password
            const correctPasswordHash = "e4f04c4b8f3bafc4c2a4e5c4bb6b3e7a"; // Precomputed hash for "dass99"
            
            // Compute the hash of the entered password
            const enteredPasswordHash = hashPassword(password);

            // Check if the entered password hash matches the correct hash
            if (enteredPasswordHash === correctPasswordHash) {
                // Store the authenticated state in session storage
                sessionStorage.setItem("authenticated", "true");
                // Show a success message with notification animation
                showSuccessNotification("Welcome_enjoy!");
                break;
            } else {
                attempts++;
                alert(`Incorrect password. You have ${maxAttempts - attempts} attempt(s) left.`);
                if (attempts >= maxAttempts) {
                    alert("Too many incorrect attempts. Exiting the website.");
                    sessionStorage.clear();
                    window.location.href = exitURL; // Redirect to the exit page
                }
            }
        }
    }
});

// Function to create and show the success notification
function showSuccessNotification(message) {
    const notification = document.createElement("div");
    notification.style.position = "fixed";
    notification.style.top = "20px";
    notification.style.left = "50%";
    notification.style.transform = "translateX(-50%)";
    notification.style.backgroundColor = "rgba(0, 128, 0, 0.7)";
    notification.style.color = "white";
    notification.style.padding = "20px 40px";
    notification.style.borderRadius = "10px";
    notification.style.fontSize = "20px";
    notification.style.fontFamily = "Arial, sans-serif";
    notification.style.zIndex = "9999";
    notification.style.opacity = "0";
    notification.style.transition = "opacity 0.5s ease-in-out, top 0.5s ease-in-out";
    notification.innerHTML = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = "1";
        notification.style.top = "100px";
    }, 10);

    setTimeout(() => {
        notification.style.opacity = "0";
        notification.style.top = "20px";
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 4000);
}

// Function to hash the password (simple example using MD5)
function hashPassword(password) {
    return CryptoJS.MD5(password).toString();
}
