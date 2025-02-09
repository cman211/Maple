document.addEventListener("DOMContentLoaded", () => {
    const webhookUrl = "https://api.botghost.com/webhook/1190388832617627709/3vyepb0ylzxnocljxvm18e"; // Replace with your webhook URL
    const apiKey = "c18f4090770f3529018b8b22aff75ce8b3db36e464ca765b6eec814e48e42b73"; // Replace with your BotGhost API key

    // Function to trigger the custom event
    const triggerCustomEvent = () => {
        fetch(webhookUrl, {
            method: "POST",
            headers: {
                "Authorization": apiKey,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                variables: [
                    {
                        name: "custom_event", // Match the variable name as defined in your BotGhost event
                        value: "rp_vote_start", // Pass any additional information here if required
                    },
                ],
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Custom Event Triggered:", data);
                alert("Custom event triggered successfully!");
            })
            .catch((error) => {
                console.error("Error triggering custom event:", error);
                alert("Failed to trigger the custom event.");
            });
    };

    // Add event listener to the button
    document.getElementById("rp-vote-start").addEventListener("click", triggerCustomEvent);
});
