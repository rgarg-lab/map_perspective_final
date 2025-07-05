function toggleColorblindMode() {
  document.body.classList.toggle("colorblind");
}

function speakPage() {
  const topic = document.getElementById("topicInput").value || "no topic entered";
  const msg = `This is a world news map. Enter a topic like Ukraine War. Then click any country on the map to fetch news. Current topic is ${topic}.`;
  const utterance = new SpeechSynthesisUtterance(msg);
  utterance.lang = "en-US";
  speechSynthesis.speak(utterance);
}
function speakText(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  speechSynthesis.speak(utterance);
}
