package com.udea.apptdea.controller;

import com.udea.apptdea.dto.CreateReservationRequest;
import com.udea.apptdea.dto.ReservationResponse;
import com.udea.apptdea.entity.Reservation;
import com.udea.apptdea.exception.ReservationBusinessException;
import com.udea.apptdea.service.ReservationService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.util.List;

/**
 * Exposes HTTP operations for managing reservations.
 */
@RestController
@RequestMapping("/reservas")
public class ReservationController {

    private final ReservationService reservationService;

    /**
     * Creates the controller with its reservation service.
     *
     * @param reservationService service that manages reservations
     */
    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    /**
     * Lists all reservations.
     *
     * @return HTTP 200 with all reservations
     */
    @GetMapping
    public ResponseEntity<List<ReservationResponse>> listReservations() {
        var reservations = reservationService.listReservations().stream()
                .map(ReservationController::toResponse)
                .toList();

        return ResponseEntity.ok(reservations);
    }

    /**
     * Creates a reservation.
     *
     * @param request validated reservation data
     * @return HTTP 201 with the created reservation
     * @throws ReservationBusinessException if the requested schedule is unavailable
     */
    @PostMapping
    public ResponseEntity<ReservationResponse> createReservation(
            @Valid @RequestBody CreateReservationRequest request
    ) {
        var reservation = new Reservation(
                null,
                request.customerName(),
                request.reservationDate(),
                request.reservationTime(),
                request.serviceName(),
                null
        );
        var createdReservation = reservationService.createReservation(reservation);

        return ResponseEntity
                .created(URI.create("/reservas/" + createdReservation.getId()))
                .body(toResponse(createdReservation));
    }

    /**
     * Cancels a reservation by its identifier.
     *
     * @param id reservation identifier
     * @return HTTP 204 when the reservation is cancelled
     * @throws ReservationBusinessException if the reservation cannot be cancelled
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancelReservation(@PathVariable Long id) {
        reservationService.cancelReservation(id);
        return ResponseEntity.noContent().build();
    }

    private static ReservationResponse toResponse(Reservation reservation) {
        return new ReservationResponse(
                reservation.getId(),
                reservation.getCustomerName(),
                reservation.getReservationDate(),
                reservation.getReservationTime(),
                reservation.getServiceName(),
                reservation.getStatus()
        );
    }
}
