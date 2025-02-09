const fetch = require("node-fetch");

exports.handler = async (event) => {
  const code = new URLSearchParams(event.queryStringParameters).get("code");

  if (!code) return { statusCode: 400, body: "Missing authorization code" };

  const clientId = process.env.DISCORD_CLIENT_ID;
  const clientSecret = process.env.DISCORD_CLIENT_SECRET;
  const redirectUri = process.env.REDIRECT_URI;

  try {
    const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
      }),
    });

    const tokenData = await tokenResponse.json();
    if (!tokenData.access_token) return { statusCode: 500, body: "Failed to get access token" };

    const userResponse = await fetch("https://discord.com/api/users/@me", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    const userData = await userResponse.json();
    if (!userData.id) return { statusCode: 500, body: "Failed to fetch user details" };

    return {
      statusCode: 302,
      headers: {
        "Set-Cookie": `user=${JSON.stringify(userData)}; Path=/; HttpOnly`,
        Location: "/dashboard.html",
      },
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: "OAuth2 Callback Error", details: error }) };
  }
};
