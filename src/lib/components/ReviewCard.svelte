<script>
    import StarRating from "./StarRating.svelte";

    let { review } = $props();

    let formattedDate = $derived(
        new Date(review.createdAt).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
        }),
    );

    let initial = $derived(review.userName.charAt(0).toUpperCase());
</script>

<div
    class="p-5 rounded-xl flex gap-4 bg-[var(--card-bg)] border border-[var(--glass-border)] transition-all duration-300 hover:border-indigo-500/30 group shadow-sm"
>
    <div class="shrink-0">
        <div
            class="w-12 h-12 rounded-full text-xl font-bold shadow-lg flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-500 text-white"
        >
            {initial}
        </div>
    </div>
    <div class="flex-1 min-w-0">
        <div class="flex justify-between items-start mb-1">
            <h4
                class="font-bold text-[var(--text)] text-lg truncate pr-2 group-hover:text-indigo-500 transition-colors"
            >
                {review.userName}
            </h4>
            <span
                class="text-xs text-indigo-500 bg-indigo-500/10 px-2 py-1 rounded-full whitespace-nowrap font-medium"
            >
                {formattedDate}
            </span>
        </div>

        <div class="mb-3">
            <StarRating rating={review.rating} readonly size="text-xs" />
        </div>

        <p
            class="text-[var(--text)] opacity-70 text-sm leading-relaxed border-l-2 border-indigo-500/30 pl-3 italic"
        >
            "{review.comment}"
        </p>
    </div>
</div>
