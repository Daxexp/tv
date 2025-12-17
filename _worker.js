export default {
  async fetch(request, env) {
    const clientIP = request.headers.get("CF-Connecting-IP");
    const country  = request.headers.get("CF-IPCountry");

    const blockedIPs = (env.BLOCKED_IPS || "")
      .split(",")
      .map(ip => ip.trim())
      .filter(Boolean);

    // BLOCK logic
    if (country !== "LK" || blockedIPs.includes(clientIP)) {
      return new Response(
        `
        <html>
          <head><title>Access Denied</title></head>
          <body style="background:#131a36;color:#fff;text-align:center;padding-top:20%;">
            <h1>Access Restricted</h1><p>You are not allowed to view this site</p>
          </body>
        </html>
        `,
        {
          status: 403,
          headers: {
            "Content-Type": "text/html",
            "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
            "Pragma": "no-cache",
            "Expires": "0"
          },
        }
      );
    }

    // ALSO disable caching for allowed users
    const response = await env.ASSETS.fetch(request);
    return new Response(response.body, {
      status: response.status,
      headers: {
        ...Object.fromEntries(response.headers),
        "Cache-Control": "no-store"
      }
    });
  },
};
