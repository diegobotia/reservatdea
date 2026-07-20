import axios from 'axios';

/**
 * Reservation status values returned by the Spring Boot API.
 */
export type ReservationStatus = 'ACTIVE' | 'CANCELLED';

/**
 * ISO-8601 calendar date (`yyyy-MM-dd`) accepted by Spring {@code LocalDate}.
 */
export type IsoLocalDate = `${number}-${number}-${number}`;

/**
 * ISO-8601 local time (`HH:mm` or `HH:mm:ss`) accepted by Spring {@code LocalTime}.
 */
export type IsoLocalTime = `${number}:${number}` | `${number}:${number}:${number}`;

/**
 * Reservation payload returned by {@code GET /reservas}.
 * Date/time fields mirror Jackson serialization of {@code LocalDate} / {@code LocalTime}.
 */
export interface Reservation {
  id: number;
  customerName: string;
  reservationDate: IsoLocalDate;
  reservationTime: IsoLocalTime;
  serviceName: string;
  status: ReservationStatus;
}

/**
 * Payload required to create a reservation ({@code POST /reservas}).
 * Matches {@code com.udea.apptdea.dto.CreateReservationRequest}:
 * {@code LocalDate} / {@code LocalTime} on the wire as ISO-8601 strings.
 */
export interface CreateReservationRequest {
  customerName: string;
  reservationDate: IsoLocalDate;
  reservationTime: IsoLocalTime;
  serviceName: string;
}

/**
 * Axios client configured with the backend base URL from environment variables.
 */
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Client service that talks to the Spring Boot reservation API (`/reservas`).
 */
const ReservaService = {
  /**
   * Fetches all reservations.
   *
   * @returns HTTP 200 with the reservation list
   */
  obtenerTodas() {
    return apiClient.get<Reservation[]>('/reservas');
  },

  /**
   * Creates a new reservation.
   *
   * @param reserva payload matching {@link CreateReservationRequest}
   * @returns HTTP 201 with the created reservation
   */
  crear(reserva: CreateReservationRequest) {
    return apiClient.post<Reservation>('/reservas', reserva);
  },

  /**
   * Cancels a reservation by its identifier.
   *
   * @param id reservation identifier
   * @returns HTTP 204 when cancelled
   */
  cancelar(id: number | string) {
    return apiClient.delete<void>(`/reservas/${id}`);
  },
};

export default ReservaService;
