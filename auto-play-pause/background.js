let isBrowserFocused = true;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ enabled: true });
});

document.addEventListener("visibilitychange", () => {
  chrome.storage.local.get("enabled", (data) => {
    if (!data.enabled) return;
    const video = document.querySelector("video");
    if (video) {
      if (document.hidden) {
        video.pause();
      } else {
        video.play();
      }
    }
  });
});

window.addEventListener("blur", () => {
  isBrowserFocused = false;
  chrome.storage.local.get("enabled", (data) => {
    if (!data.enabled) return;
    const video = document.querySelector("video");
    if (video) {
      video.pause();
    }
  });
});

window.addEventListener("focus", () => {
  isBrowserFocused = true;
  chrome.storage.local.get("enabled", (data) => {
    if (!data.enabled) return;
    const video = document.querySelector("video");
    if (video && !document.hidden) {
      video.play();
    }
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "enable" || message.action === "disable") {
    isBrowserFocused = message.action === "enable";
  } else {
    const video = document.querySelector("video");
    if (video) {
      if (message.action === "play" && isBrowserFocused) {
        video.play();
      } else if (message.action === "pause") {
        video.pause();
      }
    }
  }
});
