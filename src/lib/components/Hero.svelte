<script>
    import { base } from "$app/paths";
    /** @param {MouseEvent} e */
    function handleRipple(e) {
        const btn = /** @type {HTMLElement} */ (e.currentTarget);
        if (!btn) return;
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const ripple = document.createElement("span");
        ripple.className = "ripple";
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 400);
    }

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
                onclick={handleRipple}
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
