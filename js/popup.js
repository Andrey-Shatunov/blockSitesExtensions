let addLink = document.getElementById("addLink");
let linksList = document.getElementById("linksList");
let switcher = document.getElementById("switcher");

chrome.storage.local.get({status: 0}, function (result) {
	console.log(result);
	switcher.checked = result.status;
});

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

switcher.addEventListener("click", async () => {
	chrome.storage.local.get({status: 0}, function (result) {
		status = parseInt(result.status, 10);
		console.log("status")
		console.log( status)
		new_status  = ((parseInt(result.status, 10)+1)%2)
		chrome.storage.local.set({'status': new_status});
		console.log("-----")
	});
});

linksList.addEventListener("click", async () => {
	chrome.tabs.update({url: "linksList.html"});
});


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
