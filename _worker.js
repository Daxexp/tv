export default {
  async fetch(request, env) {
    // 1. Get the visitor's real IP address
    const clientIP = request.headers.get("CF-Connecting-IP");

    // 2. Get the blocked list from the Cloudflare Environment Variable
    const blockedListRaw = env.BLOCKED_IPS || "";
    
    // 3. Convert the list into an array for checking
    const blockedIPs = blockedListRaw.split(",").map(ip => ip.trim());

    // 4. Logic: If the visitor's IP is in our secret list...
    if (blockedIPs.includes(clientIP)) {
      // Show them a blocked message instead of your HTML files
      return new Response("<h1>Access Denied</h1><p>You are not allowed to view this stream.</p>", {
        status: 403,
        headers: { "Content-Type": "text/html" },
      });
    }

    // 5. If NOT blocked, serve your index.html or player.html normally
    return env.ASSETS.fetch(request);
  },
};
