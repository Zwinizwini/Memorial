import styled from "styled-components"

const ProfilDiv = styled.div`
    text-align: center;
    padding: 64px;
    border-bottom: 1px solid #DDD9D2;

    & h1 {
        font-family: 'EB Garamond', Georgia, serif;
        font-size: clamp(48px, 7vw, 80px);
        font-weight: 400;
        margin-bottom: 16px;
        color: #2a2825;
    }
`

const Date = styled.p`
    font-size: 13px;
    letter-spacing: .25rem;
    color: #9A9590;
    margin-bottom: 40px;
    font-family: 'Jost', sans-serif;
`
const Bar = styled.div`
    width: 50px;
    height: 1px;
    background: #DDD9D2;
    margin: auto;
`

const Profil = () => {
  return (
    <ProfilDiv>
        <p className="tag">à la mémoire de</p>
        <h1>Jacky Viel</h1>
        <Date>11 mars 1957 . 18 mai 2022</Date>
        <Bar></Bar>
    </ProfilDiv>
  )
}

export default Profil
