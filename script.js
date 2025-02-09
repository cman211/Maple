document.addEventListener("DOMContentLoaded", () => {
    const fetchServerCount = async () => {
        try {
            // Fetch server count from the Netlify function
            const response = await fetch("/.netlify/functions/getServerCount");
            const data = await response.json();

            // Update server count on the page
            if (data.server_count !== undefined) {
                document.getElementById("server-count").innerText = `${data.server_count} Servers`;
            } else {
                document.getElementById("server-count").innerText = "Error";
            }
        } catch (error) {
            console.error("Error fetching server count:", error);
            document.getElementById("server-count").innerText = "Error";
        }
    };

    fetchServerCount();
});
