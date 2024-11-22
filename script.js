document.getElementById("shorten-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const url = document.getElementById("url-input").value;
    try {
        const response = await fetch("/shorten", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ url })
        });
        const data = await response.json();
        if (data.shortUrl) {
            document.getElementById("result").innerText = Shortened URL: ${data.shortUrl};
        } else {
            document.getElementById("result").innerText = "Error shortening URL.";
        }
    } catch (error) {
        document.getElementById("result").innerText = "An error occurred.";
    }
});