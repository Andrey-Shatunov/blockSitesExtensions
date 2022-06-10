let clearAll = document.getElementById("clearAll");

clearAll.addEventListener("click", async () => {
	// получаем доступ к активной вкладке
		clearAllStorage();
});

function clearAllStorage(){
	chrome.storage.local.clear(function() {
		var error = chrome.runtime.lastError;
		if (error) {
			console.error(error);
		}
	});
}

document.addEventListener('DOMContentLoaded', function () {
	chrome.storage.local.get({pearsurls: []}, function (result) {
		pearsurls = result.pearsurls;
		document.getElementById("lst").innerHTML = pearsurls.join(" <br> ");
	});
});