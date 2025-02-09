const fetch = require("node-fetch");

exports.handler = async function () {
    try {
        // Fetch bot's server count from Discord API
        const response = await fetch("https://discord.com/api/v10/applications/@me", {
            method: "GET",
            headers: {
                "Authorization": `Bot ${process.env.BOT_TOKEN}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Discord API returned ${response.status}`);
        }

        const data = await response.json();
        const serverCount = data.approximate_guild_count || "Unknown"; // Get server count

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ server_count: serverCount }),
        };
    } catch (error) {
        console.error("Error fetching server count:", error);
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ error: "Failed to fetch server count" }),
        };
    }
};
