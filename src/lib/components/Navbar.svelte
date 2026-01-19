<script>
    import { onMount } from "svelte";
    import { base } from "$app/paths";

    let { isScrolled = $bindable(false) } = $props();
    let mobileMenuOpen = $state(false);
    let isDark = $state(true);
    let scrollProgress = $state(0);

    onMount(() => {
        const handleScroll = () => {
            const winScroll = window.scrollY;
            const height =
                document.documentElement.scrollHeight -
                document.documentElement.clientHeight;
            scrollProgress = height > 0 ? (winScroll / height) * 100 : 0;
        };
        window.addEventListener("scroll", handleScroll);

        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "light") {
            isDark = false;
            document.body.classList.add("light");
        }

        return () => window.removeEventListener("scroll", handleScroll);
    });

    function toggleTheme() {
        isDark = !isDark;
        document.body.classList.toggle("light");
        localStorage.setItem("theme", isDark ? "dark" : "light");
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
                <a
                    href="#about"
                    class="nav-link text-xs font-semibold uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
                    >About</a
                >
                <a
                    href="#skills"
                    class="nav-link text-xs font-semibold uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
                    >Skills</a
                >
                <a
                    href="#portfolio"
                    class="nav-link text-xs font-semibold uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
                    >Portfolio</a
                >
                <a
                    href="#reviews"
                    class="nav-link text-xs font-semibold uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
                    >Reviews</a
                >
                <a
                    href="#contact"
                    class="nav-link text-xs font-semibold uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
                    >Contact</a
                >
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
            class="md:hidden absolute top-full left-1/2 -translate-x-1/2 w-[90%] mt-4 bg-[var(--bg)] backdrop-blur-2xl rounded-3xl border border-[var(--glass-border)] p-8 flex flex-col space-y-6 shadow-3xl text-center animate-in fade-in zoom-in-95 duration-300"
        >
            <a
                href="#about"
                onclick={() => (mobileMenuOpen = false)}
                class="text-xl font-medium text-[var(--text)] hover:text-indigo-400"
                >About</a
            >
            <a
                href="#skills"
                onclick={() => (mobileMenuOpen = false)}
                class="text-xl font-medium text-[var(--text)] hover:text-indigo-400"
                >Skills</a
            >
            <a
                href="#portfolio"
                onclick={() => (mobileMenuOpen = false)}
                class="text-xl font-medium text-[var(--text)] hover:text-indigo-400"
                >Portfolio</a
            >
            <a
                href="#reviews"
                onclick={() => (mobileMenuOpen = false)}
                class="text-xl font-medium text-[var(--text)] hover:text-indigo-400"
                >Reviews</a
            >
            <a
                href="#contact"
                onclick={() => (mobileMenuOpen = false)}
                class="text-xl font-medium text-[var(--text)] hover:text-indigo-400"
                >Contact</a
            >
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
