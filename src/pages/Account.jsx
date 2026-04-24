import Connexion from "../components/Connexion"
import { useAuth } from "../utils/Context"
import { supabase } from "../supabase"
import Inscription from "../components/Isncritpion"
import { useEffect } from "react"
import SousTitre from '../components/SousTitre'

const deconnexion = async () => {
    await supabase.auth.signOut()
}

const Account = () => {
    const {user} = useAuth()

    useEffect(() => {
        document.title='Compte'
    },[])

    return (
        <div>
            {user ?
                <div className="compte-body">
                    <SousTitre info1={"Vous êtes connecté"}/>
                    <button className="btnValider" onClick={() => deconnexion()}>Deconnexion</button>
                </div>
                : <Connexion/>
            }
        </div>
    )
}

export default Account