import { useState, useEffect, useContext, createContext } from 'react'
import io from 'socket.io-client'

const MultiplayerBattleContext = createContext()
// const socket = io('/')

export function useMultiplayerBattleContext() {
  const context = useContext(MultiplayerBattleContext)
  if (!context)
    throw new Error('context not found')
  return context
}

export function MultiplayerBattleContextProvider({ children }) {

  useEffect(() => {
    console.log('Multiplayer battle')
  }, [])
  
  return (
    <MultiplayerBattleContext.Provider value={{}}>
      {children}
    </MultiplayerBattleContext.Provider>
  )
}