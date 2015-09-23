(function(window, jQuery) {

	$(document).ready(function() {

		var getTodayString = function() {
			 var today = new Date(),
			 	dd = today.getDate(),
			 	mm = today.getMonth()+1,
			 	yyyy = today.getFullYear();

			if(dd<10){
			    dd='0'+dd
			} 
			if(mm<10){
			    mm='0'+mm
			} 
			return today = yyyy + mm + dd;
		};

		var fillInMSKU = function(data) {
			var $productModel = $("#divProductDetails .status-bar .breadcrumbs .breadcrumb.-active"),
				$costPerUnit = $("#divProductDetails #txtPricePerUnit"),
				$sellerSKU = $("#divProductDetails #txtSellerSKU"),
				params = [];

			if ($costPerUnit.length === 0 || $productModel.length === 0 || $costPerUnit.val() == "") {
				alert("Please select a product.");
				return;
			}

			if (data && data.input1) 
				params.push(data.input1)

			
			params.push($productModel.text().trim());
			params.push(getTodayString());
			params.push($costPerUnit.val().trim());

			if (data && data.input2)
				params.push(data.input2);

			$sellerSKU.val(params.join("-"));
		};

		chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
			switch(request.action) {
				case "fill-in":
					console.log("Message arrived from background script.");
					console.log(request.data);
					fillInMSKU(request.data);
					break;

				default:
					break;
			}
		});

		$(document).keyup(function(e) {
			var keys = [],
				curKey = String.fromCharCode(e.which);

			if (e.ctrlKey && (curKey === "b" || curKey === "B")) {
				chrome.runtime.sendMessage({msg: "state"}, function(response) {
					fillInMSKU(response);
				});
			}
		})
	});
})(window, $)