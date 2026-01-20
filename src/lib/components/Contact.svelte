<script>
    import { onMount } from "svelte";
    import { createMagneticEffect } from "$lib/utils/magnetic.js";
    import { fly, fade } from "svelte/transition";

    let magneticBtn = $state();
    let isSubmitting = $state(false);
    let formMessage = $state("");
    let showToast = $state(false);

    onMount(() => {
        const cleanup = createMagneticEffect(magneticBtn);
        return cleanup;
    });

    /**
     * @param {SubmitEvent} e
     */
    async function handleSubmit(e) {
        e.preventDefault();
        isSubmitting = true;

        const formData = new FormData(
            /** @type {HTMLFormElement} */ (e.target),
        );
        const data = {
            nama: formData.get("nama"),
            email: formData.get("email"),
            pesan: formData.get("pesan"),
        };

        // Simulate form submission (replace with actual API call)
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));

            formMessage = `Terima kasih ${data.nama}! Pesan kamu sudah diterima. 🚀`;
            showToast = true;

            // Reset form
            /** @type {HTMLFormElement} */ (e.target).reset();

            // Hide toast after 4 seconds
            setTimeout(() => {
                showToast = false;
            }, 4000);
        } catch (error) {
            formMessage = "Oops! Terjadi kesalahan. Coba lagi ya! 😅";
            showToast = true;
            setTimeout(() => {
                showToast = false;
            }, 4000);
        } finally {
            isSubmitting = false;
        }
    }
</script>

<section id="contact" class="max-w-4xl mx-auto px-6 py-12 reveal kontak">
    <div class="glass p-8">
        <h2 class="text-2xl font-bold mb-8 text-center text-[var(--text)]">
            Kontak Saya
        </h2>
        <form class="space-y-4" onsubmit={handleSubmit}>
            <input
                type="text"
                name="nama"
                placeholder="Nama"
                required
                class="w-full p-4 rounded-xl bg-[var(--bg)]/10 border border-[var(--glass-border)] text-[var(--text)] outline-none focus:border-indigo-500 transition-all"
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                required
                class="w-full p-4 rounded-xl bg-[var(--bg)]/10 border border-[var(--glass-border)] text-[var(--text)] outline-none focus:border-indigo-500 transition-all"
            />
            <textarea
                name="pesan"
                rows="4"
                placeholder="Pesan"
                required
                class="w-full p-4 rounded-xl bg-[var(--bg)]/10 border border-[var(--glass-border)] text-[var(--text)] outline-none focus:border-indigo-500 transition-all"
            ></textarea>
            <button
                type="submit"
                bind:this={magneticBtn}
                disabled={isSubmitting}
                class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg transition-transform duration-200 ease-out disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
            >
                {#if isSubmitting}
                    <span class="flex items-center justify-center gap-2">
                        <span
                            class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
                        ></span>
                        Mengirim...
                    </span>
                {:else}
                    Kirim Pesan
                {/if}
            </button>
        </form>
    </div>
</section>

<!-- Toast Notification -->
{#if showToast}
    <div
        class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-indigo-600 text-white rounded-full shadow-2xl backdrop-blur-xl"
        in:fly={{ y: 12, duration: 220 }}
        out:fly={{ y: 12, duration: 180 }}
        in:fade={{ duration: 160 }}
        out:fade={{ duration: 120 }}
    >
        {formMessage}
    </div>
{/if}
