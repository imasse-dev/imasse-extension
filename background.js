chrome.runtime.onInstalled.addListener(async (tab) => {
    chrome.contextMenus.create({
        title: "Credibility",
        contexts: ["link"],
        id: "imasseContextMenu"
    });
});
chrome.contextMenus.onClicked.addListener((item, tab) => {
    let ur  = item.linkUrl;
    if(ur.startsWith('https://r.search.yahoo.com/')){
        ur = ur.replaceAll('RU=', '$').replaceAll('RK', '$').split('$');
        ur = ur[1];
    }
    let url = new URL(`https://api.imasse.com/credibility/search`)
    url.searchParams.set('q', ur)

    chrome.windows.create({url: "credibility.html?q=" + url, type: "popup", height: 450, width:350});
});
chrome.runtime.onInstalled.addListener(async (tab) => {
    chrome.tabs.create({
        url: "https://www.imasse.com/welcome"
    });
});
