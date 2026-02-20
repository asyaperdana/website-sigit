/**
 * Quirky UX Utilities
 * Fun and playful interactions that enhance user experience
 * Performance-optimized with requestAnimationFrame
 */

/**
 * Random quirky tooltips for skills
 */
export const quirkySkilltips: Record<string, string[]> = {
	HTML5: [
		'The skeleton of the web 💀',
		'Not just divs, I promise',
		'Semantic master 🎯',
		'I can close my tags (usually)'
	],
	CSS3: [
		'Making things pretty since forever ✨',
		'Flexbox wizard 🧙‍♂️',
		'Grid master 📐',
		'Can center a div (after 10 tries)'
	],
	JavaScript: [
		'undefined is not a function... or is it? 🤔',
		'Async/await enthusiast ⏰',
		'Event loop explorer 🔄',
		'ES6+ vibes only ⚡'
	],
	Tailwind: [
		'Utility classes go brrr 🚀',
		'No more naming conventions!',
		'Responsive design made easy 📱',
		'Dark mode? Easy peasy! 🌙'
	],
	React: [
		'Hook, line, and sinker 🎣',
		'useState all day 🔄',
		'Component composer 🎼',
		'Virtual DOM master 🌳'
	],
	Git: [
		'Commit message poet 📝',
		'Merge conflict survivor 💪',
		'Branch strategy guru 🌿',
		'git push --force (just kidding) 😅'
	]
};

/**
 * Get random quirky tooltip for a skill
 */
export function getRandomTooltip(skillName: string): string {
	const tips = quirkySkilltips[skillName];
	if (!tips) return '';
	return tips[Math.floor(Math.random() * tips.length)];
}

/**
 * Create floating emoji animation
 */
export function createFloatingEmoji(
	container: HTMLElement,
	emoji: string,
	x: number,
	y: number
): void {
	const emojiEl = document.createElement('div');
	emojiEl.textContent = emoji;
	emojiEl.className = 'floating-emoji';
	emojiEl.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        font-size: 2rem;
        pointer-events: none;
        z-index: 9999;
        animation: floatUp 2s ease-out forwards;
    `;

	container.appendChild(emojiEl);

	setTimeout(() => {
		emojiEl.remove();
	}, 2000);
}

/**
 * Create confetti explosion
 */
export function createConfetti(x = 50, y = 50): void {
	const colors = ['#6366f1', '#c084fc', '#ec4899', '#f59e0b', '#10b981'];
	const confettiCount = 30;

	for (let i = 0; i < confettiCount; i++) {
		const confetti = document.createElement('div');
		confetti.className = 'confetti-piece';
		confetti.style.cssText = `
            position: fixed;
            left: ${x}%;
            top: ${y}%;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            pointer-events: none;
            z-index: 9999;
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
        `;

		document.body.appendChild(confetti);

		const angle = (Math.PI * 2 * i) / confettiCount;
		const velocity = 50 + Math.random() * 100;
		const tx = Math.cos(angle) * velocity;
		const ty = Math.sin(angle) * velocity;

		confetti.animate(
			[
				{ transform: 'translate(0, 0) rotate(0deg)', opacity: 1 },
				{ transform: `translate(${tx}px, ${ty}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
			],
			{
				duration: 1000 + Math.random() * 500,
				easing: 'cubic-bezier(.17,.67,.83,.67)'
			}
		).onfinish = () => confetti.remove();
	}
}

/** Quirky success messages */
export const successMessages: string[] = [
	'🎉 Mantap jiwa!',
	'✨ Keren banget!',
	'🚀 Langsung meluncur!',
	'💯 Perfect score!',
	'🔥 On fire!',
	'⚡ Super cepat!',
	'🎯 Tepat sasaran!',
	'🌟 Brilliant!'
];

/** Quirky error messages */
export const errorMessages: string[] = [
	'🤔 Hmm, ada yang janggal nih...',
	'😅 Oops! Coba lagi dong...',
	'🔧 Ada yang perlu diperbaiki...',
	'❌ Error 404: Kesabaran not found',
	'🐛 Bug detected! (bukan salah Sigit)',
	'⚠️ Houston, kita ada masalah...',
	'🎭 Plot twist: ada error!',
	'💥 Kaboom! Cek lagi ya...'
];

/**
 * Get random message from array
 */
export function getRandomMessage(messages: string[]): string {
	return messages[Math.floor(Math.random() * messages.length)];
}

/**
 * Konami code detection
 */
export function setupKonamiCode(callback: () => void): () => void {
	const konamiCode = [
		'ArrowUp',
		'ArrowUp',
		'ArrowDown',
		'ArrowDown',
		'ArrowLeft',
		'ArrowRight',
		'ArrowLeft',
		'ArrowRight',
		'b',
		'a'
	];
	let position = 0;

	const handler = (e: KeyboardEvent) => {
		if (e.key === konamiCode[position]) {
			position++;
			if (position === konamiCode.length) {
				callback();
				position = 0;
			}
		} else {
			position = 0;
		}
	};

	window.addEventListener('keydown', handler);
	return () => window.removeEventListener('keydown', handler);
}

/**
 * Add wobble effect to element
 */
export function wobbleElement(element: HTMLElement): void {
	element.animate(
		[
			{ transform: 'rotate(0deg)' },
			{ transform: 'rotate(-5deg)' },
			{ transform: 'rotate(5deg)' },
			{ transform: 'rotate(-5deg)' },
			{ transform: 'rotate(5deg)' },
			{ transform: 'rotate(0deg)' }
		],
		{
			duration: 500,
			easing: 'ease-in-out'
		}
	);
}

/**
 * Create typing effect
 */
export function typewriterEffect(element: HTMLElement, text: string, speed = 50): void {
	let i = 0;
	element.textContent = '';

	const type = () => {
		if (i < text.length) {
			element.textContent += text.charAt(i);
			i++;
			setTimeout(type, speed);
		}
	};

	type();
}
