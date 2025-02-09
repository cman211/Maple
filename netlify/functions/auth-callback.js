const fetch = require("node-fetch");

exports.handler = async (event) => {
  const code = new URLSearchParams(event.queryStringParameters).get("code");
  if (!code) return { statusCode: 400, body: "Missing authorization code" };

  const clientId = process.env.DISCORD_CLIENT_ID;
  const clientSecret = process.env.DISCORD_CLIENT_SECRET;
  const redirectUri = process.env.REDIRECT_URI;
  
  try {
    // Exchange code for token
    const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
      }),
    }).then((res) => res.json());

    // Fetch user info
    const userRes = await fetch("https://discord.com/api/users/@me", {
      headers: { Authorization: `Bearer ${tokenRes.access_token}` },
    }).then((res) => res.json());

    // Store user info in a Netlify session (via cookie)
    return {
      statusCode: 302,
      headers: {
        "Set-Cookie": `user=${JSON.stringify(userRes)}; Path=/; HttpOnly`,
        Location: "/dashboard.html",
      },
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify(error) };
  }
};
