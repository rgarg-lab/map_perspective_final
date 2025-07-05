function splitAndDisplayNews(articles) {
  const columnMap = {
    Left: document.getElementById("left-column"),
    Center: document.getElementById("center-column"),
    Right: document.getElementById("right-column"),
    Local: document.getElementById("local-column"),
    Global: document.getElementById("global-column"),
    Misc: document.getElementById("misc-column")
  };

  // Clear old content and reset headers
  Object.entries(columnMap).forEach(([key, col]) => {
    col.innerHTML = `<h2>${key}</h2>`;
    col.style.display = "none"; // hide all initially
  });

  articles.forEach(article => {
    const domain = new URL(article.link).hostname.replace("www.", "").toLowerCase();
    const bias = biasMap[domain] || "Misc";
    const column = columnMap[bias] || columnMap["Misc"];

    column.style.display = "block"; // show the column if used

    const card = document.createElement("div");
    card.className = "article-card";
    card.innerHTML = `
      <h4>${article.title}</h4>
      <p><em>${article.creator?.[0] || "Unknown"} | ${new Date(article.pubDate).toLocaleDateString()}</em></p>
      <p>${article.description || "No description available."}</p>
      <p><strong>Source:</strong> ${domain}</p>
      <a href="${article.link}" target="_blank">Read more 🔗</a>
      <button onclick="speakText('${article.title.replace(/'/g, "")}')">🔊 Read Headline</button>
    `;
    column.appendChild(card);
  });

  // Show the results view
  document.getElementById("newsView").style.display = "flex";
  document.getElementById("map").style.display = "none";
  document.getElementById("controls").style.display = "none";
  document.getElementById("newsPanel").style.display = "none";
}
