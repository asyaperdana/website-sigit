<script>
    import { onMount } from "svelte";

    let magneticBtn = $state();

    onMount(() => {
        const btn = magneticBtn;
        if (!btn || window.innerWidth < 1024) return;

        /** @param {MouseEvent} e */
        const handleMouseMove = (e) => {
            const rect = btn.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const deltaX = e.clientX - centerX;
            const deltaY = e.clientY - centerY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            if (distance < 100) {
                const strength = 0.3;
                const x = deltaX * strength;
                const y = deltaY * strength;
                btn.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            } else {
                btn.style.transform = `translate3d(0, 0, 0)`;
            }
        };

        const handleMouseLeave = () => {
            btn.style.transform = `translate3d(0, 0, 0)`;
        };

        window.addEventListener("mousemove", handleMouseMove);
        btn.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            btn.removeEventListener("mouseleave", handleMouseLeave);
        };
    });
</script>

<section id="contact" class="max-w-4xl mx-auto px-6 py-12 reveal kontak">
    <div class="glass p-8">
        <h2 class="text-2xl font-bold mb-8 text-center text-[var(--text)]">
            Kontak Saya
        </h2>
        <form class="space-y-4">
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
                class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg transition-transform duration-200 ease-out"
            >
                Kirim Pesan
            </button>
        </form>
    </div>
</section>
