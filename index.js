function buildPopupDom(mostVisitedURLs) {
    var tiles_container = document.getElementById('tiles_div');
    console.log(mostVisitedURLs);
    let length = 8;
    if(mostVisitedURLs.length < 10){
        length = mostVistedURLs.length;
    }
    for (var i = 0; i < length; i++) {
        if(i < 3){
        if(i == 0){
            var tiles = tiles_container.appendChild(document.createElement('div'));
            tiles.classList.add('tiles');
            for (var k = 0; k < 2; k++) {
            var a = tiles.appendChild(document.createElement('a'));
            var tile = a.appendChild(document.createElement('div'));
            tile.classList.add('tile');
                var img = tile.appendChild(document.createElement('img'));
                var p = tile.appendChild(document.createElement('p'));       
                a.id = 'adA' + (k+1); 
                img.id = 'adImg' + (k+1); 
                p.id = 'adP' + (k+1); 
            }
            getTiles();
            
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
        else{
            if(i == 3){
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
}
chrome.topSites.get(buildPopupDom);

async function getTiles() {
    const url = "https://cdn.imasse.com/api/tiles.json";
    let json = await fetch(url);
    json = await json.json();
    json = JSON.stringify(json);
    json = JSON.parse(json);

    for (var k = 0; k < 2; k++) {
        var a = document.getElementById('adA' + (k+1));
        var img = document.getElementById('adImg' + (k+1));
        var p = document.getElementById('adP' + (k+1));
        a.href = json[k]['url'];
        img.src = 'https://aldeb-zeu.com/icons/' + json[k]['icon'];
        p.innerHTML = json[k]['name'];
    }

    let tiles = document.getElementById("tiles_div");
    tiles.style.visibility = "visible";
}