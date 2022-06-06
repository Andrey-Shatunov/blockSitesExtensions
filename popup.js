let addLink = document.getElementById("addLink");
let clearAll = document.getElementById("clearAll");
let linksList = document.getElementById("linksList");

addLink.addEventListener("click", async () => {
	// получаем доступ к активной вкладке
	let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
	//let mylink = document.getElementById("mylink").value;
	// выполняем скрипт
	chrome.scripting.executeScript({
		// скрипт будет выполняться во вкладке, которую нашли на предыдущем этапе
		target: { tabId: tab.id },
		// вызываем функцию, в которой лежит запуск снежинок
		function: addLinkToStorage,
		args: [tab.url]
	});
});

clearAll.addEventListener("click", async () => {
	// получаем доступ к активной вкладке
	let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
		//выполняем скрипт
		chrome.scripting.executeScript({
		// скрипт будет выполняться во вкладке, которую нашли на предыдущем этапе
		target: { tabId: tab.id },
		// вызываем функцию, в которой лежит запуск снежинок
		function: clearAllStorage,
	 });
});

linksList.addEventListener("click", async () => {
	chrome.tabs.update({url: "linksList.html"});
});

document.addEventListener('DOMContentLoaded', function () {
	chrome.storage.local.get({pearsurls: []}, function (result) {
		pearsurls = result.pearsurls;
		document.getElementById("lst").innerHTML = pearsurls.join(" <br> ");
	});
});

function clearAllStorage(){
	chrome.storage.local.clear(function() {
		var error = chrome.runtime.lastError;
		if (error) {
			console.error(error);
		}
	});
}

function addLinkToStorage(mylink) {
	if(mylink.length > 0){
		//mylink = mylink.replaceAll('http://', '')
		//mylink = mylink.replaceAll('https://', '')
		//console.log(mylink)
		var parser = document.createElement('a');
		parser.href = mylink
		//console.log(tab.url);
		chrome.storage.local.get({pearsurls: []}, function (result) {
			pearsurls = result.pearsurls;
			//console.log(pearsurls);
			pearsurls.push(parser.hostname)
			//console.log(pearsurls);
			//console.log(pearsurls.length)
			chrome.storage.local.set({'pearsurls': pearsurls});
		});
	}
}
