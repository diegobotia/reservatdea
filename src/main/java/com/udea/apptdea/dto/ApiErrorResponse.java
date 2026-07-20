package com.udea.apptdea.dto;

import java.time.Instant;

/**
 * Represents an error returned by the REST API.
 *
 * @param timestamp time at which the error occurred
 * @param status HTTP status code
 * @param error HTTP status description
 * @param message human-readable error detail
 * @param path request path
 */
public record ApiErrorResponse(
        Instant timestamp,
        int status,
        String error,
        String message,
        String path
) {
}
