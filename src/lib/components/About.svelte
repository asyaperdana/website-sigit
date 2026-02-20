<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { base } from '$app/paths';
	import { createConfetti, wobbleElement } from '$lib/utils/quirky';

	let profilePicEl = $state();
	let clickCount = $state(0);
	let lastClickTime = $state(0);

	function handleEasterEgg() {
		const now = Date.now();
		const timeSinceLastClick = now - lastClickTime;
		lastClickTime = now;

		// Reset if more than 1 second between clicks
		if (timeSinceLastClick > 1000) {
			clickCount = 1;
		} else {
			clickCount++;
		}

		profilePicEl.classList.remove('shake-anim', 'spin-anim');
		void profilePicEl.offsetWidth; // trigger reflow

		if (clickCount >= 5) {
			profilePicEl.classList.add('spin-anim');
			createConfetti(50, 30); // Confetti explosion!

			// Create a fun toast notification
			const toast = document.createElement('div');
			toast.textContent = '🎉 Woi pusing! Jangan dipencet-pencet! 😂';
			toast.className =
				'fixed bottom-24 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-6 py-3 rounded-full shadow-2xl z-[100] animate-bounce-in';
			document.body.appendChild(toast);

			setTimeout(() => {
				toast.style.opacity = '0';
				toast.style.transition = 'opacity 0.3s';
				setTimeout(() => toast.remove(), 300);
			}, 3000);

			clickCount = 0;
		} else {
			profilePicEl.classList.add('shake-anim');
			wobbleElement(profilePicEl);
		}
	}
</script>

<section id="about" class="max-w-5xl mx-auto px-6 py-16 reveal" use:reveal>
	<div class="glass text-center p-8 md:p-12">
		<button
			onclick={handleEasterEgg}
			class="block mx-auto mb-6 focus:outline-none hover:scale-105 transition-transform group"
			aria-label="Sigit profile picture (has easter egg)"
		>
			<img
				bind:this={profilePicEl}
				src="{base}/img/roll-safe-profile.jpg"
				alt="Foto profil Sigit"
				class="w-40 h-40 rounded-full border-4 border-indigo-500 shadow-lg cursor-grab active:cursor-grabbing transition-all group-hover:border-purple-500 group-hover:shadow-purple-500/50"
			/>
		</button>
		<h2 class="text-4xl font-extrabold mb-6">Seputar Sigit 👨‍💻</h2>
		<p class="text-lg leading-relaxed mb-6">
			Calon Programmer dari PT. Jhawa Jyujyur, domisili Sigmarang, Jawa Selatan. Spesialis matcha
			level dewa, sekaligus <span class="font-bold text-indigo-400">pendekar kwetiau</span> tanpa tanding.
		</p>
		<p class="italic text-(--text) opacity-50 text-sm">(berhati-hatilah para wanita) 😎</p>
	</div>
</section>
