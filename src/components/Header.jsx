import styles from './Header.module.css'

export default function Header({ onClear }) {
  return (
    <header className={styles.header}>
      {/* Decorative grid lines */}
      <div className={styles.gridLines} aria-hidden="true" />
      <div className={styles.decorCircle} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.brand}>
          {/* Logo */}
          <div className={styles.logoBox} aria-label="Logo UPT">
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
              <path d="M15 3L3 9.5V20.5L15 27L27 20.5V9.5L15 3Z"
                stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" fill="rgba(255,255,255,0.1)" />
              <path d="M15 3V15M3 9.5L15 15M27 9.5L15 15"
                stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
              <circle cx="15" cy="15" r="3" fill="white" opacity="0.9" />
            </svg>
          </div>

          <div>
            <div className={styles.titleRow}>
              <h1 className={styles.title}>Asistente UPT</h1>
              <span className={styles.badge}>EGRESADOS</span>
            </div>
            <p className={styles.subtitle}>
              Ingeniería de Sistemas · Universidad Privada de Tacna
            </p>
          </div>
        </div>

        <div className={styles.actions}>
          <div className={styles.status} aria-label="Estado: en línea">
            <span className={styles.statusDot} aria-hidden="true" />
            <span className={styles.statusLabel}>En línea</span>
          </div>
          <button className={styles.clearBtn} onClick={onClear} aria-label="Iniciar nueva sesión">
            Nueva sesión
          </button>
        </div>
      </div>
    </header>
  )
}
