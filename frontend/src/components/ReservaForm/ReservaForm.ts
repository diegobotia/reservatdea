import { createElement, useCallback, useState } from 'react';
import type { FormEvent } from 'react';
import ReservaService from '../../services/ReservaService';
import { SERVICIOS_DISPONIBLES } from '../../constants/servicios';
import { getApiErrorMessage } from '../../utils/apiError';
import ReservaFormTemplate from './ReservaForm.jsx';

/**
 * Props for the create-reservation form.
 */
export interface ReservaFormProps {
  onCreated?: () => void;
  onError: (message: string) => void;
}

/**
 * Reactive form field values (UI names).
 */
interface ReservaFormValues {
  nombreCliente: string;
  fecha: string;
  hora: string;
  servicio: string;
}

/**
 * View-model props for the form template.
 */
interface ReservaFormViewProps {
  values: ReservaFormValues;
  servicios: readonly string[];
  submitting: boolean;
  fieldErrors: Partial<Record<keyof ReservaFormValues, string>>;
  onChange: (field: keyof ReservaFormValues, value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const INITIAL_VALUES: ReservaFormValues = {
  nombreCliente: '',
  fecha: '',
  hora: '',
  servicio: '',
};

/**
 * Validates that every required field has a value.
 *
 * @param values current form values
 * @returns per-field error messages
 */
function validate(values: ReservaFormValues): Partial<Record<keyof ReservaFormValues, string>> {
  const errors: Partial<Record<keyof ReservaFormValues, string>> = {};

  if (!values.nombreCliente.trim()) {
    errors.nombreCliente = 'El nombre del cliente es obligatorio.';
  }
  if (!values.fecha) {
    errors.fecha = 'La fecha es obligatoria.';
  }
  if (!values.hora) {
    errors.hora = 'La hora es obligatoria.';
  }
  if (!values.servicio) {
    errors.servicio = 'Debe seleccionar un servicio.';
  }

  return errors;
}

/**
 * Normalizes an HTML time value ({@code HH:mm}) to {@code HH:mm:ss} for the API.
 *
 * @param hora time from the form
 * @returns time string accepted by Spring {@code LocalTime}
 */
function toApiTime(hora: string): string {
  return hora.length === 5 ? `${hora}:00` : hora;
}

/**
 * Reactive form that creates a reservation via {@link ReservaService}.
 *
 * @param props form callbacks
 * @returns create-reservation form view
 */
export default function ReservaForm({ onCreated, onError }: ReservaFormProps) {
  const [values, setValues] = useState<ReservaFormValues>(INITIAL_VALUES);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof ReservaFormValues, string>>
  >({});
  const [submitting, setSubmitting] = useState(false);

  const onChange = useCallback((field: keyof ReservaFormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setFieldErrors((current) => {
      if (!current[field]) {
        return current;
      }
      const next = { ...current };
      delete next[field];
      return next;
    });
  }, []);

  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const errors = validate(values);
      setFieldErrors(errors);
      if (Object.keys(errors).length > 0) {
        return;
      }

      setSubmitting(true);
      try {
        await ReservaService.crear({
          customerName: values.nombreCliente.trim(),
          reservationDate: values.fecha,
          reservationTime: toApiTime(values.hora),
          serviceName: values.servicio,
        });
        setValues(INITIAL_VALUES);
        setFieldErrors({});
        onCreated?.();
      } catch (error) {
        onError(
          getApiErrorMessage(error, 'No se pudo guardar la reserva.'),
        );
      } finally {
        setSubmitting(false);
      }
    },
    [values, onCreated, onError],
  );

  const viewProps: ReservaFormViewProps = {
    values,
    servicios: SERVICIOS_DISPONIBLES,
    submitting,
    fieldErrors,
    onChange,
    onSubmit,
  };

  return createElement(ReservaFormTemplate, viewProps);
}
