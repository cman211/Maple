const fetch = require("node-fetch");

exports.handler = async () => {
  const clientId = process.env.DISCORD_CLIENT_ID;
  const redirectUri = process.env.REDIRECT_URI;
  
  return {
    statusCode: 302,
    headers: {
      Location: `https://discord.com/oauth2/authorize?client_id=${clientId}&response_type=code&scope=identify&redirect_uri=${redirectUri}`,
    },
  };
};
