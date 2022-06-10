chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if (changeInfo.status === 'loading') {
		console.log(tab.url);
		chrome.storage.local.get({pearsurls: []}, function (result) {
			pearsurls = result.pearsurls;
			const substring = tab.url.replaceAll('https://', '').replaceAll('http://', '');
			const match = pearsurls.find(element => {
			  if (substring.includes(element)) {
				return true;
			  }
			});
			if (match !== undefined) {
			  chrome.tabs.update(tabId, {url: 'no.html'});
			}
		});
      }
});