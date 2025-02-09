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
document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("/.netlify/functions/get-user");
        if (!response.ok) throw new Error("Not logged in");

        const user = await response.json();
        document.getElementById("profile-pic").src = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;
        document.getElementById("profile-container").style.display = "flex";

        // Hide login button
        document.getElementById("login-btn").style.display = "none";
    } catch (error) {
        console.log("User not logged in");
    }

    // Logout button
    document.getElementById("logout-btn").addEventListener("click", () => {
        document.cookie = "user=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        location.reload();
    });
});
