import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const notebooks = defineCollection({
	loader: glob({ pattern: '**/*.json', base: './src/content/notebooks' }),
	schema: z.object({
		id: z.string(),
		title: z.string(),
		specs: z.string(),
		image: z.string(),
		whatsappMessage: z.string(),
		order: z.number(),
	}),
});

const benefits = defineCollection({
	loader: glob({ pattern: '**/*.json', base: './src/content/benefits' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		order: z.number(),
	}),
});

const aboutFeatures = defineCollection({
	loader: glob({ pattern: '**/*.json', base: './src/content/aboutFeatures' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		order: z.number(),
	}),
});

const testimonials = defineCollection({
	loader: glob({ pattern: '**/*.json', base: './src/content/testimonials' }),
	schema: z.object({
		name: z.string(),
		text: z.string(),
		order: z.number(),
	}),
});

const faq = defineCollection({
	loader: glob({ pattern: '**/*.json', base: './src/content/faq' }),
	schema: z.object({
		question: z.string(),
		answer: z.string(),
		order: z.number(),
	}),
});

const brands = defineCollection({
	loader: glob({ pattern: '**/*.json', base: './src/content/brands' }),
	schema: z.object({
		slug: z.string(),
		name: z.string(),
		hasStock: z.boolean(),
		intro: z.string(),
		knownLines: z.array(z.string()),
		idealFor: z.string(),
	}),
});

const blog = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		tags: z.array(z.string()).optional(),
	}),
});

export const collections = {
	notebooks,
	benefits,
	aboutFeatures,
	testimonials,
	faq,
	brands,
	blog,
};
