/**
 * Script de prueba para la API add-role
 * Ejecutar desde la consola del navegador cuando estés en la página de admin
 */

async function testAddRoleAPI() {
    // Datos de prueba - CAMBIAR ESTOS VALORES SEGÚN TU CASO
    const testData = {
        userId: 'REPLACE_WITH_REAL_USER_ID', // ID del usuario al que quieres añadir un rol
        roleId: 'REPLACE_WITH_REAL_ROLE_ID', // ID del rol que quieres añadir
        groupId: null // Opcional: ID del grupo si es necesario
    };

    console.log('🧪 Iniciando prueba de API add-role...');
    console.log('📋 Datos de prueba:', testData);

    try {
        const response = await fetch('/api/admin/users/add-role', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testData),
        });

        const result = await response.json();

        console.log('📊 Respuesta del servidor:');
        console.log('  Status:', response.status);
        console.log('  Headers:', Object.fromEntries(response.headers.entries()));
        console.log('  Body:', result);

        if (response.ok) {
            console.log('✅ ÉXITO: Rol añadido correctamente');
            console.log('  Mensaje:', result.message);
            console.log('  Datos:', result.data);
        } else {
            console.log('❌ ERROR:', result.error);
            if (result.details) {
                console.log('  Detalles:', result.details);
            }
        }

        return { success: response.ok, result };

    } catch (error) {
        console.error('💥 Error de conexión:', error);
        return { success: false, error };
    }
}

// Función de ayuda para obtener IDs disponibles
async function getAvailableData() {
    try {
        console.log('📋 Obteniendo roles disponibles...');
        const rolesResponse = await fetch('/api/admin/roles');
        const rolesResult = await rolesResponse.json();
        
        console.log('🎭 Roles disponibles:');
        console.log('📊 Respuesta completa:', rolesResult);
        
        if (rolesResult.success && rolesResult.roles) {
            rolesResult.roles.forEach(role => {
                console.log(`  - ${role.name} (ID: ${role.id}, Tipo: ${typeof role.id})`);
            });
        }

        // Intentar obtener algunos usuarios (si tienes acceso)
        console.log('👥 Para obtener IDs de usuarios, revisa la página de administración de usuarios');
        
        return rolesResult;
    } catch (error) {
        console.error('Error obteniendo datos:', error);
    }
}

// Función para probar con datos reales obtenidos dinámicamente
async function quickTest() {
    try {
        console.log('🚀 Realizando prueba rápida...');
        
        // Obtener roles disponibles
        const rolesData = await getAvailableData();
        
        if (!rolesData?.success || !rolesData.roles?.length) {
            console.error('❌ No se pudieron obtener roles');
            return;
        }
        
        // Usar el primer rol disponible
        const firstRole = rolesData.roles[0];
        console.log('🎯 Usando rol de prueba:', firstRole);
        
        // NOTA: Necesitas cambiar este USER_ID por uno real
        const testUserId = 'REPLACE_WITH_REAL_USER_ID';
        
        if (testUserId === 'REPLACE_WITH_REAL_USER_ID') {
            console.log('⚠️ Necesitas especificar un userId real para la prueba');
            console.log('💡 Puedes obtener uno de la página de administración de usuarios');
            return;
        }
        
        const testData = {
            userId: testUserId,
            roleId: firstRole.id,
            groupId: null
        };
        
        console.log('📋 Datos de prueba:', testData);
        
        const response = await fetch('/api/admin/users/add-role', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testData),
        });

        const result = await response.json();
        console.log('📊 Resultado:', { status: response.status, result });
        
        return { success: response.ok, result };
        
    } catch (error) {
        console.error('💥 Error en prueba rápida:', error);
    }
}

// Instrucciones
console.log(`
🔧 INSTRUCCIONES DE DEBUGGING:

1. Ejecutar getAvailableData() para ver roles disponibles y sus tipos
2. Ejecutar quickTest() para una prueba rápida (necesitas un userId real)
3. Ejecutar testAddRoleAPI() para pruebas personalizadas

Pasos para debugging:
> await getAvailableData()  // Ver qué tipos de datos devuelve la API
> await quickTest()         // Prueba rápida con primer rol disponible
> // Revisar logs en consola y en Network tab
`);

// Función adicional para debugging del cliente
window.debugRoleForm = function() {
    const serverIsland = document.getElementById('users-server-island');
    if (!serverIsland) {
        console.error('❌ No se encontró users-server-island');
        return;
    }
    
    console.log('🏝️ Datos del Server Island:');
    console.log('  - roleNames:', JSON.parse(serverIsland.dataset.roleNames || '[]'));
    console.log('  - roleIds:', JSON.parse(serverIsland.dataset.roleIds || '[]'));
    console.log('  - users count:', JSON.parse(serverIsland.dataset.users || '[]').length);
};

// Exportar funciones globalmente para uso en consola
window.testAddRoleAPI = testAddRoleAPI;
window.getAvailableData = getAvailableData;
window.quickTest = quickTest;
