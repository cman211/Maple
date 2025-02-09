document.addEventListener("DOMContentLoaded", async () => {
    const serverCountElement = document.getElementById("server-count");

    try {
        // Fetch server count from Netlify function
        const response = await fetch("/.netlify/functions/getServerCount");
        const data = await response.json();

        // Update the page with the server count
        if (data.server_count !== undefined) {
            serverCountElement.innerText = `${data.server_count} Servers`;
        } else {
            serverCountElement.innerText = "Error: No Data";
        }
    } catch (error) {
        console.error("Error fetching server count:", error);
        serverCountElement.innerText = "Error: Failed to Load";
    }
});
