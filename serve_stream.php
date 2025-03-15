<?php
// serve_stream.php

// Define a list of channels with their m3u8 links
$channels = [
    "channel1" => "https://edge2-moblive.yuppcdn.net/trans1sd/smil:strtml19.smil/playlist.m3u8?wmsAuthSign=c2VydmVyX3RpbWU9MDMvMTAvMjAyNCAxMTo0NjoxMiBBTSZoYXNoX3ZhbHVlPU9tZmExdkd1N3R3TjN0QkdBT21hT3c9PSZ2YWxpZG1pbnV0ZXM9NSZpZD15dXBwdHZvdHRfNV8yMDE3NzBfYTA0NmIxNGUtYzBiNS1mOTAzLTgzZjUtZDE3YzY0MmE1YTFjX0xLXzE3NS4xNTcuMTM2LjkwX3NsdF8xX2NoYW5uZWxfMTlfLTEmc3RybV9sZW49Mjc=",
    "channel2" => "https://example.com/channel2.m3u8",
    "channel3" => "https://example.com/channel3.m3u8"
];

// Get the channel ID from the query parameter
$channelId = $_GET['channel'] ?? null;

if ($channelId && isset($channels[$channelId])) {
    // Serve the m3u8 link for the requested channel
    header('Content-Type: application/vnd.apple.mpegurl');
    echo file_get_contents($channels[$channelId]);
} else {
    // Invalid channel ID
    http_response_code(404);
    echo "Channel not found.";
}
?>