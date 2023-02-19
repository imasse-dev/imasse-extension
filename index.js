chrome.storage.sync.get({
    disTheme: null
  }, function(items) {
    if(items.disTheme == "false"){
        document.body.classList.add('dark-mode')
    }
  });

// display background
function set_background_image(data_url, changed) {
	if (data_url) {
		document.body.style.backgroundImage = "url('" + data_url + "')";
	}
	else if (changed) {
		document.body.style.backgroundImage = "initial";
	}
}

chrome.storage.local.get("image_data_url")
.then(items => set_background_image(items.image_data_url, false));

// top sites display
function buildPopupDom(mostVisitedURLs) {
    var tiles_container = document.getElementById('tiles_div');
    let length = mostVisitedURLs.length;
    if (length > 10){
        length = 10;
    }
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

// call top sites
chrome.topSites.get(buildPopupDom);

// menu buttons vars
let appOpened = false;
setOpened = false;
var appIcon = document.querySelector(".app-icon");
var setIcon = document.querySelector(".set-icon");
const set = document.getElementById('set');

// when one of the menus opened
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

// display apps
function openApps() {
    document.querySelector(".apps").style.visibility = "visible";
    appIcon.id = "selected";
    appOpened = true;
}

// display settings
function openSettings() {
    document.querySelector(".settings").style.visibility = "visible";
    getSchools();
    setIcon.id = "selected";
    setOpened = true;
}

// close menus
function close() {
    document.querySelector(".apps").style.visibility = "hidden";
    document.querySelector(".settings").style.visibility = "hidden";
    appIcon.id = "notSelected";
    setIcon.id = "notSelected";
    appOpened = false;
    setOpened = false;
}

// get schools api
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

// save settings
function save() {
    var format = document.getElementById("format").value;
    var school = document.getElementById("school").value;
    var theme = document.getElementById("theme").value;
        chrome.storage.sync.set({
            mla: format,
            cid: school,
            disTheme: theme
        }, function() {
            setTimeout(function() {
                status.textContent = '';
            }, 750);
        });
    close();
}

// get settings values
chrome.storage.sync.get({
    mla: true,
    disTheme: true
  }, function(items) {
    const $select = document.querySelector('#format');
    $select.value = items.mla;

    const $select2 = document.querySelector('#theme');
    $select2.value = items.disTheme;
  });

document.getElementById("save").addEventListener("click", save);

function storage_onChanged(changes, areaName) {
	let settings = {};
	if (areaName == "local") {
		if (changes.image_data_url) {
			settings.image_data_url = changes.image_data_url.newValue ?? "";
		}
		if (changes.image_filename) {
			settings.image_filename = changes.image_filename.newValue ?? "none";
		}
	}
	set_image(settings);
}

// add image to array 
function set_image(settings) {
	let image = document.getElementById("image");
	if (settings.image_data_url !== undefined) { image.src = settings.image_data_url; }
	if (settings.image_filename !== undefined) { image.alt = settings.image_filename; }
}

// delete current image from storage
function remove_image() {
	chrome.storage.local.remove(["image_data_url", "image_filename"]);
}

// store image in local storage
function store_image() {
	if (this.files.length > 0) {
		const reader = new FileReader();
		reader.addEventListener("load", () => {
			chrome.storage.local.set({"image_data_url": reader.result, "image_filename": this.files[0].name});
		});
		reader.readAsDataURL(this.files[0]);
	}
}

// get image and call background replace
chrome.storage.local.get(["image_data_url", "image_filename"])
	.then(items => {
		set_image({image_data_url: items.image_data_url ?? "", image_filename: items.image_filename ?? "none"});
	}
);

document.getElementById("file_picker").addEventListener("change", store_image);
document.getElementById("button_clear").addEventListener("click", remove_image);

chrome.storage.onChanged.addListener(storage_onChanged);
