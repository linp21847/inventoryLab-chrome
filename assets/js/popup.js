(function(window, jQuery){
	$(document).ready(function() {
		$("#submit").click(function() {
			var input1 = $("#value1").val(),
				input2 = $("#value2").val();

			chrome.extension.sendMessage({
				msg: "from-popup",
				data: {
					input1: input1,
					input2: input2
				}
			}, function(response) {
				console.log(response);
			});
		});
	});
})(window, $);