document.addEventListener("DOMContentLoaded", async () => {
    const serverCountElement = document.getElementById("server-count");

    try {
        // Fetch server count from Netlify function
        const response = await fetch("/.netlify/functions/getServerCount");
        
        // Ensure the response is valid JSON
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();

        // Check if we received a valid number
        if (typeof data.server_count === "number" && !isNaN(data.server_count)) {
            serverCountElement.innerText = `${data.server_count} Servers`;
        } else {
            serverCountElement.innerText = "⚠️ Error: Invalid server data received.";
        }
    } catch (error) {
        console.error("Error fetching server count:", error);
        serverCountElement.innerText = "⚠️ Error: Could not load server count.";
    }
});
