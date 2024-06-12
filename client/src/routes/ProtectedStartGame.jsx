import { useApp } from '../context/AppContext'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedStartGame() {

  const { currentGame } = useApp()

  if (currentGame === null)
    return <Navigate to='/' />

  return <Outlet />
}

export default ProtectedStartGame