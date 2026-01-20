<script>
    import { onMount } from "svelte";
    import { base } from "$app/paths";
    import { smoothScrollTo } from "$lib/utils/animations.js";
    import { fly } from "svelte/transition";

    let { isScrolled = $bindable(false) } = $props();
    let mobileMenuOpen = $state(false);
    let isDark = $state(true);
    let scrollProgress = $state(0);
    let activeSection = $state("#about");

    const navItems = [
        { label: "About", href: "#about" },
        { label: "Skills", href: "#skills" },
        { label: "Portfolio", href: "#portfolio" },
        { label: "Reviews", href: "#reviews" },
        { label: "Contact", href: "#contact" },
    ];

    onMount(() => {
        const handleScroll = () => {
            const winScroll = window.scrollY;
            const height =
                document.documentElement.scrollHeight -
                document.documentElement.clientHeight;
            scrollProgress = height > 0 ? (winScroll / height) * 100 : 0;
        };
        window.addEventListener("scroll", handleScroll, { passive: true });

        /** @type {IntersectionObserver | null} */
        let sectionObserver = null;
        const sectionEls = /** @type {Element[]} */ (
            navItems
                .map((item) => document.querySelector(item.href))
                .filter((el) => el !== null)
        );

        if (sectionEls.length > 0) {
            sectionObserver = new IntersectionObserver(
                (entries) => {
                    // Pick the most visible intersecting section.
                    const visible = entries
                        .filter((e) => e.isIntersecting)
                        .sort(
                            (a, b) =>
                                (b.intersectionRatio || 0) -
                                (a.intersectionRatio || 0),
                        );

                    const best = visible[0];
                    if (best?.target?.id) {
                        activeSection = `#${best.target.id}`;
                    }
                },
                {
                    root: null,
                    threshold: [0.2, 0.35, 0.5, 0.65, 0.8],
                    // Bias toward the center of the viewport
                    rootMargin: "-35% 0px -55% 0px",
                },
            );

            sectionEls.forEach((el) => sectionObserver?.observe(el));
        }

        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "light") {
            isDark = false;
            document.body.classList.add("light");
        }

        /** @param {KeyboardEvent} e */
        const handleKeydown = (e) => {
            if (e.key === "Escape") mobileMenuOpen = false;
        };
        window.addEventListener("keydown", handleKeydown);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("keydown", handleKeydown);
            sectionObserver?.disconnect();
        };
    });

    function toggleTheme() {
        isDark = !isDark;
        document.body.classList.toggle("light");
        localStorage.setItem("theme", isDark ? "dark" : "light");
    }

    /**
     * @param {MouseEvent} e
     * @param {string} target
     */
    function handleNavClick(e, target) {
        e.preventDefault();
        smoothScrollTo(target);
        mobileMenuOpen = false;
    }
</script>

<nav
    id="navbar"
    class="fixed top-0 w-full z-50 py-6 transition-all duration-500 {isScrolled
        ? 'py-4'
        : ''}"
>
    <!-- Centered Pill Wrapper -->
    <div class="max-w-fit mx-auto px-4">
        <div
            class="flex items-center gap-6 px-6 py-3 rounded-full border border-white/10 bg-[var(--nav-bg)] backdrop-blur-xl shadow-2xl transition-all duration-500 {isScrolled
                ? 'scale-95 border-indigo-500/20'
                : ''}"
        >
            <!-- Logo -->
            <a
                href={base || "/"}
                class="text-xl font-bold tracking-tight text-[var(--text)] hover:text-indigo-400 transition-colors shrink-0"
            >
                Sigit<span class="text-indigo-500">.</span>
            </a>

            <!-- Divider -->
            <div class="w-px h-4 bg-white/10 hidden md:block"></div>

            <!-- Desktop Menu -->
            <div class="hidden md:flex items-center gap-6">
                {#each navItems as item}
                    <a
                        href={item.href}
                        onclick={(e) => handleNavClick(e, item.href)}
                        aria-current={activeSection === item.href
                            ? "page"
                            : undefined}
                        class="nav-link text-xs font-semibold uppercase tracking-widest transition-colors {activeSection ===
                        item.href
                            ? 'text-white'
                            : 'text-gray-400 hover:text-white'}"
                        >{item.label}</a
                    >
                {/each}
            </div>

            <!-- Action Divider -->
            <div class="w-px h-4 bg-white/10 hidden md:block"></div>

            <!-- Right Actions -->
            <div class="flex items-center gap-4">
                <button
                    onclick={toggleTheme}
                    class="text-yellow-400 hover:scale-110 active:scale-90 transition-all text-sm"
                    aria-label="Toggle theme"
                >
                    <i class="fas {isDark ? 'fa-moon' : 'fa-sun'}"></i>
                </button>

                <!-- Mobile Trigger -->
                <button
                    onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
                    class="md:hidden text-[var(--text)] focus:outline-none"
                    aria-label="Toggle mobile menu"
                >
                    <i
                        class="fas {mobileMenuOpen
                            ? 'fa-times'
                            : 'fa-bars text-sm'}"
                    ></i>
                </button>
            </div>
        </div>
    </div>

    <!-- Mobile Menu Overlay -->
    {#if mobileMenuOpen}
        <div
            class="md:hidden absolute top-full left-1/2 -translate-x-1/2 w-[90%] mt-4 bg-[var(--bg)]/95 backdrop-blur-2xl rounded-3xl border border-[var(--glass-border)] p-8 flex flex-col space-y-6 shadow-2xl text-center"
            in:fly={{ y: -6, duration: 200, opacity: 0 }}
            out:fly={{ y: -6, duration: 150, opacity: 0 }}
        >
            {#each navItems as item}
                <a
                    href={item.href}
                    onclick={(e) => handleNavClick(e, item.href)}
                    aria-current={activeSection === item.href
                        ? "page"
                        : undefined}
                    class="text-xl font-medium transition-all {activeSection ===
                    item.href
                        ? 'text-indigo-400'
                        : 'text-[var(--text)] hover:text-indigo-400'}"
                    >{item.label}</a
                >
            {/each}
        </div>
    {/if}

    <!-- Progress Bar Integrated -->
    <div
        class="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] bg-indigo-500/50 blur-[1px] transition-all duration-300 pointer-events-none"
        style="width: {Math.min(scrollProgress, 100)}%"
    ></div>
</nav>

<style>
    /* Local Styles */
</style>
