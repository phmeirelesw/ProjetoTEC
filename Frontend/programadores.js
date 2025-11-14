// ========== CONFIGURAÇÃO ==========
const API_BASE_URL = 'http://localhost:8000';
let programadoresCache = []; // Cache para armazenar todos os programadores

// ========== IMAGENS DE AVATAR ==========
const avatarImages = {
    'Ana Silva': 'https://i.pravatar.cc/80?img=1',
    'Bruno Costa': 'https://i.pravatar.cc/80?img=68',
    'Carla Dias': 'https://i.pravatar.cc/80?img=5',
    'Daniel Moreira': 'https://i.pravatar.cc/80?img=12',
    'Elisa Fernandes': 'https://i.pravatar.cc/80?img=33',
    'Felipe Guedes': 'https://i.pravatar.cc/80?img=14',
    'Lucas Viana': 'https://i.pravatar.cc/80?img=50',
    'Helena Martins': 'https://i.pravatar.cc/80?img=25',
    'Igor Tavares': 'https://i.pravatar.cc/80?img=53'
};

// ========== FUNÇÃO PARA CARREGAR PROGRAMADORES ==========
async function carregarProgramadores(tipo = null) {
    const carregando = document.getElementById('carregando');
    const grid = document.getElementById('programadoresGrid');
    
    try {
        // Mostrar indicador de carregamento
        carregando.style.display = 'block';
        grid.innerHTML = '';

        // Construir URL com filtro (se houver)
        let url = `${API_BASE_URL}/programadores/`;
        if (tipo) {
            url += `?tipo=${tipo}`;
        }

        console.log('Buscando de:', url);

        // Fazer requisição à API
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const programadores = await response.json();
        
        // Cache para uso posterior
        programadoresCache = programadores;

        // Renderizar programadores
        renderizarProgramadores(programadores);
        
    } catch (error) {
        console.error('Erro ao carregar programadores:', error);
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px;">
                <i class="fas fa-exclamation-circle" style="font-size: 2rem; color: #ff4444; margin-bottom: 10px;"></i>
                <p style="color: #666; font-size: 1.1rem;">Erro ao carregar programadores. Verifique se a API está rodando em ${API_BASE_URL}</p>
            </div>
        `;
    } finally {
        carregando.style.display = 'none';
    }
}

// ========== FUNÇÃO PARA RENDERIZAR PROGRAMADORES ==========
function renderizarProgramadores(programadores) {
    const grid = document.getElementById('programadoresGrid');
    
    if (!programadores || programadores.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px;">
                <i class="fas fa-search" style="font-size: 2rem; color: #0066ff; margin-bottom: 10px;"></i>
                <p style="color: #666; font-size: 1.1rem;">Nenhum programador encontrado com este filtro.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = '';

    programadores.forEach((programador, index) => {
        const card = document.createElement('div');
        card.className = 'servico-card';
        card.setAttribute('data-especialidade', programador.especialidade);

        // Pega avatar do mapa ou usa um padrão
        const avatar = avatarImages[programador.nome] || `https://i.pravatar.cc/80?img=${index}`;

        // Mapear especialidade para título legível
        const titulos = {
            'frontend': 'Especialista Frontend',
            'backend': 'Especialista Backend',
            'fullstack': 'Desenvolvedor Full Stack',
            'mobile': 'Especialista Mobile',
            'devops': 'Engenheiro DevOps',
            'ml': 'Engenheiro de ML'
        };

        const titulo = titulos[programador.especialidade] || 'Desenvolvedor';

        card.innerHTML = `
            <div class="dev-header">
                <img src="${avatar}" alt="Foto de ${programador.nome}" class="dev-photo">
                <div class="dev-title">
                    <h3>${programador.nome}</h3>
                    <p class="dev-specialty">${titulo}</p>
                </div>
            </div>
            <p class="dev-bio">${programador.bio}</p>
            <div class="dev-details">
                <p><strong>Experiência:</strong> ${programador.experiencia}</p>
                <p><strong>Formação:</strong> ${programador.formacao}</p>
                <p><strong>Projetos:</strong> ${programador.projetos}+</p>
            </div>
            <ul class="tech-list">
                ${programador.tecnologias.map(tech => `<li>${tech}</li>`).join('')}
            </ul>
            <button class="btn btn-primary" onclick="selecionarProgramador('${programador.nome}', '${programador.especialidade}')">Entrar em Contato</button>
        `;

        grid.appendChild(card);
    });
}

// ========== FUNÇÃO PARA SELECIONAR PROGRAMADOR ==========
function selecionarProgramador(nome, especialidade) {
    const notification = document.getElementById('notification');
    notification.textContent = `Você selecionou ${nome}! Entraremos em contato em breve.`;
    notification.className = 'notification show';
    notification.style.background = 'linear-gradient(135deg, #00b359, #00e699)';

    console.log(`Programador selecionado: ${nome} (${especialidade})`);

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// ========== EVENT LISTENERS ==========
document.addEventListener('DOMContentLoaded', () => {
    // Hamburger menu
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // ========== FILTRO DE ESPECIALIDADE ==========
    const filtroEspecialidade = document.getElementById('filtroEspecialidade');
    
    if (filtroEspecialidade) {
        // Obter tipo da URL (se a página foi acessada com parâmetro ?tipo=)
        const urlParams = new URLSearchParams(window.location.search);
        const tipoURL = urlParams.get('tipo');

        if (tipoURL) {
            filtroEspecialidade.value = tipoURL;
            carregarProgramadores(tipoURL);
        } else {
            // Carregar todos se não houver filtro
            carregarProgramadores();
        }

        // Adicionar listener para mudanças no filtro
        filtroEspecialidade.addEventListener('change', (e) => {
            const tipo = e.target.value;
            
            if (tipo) {
                // Atualizar URL com o filtro
                window.history.pushState(null, '', `programadores.html?tipo=${tipo}`);
                carregarProgramadores(tipo);
            } else {
                // Remover parametro da URL
                window.history.pushState(null, '', 'programadores.html');
                carregarProgramadores();
            }
        });
    }
});
