exports.handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      clientId: process.env.DISCORD_CLIENT_ID, // Get from Netlify env vars
    }),
  };
};
