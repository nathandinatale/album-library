import React, {useState} from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from "../Store/userSlice";
import {TextField, Button, Box} from '@mui/material'
import { IconButton, Card, CardContent, Typography } from '@mui/material'
import classes from './user.module.scss'

const User = () => {
    const {id} = useParams<{id: string}>()
    const [name, setName] = useState('')

    const dispatch = useDispatch()
    const user = useSelector((state: any) => state.user)

    const handleSubmit = () => {
        const updatedUser = {userId: id, firstName: name}
        dispatch(userActions.updateUser(updatedUser))
        
    }

    return (
        <Card className={classes.formContainer}>
            <CardContent>
                <Typography variant ='h3'>Username: {user.userName}</Typography>
                <Typography variant ='h4'>Email: {user.userEmail}</Typography>
                <Typography variant = 'h4'>Role: {user.role}</Typography>

        <Box className={classes.edit} component='form' onSubmit={handleSubmit}>   
            <TextField  id='name' label='Edit user name' onChange={e => setName(e.target.value)} value={name} error={!name}/>     
            <Button variant='contained' onClick={handleSubmit}>Submit</Button>
        </Box>
        </CardContent>
        </Card>
    )
}

export default User