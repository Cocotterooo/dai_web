// Función para renderizar una fila de usuario
// Se usa tanto en el servidor (Astro) como en el cliente (JavaScript)

export function renderUserRowHTML(user) {
    const userName = user.full_name || 
                   user.name || 
                   user.email?.split('@')[0] || 
                   'Sin nombre';

    const initial = userName.charAt(0).toUpperCase();

    const renderAvatar = (user) => {
        if (user.avatar_url) {
            return `
                <img 
                    src="${user.avatar_url}" 
                    alt="Avatar de ${userName}"
                    class="w-15 h-15 rounded-full object-cover border-2 border-dai/20"
                    onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                />
                <div class="w-15 h-15 bg-dai/20 rounded-full flex items-center justify-center" style="display: none;">
                    <span class="text-dai font-semibold text-lg">
                        ${initial}
                    </span>
                </div>
            `;
        } else {
            return `
                <div class="w-15 h-15 bg-dai/20 rounded-full flex items-center justify-center">
                    <span class="text-dai font-semibold text-lg">
                        ${initial}
                    </span>
                </div>
            `;
        }
    };

    return `
        <div class="bg-white/5 border border-white/20 rounded-lg p-4">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4 flex-1">
                    <div class="relative">
                        ${renderAvatar(user)}
                    </div>
                    <div class="flex-1">
                        <div class="flex items-start justify-between">
                            <div>
                                <h4 class="text-white font-medium">${userName}</h4>
                                <p class="text-white/60 text-sm">${user.email || 'Sin email'}</p>
                                ${user.group_id ? 
                                    `<p class="text-white/40 text-xs">Grupo: ${user.group_id}</p>` : ''
                                }
                            </div>
                            <div class="text-right text-white/40 text-xs space-y-1 ml-4">
                                ${user.dni ? 
                                    `<p>DNI/NIU: ${user.dni}</p>` : ''
                                }
                                ${user.phone ? 
                                    `<p>Tel: ${user.phone}</p>` : ''
                                }
                            </div>
                        </div>
                        <div class="flex items-center space-x-2 mt-2 flex-wrap">
                            ${user.roles && user.roles.length > 0 ? 
                                user.roles.map(role => `
                                    <span class="px-2 py-1 bg-dai/20 text-dai text-xs rounded">
                                        ${role.role_name}
                                    </span>
                                `).join('') : 
                                '<span class="px-2 py-1 bg-gray-500/20 text-gray-300 text-xs rounded">Sin roles</span>'
                            }
                        </div>
                    </div>
                </div>
                <div class="flex items-center space-x-3 ml-4">
                    <button 
                        data-user-id="${user.user_id}"
                        class="user-modal-btn px-4 py-2 bg-dai hover:bg-dai/80 text-white text-sm rounded-lg transition-colors flex items-center gap-2"
                    >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                        Gestionar Usuario
                    </button>
                </div>
            </div>
        </div>
    `;
}
