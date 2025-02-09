exports.handler = async () => {
  const clientId = process.env.DISCORD_CLIENT_ID; // Securely fetched from Netlify
  const redirectUri = process.env.REDIRECT_URI;  // Securely fetched from Netlify

  return {
    statusCode: 302,
    headers: {
      Location: `https://discord.com/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=identify`,
    },
  };
};
