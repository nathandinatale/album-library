import React, {useEffect, useState, createContext} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { albumActions } from "../Store/albumSlice";
import { AlbumPreview } from "../Components/AlbumPreview";
import { userActions } from "../Store/userSlice";
import Search from "../Components/Search";
import { useNavigate } from "react-router-dom";

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper, Stack, Pagination, TablePagination, TableFooter,
    Button
  } from '@mui/material'
  import classes from './Albums.module.scss'


export const SearchContext = createContext<string>('')


const Albums = () => {
    const [query, setQuery] = useState('')
    const [genres, setGenres] = useState('')

    const [page, setPage] = useState(0)
    const [count, setCount] = useState(5)

    const navigate = useNavigate()

    
    const dispatch = useDispatch()
    const loadedAlbums = useSelector((state: any) => state.album.albums)
    const userId = useSelector((state: any) => state.user._id)

    useEffect(() => {
        dispatch(userActions.checkLogin())
        dispatch(albumActions.fetchAlbumsPaginated({offset: page*count, count: count}))
        console.log('page:',page,'count: ',count)
    },[page, count])

    const searchQuery = query.toLowerCase()

    const checkQueryMatches = (array: any[]) => {
        return array.filter((album: any) => album.name.toLowerCase().includes(searchQuery) 
        || album.artist.toLowerCase().includes(searchQuery) 
        || album.ISWC.toString().includes(searchQuery))
    }

    const mapResults = (array: any[])  => {
        return array.map((album: any) => (<AlbumPreview key={album.name} album={album}/>))
    }

    const handleLogout = () => {
        dispatch(userActions.signOut())
        navigate('/')
    }

    const handlePageSwitch = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      ) => {
        setCount(parseInt(event.target.value, 10));
        setPage(0);
      };



  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')

  const tabs = ['My Profile', 'Dashboard', 'Logout']
    

    return (
    <SearchContext.Provider value = {query}>
        <Link to={`/users/${userId}`}>My Profile</Link>
        {role === 'ADMIN' && <Link to={'/dashboard'}>     Dashboard</Link>}
        <Search setQuery={setQuery}/>
        <Button onClick={handleLogout}>Logout</Button>
    {/* {loadedAlbums.length > 0 && loadedAlbums.map((album: any) => (<AlbumPreview key={album.name} album={album}/>))} */}
    <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                <TableCell>Album Name</TableCell>
              <TableCell>Artist</TableCell>
              <TableCell>Year Published</TableCell>
              <TableCell>ISWC</TableCell>
              <TableCell>Rental Status</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {searchQuery ? mapResults(checkQueryMatches(loadedAlbums)) : mapResults(loadedAlbums)}
            </TableBody>
            <TableFooter>
    <TablePagination
      count={100}
      page={page}
      onPageChange={handlePageSwitch}
      rowsPerPage={count}
      onRowsPerPageChange={handleChangeRowsPerPage}
      rowsPerPageOptions={[5,10,15,20,25,50,100]}
    />
    </TableFooter>           
    </Table>
    </TableContainer>

    </SearchContext.Provider>
    )
}

export default Albums