import React, {useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { albumActions } from "../Store/albumSlice";
import { AlbumPreview } from "../Components/AlbumPreview";


const Albums = () => {
    const dispatch = useDispatch()
    const loadedAlbums = useSelector((state: any) => state.album.albums)

    useEffect(() => {
        dispatch(albumActions.fetchAlbums())
    },[])
    

    return (
    <>
    {loadedAlbums.length > 0 && loadedAlbums.map((album: any) => (<AlbumPreview key={album.name} album={album}/>))}
    </>
    )
}

export default Albums