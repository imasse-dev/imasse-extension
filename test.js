const finalScore = document.getElementById("finalScore").innerHTML;
const level = finalScore/10;

chrome.storage.sync.get({
    mlaScore: 0
  }, function(items) {
    let mlaScore = items.mlaScore;
    if(mlaScore !== null){
        if(level > mlaScore){
            setScore(level);
        }
    }
  });

  function setScore(x){
    chrome.storage.sync.set({
        mlaScore: x,
    }, function() {
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
  }
  