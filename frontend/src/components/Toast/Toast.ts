import { createElement, useCallback, useEffect, useState } from 'react';
import ToastTemplate from './Toast.jsx';

/**
 * Props for the toast notification component.
 */
export interface ToastProps {
  message: string | null;
  onClose: () => void;
  durationMs?: number;
}

/**
 * View-model for the toast template.
 */
interface ToastViewProps {
  message: string;
  visible: boolean;
  onClose: () => void;
}

/**
 * Transient error/info toast. Auto-dismisses after {@code durationMs}.
 *
 * @param props toast configuration
 * @returns toast view, or null when there is no message
 */
export default function Toast({
  message,
  onClose,
  durationMs = 5000,
}: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!message) {
      setVisible(false);
      return;
    }

    setVisible(true);
    const timer = window.setTimeout(() => {
      setVisible(false);
      onClose();
    }, durationMs);

    return () => window.clearTimeout(timer);
  }, [message, durationMs, onClose]);

  const handleClose = useCallback(() => {
    setVisible(false);
    onClose();
  }, [onClose]);

  if (!message) {
    return null;
  }

  const viewProps: ToastViewProps = {
    message,
    visible,
    onClose: handleClose,
  };

  return createElement(ToastTemplate, viewProps);
}
