document.addEventListener("DOMContentLoaded", () => {
    const webhookUrl = "https://api.botghost.com/webhook/1190388832617627709/3vyepb0ylzxnocljxvm18e"; // Replace with your actual BotGhost Webhook URL

    // Check bot status
    fetch(webhookUrl + "/status", {
        method: "GET",
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("bot-status").innerText = data.status || "Online";
    })
    .catch(error => console.error("Error fetching bot status:", error));

    // Check online users (Example API call)
    fetch(webhookUrl + "/users", {
        method: "GET",
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("users-online").innerText = data.count || "0";
    })
    .catch(error => console.error("Error fetching users:", error));

    // Trigger command via webhook
    document.getElementById("trigger-command").addEventListener("click", () => {
        fetch(webhookUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                command: "ping",
                arguments: []
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Command sent:", data);
            alert("Command sent successfully!");
        })
        .catch(error => console.error("Error sending command:", error));
    });
});
