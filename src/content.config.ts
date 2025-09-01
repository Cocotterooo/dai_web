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

export const collections = {
    services_page: servicesPage,
    // aquí agregas más colecciones si tienes más carpetas
};
