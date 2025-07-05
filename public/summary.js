async function generateAndShowSummary() {
  const allCards = document.querySelectorAll(".news-card h3, .article-card h4");
  const headlines = Array.from(allCards).map(card => card.textContent.trim());

  if (headlines.length === 0) {
    alert("No headlines available to summarize.");
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/api/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ headlines })
    });

    const data = await res.json();
    const summary = data.summary || "No summary available.";

    // Hide main UI, show summary
    document.getElementById("newsView").style.display = "none";
    document.getElementById("summaryPage").style.display = "block";

    // Set text
    document.getElementById("summaryText").innerText = summary;

  } catch (err) {
    console.error("❌ Summary fetch failed:", err);
    alert("Failed to generate summary.");
  }
}

// Optional: Go back to main news view
function goBack() {
  document.getElementById("summaryPage").style.display = "none";
  document.getElementById("newsView").style.display = "block";
}
