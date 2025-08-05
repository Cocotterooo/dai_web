// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel/serverless';

// Removido auth-astro - usando solo Supabase Auth

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [react()], // Solo React, sin auth-astro
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ['@supabase/supabase-js'], // Asegurar que Supabase funcione en SSR
    },
  },
  experimental: {
    fonts: [{
        provider: fontProviders.google(),
        name: "Roboto",
        cssVariable: "--font-roboto",
    }],
},
});