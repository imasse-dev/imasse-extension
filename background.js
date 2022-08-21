chrome.runtime.onInstalled.addListener(async (tab) => {
    chrome.contextMenus.create({
        title: "Search Imasse",
        contexts: ["selection"],
        id: "imasseContextMenu"
    });
});
chrome.contextMenus.onClicked.addListener((item, tab) => {
    let url = new URL(`https://www.imasse.com/search`)
    url.searchParams.set('q', item.selectionText)
    chrome.tabs.create({
        url: url.href,
        index: tab.index + 1
    });
});
chrome.runtime.onInstalled.addListener(async (tab) => {
    chrome.tabs.create({
        url: "https://www.imasse.com/welcome"
    });
});