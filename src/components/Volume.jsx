import styled from "styled-components"

const DivVolume = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #f0eee9;
    color: #fff;
    border-radius: 10px;
    padding: 7px 10px;
    font-size: 13px;
    font-weight: 500;
    text-decoration: none;
    border: 1px solid #2a2825;
    cursor: pointer;
    transition: all .3s ease-in-out, transform .1s;
    

    &:hover { 
        background-color: #2a2825;
    }
    & path, & span {
        transition: all .3s ease-in-out;
    }
    &:hover span {
        background-color: #fff;
    }


    &:active { transform: scale(0.95); }
`
const Bars = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 2px;
  height: 16px;
`

const Bar = styled.span`
  width: 3px;
  border-radius: 1px;
  background: #2a2825;
  height: 1px;
  animation: ${({$active}) => $active ? 'bounce 1s ease infinite' : 'none'};
  animation-delay: ${({$delai}) => $delai}s;

  @keyframes bounce {
    0%, 100% {
        height: 1px;
    }
    50% {
        height: 15px;
    }
  }
` 

const Volume = ({setMuted, muted}) => {

    const BAR_DATA = [0,.15,.30,.45]

    return (
        <div 
            className='container-btnStat'
            style={{width:'98%', display:'flex', justifyContent: 'end', marginBottom:'10px'}}
            onClick={() => setMuted(!muted)}
        >
            <DivVolume>
                <Bars>
                    {BAR_DATA.map((h, i) => <Bar key={i} $delai={h} $active={!muted}/>)}
                </Bars>
            </DivVolume>
        </div>
    )
}

export default Volume
