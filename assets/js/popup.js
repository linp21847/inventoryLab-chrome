(function(window, jQuery){

	var val1, val2;
	chrome.extension.sendMessage({
		msg: "state"
	}, function(response) {
		val1 = response.input1,
		val2 = response.input2;

		$(document).ready(function() {
			$("#value1").val(val1).change(function(e) {
				localStorage.setItem("input1", JSON.parse($(this).val()));
			});
			$("#value2").val(val2).change(function(e) {
				localStorage.setItem("input2", JSON.parse($(this).val()));
			});
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

			$(document).keyup(function(e) {
				var keys = [],
					curKey = String.fromCharCode(e.which);

				if (e.ctrlKey && (curKey === "b" || curKey === "B")) {
					chrome.extension.sendMessage({
						msg: "from-popup",
						data: {
							input1: input1,
							input2: input2
						}
					}, function(response) {
						console.log(response);
					});
				}
			});
		});

	});
})(window, $);