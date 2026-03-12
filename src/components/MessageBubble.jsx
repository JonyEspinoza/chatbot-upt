import styles from './MessageBubble.module.css'

function formatTime(date) {
  return new Intl.DateTimeFormat('es-PE', { hour: '2-digit', minute: '2-digit' }).format(date)
}

function renderContent(text) {
  return text.split('\n').filter(l => l.trim() !== '').map((line, i) => {
    const html = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    return <p key={i} style={{ margin: i === 0 ? 0 : '7px 0 0 0' }} dangerouslySetInnerHTML={{ __html: html }} />
  })
}

export default function MessageBubble({ msg }) {
  const isUser = msg.role === 'user'

  return (
    <div className={`${styles.wrapper} ${isUser ? styles.wrapperUser : styles.wrapperBot}`}
      role="article" aria-label={isUser ? 'Tu mensaje' : 'Respuesta del asistente'}>

      {!isUser && (
        <div className={styles.meta}>
          <div className={styles.avatar} aria-hidden="true">U</div>
          <span className={styles.metaLabel}>Asistente UPT · {formatTime(msg.timestamp)}</span>
        </div>
      )}

      <div className={`${styles.bubble} ${isUser ? styles.bubbleUser : styles.bubbleBot}`}>
        {renderContent(msg.content)}
      </div>

      {isUser && (
        <span className={styles.timeUser}>{formatTime(msg.timestamp)}</span>
      )}
    </div>
  )
}
