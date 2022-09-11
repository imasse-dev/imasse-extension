document.addEventListener('DOMContentLoaded', () => {
    getCitation();
});

async function getCitation() {
    try {
    let search = new URLSearchParams(window.location.search);
    search = search.get('q');
    const endpoint = search;
    let json = await fetch(endpoint);
    json = await json.json();
    json = JSON.stringify(json);
    let result = JSON.parse(json);
    console.log(result);
    if(result['score'] == undefined){
        document.getElementById("text").innerHTML = "We couldn't create a credibility report for this source.";
    }
    else {
        document.getElementById("score").innerHTML = result['score'];
        document.getElementById("text").innerHTML = result['comment'];
    }
    } catch (error) {
        document.getElementById("text").innerHTML = "We couldn't create a credibility report for this source.";
    }
}