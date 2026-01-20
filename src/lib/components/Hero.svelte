<script>
    import { base } from "$app/paths";
    import { onMount } from "svelte";
    import { createRipple, smoothScrollTo } from "$lib/utils/animations.js";
    import { createMagneticEffect } from "$lib/utils/magnetic.js";

    let magneticBtn = $state();

    onMount(() => {
        const cleanup = createMagneticEffect(magneticBtn);
        return cleanup;
    });

    /** @param {MouseEvent} e */
    function handleStartExploring(e) {
        createRipple(e);
        smoothScrollTo("#about");
    }
</script>

<header
    class="relative min-h-screen pt-32 pb-40 flex items-center justify-center text-center overflow-hidden"
    id="hero"
>
    <!-- Background Layer -->
    <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 bg-[var(--bg)]"></div>
        <img
            src="{base}/img/africanguy.jpg"
            alt=""
            class="w-full h-full object-cover opacity-10 grayscale brightness-75"
        />
        <!-- Elegant Gradient Overlay -->
        <div
            class="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--bg)]/50 to-[var(--bg)]"
        ></div>
    </div>

    <div
        class="absolute inset-0 overflow-hidden pointer-events-none opacity-10"
    >
        <div
            class="absolute -top-[15%] -left-[10%] w-[50vw] h-[50vw] bg-indigo-500/5 rounded-full blur-[140px]"
        ></div>
        <div
            class="absolute -bottom-[15%] -right-[10%] w-[50vw] h-[50vw] bg-purple-500/5 rounded-full blur-[140px]"
        ></div>
    </div>

    <div class="relative z-10 px-6 max-w-5xl">
        <div
            class="inline-flex items-center gap-3 mb-8 px-5 py-2 rounded-full bg-[var(--bg)]/5 border border-[var(--glass-border)] backdrop-blur-xl reveal"
            style="transition-delay: 0.1s"
        >
            <span class="relative flex h-2 w-2">
                <span
                    class="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"
                ></span>
                <span
                    class="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"
                ></span>
            </span>
            <span
                class="text-xs tracking-[0.3em] font-medium text-indigo-500/80 uppercase"
                >Architecting Digital Simplicity</span
            >
        </div>

        <h1
            class="text-6xl md:text-[clamp(4rem,10vw,9rem)] font-bold mb-8 tracking-tighter text-[var(--text)] leading-[0.85] reveal"
            style="transition-delay: 0.2s"
        >
            Sigit Setengah <br /><span
                class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500"
                >Kopling</span
            >
        </h1>

        <p
            class="text-xl md:text-2xl text-[var(--text)]/60 mb-12 max-w-3xl mx-auto font-light leading-relaxed reveal"
            style="transition-delay: 0.3s"
        >
            Blending <span class="text-[var(--text)] font-normal"
                >artistic vision</span
            >
            with
            <span class="text-[var(--text)] font-normal"
                >technical precision</span
            > to build the web of tomorrow.
        </p>

        <div
            class="flex flex-wrap items-center justify-center gap-6 reveal"
            style="transition-delay: 0.4s"
        >
            <button
                bind:this={magneticBtn}
                onclick={handleStartExploring}
                class="group relative px-10 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl shadow-indigo-500/20"
            >
                Start Exploring
            </button>
            <a
                href="#contact"
                class="group flex items-center gap-3 px-8 py-4 text-[var(--text)]/60 hover:text-[var(--text)] transition-all duration-300 border border-[var(--text)]/10 hover:border-indigo-500/30 rounded-full"
            >
                Get In Touch
            </a>
        </div>
    </div>

    <!-- Scroll Indicator -->
    <div
        class="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-40 hover:opacity-100 transition-all duration-700 hidden lg:flex"
    >
        <span
            class="text-[9px] tracking-[0.5em] uppercase font-bold text-white/50"
            >Scroll</span
        >
        <div
            class="w-px h-10 bg-gradient-to-b from-indigo-500 to-transparent"
        ></div>
    </div>
</header>
