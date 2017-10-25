let userInput;
let searchUrl = "https://fr.wikipedia.org/w/api.php?action=opensearch";
var li;
var rules = [];

function setup() {
	noCanvas();
	userInput = select('#userinput');
	numberInput = select('#numberinput');
	userInput.changed(goWiki);


	function goWiki() {
		let term = userInput.value();
		let num = numberInput.value();
		let url = searchUrl + `&limit=${num}&search=${term}`;
		loadJSON(url, gotData, 'jsonp');
	}

	function gotData(data) {
		removeChildren("ul1");
		removeChildren("ul2");
		removeChildren("ul3");
		console.log(data);
		for (var i = 0; i < rules.length; i++) {
			document.styleSheets[0].deleteRule(rules[i]);
		}
		rules = [];
		document.getElementById("found").innerHTML = `Found ${data[1].length} terms :`;
		for (var i = 0; i < data[1].length; i++) {
			li = document.createElement("li");
			li.innerHTML = `<a href='${data[3][i]}'>${data[1][i]}</a>`
			li.id = `li${i}`;
			if (i < data[1].length / 3) {
				document.getElementById("ul1").appendChild(li);
			} else if (i < data[1].length / 3 * 2) {
				document.getElementById("ul2").appendChild(li);
			} else {
				document.getElementById("ul3").appendChild(li);
			}
			var rule = document.styleSheets[0].insertRule(`#li${i}:after { content: "${data[2][i]}"; }`, 0);
			rules.push(rule);
		}
	}

	function removeChildren(elementId) {
		var element = document.getElementById(elementId);
		while (element.firstChild) {
			element.removeChild(element.firstChild);
		}
	}
}
