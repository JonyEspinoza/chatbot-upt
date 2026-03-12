import styles from './TypingIndicator.module.css'

export default function TypingIndicator() {
  return (
    <div className={styles.container} aria-label="El asistente está escribiendo" role="status">
      {[0, 1, 2].map(i => (
        <span key={i} className={styles.dot} style={{ animationDelay: `${i * 0.2}s` }} />
      ))}
    </div>
  )
}
