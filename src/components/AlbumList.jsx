import React, { useContext } from 'react'
import { AlbumContext } from '../utils/Context'
import styled from 'styled-components'
import SousTitre from './SousTitre'
import AlbumItem from './AlbumItem'
import { albumTemp } from '../utils/data'
import { Link } from 'react-router-dom'

const StyleLi = styled(Link)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    list-style: none;
    width: 100%;
    margin-bottom: 5px;
    border-bottom: 1px solid #DDD9D2;
    padding: 20px 0px;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.2s;
    &:first-child {
        border-top: 1px solid #DDD9D2;
    }
    &:hover {
        transform: scale(1.05);
    }
`

const ListeAlbum = styled.div`
    width: 80%;
    max-width: 1000px;
`

const H3 = styled.p`
    margin: 0;
    font-family: 'EB Garamond', Georgia, serif;
    font-size: 16px;
    margin-bottom: 4px;
    color: black;
    margin-left: 10px;
`


const AlbumList = () => {
    const {albumList} = useContext(AlbumContext)

    return (
        <div className='content' style={{background: '#f8f7f5'}}>
            <div className="header">
                <SousTitre info1={"Les"} info2={"albums"}/>
                <div className='info'>{albumList.length} albums</div>
            </div>
            <div className="bar"/>

            <ListeAlbum>
                {albumList.map(album => (
                    <StyleLi key={album.id} to={`/album/${album.id}/${album.name}`}>
                        <AlbumItem album={album}/>
                    </StyleLi>
                ))}
                <StyleLi to='/album/ajouter'>
                    <H3>Rajouter un album</H3>
                    <svg width="14" height="14" viewBox="0 0 20 11" fill="none" style={{marginRight: '10px'}}>
                        <path d="M 19 6 L 14 2 V 5 H 2 V 7 H 14 V 10 Z" fill="#9A9590"/>
                    </svg>
                </StyleLi>
            </ListeAlbum>

        </div>
    )
}

export default AlbumList
