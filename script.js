const sendBtn = document.getElementById("send");
const input = document.getElementById("question");
const chat = document.getElementById("chat");

sendBtn.addEventListener("click", async () => {
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  try {
    const res = await fetch("http://localhost:3000/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: text })
    });

    const data = await res.json();
    addMessage(data.answer, "bot");

  } catch (err) {
    addMessage("⚠️ Server error. Is it running?", "bot");
  }
});

function addMessage(text, type) {
  const div = document.createElement("div");
  div.className = type === "user" ? "user-msg" : "bot-msg";
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}
