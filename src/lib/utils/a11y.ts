/**
 * Trap focus within a container element.
 * Returns a cleanup function that removes event listeners.
 */
interface TrapFocusOptions {
	initialFocus?: HTMLElement | null;
	onEscape?: (() => void) | null;
}

export function trapFocus(container: HTMLElement, options: TrapFocusOptions = {}): () => void {
	const { initialFocus = null, onEscape = null } = options;
	if (!container) return () => {};

	const isVisible = (el: HTMLElement): boolean => {
		const style = window.getComputedStyle(el);
		return style.visibility !== 'hidden' && style.display !== 'none';
	};

	const getFocusable = (): HTMLElement[] => {
		const selector = [
			'a[href]',
			'button:not([disabled])',
			'textarea:not([disabled])',
			'input:not([disabled])',
			'select:not([disabled])',
			'[tabindex]:not([tabindex="-1"])'
		].join(',');
		return (Array.from(container.querySelectorAll(selector)) as HTMLElement[]).filter(
			(el) => !el.hasAttribute('disabled') && el.tabIndex !== -1 && isVisible(el)
		);
	};

	const focusFirst = () => {
		const focusables = getFocusable();
		(initialFocus ?? focusables[0])?.focus?.();
	};

	const onKeyDown = (e: KeyboardEvent) => {
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
		const active = document.activeElement as HTMLElement | null;

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
