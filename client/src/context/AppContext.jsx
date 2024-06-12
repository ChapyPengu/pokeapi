import { useState, useEffect, useContext, createContext } from 'react'
import { useMultiplayerBattleContext } from './MultiplayerBattleContext'
import { useSingleplayerBattleContext } from './SingleplayerBattleContext'
import { MULTIPLAYER, SINGLEPLAYER } from '../config/config'

const AppContext = createContext()

export function useApp() {
  const context = useContext(AppContext)
  if (!context)
    throw new Error('context not found')
  return context
}

export function AppContextProvider({ children }) {
  
  const [username, setUsername] = useState('')
  const [currentGame, setCurrentGame] = useState(null)
  const [context, setContext] = useState(null)

  function getContext() {
    if (context === MULTIPLAYER) {
      return useMultiplayerBattleContext
    } else if (context === SINGLEPLAYER) {
      return useSingleplayerBattleContext
    }
    throw new Error('context not found')
  }

  function emitMessage(message) {
    socket.emit('message', message)
  }

  useEffect(() => {
    
  }, [])

  return (
    <AppContext.Provider value={{
      username,
      setUsername,
      currentGame,
      setCurrentGame,
      setContext,
      getContext
    }}>
      {children}
    </AppContext.Provider>
  )
}