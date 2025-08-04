# Estructura de Componentes

Esta es la organización de componentes del proyecto DAI Web:

## 📁 Estructura de Carpetas

```
src/components/
├── auth/                    # Componentes de autenticación
│   ├── AuthTabs.astro      # Pestañas de login/registro
│   ├── LoginForm.astro     # Formulario de inicio de sesión
│   └── RegisterForm.astro  # Formulario de registro
│
├── common/                  # Componentes comunes/reutilizables
│   ├── animated-background.tsx  # Fondo animado
│   └── DAILogo.astro       # Logo de la DAI reutilizable
│
├── layout/                  # Componentes de layout/estructura
│   └── BlueMistBackground.astro # Fondo azul con niebla
│
├── home/                    # Componentes de la página principal
│   ├── DiscordCard.astro   # Tarjeta de Discord
│   └── InstagramCard.astro # Tarjeta de Instagram
│
├── pages/                   # Componentes específicos por página
│   └── (estructura para futuras páginas)
│
└── ui/                     # Componentes de interfaz genéricos
    ├── Button.astro        # Botón reutilizable
    └── Input.astro         # Input reutilizable
```

## 📝 Convenciones de Nombres

- **PascalCase** para nombres de componentes: `LoginForm.astro`
- **camelCase** para props y variables: `isActive`
- **kebab-case** para nombres de carpetas: `auth/`, `pages/home/`

## 🔧 Importaciones

Usa siempre rutas absolutas con el alias `@/`:

```astro
// ✅ Correcto
import LoginForm from "@/components/auth/LoginForm.astro";

// ❌ Incorrecto
import LoginForm from "../components/auth/LoginForm.astro";
```

## 📚 Categorías de Componentes

### Auth (`/auth/`)
Componentes relacionados con autenticación, login, registro, etc.

### Common (`/common/`)
Componentes que se reutilizan en múltiples páginas/secciones.

### Layout (`/layout/`)
Componentes estructurales como fondos, wrappers, contenedores.

### Pages (`/pages/`)
Componentes específicos organizados por página donde se usan.

### UI (`/ui/`)
Componentes básicos de interfaz como botones, inputs, modales, etc.
