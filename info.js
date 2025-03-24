document.addEventListener("DOMContentLoaded", function() {
    // Create the container for the real-time info
    const infoContainer = document.createElement('div');
    infoContainer.style.position = 'fixed';
    infoContainer.style.top = '10px';
    infoContainer.style.right = '10px';
    infoContainer.style.backgroundColor = '#333';
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
    function updateUserCount() {
        // Simulate online user count for demonstration purposes
        const userCount = Math.floor(Math.random() * 100) + 1; // Replace this with actual logic to get online user count
        userCountElement.textContent = `Online Users: ${userCount}`;
    }

    // Update the time and user count every second
    setInterval(updateTime, 1000);
    setInterval(updateUserCount, 1000);

    // Initial update
    updateTime();
    updateUserCount();
});