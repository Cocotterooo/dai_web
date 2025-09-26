import { defineCollection, z } from "astro:content";
// z -> zod schema (es una biblioteca para validar y analizar datos)

const servicesPage = defineCollection({
    schema: z.object({
        title: z.string(),
        description: z.string(),
        image: z.string().url().optional(),
        imageClass: z.string().optional(),
        icon: z.string().optional(),
        published: z.boolean().default(false),
        priority: z.number()
    }),
});

const serviceConditions = defineCollection({
    schema: z.object({
        title: z.string(),
        description: z.string(),
        published: z.boolean().default(false),
    }),
});

const aboutUs = defineCollection({
    schema: z.object({
        title: z.string(),
        description: z.string(),
        published: z.boolean().default(false),
    }),
});

export const collections = {
    services_page: servicesPage,
    service_conditions: serviceConditions,
    about_us: aboutUs,
    // aquí agregas más colecciones si tienes más carpetas
};
