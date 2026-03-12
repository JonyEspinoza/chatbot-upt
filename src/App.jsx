import { useState, useEffect, useRef, useCallback } from 'react'
import Header from './components/Header.jsx'
import MessageBubble from './components/MessageBubble.jsx'
import TypingIndicator from './components/TypingIndicator.jsx'
import ChatInput from './components/ChatInput.jsx'
import SuggestionChips from './components/SuggestionChips.jsx'
import ErrorBanner from './components/ErrorBanner.jsx'

const WELCOME_MESSAGE = {
  id: 'welcome',
  role: 'assistant',
  content: '¡Bienvenido al Asistente Virtual de Egresados de la Escuela Profesional de Ingeniería de Sistemas — UPT! 🎓\n\nEstoy aquí para orientarte en procesos de **titulación**, **bolsa laboral**, **trámites administrativos**, **actualización profesional** y mucho más.\n\n¿En qué puedo ayudarte hoy?',
  timestamp: new Date(),
}

export default function App() {
  const [messages, setMessages]           = useState([WELCOME_MESSAGE])
  const [isLoading, setIsLoading]         = useState(false)
  const [error, setError]                 = useState(null)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const sendMessage = useCallback(async (text) => {
    if (!text?.trim() || isLoading) return

    setShowSuggestions(false)
    setError(null)

    const userMsg = { id: Date.now(), role: 'user', content: text.trim(), timestamp: new Date() }
    const updated = [...messages, userMsg]
    setMessages(updated)
    setIsLoading(true)

    // Construir historial de la API (excluir mensaje de bienvenida)
    const apiMessages = updated
      .filter(m => m.id !== 'welcome')
      .map(m => ({ role: m.role, content: m.content }))

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || `Error del servidor (${res.status})`)
      }

      setMessages(prev => [
        ...prev,
        { id: Date.now() + 1, role: 'assistant', content: data.reply, timestamp: new Date() },
      ])
    } catch (err) {
      setError(err.message || 'Error de conexión. Por favor, intenta nuevamente.')
    } finally {
      setIsLoading(false)
    }
  }, [messages, isLoading])

  const clearChat = () => {
    setMessages([WELCOME_MESSAGE])
    setShowSuggestions(true)
    setError(null)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header onClear={clearChat} />

      {/* Área de mensajes */}
      <main style={{
        flex: 1, overflowY: 'auto', padding: '28px 16px 16px',
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ maxWidth: '780px', width: '100%', margin: '0 auto', flex: 1 }}>
          {messages.map(msg => (
            <MessageBubble key={msg.id} msg={msg} />
          ))}

          {isLoading && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, animation: 'fadeSlideIn 0.3s ease' }}>
              <Avatar />
              <TypingIndicator />
            </div>
          )}

          {error && <ErrorBanner message={error} onDismiss={() => setError(null)} />}

          {showSuggestions && !isLoading && (
            <SuggestionChips onSelect={sendMessage} />
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      <ChatInput onSend={sendMessage} isLoading={isLoading} />
    </div>
  )
}

function Avatar() {
  return (
    <div style={{
      width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
      background: 'linear-gradient(135deg, #003478, #004fa8)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 11, color: 'white', fontWeight: 700,
    }}>U</div>
  )
}
