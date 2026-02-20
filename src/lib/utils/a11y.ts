// @ts-check

/**
 * Trap focus within a container element.
 * Returns a cleanup function that removes event listeners.
 *
 * @param {HTMLElement} container
 * @param {{
 *   initialFocus?: HTMLElement | null,
 *   onEscape?: (() => void) | null
 * }} [options]
 * @returns {() => void}
 */
export function trapFocus(container, options = {}) {
	const { initialFocus = null, onEscape = null } = options;
	if (!container) return () => {};

	/** @param {HTMLElement} el */
	const isVisible = (el) => {
		const style = window.getComputedStyle(el);
		return style.visibility !== 'hidden' && style.display !== 'none';
	};

	/** @returns {HTMLElement[]} */
	const getFocusable = () => {
		const selector = [
			'a[href]',
			'button:not([disabled])',
			'textarea:not([disabled])',
			'input:not([disabled])',
			'select:not([disabled])',
			'[tabindex]:not([tabindex="-1"])'
		].join(',');
		return /** @type {HTMLElement[]} */ (Array.from(container.querySelectorAll(selector))).filter(
			(el) => !el.hasAttribute('disabled') && el.tabIndex !== -1 && isVisible(el)
		);
	};

	const focusFirst = () => {
		const focusables = getFocusable();
		(initialFocus ?? focusables[0])?.focus?.();
	};

	/** @param {KeyboardEvent} e */
	const onKeyDown = (e) => {
		if (e.key === 'Escape' && onEscape) {
			onEscape();
			return;
		}
		if (e.key !== 'Tab') return;

		const focusables = getFocusable();
		if (focusables.length === 0) {
			e.preventDefault();
			return;
		}

		const first = focusables[0];
		const last = focusables[focusables.length - 1];
		const active = /** @type {HTMLElement | null} */ (document.activeElement);

		if (e.shiftKey) {
			if (!active || active === first || !container.contains(active)) {
				e.preventDefault();
				last.focus();
			}
		} else {
			if (!active || active === last || !container.contains(active)) {
				e.preventDefault();
				first.focus();
			}
		}
	};

	// Ensure focus starts inside the container.
	queueMicrotask(focusFirst);

	container.addEventListener('keydown', onKeyDown);
	return () => container.removeEventListener('keydown', onKeyDown);
}
