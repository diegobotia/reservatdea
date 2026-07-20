package com.udea.apptdea.service;

import com.udea.apptdea.entity.Reservation;
import com.udea.apptdea.entity.ReservationStatus;
import com.udea.apptdea.exception.ReservationBusinessException;
import com.udea.apptdea.repository.ReservationRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.udea.apptdea.exception.ReservationBusinessException.Reason.CONFLICT;
import static com.udea.apptdea.exception.ReservationBusinessException.Reason.INVALID;
import static com.udea.apptdea.exception.ReservationBusinessException.Reason.NOT_FOUND;

/**
 * Applies business rules for creating and cancelling reservations.
 */
@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;

    /**
     * Creates the service with its reservation repository.
     *
     * @param reservationRepository repository used to persist reservations
     */
    public ReservationService(ReservationRepository reservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    /**
     * Returns all reservations.
     *
     * @return all persisted reservations
     */
    @Transactional(readOnly = true)
    public List<Reservation> listReservations() {
        return reservationRepository.findAll();
    }

    /**
     * Creates an active reservation when its date and time are available.
     *
     * @param reservation reservation to create
     * @return persisted active reservation
     * @throws ReservationBusinessException if the reservation is invalid or its
     * date and time are already occupied
     */
    @Transactional
    public Reservation createReservation(Reservation reservation) {
        validateSchedule(reservation);

        if (reservationRepository.existsByReservationDateAndReservationTime(
                reservation.getReservationDate(),
                reservation.getReservationTime()
        )) {
            throw new ReservationBusinessException(
                    CONFLICT,
                    "A reservation already exists for the specified date and time."
            );
        }

        reservation.setId(null);
        reservation.setStatus(ReservationStatus.ACTIVE);

        try {
            return reservationRepository.saveAndFlush(reservation);
        } catch (DataIntegrityViolationException exception) {
            throw new ReservationBusinessException(
                    CONFLICT,
                    "A reservation already exists for the specified date and time.",
                    exception
            );
        }
    }

    /**
     * Cancels an existing active reservation by its identifier.
     * Persists the cancelled status; callers receive no entity body (HTTP 204 at the API).
     *
     * @param id identifier of the reservation to cancel
     * @throws ReservationBusinessException if the reservation does not exist or
     * is already cancelled
     */
    @Transactional
    public void cancelReservation(Long id) {
        if (id == null) {
            throw new ReservationBusinessException(
                    INVALID,
                    "The reservation identifier is required."
            );
        }

        var reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ReservationBusinessException(
                        NOT_FOUND,
                        "The reservation does not exist."
                ));

        if (reservation.getStatus() == ReservationStatus.CANCELLED) {
            throw new ReservationBusinessException(
                    CONFLICT,
                    "The reservation is already cancelled."
            );
        }

        reservation.setStatus(ReservationStatus.CANCELLED);
        reservationRepository.save(reservation);
    }

    private void validateSchedule(Reservation reservation) {
        if (reservation == null) {
            throw new ReservationBusinessException(
                    INVALID,
                    "The reservation is required."
            );
        }
        if (reservation.getReservationDate() == null) {
            throw new ReservationBusinessException(
                    INVALID,
                    "The reservation date is required."
            );
        }
        if (reservation.getReservationTime() == null) {
            throw new ReservationBusinessException(
                    INVALID,
                    "The reservation time is required."
            );
        }
    }
}
