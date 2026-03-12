import styles from './SuggestionChips.module.css'

const SUGGESTIONS = [
  '¿Cómo inicio mi proceso de titulación?',
  '¿Cómo accedo a la bolsa laboral?',
  '¿Qué diplomados están disponibles?',
  '¿Cómo obtengo mi certificado de estudios?',
  '¿Cómo colegiarse en el CIP?',
]

export default function SuggestionChips({ onSelect }) {
  return (
    <div className={styles.wrapper} aria-label="Consultas frecuentes">
      <p className={styles.label}>Consultas frecuentes:</p>
      <div className={styles.chips}>
        {SUGGESTIONS.map(s => (
          <button key={s} className={styles.chip} onClick={() => onSelect(s)}>
            {s}
          </button>
        ))}
      </div>
    </div>
  )
}
