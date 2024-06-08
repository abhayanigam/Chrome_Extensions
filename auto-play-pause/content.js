let isWindowFocused = true;

function handleVisibilityChange() {
  chrome.storage.local.get("enabled", (data) => {
    if (!data.enabled) return;
    const video = document.querySelector("video");
    if (video) {
      if (document.hidden || !isWindowFocused) {
        video.pause();
      } else {
        video.play();
      }
    }
  });
}

document.addEventListener("visibilitychange", handleVisibilityChange);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "enable" || message.action === "disable") {
    chrome.storage.local.set({ enabled: message.action === "enable" });
  } else {
    const video = document.querySelector("video");
    if (video) {
      if (message.action === "play") {
        video.play();
      } else if (message.action === "pause") {
        video.pause();
      }
    }
  }
});

window.addEventListener("blur", () => {
  isWindowFocused = false;
  chrome.storage.local.get("enabled", (data) => {
    if (!data.enabled) return;
    const video = document.querySelector("video");
    if (video) {
      video.pause();
    }
  });
});

window.addEventListener("focus", () => {
  isWindowFocused = true;
  chrome.storage.local.get("enabled", (data) => {
    if (!data.enabled) return;
    const video = document.querySelector("video");
    if (video && !document.hidden) {
      video.play();
    }
  });
});
