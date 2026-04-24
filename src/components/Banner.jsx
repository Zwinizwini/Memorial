import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useAuth } from '../utils/Context'
import '../styles/Banner.css'

const StyledLink = styled(Link)`
    font-size: 11px;
    text-decoration: none;
    color: #6B6762;
`

const Banner = () => {
    const {user} = useAuth()

    return (
        <div className="banner">
            <StyledLink to='/' id="bannerNom">En <span>mémoire</span></StyledLink>
            <StyledLink to="/account" id="bannerAccount">{user ? "Connecté" : "Se Connecter"}</StyledLink>
        </div>
    )
}

export default Banner