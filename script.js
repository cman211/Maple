document.addEventListener("DOMContentLoaded", async () => {
    const serverCountElement = document.getElementById("server-count");

    try {
        const response = await fetch("/.netlify/functions/getServerCount");

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (typeof data.server_count === "number") {
            serverCountElement.innerText = `${data.server_count} Servers`;
        } else {
            serverCountElement.innerText = "⚠️ Invalid server data received.";
        }
    } catch (error) {
        console.error("❌ Error fetching server count:", error);
        serverCountElement.innerText = "⚠️ Error: Could not load server count.";
    }
});
