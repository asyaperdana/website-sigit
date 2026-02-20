<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	/**
	 * @param {Event} e
	 */
	function handleFAQClick(e) {
		const target = e.currentTarget;
		if (target instanceof HTMLElement) {
			target.classList.add('jiggle');
			setTimeout(() => target.classList.remove('jiggle'), 600);
		}
	}
</script>

<section id="faq" class="max-w-3xl mx-auto px-6 py-12 faq reveal" use:reveal>
	<h2 class="text-2xl font-bold mb-8 text-center text-[var(--text)]">
		FAQ (Pertanyaan Netizen) 🤔
	</h2>
	<div class="space-y-4">
		<div
			class="glass p-1 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
			onclick={handleFAQClick}
			onkeydown={(e) => e.key === 'Enter' && handleFAQClick(e)}
			role="button"
			tabindex="0"
		>
			<details class="group">
				<summary
					class="flex justify-between items-center font-bold p-4 list-none outline-none text-[var(--text)]"
				>
					<span>Bang, bisa benerin printer?</span>
					<span class="transition-transform group-open:rotate-180">
						<i class="fas fa-chevron-down text-indigo-500"></i>
					</span>
				</summary>
				<div
					class="text-[var(--text)] opacity-60 p-4 pt-0 border-t border-[var(--glass-border)] mt-2 text-sm"
				>
					Maaf, saya programmer, bukan teknisi komputer keliling. Tolong bedakan ya, printer itu
					hardware, saya taunya software (dan kadang juga gak tau).
				</div>
			</details>
		</div>
		<div
			class="glass p-1 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
			onclick={handleFAQClick}
			onkeydown={(e) => e.key === 'Enter' && handleFAQClick(e)}
			role="button"
			tabindex="0"
		>
			<details class="group">
				<summary
					class="flex justify-between items-center font-bold p-4 list-none outline-none text-[var(--text)]"
				>
					<span>Harga teman dong bang?</span>
					<span class="transition-transform group-open:rotate-180">
						<i class="fas fa-chevron-down text-indigo-500"></i>
					</span>
				</summary>
				<div
					class="text-[var(--text)] opacity-60 p-4 pt-0 border-t border-[var(--glass-border)] mt-2 text-sm"
				>
					Teman sih teman, tapi server bayarnya pake duit, bukan pake "makasih ya bro". Kecuali
					kalau bayarnya pake Kwetiau goreng spesial, bisa dibicarakan.
				</div>
			</details>
		</div>
		<div
			class="glass p-1 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
			onclick={handleFAQClick}
			onkeydown={(e) => e.key === 'Enter' && handleFAQClick(e)}
			role="button"
			tabindex="0"
		>
			<details class="group">
				<summary
					class="flex justify-between items-center font-bold p-4 list-none outline-none text-[var(--text)]"
				>
					<span>Kapan nikah bang?</span>
					<span class="transition-transform group-open:rotate-180">
						<i class="fas fa-chevron-down text-indigo-500"></i>
					</span>
				</summary>
				<div
					class="text-[var(--text)] opacity-60 p-4 pt-0 border-t border-[var(--glass-border)] mt-2 text-sm"
				>
					<span class="text-red-500 font-mono">Error 404: Jodoh Not Found.</span><br />
					Sedang dalam proses debugging. Mohon bersabar, ini ujian.
				</div>
			</details>
		</div>
	</div>
</section>
