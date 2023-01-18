function buildPopupDom(mostVisitedURLs) {
    var tiles_container = document.getElementById('tiles_div');
    let length = mostVisitedURLs.length;
    for (var i = 0; i < length; i++) {

            if (i == 0) {
                var tiles = tiles_container.appendChild(document.createElement('div'));
                tiles.classList.add('tiles');
            }
            if (i == 5) {
                var tiles = tiles_container.appendChild(document.createElement('div'));
                tiles.classList.add('tiles');
            }
            var a = tiles.appendChild(document.createElement('a'));
            var tile = a.appendChild(document.createElement('div'));
            tile.classList.add('tile');
            var img = tile.appendChild(document.createElement('img'));
            var p = tile.appendChild(document.createElement('p'));
            a.href = mostVisitedURLs[i].url;
            img.src = "https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=" + mostVisitedURLs[i].url + "&size=24";
            p.innerHTML = mostVisitedURLs[i].title;
        }
}
chrome.topSites.get(buildPopupDom);
async function getTiles() {
    const url = "https://cdn.imasse.com/api/tiles.json";
    let json = await fetch(url);
    json = await json.json();
    json = JSON.stringify(json);
    json = JSON.parse(json);
    for (var k = 0; k < json.length; k++) {
        var a = document.getElementById('adA' + (k + 1));
        var img = document.getElementById('adImg' + (k + 1));
        var p = document.getElementById('adP' + (k + 1));
        a.href = 'https://' + json[k]['url'];
        img.src = 'https://' + json[k]['icon'];
        p.innerHTML = json[k]['name'];
    }
    let tiles = document.getElementById("tiles_div");
    tiles.style.visibility = "visible";
}
let appOpened = false;
setOpened = false;
var appIcon = document.querySelector(".app-icon");
var setIcon = document.querySelector(".set-icon");
const set = document.getElementById('set');
document.addEventListener(
    "click",
    function(event) {
        if (appOpened || setOpened) {
            if (!set.contains(event.target)) {
                close();
            }
        } else {
            if (event.target.closest(".app-icon")) {
                openApps();
            }
            if (event.target.closest(".set-icon")) {
                openSettings();
            }
        }
    },
    false
);
function openApps() {
    document.querySelector(".apps").style.visibility = "visible";
    appIcon.id = "selected";
    appOpened = true;
}
function openSettings() {
    document.querySelector(".settings").style.visibility = "visible";
    getSchools();
    setIcon.id = "selected";
    setOpened = true;
}
function close() {
    document.querySelector(".apps").style.visibility = "hidden";
    document.querySelector(".settings").style.visibility = "hidden";
    appIcon.id = "notSelected";
    setIcon.id = "notSelected";
    appOpened = false;
    setOpened = false;
}
function getSchools() {
    let dropdown = document.getElementById('school');
    dropdown.length = 0;
    let defaultOption = document.createElement('option');
    defaultOption.text = 'Choose School';
    defaultOption.value = null;
    dropdown.add(defaultOption);
    dropdown.selectedIndex = 0;
    const url = 'https://cdn.imasse.com/api/classroom.json';
    fetch(url)
        .then(
            function(response) {
                if (response.status !== 200) {
                    console.warn('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                response.json().then(function(data) {
                    let option;
                    for (let i = 0; i < data.length; i++) {
                        option = document.createElement('option');
                        option.text = data[i].name;
                        option.value = data[i].id;
                        dropdown.add(option);
                    }
                    chrome.storage.sync.get({
                        cid: null
                      }, function(items) {
                        const $select = document.querySelector('#school');
                        $select.value = items.cid;
                      });
                });
            }
        )
        .catch(function(err) {
            console.error('Fetch Error -', err);
        });
}
function save() {
    var format = document.getElementById("format").value;
    var school = document.getElementById("school").value;
        chrome.storage.sync.set({
            mla: format,
            cid: school
        }, function() {
            setTimeout(function() {
                status.textContent = '';
            }, 750);
        });
    close();
}
chrome.storage.sync.get({
    mla: true
  }, function(items) {
    const $select = document.querySelector('#format');
    $select.value = items.mla;
  });

document.getElementById("save").addEventListener("click", save);