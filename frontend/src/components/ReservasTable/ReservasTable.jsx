import './ReservasTable.css';

/**
 * Presentational template for the reservations table.
 *
 * @param {object} props
 * @param {import('../../services/ReservaService').Reservation[]} props.reservas
 * @param {boolean} props.loading
 * @param {string|null} props.error
 * @param {number|null} props.cancellingId
 * @param {(id: number) => void} props.onCancel
 */
export default function ReservasTableTemplate({
  reservas,
  loading,
  error,
  cancellingId,
  onCancel,
}) {
  return (
    <section className="reservas-table">
      <header className="reservas-table__header">
        <h1>Reservas</h1>
        <p>Listado de reservas obtenidas desde el backend.</p>
      </header>

      {loading && <p className="reservas-table__status">Cargando reservas…</p>}

      {error && (
        <p className="reservas-table__error" role="alert">
          {error}
        </p>
      )}

      {!loading && !error && reservas.length === 0 && (
        <p className="reservas-table__status">No hay reservas registradas.</p>
      )}

      {reservas.length > 0 && (
        <div className="reservas-table__scroll">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Servicio</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {reservas.map((reserva) => {
                const isActive = reserva.status === 'ACTIVE';
                const isCancelling = cancellingId === reserva.id;

                return (
                  <tr key={reserva.id}>
                    <td>{reserva.id}</td>
                    <td>{reserva.customerName}</td>
                    <td>{reserva.reservationDate}</td>
                    <td>{reserva.reservationTime}</td>
                    <td>{reserva.serviceName}</td>
                    <td>
                      <span
                        className={
                          isActive
                            ? 'reservas-table__badge reservas-table__badge--active'
                            : 'reservas-table__badge reservas-table__badge--cancelled'
                        }
                      >
                        {reserva.status}
                      </span>
                    </td>
                    <td>
                      {isActive ? (
                        <button
                          type="button"
                          className="reservas-table__cancel"
                          disabled={isCancelling}
                          onClick={() => onCancel(reserva.id)}
                        >
                          {isCancelling ? 'Cancelando…' : 'Cancelar'}
                        </button>
                      ) : (
                        <span className="reservas-table__muted">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
