(function(window, jQuery) {

	$(document).ready(function() {
		chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
			switch(request.msg) {
				case "fill-in":
					console.log("Message arrived from background script.");
					console.log(request.data);
					break;

				default:
					break;
			}
		});
	});
})(window, $)