document.addEventListener('DOMContentLoaded', () => {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        getCitation(url = tabs[0].url);
    });
    const bibCopy = document.querySelector('#bibParent');
    bibCopy.addEventListener('click', async () => {
        var r = document.createRange();
        r.selectNode(document.getElementById('bibParent'));
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(r);
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
        window.scrollTo(0, 0);
        document.getElementById("copied").className = "copiedAfter";
        document.getElementById("level").className = "copiedBefore";
    });
    const textCopy = document.querySelector('#text');
    textCopy.addEventListener('click', async () => {
        var t = document.createRange();
        t.selectNode(document.getElementById('text'));
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(t);
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
        window.scrollTo(0, 0);
        document.getElementById("copied").className = "copiedAfter";
        document.getElementById("level").className = "copiedBefore";
    });
});
function search() {
    const q = document.getElementById('formInput').value;
    chrome.tabs.create({
        active: true,
        url: "https://www.imasse.com/search?q=" + q
    });
}
function more() {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        chrome.tabs.create({
            active: true,
            url: "https://www.imasse.com/search?q=" + tabs[0].title
        });
    });
}
function test() {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        chrome.tabs.create({
            active: true,
            url: "https://cdn.imasse.com/mla/test"
        });
    });
}
async function getCitation(v) {
    try {
    if(v.startsWith("https://") || v.startsWith("http://")){
    const search = encodeURI(v);
    const endpoint = "https://api.imasse.com/citations/search?q=" + v;
    let json = await fetch(endpoint);
    json = await json.json();
    json = JSON.stringify(json);
    let result = JSON.parse(json);

    chrome.storage.sync.get({
        mlaScore: 0,
        mla: 'default'
      }, function(items) {
        setScore(items.mlaScore)
        if(items.mla == 'true' || items.mla == 'default'){
           mla();
        }
        else {
            apa();
        }
      });
    function setScore(x){
            if(x < 3){
                document.getElementById("level").innerHTML = "MLA Beginner";
                document.getElementById("level").className = "copiedAfter";
              }
              else if(x > 4){
                document.getElementById("level").innerHTML = "MLA Expert";
                document.getElementById("level").className = "copiedAfter";
              }
              else{
                document.getElementById("level").innerHTML = "MLA Intermediate";
                document.getElementById("level").className = "copiedAfter";
              }
    }
    function mla(){
        const months = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];
        function author(x) {
            const z = x.length;
            function build(y) {
                if (y['family'] == null) {
                    return (y['literal']);
                }
                if (y['given'] == null) {
                    return (y['family']);
                }
                return (y['family'] + ', ' + y['given']);
            }
            if (z > 2) {
                return (build(x[0]) + ', et al');
            }
            if (z == 2) {
                const w = build(x[0]) + ', and ';
                return (w + build(x[1]));
            }
            if (z == 1) {
                return (build(x[0]) + '. ');
            }
            return '';
        }
        function title(x) {
            if (x != null) {
                return ('&ldquo;' + x + '.&rdquo;');
            }
            return '';
        }
        function container(x) {
            if (x != null) {
                return (' <i>' + x + ',</i>');
            }
            return '';
        }
        let doi = true;
        function issued(x) {
            function month(y) {
                return (months[y - 1]);
            }
            if (x['year'] == null) {
                doi = false;
                return '';
            }
            if (x['day'] != null && x['month'] != null) {
                const m = month(x['month']);
                return (' ' + x['day'] + ' ' + m + ' ' + x['year'] + ',');
            }
            return (' ' + x['year'] + ',');
        }
        function url(x) {
            if (x != null) {
                return ' ' + x.replace(/^https?:\/\//, '') + '.';
            }
            return '';
        }
        function accessed() {
            const date = new Date();
            const d = date.getDay();
            const m = date.getMonth();
            const y = date.getFullYear();
            return (' Accessed ' + d + ' ' + months[m] + ' ' + y + '.');
        }
        function text(x) {
            const z = x.length;
            function build(y) {
                if (y['family'] == null) {
                    return (y['literal']);
                }
                return (y['family']);
            }
            if (z > 2) {
                return ('(' + build(x[0]) + ' et al.)');
            }
            if (z == 2) {
                const w = build(x[0]) + ' and ';
                return ('(' + w + build(x[1]) + ')');
            }
            if (z == 1) {
                return ('(' + build(x[0]) + ')');
            }
            const firstTitle = result['title'].split(' ')[0]
            return ('(&ldquo;' + firstTitle + '&rdquo;)');
        }
        const authorVar = author(result['author']);
        const titleVar = title(result['title']);
        const containerVar = container(result['containerTitle']);
        const issuedVar = issued(result['issued']);
        const urlVar = url(v);
        let accessedVar = '';
        if (doi == false) {
            accessedVar = accessed();
        }
        const citation = authorVar + titleVar + containerVar + issuedVar + urlVar + accessedVar;
        const textCitation = text(result['author']);
        const credibility = result['credibility'];

        document.getElementById("bib").innerHTML = citation;
        document.getElementById("text").innerHTML = textCitation;
        document.getElementById("cred").innerHTML = credibility;
    }
    function apa(){
    const monthsFull = ["January","February","March","April","May","June","July",
    "August","September","October","November","December"];
    function author(x) {
        const z = x.length;
        function build(y) {
            if (y['family'] == null) {
                return (y['literal']);
            }
            if (y['given'] == null) {
                return (y['family']);
            }
            return (y['family'] + ', ' + y['given'].charAt(0).toUpperCase() + '.');
        }
        if (z > 2) {
            const f1 = build(x[0]);
            const f2 = build(x[1]);
            const f3 = build(x[2]);
            return (f1 + ', ' + f2 + ', & ' + f3 + ' ');
        }
        if (z == 2) {
            const w = build(x[0]) + ', & ';
            return (w + build(x[1]) + ' ');
        }
        if (z == 1) {
            return (build(x[0]) + ' ');
        }
        return '';
    }
    let doi = true;
    function issued(x) {
        function month(y) {
            return (monthsFull[y - 1]);
        }
        if (x['year'] == null) {
            doi = false;
            return '(n.d.). ';
        }
        if (x['day'] != null && x['month'] != null) {
            const m = month(x['month']);
            return ('(' + x['year'] + ', ' + m + ' ' + x['day'] + '). ');
        }
        return ('(' + x['year'] + '). ');
    }
    function title(x) {
        if (x != null) {
            return ('<i>' + x + '. </i> ');
        }
        return '';
    }
    function container(x) {
        if (x != null) {
            return (x + '. ');
        }
        return '';
    }
    function url(x) {
        if (x != null) {
            return x + ' ';
        }
        return '';
    }
    function accessed() {
        const date = new Date();
        const d = date.getDate();
        const m = date.getMonth();
        const y = date.getFullYear();
        return ('Retrieved ' + monthsFull[m] + ' ' + d + ', ' + y + ', from ');
    }
    function text(x) {
        const z = x.length;
        let d = ', n.d.';
        if(result['issued']['year'] != null){
            d = ', ' + result['issued']['year'];
        }
        function build(y) {
            if (y['family'] == null) {
                return (y['literal']);
            }
            return (y['family']);
        }
        if (z > 2) {
            return ('(' + build(x[0]) + ' et al.)');
        }
        if (z == 2) {
            const w = build(x[0]) + ' and ';
            return ('(' + w + build(x[1]) + ')');
        }
        if (z == 1) {
            return ('(' + build(x[0]) + ')');
        }
        const firstTitle = result['title'].split(' ')[0];
        return ('(<i>' + firstTitle + '</i>' + d + ')');
    }
    const authorVar = author(result['author']);
    const titleVar = title(result['title']);
    const containerVar = container(result['containerTitle']);
    const issuedVar = issued(result['issued']);
    const urlVar = url(v);
    let accessedVar = '';
    if (doi == false) {
        accessedVar = accessed();
    }
    let citation = '';
    if(authorVar == ''){
        citation = titleVar + issuedVar+ containerVar + accessedVar + urlVar;
    }
    else {
        citation = authorVar + issuedVar + titleVar + containerVar + accessedVar + urlVar;
    }
    const textCitation = text(result['author']);
    const credibility = result['credibility'];

    document.getElementById("bib").innerHTML = citation;
    document.getElementById("text").innerHTML = textCitation;
    document.getElementById("cred").innerHTML = credibility;

    }
}
else {
    document.getElementById("bib").innerHTML = 'Bibliography citation not available for page.';
    document.getElementById("text").innerHTML = 'Text citation not available for page.';
    document.getElementById("cred").innerHTML = 'Credibility not available for page.';
}
    } catch(error){
        document.getElementById("bib").innerHTML = 'Bibliography citation not available for page.';
        document.getElementById("text").innerHTML = 'Text citation not available for page.';
        document.getElementById("cred").innerHTML = 'Credibility not available for page.';
    }
}
const form = document.getElementById('searchForm');
form.addEventListener('submit', search);
const moreLoad = document.getElementById('loadMore');
moreLoad.addEventListener('click', more);
const testLoad = document.getElementById('level');
testLoad.addEventListener('click', test);