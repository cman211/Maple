document.addEventListener("DOMContentLoaded", () => {
    const webhookUrl = "https://api.botghost.com/webhook/1190388832617627709/3vyepb0ylzxnocljxvm18e"; // Replace with your webhook URL
    const apiKey = process.env.BOTGHOST_API_KEY; // Securely injected via Netlify

    // Function to fetch bot status
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
                variables: [
                    {
                        name: "status_check",
                        variable: "{status_check}",
                        value: "true", // Adjust variable names/values as needed
                    },
                ],
            }),
        })
            .then((response) => {
                console.log("Webhook HTTP Status (Bot Status):", response.status);
                return response.json();
            })
            .then((data) => {
                console.log("Webhook Response Data (Bot Status):", data);
                const isOnline = data.online || false; // Match the BotGhost API response structure
                statusElement.innerText = isOnline ? "Online" : "Offline";
            })
            .catch((error) => {
                console.error("Error fetching bot status:", error);
                statusElement.innerText = "Error";
            });
    };

    // Function to fetch server count
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
                variables: [
                    {
                        name: "server_check",
                        variable: "{server_check}",
                        value: "true", // Adjust variable names/values as needed
                    },
                ],
            }),
        })
            .then((response) => {
                console.log("Webhook HTTP Status (Server Count):", response.status);
                return response.json();
            })
            .then((data) => {
                console.log("Webhook Response Data (Server Count):", data);
                const serverCount = data.server_count || 0; // Match the BotGhost API response structure
                serverElement.innerText = serverCount;
            })
            .catch((error) => {
                console.error("Error fetching server count:", error);
                serverElement.innerText = "Error";
            });
    };

    // Function to trigger the custom event
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
                        variable: "{nickname}", // Adjust to match the custom event variable in BotGhost
                        value: "Maple",
                    },
                ],
            }),
        })
            .then((response) => {
                console.log("Webhook HTTP Status (Custom Event):", response.status);
                return response.json();
            })
            .then((data) => {
                console.log("Webhook Response Data (Custom Event):", data);
                if (data.error) {
                    statusElement.innerText = "Failed: " + data.error;
                    alert("Custom event triggered but returned an error: " + data.error);
                } else {
                    statusElement.innerText = "Custom event triggered successfully!";
                    alert("Maple event triggered successfully!");
                }
            })
            .catch((error) => {
                console.error("Error triggering custom event:", error);
                statusElement.innerText = "Error triggering event. Check console.";
                alert("Failed to trigger the custom event. Check console for details.");
            })
            .finally(() => {
                button.innerText = "Trigger Maple Event";
                button.disabled = false;
            });
    };

    // Add event listeners for buttons
    document.getElementById("maple-event").addEventListener("click", triggerCustomEvent);

    // Fetch bot status and server count on page load
    fetchBotStatus();
    fetchServerCount();
});
