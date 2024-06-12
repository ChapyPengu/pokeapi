import { Routes, Route } from 'react-router-dom'
import Start from './pages/Start'
import Battle from './pages/Battle'
import NotFound from './pages/NotFound'
import ProtectedBattle from './routes/ProtectedBattle'
import ProtectedStartGame from './routes/ProtectedStartGame'
import { useApp } from './context/AppContext'
import { MultiplayerBattleContextProvider } from './context/MultiplayerBattleContext'
import { SingleplayerBattleContextProvider } from './context/SingleplayerBattleContext'
import { MULTIPLAYER } from './config/config'
import MultipalyerGame from './pages/game/MultipalyerGame'
import SingleplayerGame from './pages/game/SingleplayerGame'

function App() {

  const { currentGame: context } = useApp()

  const Provider = context === MULTIPLAYER ? MultiplayerBattleContextProvider : SingleplayerBattleContextProvider
  const Game = context === MULTIPLAYER ? MultipalyerGame : SingleplayerGame

  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route element={<ProtectedStartGame />}>
          <Route path='/home/*' element={
            <Provider>
              <Routes>
                <Route path='/:page' element={<Game />} />
                <Route element={<ProtectedBattle />}>
                  <Route path='/battle' element={<Battle />} />
                </Route>
              </Routes>
            </Provider>} />
        </Route>
        {/* <Route path='/' element={<Home currentPage={1} />} /> */}
        {/* <Route path='/:page' element={<Home />} /> */}
        {/* <Route path='/:page' element={<Home />} /> */}
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App