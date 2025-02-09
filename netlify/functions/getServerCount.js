const fetch = require("node-fetch");

exports.handler = async function () {
    try {
        const response = await fetch("https://discord.com/api/v10/users/@me/guilds", {
            method: "GET",
            headers: {
                "Authorization": `Bot ${process.env.BOT_TOKEN}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Discord API returned ${response.status}`);
        }

        const data = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify({ server_count: data.length }),
        };
    } catch (error) {
        console.error("Error fetching server count:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to fetch server count" }),
        };
    }
};
