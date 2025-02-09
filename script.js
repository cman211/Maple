const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Allow frontend (Netlify) to access this backend
app.use(express.json());

// Fetch Server Count from Discord API
app.get("/server-count", async (req, res) => {
    try {
        const response = await axios.get("https://discord.com/api/v10/users/@me/guilds", {
            headers: {
                "Authorization": `Bot ${process.env.BOT_TOKEN}`
            }
        });

        res.json({ server_count: response.data.length });
    } catch (error) {
        console.error("Error fetching server count:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to fetch server count" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
