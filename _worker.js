export default {
  async fetch(request, env) {
    const clientIP = request.headers.get("CF-Connecting-IP");
    
    // Get your blocked list from the Secret we set in Point 3
    const blockedListRaw = env.BLOCKED_IPS || "";
    const blockedIPs = blockedListRaw.split(",").map(ip => ip.trim());

    // 1. Check if the user is blocked
    if (blockedIPs.includes(clientIP)) {
      return new Response("Access Denied: Your IP is restricted.", { status: 403 });
    }

    // 2. If NOT blocked, let them see your files
    // env.ASSETS.fetch(request) tells Cloudflare to serve your index.html or player.html
    return env.ASSETS.fetch(request);
  }
};
