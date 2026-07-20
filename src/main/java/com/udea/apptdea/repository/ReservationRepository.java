package com.udea.apptdea.repository;

import com.udea.apptdea.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalTime;

/**
 * Provides persistence operations for reservations.
 */
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    /**
     * Checks whether a reservation exists at the specified date and time.
     *
     * @param reservationDate date to check
     * @param reservationTime time to check
     * @return {@code true} when a reservation exists at that date and time
     */
    boolean existsByReservationDateAndReservationTime(
            LocalDate reservationDate,
            LocalTime reservationTime
    );
}
