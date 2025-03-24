document.addEventListener("DOMContentLoaded", function() {
    // Create the element for the current time
    const timeElement = document.createElement('div');
    timeElement.style.position = 'fixed';
    timeElement.style.top = '10px';
    timeElement.style.left = '10px';
    timeElement.style.fontFamily = 'Digital-7, Arial, sans-serif'; // Use a digital watch font
    timeElement.style.fontSize = '24px';
    timeElement.style.zIndex = '1000';

    // Function to update the current time
    function updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        timeElement.textContent = timeString;
    }

    // Function to update the font color based on the page mode
    function updateFontColor() {
        const isLightMode = document.body.classList.contains('light-mode');
        timeElement.style.color = isLightMode ? '#000' : '#fff';
    }

    // Update the time every second
    setInterval(updateTime, 1000);

    // Update the font color whenever the mode changes
    const observer = new MutationObserver(updateFontColor);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    // Initial updates
    document.body.appendChild(timeElement);
    updateTime();
    updateFontColor();
});
