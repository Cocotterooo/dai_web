// @ts-check
import { defineConfig, envField, fontProviders } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";


import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
    output: 'server',
    vite: {
        plugins: [tailwindcss()],
    },

    env: {
        schema: {
            PUBLIC_SUPABASE_URL: envField.string({ context: 'server', access: 'public' }),
            PUBLIC_SUPABASE_ANON_KEY: envField.string({ context: 'server', access: 'public' }),
            SUPABASE_SERVICE_ROLE_KEY: envField.string({ context: 'server', access: 'secret' }),
            SUPABASE_PASSWORD: envField.string({ context: 'server', access: 'secret' }),
            GOOGLE_CLIENT_ID: envField.string({ context: 'server', access: 'public' }),
            GOOGLE_CLIENT_SECRET: envField.string({ context: 'server', access: 'secret' }),
            AUTH_SECRET: envField.string({ context: 'server', access: 'secret' }),
            AUTH_TRUST_HOST: envField.string({ context: 'server', access: 'public' }),
            AUTH_URL: envField.string({ context: 'server', access: 'public' }),
            NEXTAUTH_URL: envField.string({ context: 'server', access: 'public' }),
            DEV: envField.boolean({ default: false, context: 'server', access: 'public' }),
        }
    },
    adapter: vercel({}),
    experimental: {
    fonts: [
        {
            provider: fontProviders.google(),
            name: "Roboto",
            cssVariable: "--font-roboto",
        },
        ],
    },
});