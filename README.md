# 🎓 Asistente Virtual UPT — Egresados de Ingeniería de Sistemas

Chatbot institucional con IA para la comunicación con egresados.

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


## Configurar la API Key (¡IMPORTANTE!)

En la pantalla de configuración de Vercel, **antes de hacer Deploy**:

1. Expandir **"Environment Variables"**
2. Agregar:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** `sk-ant-xxxxxxxxxxxxxxxxxx` (tu key real)
3. Clic en **"Add"**

> ⚠️ **Nunca** pongas la API key en el código ni en archivos que subas a GitHub.

---

## Deploy

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

