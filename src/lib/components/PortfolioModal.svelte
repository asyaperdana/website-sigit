<script lang="ts">
	import { onDestroy, tick } from 'svelte';
	import { fade, scale } from 'svelte/transition';
	import { trapFocus } from '$lib/utils/a11y';

	let { activeProject, onClose } = $props();

	let /* ts: HTMLElement | null */ dialogEl = $state(null);
	let /* ts: HTMLButtonElement | null */ closeBtnEl = $state(null);
	let /* ts: HTMLElement | null */ lastActiveEl = null;
	let /* ts: (() => void) | null */ cleanupTrap = null;

	$effect(() => {
		if (!activeProject) return;

		// Store focus to restore after closing.
		lastActiveEl = (document.activeElement as HTMLElement | null);

		// Trap focus after DOM is updated.
		(async () => {
			await tick();
			if (!dialogEl) return;
			cleanupTrap?.();
			cleanupTrap = trapFocus(dialogEl, {
				initialFocus: closeBtnEl,
				onEscape: onClose
			});
		})();

		return () => {
			cleanupTrap?.();
			cleanupTrap = null;
			// Restore focus
			lastActiveEl?.focus?.();
			lastActiveEl = null;
		};
	});

	onDestroy(() => {
		cleanupTrap?.();
	});

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') onClose();
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if activeProject}
	<div
		class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
		onclick={onClose}
		onkeydown={(e) => e.key === 'Enter' && onClose()}
		role="button"
		tabindex="0"
		in:fade={{ duration: 140 }}
		out:fade={{ duration: 120 }}
	>
		<div
			bind:this={dialogEl}
			class="glass w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl relative flex flex-col p-0"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.key === 'Enter' && e.stopPropagation()}
			role="dialog"
			aria-modal="true"
			aria-label={`Project details: ${activeProject.title}`}
			tabindex="-1"
			in:scale={{ start: 0.98, duration: 160 }}
			out:scale={{ start: 0.98, duration: 120 }}
		>
			<button
				bind:this={closeBtnEl}
				onclick={onClose}
				class="absolute top-4 right-4 bg-[var(--bg)]/80 text-[var(--text)] w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-all z-10 shadow-lg text-lg"
				aria-label="Close modal"
			>
				<i class="fas fa-times"></i>
			</button>
			<div class="relative shrink-0">
				<img
					src={activeProject.img}
					alt={activeProject.title}
					class="w-full h-48 sm:h-72 object-cover rounded-t-xl"
				/>
				<div
					class="absolute inset-0 bg-gradient-to-t from-[var(--bg)] to-transparent opacity-60"
				></div>
			</div>
			<div class="p-6 md:p-8 flex-1">
				<h3
					class="text-2xl md:text-3xl font-bold mb-3 text-indigo-500 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500"
				>
					{activeProject.title}
				</h3>
				<p class="text-[var(--text)] opacity-70 leading-relaxed mb-6 text-base md:text-lg">
					{activeProject.desc}
				</p>
				<div class="flex flex-col sm:flex-row gap-4 pt-4 border-t border-[var(--glass-border)]">
					<button
						class="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full font-bold transition-all hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2"
					>
						<i class="fas fa-external-link-alt"></i> Live Demo
					</button>
					<button
						class="border border-indigo-500 text-indigo-400 hover:bg-indigo-500 hover:text-white px-8 py-3 rounded-full font-bold transition-all hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2"
					>
						<i class="fab fa-github"></i> Source Code
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}
