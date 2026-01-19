import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    const reviews = await prisma.userReview.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });

    return {
        reviews
    };
}

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const userName = data.get('userName')?.toString();
        const ratingStr = data.get('rating')?.toString();
        const rating = ratingStr ? parseInt(ratingStr) : 0;
        const comment = data.get('comment')?.toString();

        if (!userName || !rating || !comment) {
            return { success: false, error: 'All fields are required' };
        }

        if (rating < 1 || rating > 5) {
            return { success: false, error: 'Rating must be between 1 and 5' };
        }

        await prisma.userReview.create({
            data: {
                userName: userName.toString(),
                rating,
                comment: comment.toString()
            }
        });

        return { success: true };
    }
};
