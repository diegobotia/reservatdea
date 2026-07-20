import './ReservaForm.css';

/**
 * Presentational reactive form for creating a reservation.
 *
 * @param {object} props
 * @param {{ nombreCliente: string, fecha: string, hora: string, servicio: string }} props.values
 * @param {string[]} props.servicios
 * @param {boolean} props.submitting
 * @param {Record<string, string>} props.fieldErrors
 * @param {(field: string, value: string) => void} props.onChange
 * @param {(event: import('react').FormEvent<HTMLFormElement>) => void} props.onSubmit
 */
export default function ReservaFormTemplate({
  values,
  servicios,
  submitting,
  fieldErrors,
  onChange,
  onSubmit,
}) {
  return (
    <section className="reserva-form">
      <header className="reserva-form__header">
        <h2>Nueva reserva</h2>
        <p>Completa todos los campos para agendar una reserva.</p>
      </header>

      <form className="reserva-form__form" onSubmit={onSubmit} noValidate>
        <div className="reserva-form__field">
          <label htmlFor="nombreCliente">Nombre del cliente</label>
          <input
            id="nombreCliente"
            name="nombreCliente"
            type="text"
            autoComplete="name"
            required
            value={values.nombreCliente}
            onChange={(event) => onChange('nombreCliente', event.target.value)}
            aria-invalid={Boolean(fieldErrors.nombreCliente)}
            aria-describedby={
              fieldErrors.nombreCliente ? 'nombreCliente-error' : undefined
            }
          />
          {fieldErrors.nombreCliente && (
            <span id="nombreCliente-error" className="reserva-form__error">
              {fieldErrors.nombreCliente}
            </span>
          )}
        </div>

        <div className="reserva-form__row">
          <div className="reserva-form__field">
            <label htmlFor="fecha">Fecha</label>
            <input
              id="fecha"
              name="fecha"
              type="date"
              required
              value={values.fecha}
              onChange={(event) => onChange('fecha', event.target.value)}
              aria-invalid={Boolean(fieldErrors.fecha)}
              aria-describedby={fieldErrors.fecha ? 'fecha-error' : undefined}
            />
            {fieldErrors.fecha && (
              <span id="fecha-error" className="reserva-form__error">
                {fieldErrors.fecha}
              </span>
            )}
          </div>

          <div className="reserva-form__field">
            <label htmlFor="hora">Hora</label>
            <input
              id="hora"
              name="hora"
              type="time"
              required
              value={values.hora}
              onChange={(event) => onChange('hora', event.target.value)}
              aria-invalid={Boolean(fieldErrors.hora)}
              aria-describedby={fieldErrors.hora ? 'hora-error' : undefined}
            />
            {fieldErrors.hora && (
              <span id="hora-error" className="reserva-form__error">
                {fieldErrors.hora}
              </span>
            )}
          </div>
        </div>

        <div className="reserva-form__field">
          <label htmlFor="servicio">Servicio</label>
          <select
            id="servicio"
            name="servicio"
            required
            value={values.servicio}
            onChange={(event) => onChange('servicio', event.target.value)}
            aria-invalid={Boolean(fieldErrors.servicio)}
            aria-describedby={
              fieldErrors.servicio ? 'servicio-error' : undefined
            }
          >
            <option value="">Seleccione un servicio</option>
            {servicios.map((servicio) => (
              <option key={servicio} value={servicio}>
                {servicio}
              </option>
            ))}
          </select>
          {fieldErrors.servicio && (
            <span id="servicio-error" className="reserva-form__error">
              {fieldErrors.servicio}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="reserva-form__submit"
          disabled={submitting}
        >
          {submitting ? 'Guardando…' : 'Crear reserva'}
        </button>
      </form>
    </section>
  );
}
