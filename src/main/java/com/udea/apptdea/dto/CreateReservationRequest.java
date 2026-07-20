package com.udea.apptdea.dto;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalTime;

/**
 * Carries the data required to create a reservation.
 *
 * @param customerName customer requesting the reservation
 * @param reservationDate requested date
 * @param reservationTime requested time
 * @param serviceName requested service
 */
public record CreateReservationRequest(
        @NotBlank String customerName,
        @NotNull @FutureOrPresent LocalDate reservationDate,
        @NotNull LocalTime reservationTime,
        @NotBlank String serviceName
) {
}
