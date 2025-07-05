// translate.js

export async function translatePageText(targetLang) {
  if (targetLang === 'en') return; // No translation needed

  const textNodes = getAllTextNodes(document.body);

  for (const node of textNodes) {
    const original = node.textContent.trim();
    if (original) {
      const translated = await translateText(original, targetLang);
      node.textContent = translated;
    }
  }
}

// Helper: get all visible text nodes
function getAllTextNodes(element) {
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) => {
      if (!node.parentElement) return NodeFilter.FILTER_REJECT;
      const style = getComputedStyle(node.parentElement);
      return style.display === "none" || style.visibility === "hidden"
        ? NodeFilter.FILTER_REJECT
        : NodeFilter.FILTER_ACCEPT;
    },
  });
  const nodes = [];
  let node;
  while ((node = walker.nextNode())) {
    if (node.textContent.trim()) nodes.push(node);
  }
  return nodes;
}

// Helper: call LibreTranslate API
async function translateText(text, target) {
  try {
    const response = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: text,
        source: "en",
        target,
        format: "text",
      }),
    });

    const data = await response.json();
    return data.translatedText || text;
  } catch (err) {
    console.error("❌ Translation error:", err);
    return text;
  }
}
