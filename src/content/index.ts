function observeChat() {
  // adjust selector to match the chat container
  const chatContainer = document.querySelector(".chat-messages-container");
  if (!chatContainer) return;

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((m) => {
      m.addedNodes.forEach((node) => {
        if (node instanceof HTMLElement && node.matches(".incoming-message-selector")) {
          const text = node.innerText.trim();
          chrome.runtime.sendMessage({ type: "SEND_TO_API", payload: text }, (response) => {
            if (response?.response) {
              injectReply(response.response);
            }
          });
        }
      });
    });
  });

  observer.observe(chatContainer, { childList: true, subtree: true });
}

function injectReply(reply: string) {
  // adjust selectors to match the input box and send button
  const input = document.querySelector(".chat-input-selector") as HTMLTextAreaElement;
  const sendBtn = document.querySelector(".chat-send-button-selector") as HTMLElement;

  if (input && sendBtn) {
    input.value = reply;
    sendBtn.click();
  }
}

// start observing on load
observeChat();
