chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === 'TabUpdated') {
	console.log('ololo');
    console.log(document.location.href);
  }
})