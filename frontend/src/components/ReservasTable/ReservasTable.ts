import { createElement, useCallback, useEffect, useState } from 'react';
import ReservaService from '../../services/ReservaService';
import type { Reservation } from '../../services/ReservaService';
import { getApiErrorMessage } from '../../utils/apiError';
import ReservasTableTemplate from './ReservasTable.jsx';

/**
 * Props for the reservations table page.
 */
export interface ReservasTableProps {
  refreshKey?: number;
}

/**
 * View-model props passed from the component logic to the HTML template.
 */
interface ReservasTableViewProps {
  reservas: Reservation[];
  loading: boolean;
  error: string | null;
  cancellingId: number | null;
  onCancel: (id: number) => void;
}

/**
 * Loads reservations and exposes cancel handling for the reservations table page.
 *
 * @param refreshKey increments to force a reload after external changes
 * @returns table view-model bound to {@link ReservaService}
 */
function useReservasTable(refreshKey = 0): ReservasTableViewProps {
  const [reservas, setReservas] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancellingId, setCancellingId] = useState<number | null>(null);

  const loadReservas = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await ReservaService.obtenerTodas();
      setReservas(data);
      setError(null);
    } catch (err) {
      setError(getApiErrorMessage(err, 'No se pudieron cargar las reservas'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadReservas();
  }, [loadReservas, refreshKey]);

  /**
   * Cancels a reservation and refreshes the table.
   *
   * @param id reservation identifier
   */
  const onCancel = useCallback(
    async (id: number) => {
      setCancellingId(id);
      setError(null);
      try {
        await ReservaService.cancelar(id);
        await loadReservas();
      } catch (err) {
        setError(getApiErrorMessage(err, 'No se pudo cancelar la reserva'));
      } finally {
        setCancellingId(null);
      }
    },
    [loadReservas],
  );

  return {
    reservas,
    loading,
    error,
    cancellingId,
    onCancel,
  };
}

/**
 * Reservations table page: loads data via {@link ReservaService} and renders the HTML template.
 *
 * @param props table configuration
 * @returns the reservations table view
 */
export default function ReservasTable({ refreshKey = 0 }: ReservasTableProps) {
  const viewProps = useReservasTable(refreshKey);
  return createElement(ReservasTableTemplate, viewProps);
}
