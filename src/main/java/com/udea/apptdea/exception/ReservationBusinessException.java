package com.udea.apptdea.exception;

/**
 * Indicates that a reservation operation violates a business rule.
 */
public class ReservationBusinessException extends RuntimeException {

    private final Reason reason;

    /**
     * Creates an exception with a reason and description of the violated rule.
     *
     * @param reason category of the business rule violation
     * @param message description of the business rule violation
     */
    public ReservationBusinessException(Reason reason, String message) {
        super(message);
        this.reason = reason;
    }

    /**
     * Creates an exception with the violated rule and its underlying cause.
     *
     * @param reason category of the business rule violation
     * @param message description of the business rule violation
     * @param cause underlying cause
     */
    public ReservationBusinessException(
            Reason reason,
            String message,
            Throwable cause
    ) {
        super(message, cause);
        this.reason = reason;
    }

    /**
     * Returns the category of the violated business rule.
     *
     * @return business rule violation category
     */
    public Reason getReason() {
        return reason;
    }

    /**
     * Categorizes reservation business rule violations.
     */
    public enum Reason {
        /**
         * The supplied reservation data is invalid.
         */
        INVALID,

        /**
         * The requested reservation does not exist.
         */
        NOT_FOUND,

        /**
         * The requested operation conflicts with the current system state.
         */
        CONFLICT
    }
}
