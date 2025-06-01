// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
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