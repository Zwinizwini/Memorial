import React from 'react'
import { useState } from 'react'
import { supabase } from '../supabase'
import styled, {keyframes} from 'styled-components'

const slideIn = keyframes`
  from { 
    opacity: 0; 
    transform: translateY(-8px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
`

const ErrorBanner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 14px 20px;

  background: #F8F7F5;
  border: 1px solid #DDD9D2;
  border-left: 3px solid #a32f12;

  animation: ${slideIn} .3s ease both;
`

const ErrorText = styled.p`
  font-family: 'Jost', sans-serif;
  font-size: 13px;
  font-weight: 300;
  letter-spacing: .04em;
  color: #a32f12;
`

const connexion = async (pseudo, mdp, setErreur) => {
       
    if(pseudo.toLowerCase() === "famille") {
        const {data, error} = await supabase.auth.signInWithPassword({
            email: 'theozwaenepoel@gmail.com',
            password: mdp
        })
        if (error) setErreur(true)
        setErreur(false)
        return data
    } else {
        setErreur(true)
    }
}

const Connexion = () => {
    const [email, setEmail] = useState("")
    const [mdp, setMdp] = useState("")
    const [erreur, setErreur] = useState(false)

    return (
        <div className="compte-body">
            <label className='tag'>
                Identifiant
                <input type="text" value={email} placeholder="Identifiant" onChange={(e) => setEmail(e.target.value)} className='simpleinput'/>
            </label>
            
            <label className='tag'>
                Mot de passe
                <input type="password" value={mdp} placeholder="Mot de passe" onChange={(e) => setMdp(e.target.value)} className='simpleinput'/>
            </label>
            {erreur && <ErrorBanner><ErrorText>Identifiant ou mot de passe incorrect</ErrorText></ErrorBanner>}
            <button className="btnValider" 
                disabled={email.length === 0 || mdp.length === 0} 
                onClick={() => connexion(email, mdp, setErreur)}
            >Connexion</button>
        </div>
    )
}

export default Connexion
