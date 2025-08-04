// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import node from '@astrojs/node';

// Removido auth-astro - usando solo Supabase Auth

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [react()], // Solo React, sin auth-astro
  vite: {
    plugins: [tailwindcss()],
  },
  experimental: {
    fonts: [{
        provider: fontProviders.google(),
        name: "Roboto",
        cssVariable: "--font-roboto",
    }],
},
});