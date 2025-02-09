document.addEventListener("DOMContentLoaded", () => {
    // ✅ Replace this with your actual BotGhost webhook URL
    const webhookUrl = "https://api.botghost.com/webhook/1190388832617627709/3vyepb0ylzxnocljxvm18e"; 
    const apiKey = "YOUR_API_KEY"; // ✅ Replace with your actual API Key

    /**
     * 🟢 Fetch Bot Status
     */
    const fetchBotStatus = () => {
        const statusElement = document.getElementById("bot-status");
        statusElement.innerText = "Checking...";

        fetch(webhookUrl, {
            method: "POST",
            headers: {
                "Authorization": apiKey,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                variables: []
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log("Bot Status Response:", data);
            
            // ✅ Check API response format
            if (data.error) {
                throw new Error(data.error);
            }

            const isOnline = data.online === true; // Ensure this matches BotGhost's actual API response
            statusElement.innerText = isOnline ? "🟢 Online" : "🔴 Offline";
        })
        .catch(error => {
            console.error("Error fetching bot status:", error);
            statusElement.innerText = "❌ Error";
        });
    };

    /**
     * 🟢 Fetch Server Count
     */
    const fetchServerCount = () => {
        const serverElement = document.getElementById("server-count");
        serverElement.innerText = "Loading...";

        fetch(webhookUrl, {
            method: "POST",
            headers: {
                "Authorization": apiKey,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                variables: []
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log("Server Count Response:", data);
            
            // ✅ Check API response format
            if (data.error) {
                throw new Error(data.error);
            }

            const serverCount = data.server_count || 0; // Ensure it matches API response
            serverElement.innerText = `🌍 ${serverCount} Servers`;
        })
        .catch(error => {
            console.error("Error fetching server count:", error);
            serverElement.innerText = "❌ Error";
        });
    };

    /**
     * 🟢 Trigger Custom Event
     */
    const triggerCustomEvent = () => {
        const button = document.getElementById("maple-event");
        const statusElement = document.getElementById("custom-event-status");
        
        button.innerText = "Triggering...";
        button.disabled = true;
        statusElement.innerText = "Processing...";

        fetch(webhookUrl, {
            method: "POST",
            headers: {
                "Authorization": apiKey,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                variables: [
                    {
                        name: "nickname",
                        variable: "{nickname}",
                        value: "Maple"
                    }
                ],
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log("Custom Event Response:", data);
            
            // ✅ Check if response contains an error
            if (data.error) {
                throw new Error(data.error);
            }

            statusElement.innerText = "✅ Custom event triggered successfully!";
        })
        .catch(error => {
            console.error("Error triggering custom event:", error);
            statusElement.innerText = "❌ Error triggering event.";
        })
        .finally(() => {
            button.innerText = "Trigger Maple Event";
            button.disabled = false;
        });
    };

    // 🟢 Add event listeners for buttons
    document.getElementById("maple-event").addEventListener("click", triggerCustomEvent);

    // 🟢 Fetch bot status and server count on page load
    fetchBotStatus();
    fetchServerCount();
});
