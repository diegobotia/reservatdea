import { isAxiosError } from 'axios';

/**
 * API error body returned by {@code GlobalExceptionHandler}.
 */
interface ApiErrorBody {
  message?: string;
}

/**
 * Extracts a human-readable message from a failed Axios/API call.
 *
 * @param error unknown rejection value
 * @param fallback message when no API detail is available
 * @returns error text suitable for a toast
 */
export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (isAxiosError(error)) {
    const data = error.response?.data as ApiErrorBody | undefined;
    if (data?.message) {
      return data.message;
    }
    if (error.message) {
      return error.message;
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
}
