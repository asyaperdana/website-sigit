<script>
    import { onMount } from "svelte";
    import Lenis from "lenis";
    import Navbar from "$lib/components/Navbar.svelte";
    import Hero from "$lib/components/Hero.svelte";
    import About from "$lib/components/About.svelte";
    import Stats from "$lib/components/Stats.svelte";
    import Timeline from "$lib/components/Timeline.svelte";
    import Skills from "$lib/components/Skills.svelte";
    import Portfolio from "$lib/components/Portfolio.svelte";
    import PortfolioModal from "$lib/components/PortfolioModal.svelte";
    import ReviewSection from "$lib/components/ReviewSection.svelte";
    import FAQ from "$lib/components/FAQ.svelte";
    import Contact from "$lib/components/Contact.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import LifeStatsTicker from "$lib/components/LifeStatsTicker.svelte";
    import CustomCursor from "$lib/components/CustomCursor.svelte";
    import VanillaTilt from "vanilla-tilt";
    import { setupKonamiCode, createConfetti } from "$lib/utils/quirky.js";

    let { data } = $props();

    let isScrolled = $state(false);
    let showBackToTop = $state(false);
    let activeProject = $state(null);

    onMount(() => {
        // Initialize Lenis
        const lenis = new Lenis();

        /** @param {number} time */
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        const handleScroll = () => {
            const scrollY = window.scrollY;
            isScrolled = scrollY > 50;
            showBackToTop = scrollY > 300;
        };
        window.addEventListener("scroll", handleScroll);

        const observerOptions = {
            threshold: 0.05, // Lower threshold for better reliability
            rootMargin: "0px 0px -10px 0px",
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("reveal-active");
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Standard reveal elements
        document.querySelectorAll(".reveal").forEach((el) => {
            // Immediate reveal for elements already in viewport
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom >= 0) {
                el.classList.add("reveal-active");
            } else {
                observer.observe(el);
            }
        });

        // Initialize Tilt on desktop
        if (window.innerWidth > 1024) {
            const tiltElements = /** @type {HTMLElement[]} */ (
                Array.from(document.querySelectorAll(".glass, .portfolio-item"))
            );
            VanillaTilt.init(tiltElements, {
                max: 5,
                speed: 400,
                glare: true,
                "max-glare": 0.2,
                perspective: 1000,
                scale: 1.02,
            });
        }

        // Setup Konami Code Easter Egg 🎮
        const konamiCleanup = setupKonamiCode(() => {
            // Trigger epic easter egg!
            createConfetti(50, 50);

            const messages = [
                "🎮 Konami Code Unlocked!",
                "🌟 You're a legend!",
                "⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️BA",
                "🎊 Achievement Unlocked!",
            ];

            const randomMessage =
                messages[Math.floor(Math.random() * messages.length)];

            const toast = document.createElement("div");
            toast.textContent = randomMessage;
            toast.className =
                "fixed top-24 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full shadow-2xl z-[100] animate-bounce-in text-lg font-bold";
            document.body.appendChild(toast);

            // Add extra confetti bursts
            setTimeout(() => createConfetti(30, 50), 200);
            setTimeout(() => createConfetti(70, 50), 400);

            setTimeout(() => {
                toast.style.opacity = "0";
                toast.style.transition = "opacity 0.5s";
                setTimeout(() => toast.remove(), 500);
            }, 4000);
        });

        document.body.classList.add("page-loaded");

        return () => {
            window.removeEventListener("scroll", handleScroll);
            observer.disconnect();
            lenis.destroy();
            konamiCleanup();
        };
    });

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
</script>

<svelte:head>
    <title>Mengenal Sigit Setengah Kopling</title>
    <meta
        name="description"
        content="Portfolio Sigit Setengah Kopling - Programmer muda dari Jawa Selatan, suka matcha & kwetiau."
    />
    <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Poppins:wght@600;800&display=swap"
        rel="stylesheet"
    />
</svelte:head>

<div
    class="bg-[var(--bg)] text-[var(--text)] transition-colors duration-500 min-h-screen"
>
    <Navbar bind:isScrolled />

    <Hero />

    <main>
        <About />
        <Stats />
        <Timeline />
        <Skills />
        <Portfolio
            onOpenModal={(/** @type {any} */ p) => (activeProject = p)}
        />
        <ReviewSection {data} />
        <FAQ />
        <Contact />
    </main>

    <Footer />

    <PortfolioModal {activeProject} onClose={() => (activeProject = null)} />

    <!-- Back to Top -->
    <button
        onclick={scrollToTop}
        class="fixed bottom-16 right-8 w-12 h-12 bg-indigo-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 z-50 {showBackToTop
            ? 'translate-y-0 opacity-100'
            : 'translate-y-20 opacity-0'}"
        aria-label="Back to top"
    >
        <i class="fas fa-arrow-up"></i>
    </button>

    <LifeStatsTicker />
    <CustomCursor />
</div>
