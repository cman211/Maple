const fetch = require("node-fetch");

let cachedServerCount = null;
let cacheExpiration = 0;

exports.handler = async function () {
    console.log("Starting getServerCount function...");

    const CACHE_DURATION = 1 * 60 * 1000; // Cache duration set to 1 minute

    if (cachedServerCount !== null && Date.now() < cacheExpiration) {
        console.log("Returning cached server count:", cachedServerCount);
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ server_count: cachedServerCount }),
        };
    }

    try {
        if (!process.env.BOT_TOKEN) {
            console.error("❌ BOT_TOKEN is missing!");
            return {
                statusCode: 500,
                body: JSON.stringify({ error: "BOT_TOKEN is not set" }),
            };
        }

        const response = await fetch("https://discord.com/api/v10/users/@me/guilds", {
            method: "GET",
            headers: {
                Authorization: `Bot ${process.env.BOT_TOKEN}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`❌ Discord API Error: ${response.status} - ${errorText}`);
            return {
                statusCode: response.status,
                body: JSON.stringify({ error: `Discord API Error: ${response.status}` }),
            };
        }

        const guilds = await response.json();
        const serverCount = guilds.length;

        console.log(`✅ Fetched server count: ${serverCount}`);
        cachedServerCount = serverCount;
        cacheExpiration = Date.now() + CACHE_DURATION;

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ server_count: serverCount }),
        };
    } catch (error) {
        console.error("❌ Unexpected error:", error.message);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to fetch server count" }),
        };
    }
};
