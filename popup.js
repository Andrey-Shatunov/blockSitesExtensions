let snow = document.getElementById("snow");
let clearAll = document.getElementById("clearAll");

snow.addEventListener("click", async () => {
	// получаем доступ к активной вкладке
	let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
	let mylink = document.getElementById("mylink").value;
	// выполняем скрипт
	chrome.scripting.executeScript({
		// скрипт будет выполняться во вкладке, которую нашли на предыдущем этапе
		target: { tabId: tab.id },
		// вызываем функцию, в которой лежит запуск снежинок
		function: addLinkToStorage,
		args: [mylink]
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
		mylink = mylink.replaceAll('http://', '')
		mylink = mylink.replaceAll('https://', '')
		console.log(mylink)
		chrome.storage.local.get({pearsurls: []}, function (result) {
			pearsurls = result.pearsurls;
			console.log(pearsurls);
			pearsurls.push(mylink)
			console.log(pearsurls);
			//console.log(pearsurls.length)
			chrome.storage.local.set({'pearsurls': pearsurls});
		});
	}
}
