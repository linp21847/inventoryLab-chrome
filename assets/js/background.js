(function(window, jQuery){
	chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
		switch(request.msg) {
			case "from-popup":
				console.log("Message arrived from popup.");
				console.log(request.data);
				chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
					chrome.tabs.sendMessage(tabs[0].id, {action: "fill-in", data: request.data}, function(response) {
						console.log("Message arrived from current tab.");
						console.log(response);
					});  
				});
				break;
			default:
				break;
		}
	});
})(window, $);