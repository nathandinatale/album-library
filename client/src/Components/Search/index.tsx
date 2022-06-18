import React, { useContext } from 'react'

import { SearchContext } from '../../Pages/Albums'
import classes from './Search.module.scss'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const Search = (Props: any) => {
  const typedQuery = useContext(SearchContext)

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    Props.setQuery(event.target.value)
  }

  return (
    <Box className={classes.searchContainer} component='form'>
    <TextField
    className={classes.search}
      onChange={handleSearch}
      type="text"
      placeholder="Search for an album"
      value={typedQuery}
    ></TextField>
    </Box>
  )
}

export default Search