document.addEventListener("DOMContentLoaded", function() {
    // Check if the correct password is already stored in session storage
    if (sessionStorage.getItem('authenticated') !== 'true') {
        // Prompt for the password
        const password = prompt("Please enter the password to access the content:");

        // Define the correct password
        const correctPassword = "dass99"; // Set your password here

        // Check if the entered password is correct
        if (password === correctPassword) {
            // Store the authenticated state in session storage
            sessionStorage.setItem('authenticated', 'true');
            // Show a success message with notification animation
            showSuccessNotification("Welcome_enjoy!");
        } else {
            // If the password is incorrect, display an error message and hide the content
            alert("Incorrect password. You do not have access to this content.");
            document.body.innerHTML = "";
        }
    }
});

// Function to create and show the success notification
function showSuccessNotification(message) {
    // Create a div element for the notification
    const notification = document.createElement('div');
    notification.style.position = 'fixed';
    notification.style.top = '20px';  // Position at the top
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)'; // Center horizontally
    notification.style.backgroundColor = 'rgba(0, 255, 0, 0.7)'; // Transparent green background
    notification.style.color = 'white';
    notification.style.padding = '20px 40px';  // Increased padding for bigger box
    notification.style.borderRadius = '10px';
    notification.style.fontSize = '20px';  // Larger font size for better visibility
    notification.style.fontFamily = 'Arial, sans-serif';
    notification.style.zIndex = '9999';
    notification.style.opacity = '0';
    notification.style.transition = 'opacity 0.5s ease-in-out, top 0.5s ease-in-out';
    notification.style.boxShadow = '0 0 0 0 rgba(255, 255, 255, 0.6)'; // No initial glow
    notification.style.border = '3px solid transparent'; // Transparent border initially
    notification.innerHTML = message;

    // Append the notification to the body
    document.body.appendChild(notification);

    // Trigger animation by changing opacity and position
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.top = '100px';  // Move it slightly down after animation starts
        // Add the glowing border animation
        notification.style.animation = 'glow-border 4s infinite alternate';
    }, 10);

    // Hide the notification after 4 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.top = '20px';
        notification.style.animation = ''; // Stop the animation when the notification is hidden
        // Remove the notification from the DOM after the animation
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 4000);  // Stay visible for 4 seconds
}

// Add the CSS for the glowing border effect
const style = document.createElement('style');
style.innerHTML = `
@keyframes glow-border {
    0% {
        box-shadow: 0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(0, 255, 0, 1);
        border-color: rgba(0, 255, 0, 1);
    }
    100% {
        box-shadow: 0 0 20px rgba(255, 255, 255, 0.8), 0 0 30px rgba(0, 255, 0, 1);
        border-color: rgba(0, 255, 0, 1);
    }
}
`;
document.head.appendChild(style);
