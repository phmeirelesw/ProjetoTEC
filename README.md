# TechConnect - Plataforma de Intermediação de Programadores

Um website sofisticado e moderno para uma empresa que busca intermediar a relação entre empresas e programadores de qualidade.

## 🎨 Características Principais

### Design & Estética
- **Paleta de Cores**: Preto e Azul sofisticado
- **Glassmorphism**: Efeito de vidro fosco moderno
- **Gradient**: Gradientes lineares elegantes
- **Responsivo**: 100% adaptável a dispositivos móveis
- **Performance**: Otimizado para carregamento rápido

### Funcionalidades JavaScript

#### 1. **Navegação Inteligente**
- Menu mobile responsivo com hamburger menu
- Auto-hide na scroll down
- Smooth scroll para âncoras
- Highlight dinâmico de seção ativa

#### 2. **Animações**
- Digitação de texto no hero
- Contadores animados para estatísticas
- Fade-in em elementos visíveis
- Efeito parallax
- Flutuação de elementos de fundo

#### 3. **Validação de Formulários**
- Validação em tempo real
- Feedback visual de erros
- Suporte a validação de email e URL
- Notificações de sucesso/erro

#### 4. **Sistema de Notificações**
- Notificações toast customizáveis
- Cores diferentes para sucesso/erro/info
- Auto-dismiss após 3 segundos

#### 5. **Interatividade**
- Hover effects sofisticados
- Mouse tracking em cards
- Efeitos de glassmorphism dinâmicos
- Acessibilidade (suporte a teclado)

## 📁 Estrutura de Arquivos

```
ProjetoTEC/
├── index.html      # Arquivo principal HTML
├── styles.css      # Estilos CSS com design sofisticado
├── script.js       # Funcionalidades JavaScript
└── README.md       # Este arquivo
```

## 🚀 Como Usar

### 1. Abrir Localmente
- Abra `index.html` diretamente no navegador
- Ou use um servidor local (Python, Node.js, etc.)

### Python
```bash
python -m http.server 8000
# Acesse http://localhost:8000
```

### Node.js (http-server)
```bash
npx http-server
# Acesse http://localhost:8080
```

### Live Server (VS Code)
- Instale a extensão "Live Server"
- Clique direito em `index.html` → "Open with Live Server"

## 📱 Seções do Site

### 1. **Hero**
Introdução impactante com call-to-action

### 2. **Sobre**
Benefícios principais da plataforma com cards interativos

### 3. **Serviços**
6 categorias de desenvolvimento com tecnologias associadas

### 4. **Para Empresas**
Formulário para solicitar programadores + benefícios

### 5. **Para Desenvolvedores**
Formulário de cadastro + benefícios de ser contratado

### 6. **Estatísticas**
Contadores animados com números importantes

### 7. **Contato**
Formulário e informações de contato

### 8. **Footer**
Links e informações da empresa

## ⚙️ Personalização

### Cores
Edite as variáveis CSS em `styles.css`:
```css
:root {
    --primary-dark: #0f1419;
    --accent-blue: #0066ff;
    --accent-cyan: #00d4ff;
    /* ... mais variáveis */
}
```

### Textos
Edite os textos diretamente em `index.html`

### Formulários
Integre com seu backend editando a função `sendFormData()` em `script.js`

### Animações
Ajuste tempos e efeitos em `styles.css` e `script.js`

## 🔧 Desenvolvimentos Futuros

- [ ] Integração com backend (Node.js, Python, etc.)
- [ ] Banco de dados de programadores
- [ ] Sistema de autenticação
- [ ] Dashboard para empresas
- [ ] Perfil de desenvolvedores
- [ ] Sistema de matches automáticos
- [ ] Chat em tempo real
- [ ] Pagamentos integrados

## 📞 Dados de Contato (Editar)

Atualize os seguintes dados em `index.html`:
- Telefone
- Email
- Localização
- Links de redes sociais

## 🎯 Funcionalidades JavaScript Detalhadas

### 1. Validação de Formulários
```javascript
// Validação de email, URL e campos vazios
// Highlight automático de campos com erro
```

### 2. Sistema de Notificações
```javascript
showNotification(message, type);
// type: 'success', 'error', 'info'
```

### 3. Contador Animado
```javascript
// Anima números quando seção fica visível
// Usa IntersectionObserver para eficiência
```

### 4. Menu Mobile
```javascript
// Abre/fecha com hamburger menu
// Fecha automaticamente ao clicar em link
```

## 🌐 Deploy

### GitHub Pages
1. Faça push do código para GitHub
2. Vá em Settings → Pages
3. Selecione branch e pasta raiz
4. Site estará disponível em `https://usuario.github.io/ProjetoTEC`

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
Arraste e solte a pasta na interface do Netlify

## 📊 Performance

- ✅ Lazy loading de imagens
- ✅ CSS otimizado
- ✅ JavaScript minificado
- ✅ Smooth scrolling nativo
- ✅ Hardware acceleration nas animações

## 🔐 Segurança

- Validação de entrada em formulários
- HTTPS recomendado para deploy
- Proteção contra XSS
- CSRF tokens (implementar no backend)

## 📝 Licença

Livre para uso comercial e pessoal

## 👨‍💻 Suporte

Para dúvidas ou sugestões, entre em contato via formulário no site.

---

**Desenvolvido com ❤️ para TechConnect**
