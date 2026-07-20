/**
 * Services offered by the reservation system (select options).
 */
export const SERVICIOS_DISPONIBLES = [
  'Consulta general',
  'Corte de cabello',
  'Coloración',
  'Manicure',
  'Pedicure',
  'Tratamiento facial',
  'Masaje relajante',
  'Depilación',
] as const;

/**
 * Service option value type.
 */
export type ServicioDisponible = (typeof SERVICIOS_DISPONIBLES)[number];
