async function getNews() {
  const topic = document.getElementById("topicInput").value;
  if (!topic || !countryCode) {
    alert("Please click a country on the map and enter a topic.");
    return;
  }

  // Show loading animation
  document.getElementById("loading").style.display = "flex";

  setTimeout(async () => {
    document.getElementById("loading").style.display = "none";

    const API_KEY = "pub_a34e5950edf9462aa8a5d14c4c79fe98";
    const apiUrl = `https://newsdata.io/api/1/news?apikey=${API_KEY}&q=${encodeURIComponent(topic)}&country=${countryCode}&language=en`;

    try {
      const res = await fetch(apiUrl);
      const data = await res.json();

      if (data.status === "success" && data.results?.length) {
        splitAndDisplayNews(data.results.slice(0, 15));
      } else {
        alert("⚠️ No news found for this topic/country.");
      }
    } catch (err) {
      console.error("❌ News fetch error:", err);
      alert("Something went wrong while fetching news.");
    }
  }, 7000); // 7 second animation
}