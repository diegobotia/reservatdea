package com.udea.apptdea.dto;

import com.udea.apptdea.entity.ReservationStatus;

import java.time.LocalDate;
import java.time.LocalTime;

/**
 * Represents reservation data returned by the API.
 *
 * @param id reservation identifier
 * @param customerName customer requesting the reservation
 * @param reservationDate scheduled date
 * @param reservationTime scheduled time
 * @param serviceName requested service
 * @param status current reservation status
 */
public record ReservationResponse(
        Long id,
        String customerName,
        LocalDate reservationDate,
        LocalTime reservationTime,
        String serviceName,
        ReservationStatus status
) {
}
