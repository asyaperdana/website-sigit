<script>
	import StarRating from './StarRating.svelte';

	let { review } = $props();

	let formattedDate = $derived(
		new Date(review.createdAt).toLocaleDateString('id-ID', {
			day: 'numeric',
			month: 'short',
			year: 'numeric'
		})
	);

	let initial = $derived(review.userName.charAt(0).toUpperCase());
</script>

<div
	class="p-6 rounded-xl flex gap-4 bg-[var(--card-bg)] border border-[var(--glass-border)] transition-all duration-300 hover:border-indigo-500/40 hover:shadow-lg hover:shadow-indigo-500/5 hover:-translate-y-0.5 group"
>
	<div class="shrink-0">
		<div
			class="w-12 h-12 rounded-full text-xl font-bold shadow-lg flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-500 text-white group-hover:scale-110 transition-transform duration-300"
		>
			{initial}
		</div>
	</div>
	<div class="flex-1 min-w-0">
		<div class="flex justify-between items-start mb-2">
			<h4
				class="font-bold text-[var(--text)] text-base truncate pr-2 group-hover:text-indigo-400 transition-colors duration-300"
			>
				{review.userName}
			</h4>
			<span
				class="text-xs text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full whitespace-nowrap font-medium"
			>
				{formattedDate}
			</span>
		</div>

		<div class="mb-3">
			<StarRating rating={review.rating} readonly size="text-sm" />
		</div>

		<p
			class="text-[var(--text)] opacity-75 text-sm leading-relaxed border-l-2 border-indigo-500/30 pl-4 italic group-hover:opacity-90 transition-opacity duration-300"
		>
			"{review.comment}"
		</p>
	</div>
</div>
