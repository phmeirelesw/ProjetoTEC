---
# TechBridge — Documentação Formal

Descrição
---------
`TechBridge` é uma plataforma para intermediação entre empresas e programadores. A aplicação fornece um front-end responsivo com páginas públicas (landing, listagem de programadores, formulários) e uma API backend (FastAPI) para fornecer dados de programadores e integrar processos de seleção.

Objetivo
--------
Fornecer uma interface simples e segura para empresas solicitarem candidatos e para desenvolvedores disponibilizarem seus perfis, com foco em qualidade, velocidade no processo e experiência do usuário.

Principais Recursos
-------------------
- Interface responsiva e moderna (`index.html`, `styles.css`, `script.js`).
- Listagem filtrável de programadores (`programadores.html`, `programadores.js`).
- Backend em FastAPI (`Backend/api.py`) com endpoints para obter programadores e especialidades.
- Estrutura de CSS e animações otimizadas para performance.

Estrutura do Repositório
------------------------
Principais arquivos e pastas:

- `index.html` — Página principal da aplicação.
- `programadores.html` — Página de listagem de talentos.
- `Frontend/` — Código estático (HTML, CSS, JS): `script.js`, `styles.css`, `programadores.js`.
- `Backend/` — Backend em Python (FastAPI): `api.py`.
- `requirements.txt` — Dependências Python (quando aplicável).
- `README.md` — Esta documentação.

Requisitos
----------
- Python 3.8+ (recomendado)
- Node.js / npx (opcional para servir frontend)
- Bibliotecas Python: `fastapi`, `uvicorn` (instalar via `pip`)

Instalação e Execução (Desenvolvimento)
--------------------------------------

1) Criar e ativar ambiente Python (opcional, recomendado):

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

2) Instalar dependências (instale `fastapi` e `uvicorn` caso não exista `requirements.txt`):

```powershell
pip install -r requirements.txt
# ou
pip install fastapi uvicorn
```

3) Executar o backend (FastAPI / Uvicorn):

```powershell
# Executa o app FastAPI definido em Backend\api.py
uvicorn Backend.api:app --reload --host 0.0.0.0 --port 8000
```

4) Servir o frontend localmente (opções):

- Usando o servidor HTTP simples do Python (executar na raiz do projeto):

```powershell
python -m http.server 8000
# Acesse http://localhost:8000/index.html
```

- Ou com `npx http-server` (Node.js):

```powershell
npx http-server . -p 8080
# Acesse http://localhost:8080
```

Endpoints Principais (API)
-------------------------
Nota: por padrão a API escuta na porta `8000`.

- `GET /programadores/` — Retorna a lista completa de programadores.
    - Parâmetros opcionais: `?tipo=<especialidade>` (ex.: `frontend`, `backend`, `fullstack`, `mobile`, `devops`, `ml`).
    - Exemplo: `GET http://localhost:8000/programadores/?tipo=frontend`

- `GET /programadores/especialidades` — Retorna a lista de especialidades disponíveis.

Formato de resposta (exemplo simplificado):

```json
[
    {
        "id": 1,
        "nome": "Ana Silva",
        "especialidade": "frontend",
        "experiencia": "5+ anos",
        "formacao": "Ciência da Computação (USP)",
        "projetos": 35,
        "bio": "...",
        "tecnologias": ["React","Vue.js"]
    }
]
```

Integração Frontend ↔ Backend
-----------------------------
O frontend `programadores.html` faz requisições à API para carregar dinamicamente os cards de talentos. A lógica principal encontra-se em `Frontend/programadores.js` — a página pode receber o parâmetro de query `?tipo=<especialidade>` para aplicar filtro automático.

Boas Práticas e Recomendação
----------------------------
- Use HTTPS em produção e defina CORS restrito (no código atual o CORS está aberto para desenvolvimento).
- Proteja endpoints sensíveis com autenticação quando necessário.
- Centralize dados dinâmicos em um banco de dados (SQLite/Postgres) em produção.

Contribuição
------------
Contribuições são bem-vindas. Sugestões de fluxo:

1. Fork do repositório
2. Crie uma branch com uma descrição clara (`feature/descricao` ou `fix/descricao`)
3. Abra um Pull Request descrevendo as mudanças

Se possível, forneça passos para reproduzir e testes automatizados quando aplicável.

Licença
-------
Projeto livre para uso pessoal e comercial (sem cláusula de licença explícita no repositório). Se desejar adicionar uma licença formal, crie um arquivo `LICENSE` com a licença escolhida (ex.: MIT).

Suporte
-------
Para dúvidas ou issues, abra um novo item em Issues no repositório ou use o formulário de contato presente no frontend.