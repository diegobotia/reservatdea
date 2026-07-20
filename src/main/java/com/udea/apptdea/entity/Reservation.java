package com.udea.apptdea.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

import java.time.LocalDate;
import java.time.LocalTime;

/**
 * Represents a customer reservation for a service on a specific date and time.
 */
@Entity
@Table(
        name = "reservations",
        uniqueConstraints = @UniqueConstraint(
                name = "uk_reservation_date_time",
                columnNames = {"reservation_date", "reservation_time"}
        )
)
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "customer_name", nullable = false)
    private String customerName;

    @Column(name = "reservation_date", nullable = false)
    private LocalDate reservationDate;

    @Column(name = "reservation_time", nullable = false)
    private LocalTime reservationTime;

    @Column(name = "service_name", nullable = false)
    private String serviceName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ReservationStatus status;

    /**
     * Creates an empty reservation for JPA.
     */
    public Reservation() {
    }

    /**
     * Creates a reservation with all its properties.
     *
     * @param id reservation identifier
     * @param customerName customer requesting the reservation
     * @param reservationDate scheduled date
     * @param reservationTime scheduled time
     * @param serviceName requested service
     * @param status current reservation status
     */
    public Reservation(
            Long id,
            String customerName,
            LocalDate reservationDate,
            LocalTime reservationTime,
            String serviceName,
            ReservationStatus status
    ) {
        this.id = id;
        this.customerName = customerName;
        this.reservationDate = reservationDate;
        this.reservationTime = reservationTime;
        this.serviceName = serviceName;
        this.status = status;
    }

    /**
     * Returns the reservation identifier.
     *
     * @return reservation identifier
     */
    public Long getId() {
        return id;
    }

    /**
     * Updates the reservation identifier.
     *
     * @param id reservation identifier
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Returns the customer name.
     *
     * @return customer name
     */
    public String getCustomerName() {
        return customerName;
    }

    /**
     * Updates the customer name.
     *
     * @param customerName customer name
     */
    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    /**
     * Returns the scheduled reservation date.
     *
     * @return reservation date
     */
    public LocalDate getReservationDate() {
        return reservationDate;
    }

    /**
     * Updates the scheduled reservation date.
     *
     * @param reservationDate reservation date
     */
    public void setReservationDate(LocalDate reservationDate) {
        this.reservationDate = reservationDate;
    }

    /**
     * Returns the scheduled reservation time.
     *
     * @return reservation time
     */
    public LocalTime getReservationTime() {
        return reservationTime;
    }

    /**
     * Updates the scheduled reservation time.
     *
     * @param reservationTime reservation time
     */
    public void setReservationTime(LocalTime reservationTime) {
        this.reservationTime = reservationTime;
    }

    /**
     * Returns the requested service name.
     *
     * @return service name
     */
    public String getServiceName() {
        return serviceName;
    }

    /**
     * Updates the requested service name.
     *
     * @param serviceName service name
     */
    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }

    /**
     * Returns the current reservation status.
     *
     * @return reservation status
     */
    public ReservationStatus getStatus() {
        return status;
    }

    /**
     * Updates the reservation status.
     *
     * @param status reservation status
     */
    public void setStatus(ReservationStatus status) {
        this.status = status;
    }
}
