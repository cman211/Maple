document.addEventListener("DOMContentLoaded", () => {
    // Replace with your actual webhook URL and API key
    const webhookUrl = "https://api.botghost.com/webhook/1190388832617627709/3vyepb0ylzxnocljxvm18e"; // Replace this
    const apiKey = "YOUR_API_KEY"; // Replace this

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
                variables: [
                    {
                        name: "status_check",
                        variable: "{status_check}",
                        value: "true",
                    },
                ],
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP status ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log("Bot Status Response:", data);
                const isOnline = data.online || false;
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
                variables: [
                    {
                        name: "server_check",
                        variable: "{server_check}",
                        value: "true",
                    },
                ],
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP status ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log("Server Count Response:", data);
                const serverCount = data.server_count || 0;
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
                        value: "Maple",
                    },
                ],
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP status ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log("Custom Event Response:", data);
                if (data.error) {
                    statusElement.innerText = "Failed: " + data.error;
                } else {
                    statusElement.innerText = "Custom event triggered successfully!";
                }
            })
            .catch((error) => {
                console.error("Error triggering custom event:", error);
                statusElement.innerText = "Error triggering event. Check console.";
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
