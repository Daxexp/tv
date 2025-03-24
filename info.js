document.addEventListener("DOMContentLoaded", function() {
    // Create the element for the current time
    const timeElement = document.createElement('div');
    timeElement.style.position = 'fixed';
    timeElement.style.top = '10px';
    timeElement.style.left = '50%';
    timeElement.style.transform = 'translateX(-50%)';
    timeElement.style.fontFamily = 'Digital-7, Arial, sans-serif'; // Use a digital watch font
    timeElement.style.fontSize = '24px';
    timeElement.style.color = '#fff';
    timeElement.style.zIndex = '1000';
    document.body.appendChild(timeElement);

    // Function to update the current time
    function updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        timeElement.textContent = timeString;
    }

    // Update the time every second
    setInterval(updateTime, 1000);

    // Initial update
    updateTime();
});
