import React, { useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { albumActions } from "../Store/albumSlice";

const Album = () => {
    const dispatch = useDispatch()
    const selectedAlbum = useSelector((state: any) => state.album.selectedAlbum)

    const { id } = useParams<{id: string}>()
    console.log(id)

    useEffect(() => {
        dispatch(albumActions.fetchAlbum({albumId: id}))
    },[])




    return(
        <>
        {selectedAlbum && <p>{selectedAlbum.name}</p>}
        </>
    )
}

export default Album