import styled from "styled-components"

const Div = styled.div`
  width: 80%;
  margin: auto;
  border-radius: 10px;
  background-color: #f0eee9;
  border: 1px solid #DDD9D2;
  color: #2a2825;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: clamp(20px, 7vw, 40px);
  padding: 20px;
`
const PasCo = () => {
  return (
    <Div>
      Veuillez-vous connecter avec le bouton "SE CONNECTER" situé en haut à droite de votre écran
    </Div>
  )
}

export default PasCo
