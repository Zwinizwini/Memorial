import { useEffect} from 'react'
import DisplayPhoto from '../components/DisplayPhoto'
import UploadPhoto from '../components/UploadPhoto'
import { useAuth } from '../utils/Context'
import PasCo from '../components/PasCo'
import Profil from '../components/Profil'
import MediaRecent from '../components/MediaRecent'
import AlbumList from '../components/AlbumList'

function App() {
  
  const {user} = useAuth()
  // const user=true

  useEffect(() => {
    document.title='Home'
  },[])

  return (
    <>
      {user
        ? <>
            <Profil/>
            <MediaRecent/>
            <AlbumList/>
          </>
        : <PasCo/>
      }
    </>
  )
}

export default App
