# Actualización del Sistema de Permisos - AdminSidebar

## Cambios Realizados

### 1. Creación del archivo centralizado de permisos (`src/lib/permissions.ts`)

- **Centralización de configuración**: Todos los role IDs y permisos ahora están en un solo lugar
- **Funciones utilitarias**: Funciones reutilizables para verificar permisos
- **Mejora en mantenibilidad**: Fácil actualización de permisos sin tocar múltiples archivos

### 2. Refactorización del middleware (`src/middleware/index.ts`)

- **Eliminación de role IDs hard-coded**: Ahora usa la configuración centralizada
- **Uso de función centralizada**: Utiliza `hasPermission()` para verificar roles
- **Código más limpio**: Lógica de verificación más simple y legible

### 3. Actualización de AdminLayout (`src/layouts/AdminLayout.astro`)

- **Paso de datos**: Ahora pasa tanto `userRoleIds` como `userRoleNames` a la sidebar
- **Conversión de tipos**: Convierte los IDs a string para evitar problemas de tipos

### 4. Refactorización de AdminSidebar (`src/components/admin/adminSidebar/AdminSidebar.astro`)

- **Verificación de permisos por elemento**: Cada link se muestra/oculta según los permisos del usuario
- **Secciones condicionales**: Las secciones solo aparecen si tienen al menos un elemento visible
- **Mejor UX**: Los usuarios solo ven las opciones para las que tienen permisos

## Estructura de Permisos

### Roles definidos:
- `admin`: Acceso completo
- `dai_delegate`: Acceso amplio de gestión
- `dai_secretary`: Acceso de gestión básico
- `dai_communication_coord`: Acceso a comunicación y eventos
- `dai_free_member`: Acceso básico a locales
- `dai_subdelegate`: Acceso básico administrativo

### Permisos por sección:

#### Sección Locales:
- **Impresora, Préstamo, Taquillas**: `admin`, `dai_delegate`, `dai_secretary`, `dai_free_member`

#### Sección Gestión:
- **Usuarios, Roles**: `admin`, `dai_delegate`, `dai_secretary`
- **Eventos**: `admin`, `dai_delegate`, `dai_secretary`, `dai_communication_coord`

#### Sección Sistema:
- **Configuración**: `admin`, `dai_delegate`
- **Logs**: `admin`, `dai_delegate`

## Beneficios

1. **Seguridad mejorada**: Solo se muestran las opciones que el usuario puede usar
2. **Mantenibilidad**: Cambios de permisos centralizados
3. **Experiencia de usuario**: Interface más limpia y relevante
4. **Escalabilidad**: Fácil agregar nuevos roles o permisos
5. **Consistencia**: Misma lógica de permisos en toda la aplicación

## Uso futuro

Para agregar nuevas funcionalidades con permisos:

1. Agregar el permiso en `PERMISSIONS.SIDEBAR` en `permissions.ts`
2. Usar `canViewSidebarSection()` en el componente correspondiente
3. Los permisos de rutas se definen en `PERMISSIONS.ROUTES`
