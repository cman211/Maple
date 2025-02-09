document.addEventListener("DOMContentLoaded", () => {
    const BOT_TOKEN = "YOUR_BOT_TOKEN";  // Replace with your bot token

    const fetchServerCount = async () => {
        try {
            const response = await fetch("https://discord.com/api/v10/users/@me/guilds", {
                method: "GET",
                headers: {
                    "Authorization": `Bot ${BOT_TOKEN}`,
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }

            const data = await response.json();
            document.getElementById("server-count").innerText = `${data.length} Servers`;
        } catch (error) {
            console.error("Error fetching server count:", error);
            document.getElementById("server-count").innerText = "Error";
        }
    };

    fetchServerCount();
});
