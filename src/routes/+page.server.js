/** @type {import('./$types').PageServerLoad} */
export async function load() {
	// Return empty reviews - actual data will be loaded from localStorage client-side
	// This allows the static site to have persistent review storage without a backend
	return {
		reviews: []
	};
}
