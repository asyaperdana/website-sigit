<script>
    import { onMount } from "svelte";

    let mouseX = $state(0);
    let mouseY = $state(0);
    let ballX = $state(0);
    let ballY = $state(0);
    let isHovering = $state(false);
    let isClicking = $state(false);

    onMount(() => {
        /** @param {MouseEvent} e */
        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const animate = () => {
            // Smooth inertia
            ballX += (mouseX - ballX) * 0.15;
            ballY += (mouseY - ballY) * 0.15;
            requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);

        /** @param {MouseEvent} e */
        const handleMouseOver = (e) => {
            const target = /** @type {HTMLElement} */ (e.target);
            const isInteractive = target.closest(
                "button, a, .portfolio-item, .glass, [role='button'], .skill-card",
            );
            isHovering = !!isInteractive;
        };

        const handleMouseDown = () => (isClicking = true);
        const handleMouseUp = () => (isClicking = false);

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseover", handleMouseOver);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    });
</script>

<div
    class="custom-cursor fixed top-0 left-0 w-2 h-2 bg-indigo-500 rounded-full pointer-events-none z-[9999]"
    style="transform: translate3d({ballX - 4}px, {ballY -
        4}px, 0) scale({isClicking
        ? 0.8
        : isHovering
          ? 2
          : 1}); transition: scale 0.2s ease-out;"
></div>

<style>
    :global(body) {
        cursor: none;
    }

    :global(a, button, [role="button"]) {
        cursor: none !important;
    }

    @media (max-width: 1024px) {
        .custom-cursor {
            display: none;
        }
        :global(body, a, button, [role="button"]) {
            cursor: auto !important;
        }
    }
</style>
