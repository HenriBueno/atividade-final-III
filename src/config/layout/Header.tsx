import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Grid2 } from '@mui/material';
import Logo from '../../assets/logo-pokemon.png'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch} from '../../store/hooks';
import { getPokemonSearch } from '../../store/models/PokemonSearchSlice';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function Header() {
  const [search, setSearch] = useState<string>('');
  const dispatch = useAppDispatch();


  useEffect(() => {
    if (search.length > 2) {
      dispatch(getPokemonSearch(search));
    }
  }, [search, dispatch]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Grid2 container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems="center" display='flex' justifyContent='space-between' height='8vh'>
          <Grid2 size={{ xs: 4, md: 4 }} marginLeft={5}>
            <Link to="/">
              <img src={Logo} alt="Logo do Pokemon"
                style={{
                  width: '100%',
                  maxWidth: '150px',
                  height: 'auto',
                  display: 'flex',
                  alignItems: 'center'
                }} />
            </Link>
          </Grid2>
          <Grid2 size={{ xs: 4, md: 4 }} marginRight={5} display="flex" justifyContent="end">
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Procurar…"
                inputProps={{ 'aria-label': 'search' }}
                onChange={e => setSearch(e.target.value)}
                value={search}
              />
            </Search>
          </Grid2>
        </Grid2>
      </AppBar>
    </Box>
  );
}
