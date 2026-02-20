// @ts-check

/**
 * Smooth scroll utility with custom easing
 * @param {string} targetId - Element ID to scroll to
 * @param {number} [offset=80] - Offset from top (default: 80px for navbar)
 */
export function smoothScrollTo(targetId, offset = 80) {
	const target = document.querySelector(targetId);
	if (!target) return;

	const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

	window.scrollTo({
		top: targetPosition,
		behavior: 'smooth'
	});
}

/**
 * Throttle function to limit execution rate
 * @template {(...args: any[]) => any} T
 * @param {T} func - Function to throttle
 * @param {number} limit - Time limit in ms
 * @returns {T} Throttled function
 */
export function throttle(func, limit) {
	/** @type {boolean} */
	let inThrottle = false;
	// @ts-ignore
	return function (...args) {
		if (!inThrottle) {
			// @ts-ignore
			func.apply(this, args);
			inThrottle = true;
			setTimeout(() => (inThrottle = false), limit);
		}
	};
}

/**
 * Debounce function to delay execution
 * @template {(...args: any[]) => any} T
 * @param {T} func - Function to debounce
 * @param {number} delay - Delay in ms
 * @returns {T} Debounced function
 */
export function debounce(func, delay) {
	/** @type {ReturnType<typeof setTimeout> | undefined} */
	let timeoutId;
	// @ts-ignore
	return function (...args) {
		clearTimeout(timeoutId);
		// @ts-ignore
		timeoutId = setTimeout(() => func.apply(this, args), delay);
	};
}

/**
 * Ripple effect for buttons
 * @param {MouseEvent} e - Click event
 */
export function createRipple(e) {
	const btn = /** @type {HTMLElement} */ (e.currentTarget);
	if (!btn) return;

	const rect = btn.getBoundingClientRect();
	const size = Math.max(rect.width, rect.height);
	const ripple = document.createElement('span');

	ripple.className = 'ripple';
	ripple.style.width = ripple.style.height = `${size}px`;
	ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
	ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

	btn.appendChild(ripple);
	setTimeout(() => ripple.remove(), 400);
}

/**
 * Add reveal animation on scroll
 * @param {IntersectionObserverEntry[]} entries
 * @param {IntersectionObserver} observer
 */
export function handleReveal(entries, observer) {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add('reveal-active');
			observer.unobserve(entry.target);
		}
	});
}
