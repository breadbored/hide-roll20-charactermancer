import $ from 'jquery';

console.log('💈 Content script loaded for', chrome.runtime.getManifest().name);
async function init() {
	$(document).on('DOMSubtreeModified', () => {
		const iframe = document.querySelectorAll('iframe[title^="Character sheet"]');
		const iframeDocument = iframe[0].contentDocument || iframe[0].contentWindow.document;
		const iframeContent = iframeDocument.querySelectorAll('.showleveler');

		for (const element of iframeContent) {
			const charactermancerInit = $(element.nextElementSibling);
			if (element.attributes.value.value === '1') {
				charactermancerInit.css('display', 'unset');
			} else {
				charactermancerInit.css('display', 'none');
			}

			console.log(element);
			$(element).off('DOMSubtreeModified').on('DOMSubtreeModified', function () {
				const charactermancer = $(this.nextElementSibling);
				if (this.attributes.value.value === '1') {
					charactermancer.css('display', 'unset');
					console.log('change', 'set to \'unset\'', this.attributes.value.value);
				} else {
					charactermancer.css('display', 'none');
					console.log('change', 'set to \'none\'', this.attributes.value.value);
				}
			});
		}
	});
}

init();
