document.addEventListener("DOMContentLoaded", () => {
    // Replace these values with your actual webhook URL and API key
    const webhookUrl = "https://api.botghost.com/webhook/1190388832617627709/3vyepb0ylzxnocljxvm18e"; // Your BotGhost webhook URL
    const apiKey = "c18f4090770f3529018b8b22aff75ce8b3db36e464ca765b6eec814e48e42b73"; // Your BotGhost API key

    /**
     * Fetch Bot Status
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
                variables: [] // No variables required for status
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Bot Status Response:", data);
                const isOnline = data.online || false; // Adjust based on API response
                statusElement.innerText = isOnline ? "Online" : "Offline";
            })
            .catch((error) => {
                console.error("Error fetching bot status:", error);
                statusElement.innerText = "Error";
            });
    };

    /**
     * Fetch Server Count
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
                variables: [] // No variables required for server count
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Server Count Response:", data);
                const serverCount = data.server_count || 0; // Adjust based on API response
                serverElement.innerText = serverCount;
            })
            .catch((error) => {
                console.error("Error fetching server count:", error);
                serverElement.innerText = "Error";
            });
    };

    /**
     * Trigger Custom Event
     */
    const triggerCustomEvent = () => {
        const button = document.getElementById("maple-event");
        button.innerText = "Triggering...";
        button.disabled = true;

        fetch(webhookUrl, {
            method: "POST",
            headers: {
                "Authorization": apiKey,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                variables: [
                    {
                        name: "Maple", // Example variable name
                        variable: "{Maple}", // Match this to the variable in your BotGhost event
                        value: "Maple",
                    },
                ],
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Custom Event Triggered:", data);
                button.innerText = "Trigger Maple Event";
                button.disabled = false;
                alert("Maple event triggered successfully!");
            })
            .catch((error) => {
                console.error("Error triggering custom event:", error);
                button.innerText = "Trigger Maple Event";
                button.disabled = false;
                alert("Failed to trigger the custom event.");
            });
    };

    // Add event listener for the custom event button
    document.getElementById("maple-event").addEventListener("click", triggerCustomEvent);

    // Fetch bot status and server count on page load
    fetchBotStatus();
    fetchServerCount();
});
