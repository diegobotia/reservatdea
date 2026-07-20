import axios from 'axios';

/**
 * Reservation status values returned by the Spring Boot API.
 */
export type ReservationStatus = 'ACTIVE' | 'CANCELLED';

/**
 * Reservation payload returned by {@code GET /reservas}.
 */
export interface Reservation {
  id: number;
  customerName: string;
  reservationDate: string;
  reservationTime: string;
  serviceName: string;
  status: ReservationStatus;
}

/**
 * Payload required to create a reservation ({@code POST /reservas}).
 */
export interface CreateReservationRequest {
  customerName: string;
  reservationDate: string;
  reservationTime: string;
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
   * @param reserva payload matching {@code CreateReservationRequest}
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
