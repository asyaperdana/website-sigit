<script>
	let { rating = $bindable(0), readonly = false, size = 'text-2xl' } = $props();
	let hoverRating = $state(0);

	const stars = [1, 2, 3, 4, 5];

	/**
	 * @param {KeyboardEvent} e
	 * @param {number} value
	 */
	function handleKeydown(e, value) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			rating = value;
		}
	}

	/** @param {number} value */
	const selectRating = (value) => !readonly && (rating = value);
	/** @param {number} value */
	const setHoverRating = (value) => !readonly && (hoverRating = value);
</script>

<div
	class="flex gap-2 {size} {readonly ? '' : 'cursor-pointer'} w-fit"
	onmouseleave={() => (hoverRating = 0)}
	role={readonly ? 'img' : 'slider'}
	aria-label={readonly ? `Rating: ${rating} out of 5 stars` : 'Rate your experience'}
	aria-valuenow={rating}
	aria-valuemin="1"
	aria-valuemax="5"
>
	{#each stars as star (star)}
		<button
			type="button"
			class="transition-all duration-200 bg-transparent border-none p-0 flex items-center justify-center {readonly
				? 'cursor-default'
				: 'hover:scale-110 focus:outline-none focus:text-indigo-400'}"
			onclick={() => selectRating(star)}
			onmouseenter={() => setHoverRating(star)}
			onkeydown={(e) => handleKeydown(e, star)}
			disabled={readonly}
			aria-label="{star} stars"
		>
			<i
				class="fas fa-star {star <= (hoverRating || rating)
					? 'text-yellow-400'
					: 'text-(--text) opacity-20'}"
			></i>
		</button>
	{/each}
</div>
