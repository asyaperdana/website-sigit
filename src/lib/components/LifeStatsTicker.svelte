<script>
	import { onMount } from 'svelte';

	let kwetiauCounter = $state(542);
	let matchLevel = $state(98);

	onMount(() => {
		const interval = setInterval(() => {
			kwetiauCounter += Math.floor(Math.random() * 2);
			if (Math.random() > 0.8)
				matchLevel = Math.min(100, Math.max(90, matchLevel + (Math.random() > 0.5 ? 1 : -1)));
		}, 3000);
		return () => clearInterval(interval);
	});
</script>

<div
	class="fixed bottom-0 left-0 w-full bg-[var(--bg)]/90 backdrop-blur-md text-[var(--text)] text-[10px] uppercase tracking-widest py-1.5 z-40 overflow-hidden border-t border-indigo-500/20"
>
	<div class="marquee whitespace-nowrap flex animate-marquee">
		{#each [0, 1, 2] as i (i)}
			<span class="mx-6 flex items-center gap-2">
				<span class="text-indigo-400">●</span>
				Status:
				<span class="text-green-400 font-bold">Setengah Kopling</span>
			</span>
			<span class="mx-6 flex items-center gap-2">
				<span class="text-indigo-400">●</span>
				Kwetiau Power:
				<span class="text-orange-400 font-bold">{kwetiauCounter} KG</span>
			</span>
			<span class="mx-6 flex items-center gap-2">
				<span class="text-indigo-400">●</span>
				Matcha Concentration:
				<span class="text-emerald-400 font-bold">{matchLevel}%</span>
			</span>
			<span class="mx-6 flex items-center gap-2">
				<span class="text-indigo-400">●</span>
				Logic Errors:
				<span class="text-red-400 font-bold">Planned</span>
			</span>
			<span class="mx-6 flex items-center gap-2">
				<span class="text-indigo-400">●</span>
				Ganteng Level:
				<span class="text-yellow-400 font-bold">Overflow</span>
			</span>
		{/each}
	</div>
</div>

<style>
	.animate-marquee {
		display: inline-flex;
		animation: marquee 30s linear infinite;
	}

	@keyframes marquee {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(-33.33%);
		}
	}
</style>
