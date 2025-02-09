const fetch = require("node-fetch");

exports.handler = async function () {
    console.log("Starting getServerCount function...");

    try {
        if (!process.env.BOT_TOKEN) {
            console.error("❌ BOT_TOKEN is missing!");
            return {
                statusCode: 500,
                body: JSON.stringify({ error: "BOT_TOKEN is not set" }),
            };
        }

        console.log("Fetching data from Discord API...");
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

        console.log(`✅ Successfully fetched server count: ${serverCount}`);

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ server_count: serverCount }),
        };
    } catch (error) {
        console.error("❌ Unexpected error in getServerCount:", error.message);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to fetch server count" }),
        };
    }
};
