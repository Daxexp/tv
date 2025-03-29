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
    notification.style.bottom = '20px';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.backgroundColor = 'green';
    notification.style.color = 'white';
    notification.style.padding = '10px 20px';
    notification.style.borderRadius = '5px';
    notification.style.fontSize = '16px';
    notification.style.fontFamily = 'Arial, sans-serif';
    notification.style.zIndex = '9999';
    notification.style.opacity = '0';
    notification.style.transition = 'opacity 0.5s ease-in-out, bottom 0.5s ease-in-out';
    notification.innerHTML = message;

    // Append the notification to the body
    document.body.appendChild(notification);

    // Trigger animation by changing opacity and position
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.bottom = '80px';
    }, 10);

    // Hide the notification after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.bottom = '20px';
        // Remove the notification from the DOM after the animation
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}
