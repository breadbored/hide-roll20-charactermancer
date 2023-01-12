import * as $ from "jquery"

console.log('💈 Content script loaded for', chrome.runtime.getManifest().name);
async function init() {
	$(document).on("DOMSubtreeModified", function () {
		const iframe = document.querySelectorAll('iframe[title^=\"Character sheet\"]');
		const iframeDocument = iframe[0].contentDocument || iframe[0].contentWindow.document;
		const iframeContent = iframeDocument.querySelectorAll('.showleveler');

		for (let i = 0; i < iframeContent.length; i++) {
			const charactermancer_init = $(iframeContent[i].nextElementSibling)
			if (iframeContent[i].attributes.value.value == "1") {
				charactermancer_init.css("display", "unset");
			} else {
				charactermancer_init.css("display", "none");
			}

			const element = iframeContent[i]
			console.log(element);
			$(element).off("DOMSubtreeModified").on("DOMSubtreeModified", function() {
				const charactermancer = $(this.nextElementSibling)
				if (this.attributes.value.value == "1") {
					charactermancer.css("display", "unset");
					console.log("change", "set to 'unset'", this.attributes.value.value );
				} else {
					charactermancer.css("display", "none");
					console.log("change", "set to 'none'", this.attributes.value.value );
				}
			})
		}
	})
}

init();
