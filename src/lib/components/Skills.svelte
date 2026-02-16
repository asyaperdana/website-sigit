<script>
	import { getRandomTooltip } from '$lib/utils/quirky.js';

	const skills = [
		{ icon: 'fab fa-html5', color: 'text-orange-500', name: 'HTML5' },
		{ icon: 'fab fa-css3-alt', color: 'text-blue-500', name: 'CSS3' },
		{ icon: 'fab fa-js', color: 'text-yellow-500', name: 'JavaScript' },
		{ icon: 'fas fa-wind', color: 'text-cyan-400', name: 'Tailwind' },
		{ icon: 'fab fa-react', color: 'text-blue-400', name: 'React' },
		{ icon: 'fab fa-git-alt', color: 'text-red-500', name: 'Git' }
	];

	/** @type {Record<string, string>} */
	let tooltips = $state({});

	/** @param {string} skillName */
	function handleMouseEnter(skillName) {
		tooltips[skillName] = getRandomTooltip(skillName);
	}

	/** @param {string} skillName */
	function handleMouseLeave(skillName) {
		tooltips[skillName] = '';
	}
</script>

<section id="skills" class="max-w-4xl mx-auto px-6 py-12 reveal">
	<h2 class="text-2xl font-bold mb-8 text-center text-(--text)">Tech Stack / Senjata 🛠️</h2>
	<div class="grid grid-cols-3 md:grid-cols-6 gap-6 text-center">
		{#each skills as skill (skill.name)}
			<div
				class="glass p-4 skill-card transition-all duration-300 hover:-translate-y-2 hover:scale-110 reveal-child relative group cursor-pointer"
				onmouseenter={() => handleMouseEnter(skill.name)}
				onmouseleave={() => handleMouseLeave(skill.name)}
				role="button"
				tabindex="0"
			>
				<i
					class="{skill.icon} text-4xl {skill.color} mb-2 transition-transform group-hover:scale-125"
				></i>
				<p class="font-bold text-(--text) text-sm">{skill.name}</p>

				{#if tooltips[skill.name]}
					<div
						class="absolute -top-16 left-1/2 -translate-x-1/2 bg-(--bg) border border-indigo-500/50 text-(--text) text-xs px-3 py-2 rounded-lg shadow-xl whitespace-nowrap z-50 animate-bounce-in"
					>
						{tooltips[skill.name]}
						<div
							class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-(--bg) border-r border-b border-indigo-500/50 rotate-45"
						></div>
					</div>
				{/if}
			</div>
		{/each}
	</div>
</section>
