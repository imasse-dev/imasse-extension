// Google Analytics Only Used For Imasse Classroom And Uses No Cookies //
chrome.storage.sync.get({
    cid: null
  }, function(items) {
    console.log(items.cid);
    let cid = items.cid;
    if(cid !== undefined){
        if(cid.length == 6){
           cidFetch(cid);
        }
    }
  });
  function cidFetch(x){
    const measurement_id = `G-CV44EZ98EN`;
const api_secret = `tDckBPpmQkSQ8sBy1VUp7w`;
fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurement_id}&api_secret=${api_secret}&z=123456`, {
  method: "POST",
  body: JSON.stringify({
"client_id": "x",
"events": [
  {
    "name": x
  }
]
})
});
}