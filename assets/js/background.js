(function(window, jQuery){
	chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
		switch(request.msg) {
			case "from-popup":
				console.log("Message arrived from popup.");
				console.log(request.data);

				localStorage.setItem("input1", JSON.stringify(request.data.input1));
				localStorage.setItem("input2", JSON.stringify(request.data.input2));
				chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
					console.log(tabs);
					chrome.tabs.sendMessage(tabs[0].id, {action: "fill-in", data: request.data}, function(response) {
						console.log("Message arrived from current tab.");
						console.log(response);
					});  
				});
				break;

			case "state":
				console.log("Content script needs state values.");
				sendResponse({
					input1: (JSON.parse(localStorage.getItem("input1") || null)),
					input2: (JSON.parse(localStorage.getItem("input2") || null))
				});
				break;

			default:
				break;
		}
	});

	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
		switch(request.msg) {
			case "state":
				console.log("Content script needs state values.");
				sendResponse({
					input1: (JSON.parse(localStorage.getItem("input1") || null)),
					input2: (JSON.parse(localStorage.getItem("input2") || null))
				});
				break;

			default:
				break;
		}
	});
})(window, $);