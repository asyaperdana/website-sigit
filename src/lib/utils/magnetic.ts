/**
 * Magnetic button effect using RAF for optimal performance
 */
export function createMagneticEffect(element: HTMLElement, strength = 0.3): () => void {
	if (!element || window.innerWidth < 1024) return () => {};

	let rafId: number | null = null;
	let targetX = 0;
	let targetY = 0;

	const handleMouseMove = (e: MouseEvent) => {
		const rect = element.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;
		const deltaX = e.clientX - centerX;
		const deltaY = e.clientY - centerY;
		const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

		if (distance < 100) {
			targetX = deltaX * strength;
			targetY = deltaY * strength;
		} else {
			targetX = 0;
			targetY = 0;
		}

		if (!rafId) {
			rafId = requestAnimationFrame(updatePosition);
		}
	};

	const updatePosition = () => {
		element.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
		rafId = null;
	};

	const handleMouseLeave = () => {
		targetX = 0;
		targetY = 0;
		element.style.transform = 'translate3d(0, 0, 0)';
		if (rafId !== null) {
			cancelAnimationFrame(rafId);
			rafId = null;
		}
	};

	window.addEventListener('mousemove', handleMouseMove, { passive: true });
	element.addEventListener('mouseleave', handleMouseLeave);

	// Cleanup function
	return () => {
		window.removeEventListener('mousemove', handleMouseMove);
		element.removeEventListener('mouseleave', handleMouseLeave);
		if (rafId !== null) cancelAnimationFrame(rafId);
	};
}
