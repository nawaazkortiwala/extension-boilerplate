/* eslint-disable @typescript-eslint/no-explicit-any */
export function sendMessage<T = any, R = any>(message: T): Promise<R> {
  return new Promise((resolve, reject) => {
    if (!chrome.runtime?.sendMessage) {
      reject(new Error("chrome.runtime.sendMessage is not available"));
      return;
    }
    chrome.runtime.sendMessage(message, (response) => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError?.message || String(chrome.runtime.lastError)));
      } else {
        resolve(response);
      }
    });
  });
}

export function onMessage<T = any>(
  handler: (message: T, sender: chrome.runtime.MessageSender) => Promise<any>,
) {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const maybePromise = handler(message, sender);
    if (maybePromise && typeof maybePromise.then === "function") {
      maybePromise
        .then(sendResponse)
        .catch((err: any) => sendResponse({ error: (err as Error)?.toString?.() || String(err) }));
      return true; // async
    } else {
      sendResponse(maybePromise);
    }
  });
}
