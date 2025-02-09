const fetch = require("node-fetch");

exports.handler = async function () {
    try {
        const response = await fetch("https://discord.com/api/v10/gateway/bot", {
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

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ server_count: data.shards || "Unknown" }),
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
