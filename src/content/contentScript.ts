import { sendMessage } from "../shared/messenger";

function observeChat() {
  const chatContainer = document.querySelector(".chat-container");
  if (!chatContainer) return;

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "childList") {
        const newMessage = mutation.addedNodes[0] as HTMLElement;
        if (newMessage && newMessage.classList.contains("message")) {
          const text = newMessage.textContent;
          sendMessage({ type: "SEND_TO_API", payload: text }).then((response) => {
            if (response?.response) {
              injectReply(response.response);
            }
          });
        }
      }
    });
  });

  observer.observe(chatContainer, { childList: true });
}

function injectReply(reply: string) {
  const replyElement = document.createElement("div");
  replyElement.className = "reply";
  replyElement.textContent = reply;
  document.querySelector(".chat-container")?.appendChild(replyElement);
}

observeChat();
