exports.handler = async (event) => {
  const cookie = event.headers.cookie || "";
  const match = cookie.match(/user=([^;]+)/);

  if (!match) return { statusCode: 401, body: "Not logged in" };

  return {
    statusCode: 200,
    body: match[1],
  };
};
