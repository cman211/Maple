document.addEventListener("DOMContentLoaded", async () => {
    const serverCountElement = document.getElementById("server-count");

    try {
        // Fetch server count from Netlify function
        const response = await fetch("/.netlify/functions/getServerCount");
        const data = await response.json();

        // Only update if data is valid
        if (data.server_count !== undefined && !isNaN(data.server_count)) {
            serverCountElement.innerText = `${data.server_count} Servers`;
        } else {
            serverCountElement.innerText = "Error: Could not load server count";
        }
    } catch (error) {
        console.error("Error fetching server count:", error);
        serverCountElement.innerText = "Error: Failed to Load";
    }
});
