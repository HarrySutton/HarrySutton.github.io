import { defineCollection, z } from 'astro:content';

// const blog = defineCollection({
// 	type: 'content',
// 	schema: z.object({
// 		title: z.string(),
// 		description: z.string(),
// 		pubDate: z.coerce.date(),
// 		thumbnail: z.string().optional(),
// 		category: z.string(),
// 		tags: z.string().array(),
// 		seoKeywords: z.string().array(),
// 		seoDescription: z.string(),
// 		draft: z.boolean().optional().default(false)
// 	}),
// });

// const work = defineCollection({
// 	type: 'content',
// 	schema: z.object({
// 		title: z.string(),
// 		description: z.string(),
// 		thumbnail: z.string().optional(),
// 		tags: z.string().array(),
// 		seoKeywords: z.string().array(),
// 		seoDescription: z.string(),
// 		draft: z.boolean().optional().default(false)
// 	}),
// });


// export const collections = { blog, work };
