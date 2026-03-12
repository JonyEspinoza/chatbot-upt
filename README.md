# 🎓 Asistente Virtual UPT — Egresados de Ingeniería de Sistemas

Chatbot institucional con IA generativa para la comunicación con egresados de la
Escuela Profesional de Ingeniería de Sistemas de la Universidad Privada de Tacna.

---

## 🏗️ Arquitectura

```
chatbot-upt/
├── api/
│   └── chat.js          ← Serverless Function (backend seguro en Vercel)
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── MessageBubble.jsx
│   │   ├── TypingIndicator.jsx
│   │   ├── ChatInput.jsx
│   │   ├── SuggestionChips.jsx
│   │   └── ErrorBanner.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
│   └── favicon.svg
├── .env.example
├── .gitignore
├── vercel.json
├── vite.config.js
└── package.json
```

**Flujo de la API Key (seguro):**
```
Usuario → Frontend React → /api/chat (Vercel Serverless) → Anthropic API
                                ↑
                    ANTHROPIC_API_KEY vive aquí,
                    nunca llega al navegador
```

---

## 🚀 Despliegue en Vercel (paso a paso)

### Requisitos previos
- Cuenta en [GitHub](https://github.com) (gratis)
- Cuenta en [Vercel](https://vercel.com) (gratis)
- API Key de Anthropic en [console.anthropic.com](https://console.anthropic.com)

---

### Paso 1 — Subir el proyecto a GitHub

```bash
# Inicializar repositorio Git
git init
git add .
git commit -m "feat: chatbot inicial UPT egresados"

# Crear repositorio en GitHub (sin README, sin .gitignore)
# Luego conectarlo:
git remote add origin https://github.com/TU_USUARIO/chatbot-upt.git
git branch -M main
git push -u origin main
```

---

### Paso 2 — Importar en Vercel

1. Ir a [vercel.com/new](https://vercel.com/new)
2. Clic en **"Import Git Repository"**
3. Seleccionar el repositorio `chatbot-upt`
4. Vercel detecta automáticamente que es un proyecto Vite ✅

---

### Paso 3 — Configurar la API Key (¡IMPORTANTE!)

En la pantalla de configuración de Vercel, **antes de hacer Deploy**:

1. Expandir **"Environment Variables"**
2. Agregar:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** `sk-ant-xxxxxxxxxxxxxxxxxx` (tu key real)
3. Clic en **"Add"**

> ⚠️ **Nunca** pongas la API key en el código ni en archivos que subas a GitHub.

---

### Paso 4 — Deploy

1. Clic en **"Deploy"**
2. Esperar ~2 minutos
3. ¡Listo! Tu chatbot estará en `https://chatbot-upt.vercel.app` 🎉

---

## 💻 Desarrollo local

```bash
# 1. Instalar dependencias
npm install

# 2. Crear archivo de entorno local
cp .env.example .env.local
# Editar .env.local y poner tu API key real

# 3. Iniciar servidor de desarrollo
npm run dev
# → http://localhost:5173
```

> En desarrollo local, el proxy de Vite redirige `/api/*` al servidor de Node.
> En producción (Vercel), las funciones serverless manejan `/api/*` automáticamente.

---

## 🔒 Seguridad

| Medida | Descripción |
|--------|-------------|
| API Key en servidor | La key nunca se expone al navegador |
| Validación de input | Se valida estructura y roles de los mensajes |
| Límite de historial | Máximo 20 mensajes por request |
| Sin credenciales en repo | `.env` está en `.gitignore` |
| HTTPS | Vercel fuerza HTTPS en todos los dominios |

---

## 🛠️ Tecnologías

- **Frontend:** React 18 + Vite 5
- **Backend:** Vercel Serverless Functions (Node.js)
- **IA:** Anthropic Claude (`claude-sonnet-4-20250514`)
- **Estilos:** CSS Modules + Google Fonts
- **Deploy:** Vercel

---

## 📄 Licencia

Proyecto institucional — Universidad Privada de Tacna  
Escuela Profesional de Ingeniería de Sistemas
