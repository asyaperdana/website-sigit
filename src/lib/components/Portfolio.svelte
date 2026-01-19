<script>
    let { onOpenModal } = $props();

    const projects = [
        {
            title: "Website E-commerce",
            img: "/img/Gemini_Generated_Image_p0ehnwp0ehnwp0eh.png",
            desc: "Sebuah platform belanja online modern yang sangat kencang karena Sigit yang buat.",
        },
        {
            title: "Aplikasi Mobile",
            img: "/img/Gemini_Generated_Image_phrd5ephrd5ephrd.png",
            desc: "Aplikasi tracking kegantengan... eh maksudnya kegiatan harian.",
        },
        {
            title: "Dashboard Admin",
            img: "/img/Gemini_Generated_Image_obttxwobttxwobtt.png",
            desc: "Dashboard super canggih untuk memantau trafik kwetiau se-Indonesia.",
        },
    ];
</script>

<section id="portfolio" class="py-20 px-6 reveal">
    <div class="max-w-6xl mx-auto">
        <h2
            class="text-3xl font-bold mb-10 text-center tracking-tight text-[var(--text)]"
        >
            Portfolio
        </h2>
        <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {#each projects as project}
                <div
                    class="glass group cursor-pointer overflow-hidden portfolio-item reveal-child"
                    onclick={() => onOpenModal(project)}
                    role="button"
                    tabindex="0"
                    onkeydown={(e) => e.key === "Enter" && onOpenModal(project)}
                >
                    <div class="relative overflow-hidden aspect-video">
                        <img
                            src={project.img}
                            alt={project.title}
                            class="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                        />
                    </div>
                    <div class="p-6">
                        <h4
                            class="font-bold text-lg mb-2 text-[var(--text)] group-hover:text-indigo-500 transition-colors uppercase tracking-wider"
                        >
                            {project.title}
                        </h4>
                        <p
                            class="text-sm text-[var(--text)] opacity-50 line-clamp-2 font-light"
                        >
                            {project.title === "Website E-commerce"
                                ? "Modern shopping experience with ultra-fast kwetiau delivery logic."
                                : project.title === "Aplikasi Mobile"
                                  ? "Next-gen utility for tracking personal growth and matcha intake."
                                  : "Sophisticated analytical dashboard for real-time monitoring."}
                        </p>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>
