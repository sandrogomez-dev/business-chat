const sendButton = document.querySelector("#sendButton");
const inputText = document.querySelector("#inputText");
const messagesContainer = document.querySelector(".chat__messages");
const userId = 

const sendMessage = async () => {
  //sacar el valor del input
  const myMessage = inputText.value.trim();
  if (!myMessage) return false;
  // Meter mensaje del usuario en la caja de mensajes
  const messagesContainer = document.querySelector(".chat__messages");

  messagesContainer.innerHTML += `<div class="chat__message chat__message--user">Yo: ${myMessage}</div>`;
  // Vaciar el input del usuario
  inputText.value = "";
  // Peticion al backend para que me responda la IA
  try {
    const response = await fetch("/api/chatbot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        userId,
        message: myMessage }),
    });
    // Incrustar mensaje del bot en el chat
    const data = await response.json();
    messagesContainer.innerHTML += `<div class="chat__message chat__message--bot">Carmen: ${data.reply}</div>`;
  } catch (error) {
    console.log("Error:", error);
  }

  //Mover el scroll hacia abajo
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
};

sendButton.addEventListener("click", sendMessage);
inputText.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    sendMessage();
  }
});
