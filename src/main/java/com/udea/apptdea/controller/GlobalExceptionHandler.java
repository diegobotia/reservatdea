package com.udea.apptdea.controller;

import com.udea.apptdea.dto.ApiErrorResponse;
import com.udea.apptdea.exception.ReservationBusinessException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;

/**
 * Converts application exceptions into consistent HTTP error responses.
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Maps reservation business errors to an appropriate HTTP status.
     *
     * @param exception business exception to map
     * @param request current HTTP request
     * @return structured API error response
     */
    @ExceptionHandler(ReservationBusinessException.class)
    public ResponseEntity<ApiErrorResponse> handleReservationBusinessException(
            ReservationBusinessException exception,
            HttpServletRequest request
    ) {
        var status = switch (exception.getReason()) {
            case INVALID -> HttpStatus.BAD_REQUEST;
            case NOT_FOUND -> HttpStatus.NOT_FOUND;
            case CONFLICT -> HttpStatus.CONFLICT;
        };

        return buildResponse(status, exception.getMessage(), request.getRequestURI());
    }

    /**
     * Maps invalid request bodies to HTTP 400.
     *
     * @param exception validation exception to map
     * @param request current HTTP request
     * @return structured API error response
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiErrorResponse> handleValidationException(
            MethodArgumentNotValidException exception,
            HttpServletRequest request
    ) {
        var fieldError = exception.getBindingResult().getFieldError();
        var message = fieldError == null
                ? "The request contains invalid data."
                : fieldError.getField() + ": " + fieldError.getDefaultMessage();

        return buildResponse(HttpStatus.BAD_REQUEST, message, request.getRequestURI());
    }

    private static ResponseEntity<ApiErrorResponse> buildResponse(
            HttpStatus status,
            String message,
            String path
    ) {
        var response = new ApiErrorResponse(
                Instant.now(),
                status.value(),
                status.getReasonPhrase(),
                message,
                path
        );
        return ResponseEntity.status(status).body(response);
    }
}
