document.addEventListener("DOMContentLoaded", function() {
    // Create the element for the current time
    const timeElement = document.createElement('div');
    timeElement.style.position = 'fixed';
    timeElement.style.top = '10px';
    timeElement.style.left = '10px';
    timeElement.style.fontFamily = 'Digital-7, Arial, sans-serif'; // Use a digital watch font
    timeElement.style.fontSize = '24px';
    timeElement.style.zIndex = '1000';
    document.body.appendChild(timeElement);

    // Function to update the current time
    function updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        timeElement.textContent = timeString;

        // Change font color based on theme
        if (document.body.classList.contains('light-mode')) {
            timeElement.style.color = '#000'; // Black for light mode
        } else {
            timeElement.style.color = '#fff'; // White for dark mode
        }
    }

    // Update the time every second
    setInterval(updateTime, 1000);

    // Initial update
    updateTime();

    // Add event listener for theme change
    const themeToggle = document.querySelector('.theme-toggle input');
    if (themeToggle) {
        themeToggle.addEventListener('change', updateTime);
    }
});
