<script>
    import { enhance } from "$app/forms";
    import StarRating from "./StarRating.svelte";
    import ReviewCard from "./ReviewCard.svelte";

    let { data, form } = $props();

    // Local state to handle immediate updates
    let selectedRating = $state(0);
    let isSubmitting = $state(false);
    let showSuccess = $state(false);

    /** @type {any[]} */
    let localReviews = $derived(data.reviews);

    function handleSubmit() {
        isSubmitting = true;
        showSuccess = false;

        /** @param {{ result: import('@sveltejs/kit').ActionResult, update: (options?: { reset?: boolean }) => Promise<void> }} params */
        return async ({ result, update }) => {
            isSubmitting = false;
            if (result.type === "success") {
                showSuccess = true;
                selectedRating = 0; // Reset rating
                // Automatic success message reset after 5s
                setTimeout(() => {
                    showSuccess = false;
                }, 5000);
                // Call default update to reset form fields and invalidate data
                await update({ reset: true });
            }
        };
    }
</script>

<section id="reviews" class="max-w-6xl mx-auto px-6 py-24 reveal">
    <div class="text-center mb-16 space-y-4">
        <h2
            class="text-4xl md:text-5xl font-bold text-[var(--text)] tracking-tighter"
        >
            Apa Kata <span
                class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500"
                >Netizen?</span
            >
        </h2>
        <p class="text-[var(--text)] opacity-60 max-w-2xl mx-auto font-light">
            Tempat berkumpulnya para pengagum arsitektur kwetiau dan penikmat
            logika matcha.
        </p>
    </div>

    <div class="grid lg:grid-cols-12 gap-12 items-start">
        <!-- FORM COLUMN -->
        <div class="lg:col-span-5 space-y-8">
            <div
                class="glass p-8 border border-white/5 relative overflow-hidden group"
            >
                <!-- Decorative background -->
                <div
                    class="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all duration-700"
                ></div>

                <h3
                    class="text-2xl font-bold text-[var(--text)] mb-8 border-b border-indigo-500/20 pb-4"
                >
                    Tulis Review
                </h3>

                <form
                    method="POST"
                    use:enhance={handleSubmit}
                    class="space-y-6"
                >
                    {#if showSuccess}
                        <div
                            class="bg-indigo-500/10 border border-indigo-500/50 text-indigo-300 p-4 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4"
                        >
                            <i class="fas fa-check-circle text-indigo-400"></i>
                            <span class="text-sm font-medium"
                                >Review berhasil dikirim! Makasih ya! 🙏</span
                            >
                        </div>
                    {/if}

                    {#if form?.error}
                        <div
                            class="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl flex items-center gap-3"
                        >
                            <i class="fas fa-exclamation-circle"></i>
                            <span class="text-sm font-medium">{form.error}</span
                            >
                        </div>
                    {/if}

                    <div class="space-y-3">
                        <label
                            for="rating-input"
                            class="text-xs font-bold uppercase tracking-widest text-indigo-400"
                            >Rating Mu</label
                        >
                        <StarRating bind:rating={selectedRating} />
                        <input
                            type="hidden"
                            name="rating"
                            value={selectedRating}
                            required
                        />
                    </div>

                    <div class="space-y-3">
                        <label
                            for="userName"
                            class="text-xs font-bold uppercase tracking-widest text-indigo-400"
                            >Nama</label
                        >
                        <input
                            id="userName"
                            type="text"
                            name="userName"
                            placeholder="Sigit Setengah Kopling"
                            required
                            class="w-full bg-[var(--bg)]/10 border border-[var(--glass-border)] rounded-xl px-5 py-4 text-[var(--text)] focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all outline-none"
                        />
                    </div>

                    <div class="space-y-3">
                        <label
                            for="comment"
                            class="text-xs font-bold uppercase tracking-widest text-indigo-400"
                            >Kesan Pesan</label
                        >
                        <textarea
                            id="comment"
                            name="comment"
                            rows="4"
                            placeholder="Gimana kesan pesan kamu tentang Sigit?"
                            required
                            class="w-full bg-[var(--bg)]/10 border border-[var(--glass-border)] rounded-xl px-5 py-4 text-[var(--text)] focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all outline-none resize-none"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        class="w-full relative py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all duration-300 shadow-lg shadow-indigo-600/20 active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100"
                    >
                        {#if isSubmitting}
                            <i class="fas fa-circle-notch fa-spin mr-2"></i> Mengirim...
                        {:else}
                            <i class="fas fa-paper-plane mr-2"></i> Kirim Review
                        {/if}
                    </button>
                </form>
            </div>
        </div>

        <!-- LIST COLUMN -->
        <div class="lg:col-span-7 flex flex-col h-[700px]">
            <div class="flex items-center justify-between mb-8">
                <div class="flex items-center gap-4">
                    <div class="p-3 bg-indigo-500/10 rounded-xl">
                        <i class="fas fa-comments text-indigo-400"></i>
                    </div>
                    <span class="text-xl font-bold text-[var(--text)]"
                        >Review Terbaru</span
                    >
                </div>
                <div
                    class="px-4 py-2 bg-[var(--bg)]/5 rounded-full border border-[var(--glass-border)]"
                >
                    <span
                        class="text-xs font-mono text-indigo-500 uppercase tracking-widest"
                        >{localReviews.length} Total Reviews</span
                    >
                </div>
            </div>

            <div
                class="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar scroll-smooth"
            >
                {#if localReviews.length === 0}
                    <div
                        class="flex flex-col items-center justify-center h-full text-center text-gray-500 space-y-4 opacity-40"
                    >
                        <i class="fas fa-ghost text-6xl"></i>
                        <p class="text-lg font-light italic">
                            Belum ada yang komen nih... Jadilah yang pertama!
                        </p>
                    </div>
                {:else}
                    {#each localReviews as review (review.id)}
                        <ReviewCard {review} />
                    {/each}
                {/if}
            </div>
        </div>
    </div>
</section>

<style>
    /* Custom scrollbar for a cleaner look */
    .custom-scrollbar::-webkit-scrollbar {
        width: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
        background: transparent;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.05);
        border-radius: 10px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: rgba(129, 140, 248, 0.2);
    }
</style>
