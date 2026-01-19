<script>
    import { base } from "$app/paths";
    let profilePicEl = $state();
    let clickCount = $state(0);

    function handleEasterEgg() {
        clickCount++;
        profilePicEl.classList.remove("shake-anim", "spin-anim");
        void profilePicEl.offsetWidth; // trigger reflow

        if (clickCount >= 5) {
            profilePicEl.classList.add("spin-anim");
            alert("Woi pusing! Jangan dipencet-pencet! 😂");
            clickCount = 0;
        } else {
            profilePicEl.classList.add("shake-anim");
        }
    }
</script>

<section id="about" class="max-w-5xl mx-auto px-6 py-16 reveal">
    <div class="glass text-center p-8 md:p-12">
        <button
            onclick={handleEasterEgg}
            class="block mx-auto mb-6 focus:outline-none"
            aria-label="Sigit profile picture (has easter egg)"
        >
            <img
                bind:this={profilePicEl}
                src="{base}/img/roll-safe-profile.jpg"
                alt="Foto profil Sigit"
                class="w-40 h-40 rounded-full border-4 border-indigo-500 shadow-lg cursor-grab active:cursor-grabbing transition-transform"
            />
        </button>
        <h2 class="text-4xl font-extrabold mb-6">Seputar Sigit</h2>
        <p class="text-lg leading-relaxed mb-6">
            Calon Programmer dari PT. Jhawa Jyujyur, domisili Sigmarang, Jawa
            Selatan. Spesialis matcha level dewa, sekaligus <span
                class="font-bold">pendekar kwetiau</span
            > tanpa tanding.
        </p>
        <p class="italic text-[var(--text)] opacity-50">
            (berhati-hatilah para wanita)
        </p>
    </div>
</section>
