document.addEventListener('DOMContentLoaded', () => {
    chrome.tabs.query({active: true, currentWindow: true},function(tabs){   
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
        setTimeout();
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
    });
});

  setTimeout(() => {
    const box = document.getElementById('copied');
    box.style.display = 'none';
  }, 5000);
async function getCitation(v) {
    const search = encodeURI(v);
    const endpoint = "https://api.imasse.com/citations/search?q=" + v;
    let json = await fetch(endpoint);
    json = await json.json();
    json = JSON.stringify(json);
    let result = JSON.parse(json);


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
	if (x['month'] != null) {
		const m = month(x['month']);
		return (m + x['year'] + ',');
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
	return ('(&ldquo;' + result['title'] + '&rdquo;)');
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
