exports.handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      clientId: process.env.DISCORD_CLIENT_ID, // Securely fetch from Netlify env vars
    }),
  };
};
