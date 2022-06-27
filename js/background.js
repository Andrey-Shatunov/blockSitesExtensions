chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if (changeInfo.status === 'loading') {
		console.log(tab.url);
		chrome.storage.local.get({pearsurls: [], status: 0}, function (result) {
			pearsurls = result.pearsurls;
			console.log('result');
			console.log(result);
			const substring = tab.url.replaceAll('https://', '').replaceAll('http://', '');
			const match = pearsurls.find(element => {
			  if (substring.includes(element)) {
				return true;
			  }
			});
			if (match !== undefined && result.status == 1){
			  chrome.tabs.update(tabId, {url: 'no.html'});
			}
		});
      }
});