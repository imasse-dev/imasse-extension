chrome.browserAction.onClicked.addListener(() => chrome.tabs.create({
    url: "https://www.imasse.com/"
})), chrome.runtime.onInstalled.addListener(() => chrome.tabs.create({
    url: "https://www.imasse.com/welcome"
}));