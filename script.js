document.addEventListener("DOMContentLoaded", () => {
    const webhookUrl = "https://api.botghost.com/webhook/1190388832617627709/3vyepb0ylzxnocljxvm18e"; // Replace with your BotGhost webhook
    const apiKey = "c18f4090770f3529018b8b22aff75ce8b3db36e464ca765b6eec814e48e42b73"; // Replace with your BotGhost API key

    // Function to check bot status
    const fetchBotStatus = () => {
        fetch(webhookUrl + "/status", {
            method: "POST",
            headers: {
                "Authorization": apiKey,
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                const status = data.online ? "Online" : "Offline";
                document.getElementById("bot-status").innerText = status;
            })
            .catch((error) => {
                console.error("Error fetching bot status:", error);
                document.getElementById("bot-status").innerText = "Error";
            });
    };

    // Function to fetch server count
    const fetchServerCount = () => {
        fetch(webhookUrl + "/server-count", {
            method: "POST",
            headers: {
                "Authorization": apiKey,
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                document.getElementById("server-count").innerText = data.count || "0";
            })
            .catch((error) => {
                console.error("Error fetching server count:", error);
                document.getElementById("server-count").innerText = "Error";
            });
    };

    // Function to send the custom command /rp-vote-start
    const sendRpVoteStart = () => {
        fetch(webhookUrl, {
            method: "POST",
            headers: {
                "Authorization": apiKey,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                variables: [
                    {
                        name: "command",
                        variable: "{rp_vote_start}",
                        value: "/rp-vote-start",
                    },
                ],
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Command sent:", data);
                alert("Command /rp-vote-start triggered successfully!");
            })
            .catch((error) => {
                console.error("Error triggering custom command:", error);
                alert("Failed to trigger the command.");
            });
    };

    // Add event listener for the custom command button
    document.getElementById("rp-vote-start").addEventListener("click", sendRpVoteStart);

    // Fetch bot status and server count on load
    fetchBotStatus();
    fetchServerCount();
});
