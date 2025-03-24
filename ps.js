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
            // Show a success message
            alert("Welcome_enjoy!");
        } else {
            // If the password is incorrect, display an error message and hide the content
            alert("Incorrect password. You do not have access to this content.");
            document.body.innerHTML = "";
        }
    }
});
