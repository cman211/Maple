document.addEventListener("DOMContentLoaded", () => {
    // Replace these values with your actual webhook URL and API key
    const webhookUrl = "https://api.botghost.com/webhook/1190388832617627709/3vyepb0ylzxnocljxvm18e"; // Replace with your webhook URL
    const apiKey = "YOUR_API_KEY"; // Replace with your BotGhost API key

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
            body: JSON.stringify({ variables: [] }), // No variables required for status
        })
            .then((response) => response.json())
            .then((data) => {
                const isOnline = data.online || false; // Adjust based on API response
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
            body: JSON.stringify({ variables: [] }), // No variables required for server count
        })
            .then((response) => response.json())
            .then((data) => {
                const serverCount = data.server_count || 0; // Adjust based on API response
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
                        name: "nickname", // Example variable name
                        variable: "{nickname}", // Match this to the variable in your BotGhost event
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

    // Add event listeners for the buttons
    document.getElementById("maple-event").addEventListener("click", triggerCustomEvent);

    // Fetch bot status and server count on page load
    fetchBotStatus();
    fetchServerCount();
});
