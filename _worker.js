export default {
  async fetch(request, env) {
    // 1. Get the visitor's real IP address from Cloudflare
    const clientIP = request.headers.get("CF-Connecting-IP");

    // 2. Read the blocked IP list from environment variables
    const blockedListRaw = env.BLOCKED_IPS || "";

    // 3. Convert comma-separated list into an array
    const blockedIPs = blockedListRaw
      .split(",")
      .map(ip => ip.trim())
      .filter(Boolean);

    // 4. If visitor IP is blocked → deny access
    if (blockedIPs.includes(clientIP)) {
      return new Response(
        `
        <html>
          <head><title>Access Denied</title></head>
          <body style="background:#000;color:#fff;text-align:center;padding-top:20%;">
            <h1>Access Denied</h1>
            <p>You are not allowed to view this stream.</p>
          </body>
        </html>
        `,
        {
          status: 403,
          headers: { "Content-Type": "text/html" },
        }
      );
    }

    // 5. If allowed, serve site assets normally
    return env.ASSETS.fetch(request);
  },
};
