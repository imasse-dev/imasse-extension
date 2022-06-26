document.addEventListener('DOMContentLoaded', () => {
    getCitation();
    const bibCopy = document.querySelector('#bib');
    bibCopy.addEventListener('click', async () => {
        var r = document.createRange();
        r.selectNode(document.getElementById('bib'));
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(r);
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
        document.getElementById("copied").className = "copiedAfter";  
    });
    const textCopy = document.querySelector('#text');
    textCopy.addEventListener('click', async () => {
        var t = document.createRange();
        t.selectNode(document.getElementById('text'));
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(t);
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
        document.getElementById("copied").className = "copiedAfter";  
    });
});
async function getCitation() {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const tab = tabs[0];
    const url = "https://cite-api.imasse.workers.dev?q=" + tab.url;
  let object = await fetch(url);
  let json = await object.json();
  let data = JSON.parse(json);
  document.getElementById("bib").innerHTML = data['bib'];
  document.getElementById("text").innerHTML = data['text'];
  document.getElementById("cred").innerHTML = data['cred'];
}