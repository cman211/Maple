document.addEventListener("DOMContentLoaded", () => {
    const BOT_TOKEN = "MTE5NTExOTUwNDU3ODA2NDQ1NA.G_FVeI.lcF-94GkNAi4K1mDs-oHHYv68QPfYswncKPOj0"; // Replace with your bot token

    const fetchServerCount = () => {
        fetch("https://discord.com/api/v10/users/@me/guilds", {
            method: "GET",
            headers: {
                "Authorization": `Bot ${BOT_TOKEN}`,
                "Content-Type": "application/json"
            }
        })
        .then((response) => response.json())
        .then((data) => {
            document.getElementById("server-count").innerText = `${data.length} Servers`;
        })
        .catch((error) => {
            console.error("Error fetching server count:", error);
            document.getElementById("server-count").innerText = "Error";
        });
    };

    fetchServerCount();
});
