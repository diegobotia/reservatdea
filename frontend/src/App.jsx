import { useCallback, useState } from 'react'
import ReservaForm from './components/ReservaForm/ReservaForm'
import ReservasTable from './components/ReservasTable/ReservasTable'
import Toast from './components/Toast/Toast'
import './App.css'

/**
 * Application root: create-reservation form, reservations table, and error toast.
 */
function App() {
  const [refreshKey, setRefreshKey] = useState(0)
  const [toastMessage, setToastMessage] = useState(null)

  const handleCreated = useCallback(() => {
    setRefreshKey((current) => current + 1)
  }, [])

  const handleError = useCallback((message) => {
    setToastMessage(message)
  }, [])

  const handleToastClose = useCallback(() => {
    setToastMessage(null)
  }, [])

  return (
    <>
      <ReservaForm onCreated={handleCreated} onError={handleError} />
      <ReservasTable refreshKey={refreshKey} />
      <Toast message={toastMessage} onClose={handleToastClose} />
    </>
  )
}

export default App
