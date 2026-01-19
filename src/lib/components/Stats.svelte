<script>
    import { onMount } from "svelte";

    let statsSection = $state();

    onMount(() => {
        const counterObserver = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    initCounters();
                    counterObserver.disconnect();
                }
            },
            { threshold: 0.5 },
        );
        if (statsSection) counterObserver.observe(statsSection);
    });

    function initCounters() {
        if (!statsSection) return;
        const counters = statsSection.querySelectorAll(".counter");
        counters.forEach((/** @type {any} */ counter) => {
            if (!counter) return;
            const target = +counter.getAttribute("data-target");
            const duration = 2000;
            const startTime = performance.now();

            const update = (/** @type {number} */ currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const ease =
                    progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

                counter.innerText = Math.floor(ease * target).toString();

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    counter.innerText = target.toString();
                }
            };
            requestAnimationFrame(update);
        });
    }
</script>

<section bind:this={statsSection} class="py-24 px-6 reveal">
    <div class="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {#each [{ label: "Projects Completed", target: "150", suffix: "+" }, { label: "Client Satisfied", target: "99", suffix: "%" }, { label: "Matcha Dosage", target: "2500", suffix: "" }, { label: "Years Surviving", target: "12", suffix: "" }] as stat}
            <div
                class="glass p-8 text-center group transition-all duration-500 hover:bg-[var(--bg)]/10"
            >
                <div
                    class="text-4xl md:text-5xl font-bold text-[var(--text)] tracking-tighter mb-2 flex items-center justify-center gap-1"
                >
                    <span
                        class="counter text-indigo-500"
                        data-target={stat.target}>0</span
                    >
                    <span class="text-xl text-indigo-600/30 opacity-50"
                        >{stat.suffix}</span
                    >
                </div>
                <p
                    class="text-[var(--text)] opacity-40 text-xs font-bold uppercase tracking-[0.2em]"
                >
                    {stat.label}
                </p>
            </div>
        {/each}
    </div>
</section>
