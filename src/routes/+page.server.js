/** @type {import('./$types').PageServerLoad} */
export async function load() {
    // Hardcoded reviews for the static version since GitHub Pages has no database
    const reviews = [
        {
            id: 1,
            userName: "Budi Tabuti",
            rating: 5,
            comment: "Sigit emang gacor! Webnya kencang kayak pake turbo.",
            createdAt: new Date().toISOString()
        },
        {
            id: 2,
            userName: "Ani Matcha",
            rating: 4,
            comment: "Matcha level dewanya beneran kerasa di setiap baris kodenya.",
            createdAt: new Date().toISOString()
        }
    ];

    return {
        reviews
    };
}

