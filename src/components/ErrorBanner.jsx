import styles from './ErrorBanner.module.css'

export default function ErrorBanner({ message, onDismiss }) {
  return (
    <div className={styles.banner} role="alert">
      <span>⚠️ {message}</span>
      <button className={styles.dismiss} onClick={onDismiss} aria-label="Cerrar error">✕</button>
    </div>
  )
}
