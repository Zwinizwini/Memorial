import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../supabase'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // On récupère l'user une seule fois au démarrage de l'app
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {/* On n'affiche rien tant qu'on ne sait pas si l'user est connecté */}
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

export const MediaContext = createContext()

export const MediaProvider = ({children}) => {
    const [mediaList, setMediaList] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getMedia = async () => {
            const {data, error} = await supabase
                .from('media')
                .select('*')
                .order('created_at', {ascending: false})
            
            if(error) console.error(error)
            if (data) {setMediaList(data)
                setLoading(false)
            }
        }
        getMedia()
    }, [])

    return (
        <MediaContext.Provider value={{mediaList, setMediaList, loading, setLoading}}>
            {children}
        </MediaContext.Provider>
    )
}

export const AlbumContext = createContext()

export const AlbumProvider = ({children}) => {
    const [albumList, setAlbumList] = useState([])

    useEffect(() => {
        const getAlbum = async () => {
            const {data, error} = await supabase
                .from('album')
                .select('*')
                .order('id', {ascending: false})
            
            if(error) console.error(error)
            if (data) setAlbumList(data)
        }
        getAlbum()
    }, [])

    return (
        <AlbumContext.Provider value={{albumList, setAlbumList}}>
            {children}
        </AlbumContext.Provider>
    )
}
