/**
 * Smooth scroll utility with custom easing
 */
export function smoothScrollTo(targetId: string, offset = 80): void {
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
 */
export function throttle<T extends (...args: unknown[]) => unknown>(func: T, limit: number): T {
	let inThrottle = false;
	return function (this: unknown, ...args: unknown[]) {
		if (!inThrottle) {
			func.apply(this, args);
			inThrottle = true;
			setTimeout(() => (inThrottle = false), limit);
		}
	} as T;
}

/**
 * Debounce function to delay execution
 */
export function debounce<T extends (...args: unknown[]) => unknown>(func: T, delay: number): T {
	let timeoutId: ReturnType<typeof setTimeout> | undefined;
	return function (this: unknown, ...args: unknown[]) {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => func.apply(this, args), delay);
	} as T;
}

/**
 * Ripple effect for buttons
 */
export function createRipple(e: MouseEvent): void {
	const btn = e.currentTarget as HTMLElement;
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
 */
export function handleReveal(
	entries: IntersectionObserverEntry[],
	observer: IntersectionObserver
): void {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add('reveal-active');
			observer.unobserve(entry.target);
		}
	});
}
