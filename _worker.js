export default {
  async fetch(request, env) {
    // 1. Get real client IP & country from Cloudflare
    const clientIP = request.headers.get("CF-Connecting-IP");
    const country  = request.headers.get("CF-IPCountry");

    // 2. Read blocked IPs from Cloudflare environment variable
    const blockedIPs = (env.BLOCKED_IPS || "")
      .split(",")
      .map(ip => ip.trim())
      .filter(Boolean);

    // 3. Block logic:
    // - If NOT Sri Lanka → block
    // - If Sri Lanka BUT IP is blocked → block
    if (country !== "LK" || blockedIPs.includes(clientIP)) {
      return new Response(
        `
        <html>
          <head><title>Access Restricted</title></head>
          <body style="background:#000;color:#fff;text-align:center;padding-top:20%;">
            <h1>Access Restricted</h1>
            <p>This stream is available only in Sri Lanka.</p>
          </body>
        </html>
        `,
        {
          status: 403,
          headers: { "Content-Type": "text/html" },
        }
      );
    }

    // 4. Allowed users → serve site normally
    return env.ASSETS.fetch(request);
  },
};
