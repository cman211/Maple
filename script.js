document.addEventListener("DOMContentLoaded", async () => {
    console.log("Fetching server count...");

    const serverCountElement = document.getElementById("server-count");

    if (!serverCountElement) {
        console.error("❌ ERROR: Element with ID 'server-count' not found in HTML.");
        return;
    }

    try {
        // Fetch server count from Netlify function
        const response = await fetch("/.netlify/functions/getServerCount");

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("✅ Received data:", data);

        // Validate response before updating
        if (typeof data.server_count === "number" && !isNaN(data.server_count)) {
            serverCountElement.innerText = `${data.server_count} Servers`;
        } else {
            console.error("❌ ERROR: Invalid server count received:", data);
            serverCountElement.innerText = "⚠️ Error: Invalid data received.";
        }
    } catch (error) {
        console.error("❌ ERROR Fetching server count:", error);
        serverCountElement.innerText = "⚠️ Error: Could not load server count.";
    }
});
