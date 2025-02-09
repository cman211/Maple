document.addEventListener("DOMContentLoaded", () => {
    // ✅ Replace with your actual BotGhost API Key & Bot ID
    const botId = "1190388832617627709"; // Your bot ID from BotGhost
    const apiKey = "c18f4090770f3529018b8b22aff75ce8b3db36e464ca765b6eec814e48e42b73"; // Your BotGhost API Key

    // ✅ API URL to fetch bot status & server count
    const botInfoUrl = `https://api.botghost.com/webhook/1190388832617627709/b59j8v7ehjijr2pn73rma`;

    /**
     * 🟢 Fetch Bot Status & Server Count
     */
    const fetchBotInfo = () => {
        const statusElement = document.getElementById("bot-status");
        const serverElement = document.getElementById("server-count");

        statusElement.innerText = "Checking...";
        serverElement.innerText = "Loading...";

        fetch(botInfoUrl, {
            method: "GET",
            headers: {
                "Authorization": apiKey,
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP status ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log("Bot Info Response:", data);
                
                // ✅ Adjust this based on the actual API response
                const isOnline = data.online ? "🟢 Online" : "🔴 Offline";
                const serverCount = data.server_count || "Unknown";

                statusElement.innerText = isOnline;
                serverElement.innerText = `${serverCount} Servers`;
            })
            .catch((error) => {
                console.error("Error fetching bot info:", error);
                statusElement.innerText = "❌ Error";
                serverElement.innerText = "❌ Error";
            });
    };

    // 🟢 Fetch bot info on page load
    fetchBotInfo();
});
