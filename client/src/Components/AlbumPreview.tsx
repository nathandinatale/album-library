import React, {useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";


export const AlbumPreview = ({album}: any) => {

const [currAlbum, setAlbum] = useState(album)
    
const handleRental = () => {
    const token = localStorage.getItem('token')
    console.log(album._id)
    console.log(`http://localhost:5000/api/v1/albums/${album._id}/borrow`)
    axios.put(`http://localhost:5000/api/v1/albums/${album._id}/borrow`, {days: 7}, {headers: {Authorization: `Bearer ${token}`}}).then((response) => {
        setAlbum(response.data)
    })
}

const handleReturn = () => {
    const token = localStorage.getItem('token')
    axios.put(`http://localhost:5000/api/v1/albums/${album._id}/return`, {}, {headers: {Authorization: `Bearer ${token}`}}).then((response) => {
        setAlbum(response.data)
    })
}
    return(
        <>
        <p>{currAlbum.name} {currAlbum.artist}</p>
        {currAlbum.isAvailable ? <button onClick={handleRental}>Rent Me!</button> : <button onClick={handleReturn}>Return this Album!</button>}
        <Link to={`/albums/${album._id}`}>View Album</Link>
        </>
    )
}