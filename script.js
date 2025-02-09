const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/serverCount", async (req, res) => {
    try {
        await client.guilds.cache.fetch(); // Ensure cache is updated
        const serverCount = client.guilds.cache.size;
        res.json({ server_count: serverCount });
    } catch (error) {
        console.error("Error fetching server count:", error);
        res.status(500).json({ error: "Failed to fetch server count" });
    }
});

app.listen(PORT, () => console.log(`Bot backend running on port ${PORT}`));
