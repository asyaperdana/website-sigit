export function reveal(node: HTMLElement, options = { threshold: 0.05, rootMargin: '0px 0px -10px 0px' }) {
	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				node.classList.add('reveal-active');
				observer.unobserve(node);
			}
		});
	}, options);

	// Immediate reveal for elements already in viewport
	const rect = node.getBoundingClientRect();
	if (rect.top < window.innerHeight && rect.bottom >= 0) {
		node.classList.add('reveal-active');
	} else {
		observer.observe(node);
	}

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
