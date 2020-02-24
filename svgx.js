class Svgx {

	constructor(selector) {
		this.elems = document.querySelectorAll(`svg[data-src]`)
	}

	// Checking string of url or not.
	isValidUrl(string) {
		try {
			new URL(string);
			return true;
		} catch (_) {
			return false;  
		}
	}
	// create the link of svg
	getLink(string) {
		return this.isValidUrl(string) ? string : `${window.location.origin}/${string}`
	}
	// Get svg from fetch
	svgFromFetch(url) {
		return fetch(url)
		.then(res => res.text())
		.then(data => {
			// Resolve and parsing SVG
			let doc = new DOMParser().parseFromString(data, 'text/html');
			return doc.querySelector('svg')
		})
	}
	init() {
		this.elems.forEach(svg => {
			let getSvg = this.svgFromFetch(this.getLink(svg.dataset.src))
			// replaceing old svg via new
			getSvg.then(newSvg => {
				svg.parentNode.replaceChild(newSvg, svg);
			});
		})
	}
}