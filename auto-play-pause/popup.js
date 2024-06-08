document.getElementById("toggle").addEventListener("click", () => {
  chrome.storage.local.get("enabled", (data) => {
    const newState = !data.enabled;
    chrome.storage.local.set({ enabled: newState }, () => {
      document.getElementById("toggle").innerText = newState
        ? "Disable Auto Play/Pause"
        : "Enable Auto Play/Pause";
    });
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: newState ? "enable" : "disable",
      });
    });
  });
});

chrome.storage.local.get("enabled", (data) => {
  document.getElementById("toggle").innerText = data.enabled
    ? "Disable Auto Play/Pause"
    : "Enable Auto Play/Pause";
});
