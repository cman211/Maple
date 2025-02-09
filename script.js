document.addEventListener("DOMContentLoaded", () => {
    const fetchServerCount = () => {
        fetch("/.netlify/functions/getServerCount")  // Call Netlify Function
            .then((response) => response.json())
            .then((data) => {
                document.getElementById("server-count").innerText = `${data.server_count} Servers`;
            })
            .catch((error) => {
                console.error("Error fetching server count:", error);
                document.getElementById("server-count").innerText = "Error";
            });
    };

    fetchServerCount();
});
