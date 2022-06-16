import React, {useState} from "react";
import axios from "axios";
import {TextField, Button, Box} from '@mui/material'
import classes from './Dashboard.module.css'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const Dashboard = () => {
    const [name, setName] = useState('')
    const [iswc, setIswc] = useState('')
    const [artist, setArtist] = useState('')
    const [year, setYear] = useState('')
    const [response, setResponse] = useState('')
    
    const handleSubmit = () => {
        const token = localStorage.getItem('token')
        console.log('I was executed')
        const album = {name: name, ISWC: parseInt(iswc), artist: artist, publishedYear: parseInt(year), collaborators: ['test'], genres: ['test'], lastBorrowedDate: null, returnDate: null, _borrowerId: null, isAvailable: true}
        console.log(album)
        axios.post(`http://localhost:5000/api/v1/albums`, {...album}, {headers: {Authorization: `Bearer ${token}`}}).then((response) => setResponse(response.data))
    }


    return (
        <Box component='form' className={classes.formContainer} onSubmit={handleSubmit}>
            <TextField id='name' label='Album Name' required onChange={e => setName(e.target.value)} value={name} error={!name}/>
            <TextField id='artist' label='Primary Artist' required onChange={e => setArtist(e.target.value)} value={artist} error={!artist}/>
            <TextField id ='year' label ='Year Published' type='number' required onChange={e => setYear(e.target.value)} value={year} error={!year}/>
            <TextField id='iswc'  label='ISWC' required type='number' onChange={e => setIswc(e.target.value)} value={iswc} error={!iswc || iswc.length !== 8}
            helperText={iswc.length !== 8 && 'ISWC must be 8 characters'}/>
            <Button onClick={handleSubmit}>Submit</Button>
            {response && <Alert severity='success'>Album was submitted successfully!</Alert>}
        </Box>
    )
}

export default Dashboard