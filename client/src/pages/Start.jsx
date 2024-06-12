import { useApp } from '../context/AppContext'
import { MULTIPLAYER, SINGLEPLAYER } from '../config/config'
import { useNavigate } from 'react-router-dom'

function Start() {
  const { setCurrentGame, setContext } = useApp()
  const navigate = useNavigate()

  function handleMultiplayerClick() {
    setCurrentGame(MULTIPLAYER)
    setContext(MULTIPLAYER)
    navigate('/home/1')
  }

  function handleSingleplayerClick() {
    setCurrentGame(SINGLEPLAYER)
    setContext(SINGLEPLAYER)
    navigate('/home/1')
  }

  return (
    <div className='flex flex-col justify-center items-center'>
      <div>
        <button className='start__btn' onClick={handleMultiplayerClick}>Multiplayer</button>
        <button className='start__btn' onClick={handleSingleplayerClick}>Singleplayer</button>
      </div>
    </div>
  )
}

export default Start