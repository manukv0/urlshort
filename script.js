// Fetch API to send URL to backend
document.getElementById("shortenBtn").addEventListener("click", function() {
  const longUrl = document.getElementById("longUrl").value;
  fetch("/shorten-url", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ longUrl: longUrl }),
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      // Display the shortened URL
      document.getElementById("shortenedUrl").textContent = data.shortenedUrl;
    } else {
      console.log("Error:", data.message);
    }
  })
  .catch(error => {
    console.error("Error:", error);
  });
});