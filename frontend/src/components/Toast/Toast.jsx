import './Toast.css';

/**
 * Presentational toast banner.
 *
 * @param {object} props
 * @param {string} props.message
 * @param {boolean} props.visible
 * @param {() => void} props.onClose
 */
export default function ToastTemplate({ message, visible, onClose }) {
  return (
    <div
      className={
        visible ? 'toast toast--visible' : 'toast'
      }
      role="alert"
      aria-live="assertive"
    >
      <p className="toast__message">{message}</p>
      <button
        type="button"
        className="toast__close"
        aria-label="Cerrar"
        onClick={onClose}
      >
        ×
      </button>
    </div>
  );
}
