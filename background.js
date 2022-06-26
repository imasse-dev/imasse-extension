chrome.runtime.onInstalled.addListener(async (tab) => {
    chrome.contextMenus.create({
        title: "Create Citation",
        contexts: ["all"],
        id: "imasseCitationContextMenu"
    });
});

chrome.contextMenus.onClicked.addListener((item, tab) => {
    if (item.selectionText !== undefined){
        let url = new URL(`https://cite.imasse.com/`)
        url.searchParams.set('cite', item.selectionText)
        url.searchParams.set('tab', `cite`)
        chrome.tabs.create({ url: url.href, index: tab.index + 1 });
    }
    else {
        let currentTab = tab.url;
        if((!currentTab.includes("imasse.com"))){
            let url = new URL(`https://cite.imasse.com/`)
            url.searchParams.set('cite', currentTab)
            url.searchParams.set('tab', `cite`)
            chrome.tabs.create({ url: url.href, index: tab.index + 1 });
        }
        else {
            let url = new URL(`https://cite.imasse.com/`)
            url.searchParams.set('tab', `cite`)
            chrome.tabs.create({ url: url.href, index: tab.index + 1 });
        }
    }
});


