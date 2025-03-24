document.addEventListener("DOMContentLoaded", function() {
    // Create the container for the real-time info
    const infoContainer = document.createElement('div');
    infoContainer.style.position = 'fixed';
    infoContainer.style.top = '10px';
    infoContainer.style.left = '10px';
    infoContainer.style.backgroundColor = 'rgba(51, 51, 51, 0.8)'; // Semi-transparent background
    infoContainer.style.color = '#fff';
    infoContainer.style.padding = '10px';
    infoContainer.style.borderRadius = '5px';
    infoContainer.style.zIndex = '1000';
    document.body.appendChild(infoContainer);

    // Create the element for the current time
    const timeElement = document.createElement('div');
    infoContainer.appendChild(timeElement);

    // Create the element for the online user count
    const userCountElement = document.createElement('div');
    infoContainer.appendChild(userCountElement);

    // Function to update the current time
    function updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        timeElement.textContent = `Current Time: ${timeString}`;
    }

    // Function to update the online user count
    async function updateUserCount() {
        try {
            const response = await fetch('https://gosltv.pages.dev/');
            const text = await response.text();
            const userCount = (text.match(/"user online"/g) || []).length; // Simulate fetching online user count
            userCountElement.textContent = `Online Users: ${userCount}`;
        } catch (error) {
            userCountElement.textContent = 'Online Users: Error fetching data';
        }
    }

    // Update the time every second
    setInterval(updateTime, 1000);

    // Update the user count every 10 seconds
    setInterval(updateUserCount, 10000);

    // Initial update
    updateTime();
    updateUserCount();
});
