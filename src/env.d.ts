/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    email?: string;
    user?: import('@supabase/supabase-js').User;
    accessToken?: string;
    refreshToken?: string;
    isAdmin?: boolean;
    adminLevel?: 'delegado' | 'secretario' | 'coordinador' | 'none';
    adminPositions?: string[];
    // Roles cacheados
    userRoles?: any[];
    userRoleIds?: number[];
    userRoleNames?: string[];
  }
}

interface ImportMetaEnv {
    readonly SUPABASE_URL: string;
    readonly SUPABASE_ANON_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}