import React, { useEffect, useState } from 'react';
import { Beer } from '../../types';
import { fetchData } from './utils';
import styles from './BeerList.module.css';
import {
    Avatar,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Pagination,
    TextField,
    Button,
    MenuItem,
    Typography,
    IconButton,
    Box,
} from '@mui/material';
import SportsBar from '@mui/icons-material/SportsBar';
import { useNavigate } from 'react-router-dom';
import { KeyboardArrowDown } from '@mui/icons-material';

import { styled, alpha } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';
import SortIcon from '@mui/icons-material/Sort';

import saveAsFavourite from '../../utils/favoritesUtils';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FilterAltIcon from '@mui/icons-material/FilterAlt';


const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

// const ITEMS_PER_PAGE = 50;

const BeerList = () => {
    const navigate = useNavigate();
    const [beerList, setBeerList] = useState<Array<Beer>>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [filter, setFilter] = useState<string>('');
    const [sort, setSort] = useState<string>('type,name:desc');
    const [filterBy, setFilterBy] = useState<string>('name');
    const [favourite, setFavourite] = useState<Array<string>>([]);
    const [name, setName] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [state, setState] = useState<string>('');
    const [postal_code, setPostalCode] = useState<string>('');
    const [sortType, setSortType] = useState<string>('');
    const [ItemsPerPage, setItemsPerPage] = useState<number>(50);

    useEffect(() => {
        fetchData(setBeerList, currentPage, ItemsPerPage, sort, name, city, state, postal_code, sortType).then((totalItems) => {
            setTotalPages(Math.ceil(Number(totalItems) / ItemsPerPage));
        });
        let data = JSON.parse(localStorage.getItem('favouriteList') || '[]');
        setFavourite(data);
    }, [currentPage, ItemsPerPage, filter, sort, name, city, state, postal_code, sortType]);

    const onBeerClick = (id: string) => navigate(`/beer/${id}`);

    const saveFavourite = (id: string) => {
        saveAsFavourite(id, setFavourite);
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(event.target.value);
        if (filterBy === 'name') {
            setName(event.target.value);
            setCity('');
            setState('');
            setPostalCode('');
            setSortType('');
        } else if (filterBy === 'city') {
            setCity(event.target.value);
            setName('');
            setState('');
            setPostalCode('');
            setSortType('');
        } else if (filterBy === 'state') {
            setState(event.target.value);
            setName('');
            setCity('');
            setPostalCode('');
            setSortType('');
        }  else if (filterBy === 'postal_code') {
            setPostalCode(event.target.value);
            setName('');
            setCity('');
            setState('');
            setSortType('');
        } else {
            setSortType(event.target.value);
            setName('');
            setCity('');
            setState('');
            setPostalCode('');
        }
    };

    const handleSortChange = (sort_by?: string) => {
        // Toggle between 'asc' and 'desc' when the sort button is clicked
        const baseSort = filterBy ? `type,${filterBy}:${sort_by}` : `type,name:${sort_by}`;
        // setSortType(sort_by ?? '');
        setSort((prevSort) => (prevSort === baseSort ? `${baseSort}:asc` : baseSort));
    };

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [anchorFilter, setAnchorFilter] = React.useState<null | HTMLElement>(null);
    const isopen = Boolean(anchorFilter);
    const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorFilter(event.currentTarget);
    };
    const handleFilterClose = () => {
        setAnchorFilter(null);
    };

    const [anchorType, setAnchorType] = React.useState<null | HTMLElement>(null);
    const isOpen = Boolean(anchorType);
    const handleTypeClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorType(event.currentTarget);
    };
    const handleTypeClose = () => {
        setAnchorType(null);
    };

    const [anchorPerPage, setAnchorPerPage] = React.useState<null | HTMLElement>(null);
    const IsOpen = Boolean(anchorPerPage);
    const handlePerPage = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorPerPage(event.currentTarget);
    };
    const handlePerPageClose = () => {
        setAnchorPerPage(null);
    }

    const handleSelectFilterOption = (filter_by?: string) => {
        setFilterBy(filter_by ?? '');
        const sortOrder = sort.split(':')[1];
        setSort(`type,${filter_by}:${sortOrder}`);
        setFilter('');
    };

    const handleTypeChange = (type?: string) => {
        setSortType(type ?? '');
    }

    const handlePerPageOption = (ItemsPerPage: number) => {
        setItemsPerPage(ItemsPerPage ?? '');
        setCurrentPage(1);
    }

    return (
        <article>
            <section>
                <header>
                    <h1>BeerList page</h1>
                </header>
                <main>
                    <Box display="flex" alignItems="left">
                        <Button
                            id="demo-customized-button1"
                            aria-controls={open ? 'demo-customized-menu1' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            variant="contained"
                            disableElevation
                            onClick={handleFilterClick}
                            className={styles.buttonaAlignment}
                            endIcon={<KeyboardArrowDown />}
                        >
                            <FilterAltIcon /> Filter By {filterBy === 'name' ? 'Name' : filterBy === 'city' ? 'City' : filterBy === 'state' ? 'State' : filterBy === 'postal_code' ? 'Postal Code' : 'Type'}
                        </Button>

                        <Box flexGrow={0.1} />
                        { filterBy === 'type' && (
                            <Button
                                id="demo-customized-button2"
                                aria-controls={isOpen ? 'demo-customized-menu2' : undefined}
                                aria-haspopup="true"
                                aria-expanded={isOpen ? 'true' : undefined}
                                variant="contained"
                                disableElevation
                                onClick={handleTypeClick}
                                className={styles.buttonaAlignment}
                                endIcon={<KeyboardArrowDown />}
                            >
                                <FilterAltIcon />{ sortType === 'micro' ? 'Micro' : sortType === 'bar' ? 'Bar' : sortType === 'nano' ? 'Nano' : sortType === 'regional' ? 'Regional' : sortType === 'brewpub' ? 'Brewpub' : sortType === 'large' ? 'Large' : sortType === 'planning' ? 'Planning' : sortType === 'contract' ? 'Contract' : sortType === 'proprietor' ? 'Proprietor' : sortType === 'closed' ? 'Closed' : 'Type'}
                            </Button>
                        )}
                       
                        <Box flexGrow={0.1} />
                        <TextField
                            label="Search"
                            variant="outlined"
                            value={filter}
                            onChange={handleFilterChange}
                        />
                        <Box flexGrow={8} />
                        <Button
                            id="demo-customized-butto3"
                            aria-controls={IsOpen ? 'demo-customized-men3' : undefined}
                            aria-haspopup="true"
                            aria-expanded={IsOpen ? 'true' : undefined}
                            variant="contained"
                            disableElevation
                            onClick={handlePerPage}
                            className={styles.buttonaAlignment}
                            endIcon={<KeyboardArrowDown />}
                        >
                            <SortIcon /> { ItemsPerPage === 20 ? '20' : ItemsPerPage === 50 ? '50' : ItemsPerPage === 100 ? '100' : ItemsPerPage === 150 ? '150' : ItemsPerPage === 200 ? '200' : '50'}
                        </Button>
                        <Box flexGrow={1} /> {/* Adjust the margin value as needed */}
                        <Button
                            id="demo-customized-button"
                            aria-controls={open ? 'demo-customized-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            variant="contained"
                            disableElevation
                            onClick={handleClick}
                            className={styles.buttonaAlignment}
                            endIcon={<KeyboardArrowDown />}
                        >
                            <SortIcon /> Sort {sort === 'type,name:asc' ? 'Asc' : 'Desc'}
                        </Button>
                    </Box>
                    <StyledMenu
                        id="demo-customized-menu"
                        MenuListProps={{
                            'aria-labelledby': 'demo-customized-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >

                        <MenuItem onClick={handleSortChange.bind(this, 'asc')} disableRipple>
                            <SortIcon />
                            Asc
                        </MenuItem>
                        <MenuItem onClick={handleSortChange.bind(this, 'desc')} disableRipple>
                            <SortIcon />
                            Desc
                        </MenuItem>
                    </StyledMenu>
                    <StyledMenu
                        id="demo-customized-men2"
                        MenuListProps={{
                            'aria-labelledby': 'demo-customized-butto2',
                        }}
                        anchorEl={anchorType}
                        open={isOpen}
                        onClose={handleTypeClose}
                    >

                        <MenuItem onClick={handleTypeChange.bind(this, 'micro')} disableRipple>
                            Micro
                        </MenuItem>
                        <MenuItem onClick={handleTypeChange.bind(this, 'bar')} disableRipple>
                            Bar
                        </MenuItem>
                        <MenuItem onClick={handleTypeChange.bind(this, 'nano')} disableRipple>
                            Nano
                        </MenuItem>
                        <MenuItem onClick={handleTypeChange.bind(this, 'regional')} disableRipple>
                            Regional
                        </MenuItem>
                        <MenuItem onClick={handleTypeChange.bind(this, 'brewpub')} disableRipple>
                            Brewpub
                        </MenuItem>
                        <MenuItem onClick={handleTypeChange.bind(this, 'bar')} disableRipple>
                            Bar
                        </MenuItem>
                        <MenuItem onClick={handleTypeChange.bind(this, 'large')} disableRipple>
                            Large
                        </MenuItem>
                        <MenuItem onClick={handleTypeChange.bind(this, 'planning')} disableRipple>
                            Planning
                        </MenuItem>
                        <MenuItem onClick={handleTypeChange.bind(this, 'contract')} disableRipple>
                            Contract
                        </MenuItem>
                        <MenuItem onClick={handleTypeChange.bind(this, 'proprietor')} disableRipple>
                            Proprietor
                        </MenuItem>
                        <MenuItem onClick={handleTypeChange.bind(this, 'closed')} disableRipple>
                            Closed
                        </MenuItem>
                    </StyledMenu>
                    <StyledMenu
                            id="demo-customized-menu1"
                            MenuListProps={{
                                'aria-labelledby': 'demo-customized-button1',
                            }}
                            anchorEl={anchorFilter}
                            open={isopen}
                            onClose={handleFilterClose}
                        >

                            <MenuItem onClick={handleSelectFilterOption.bind(this, 'name')} disableRipple>
                                <FilterAltIcon />
                                Name
                            </MenuItem>
                            <MenuItem onClick={handleSelectFilterOption.bind(this, 'city')} disableRipple>
                                <FilterAltIcon />
                                City
                            </MenuItem>
                            <MenuItem onClick={handleSelectFilterOption.bind(this, 'state')} disableRipple>
                                <FilterAltIcon />
                                State
                            </MenuItem>
                            <MenuItem onClick={handleSelectFilterOption.bind(this, 'postal_code')} disableRipple>
                                <FilterAltIcon />
                                Postal Code
                            </MenuItem>
                            <MenuItem onClick={handleSelectFilterOption.bind(this, 'type')} disableRipple>
                                <FilterAltIcon />
                                Type
                            </MenuItem>
                        </StyledMenu>

                        <StyledMenu
                            id="demo-customized-menu3"
                            MenuListProps={{
                                'aria-labelledby': 'demo-customized-button3',
                            }}
                            anchorEl={anchorPerPage}
                            open={IsOpen}
                            onClose={handlePerPageClose}
                        >

                            <MenuItem onClick={handlePerPageOption.bind(this, 20)} disableRipple>
                                <FilterAltIcon />
                                20
                            </MenuItem>
                            <MenuItem onClick={handlePerPageOption.bind(this, 50)} disableRipple>
                                <FilterAltIcon />
                                50
                            </MenuItem>
                            <MenuItem onClick={handlePerPageOption.bind(this, 100)} disableRipple>
                                <FilterAltIcon />
                                100
                            </MenuItem>
                            <MenuItem onClick={handlePerPageOption.bind(this, 150)} disableRipple>
                                <FilterAltIcon />
                                150
                            </MenuItem>
                            <MenuItem onClick={handlePerPageOption.bind(this, 200)} disableRipple>
                                <FilterAltIcon />
                                200
                            </MenuItem>
                        </StyledMenu>
                    <List>
                        {beerList.map((beer) => (
                            <ListItemButton key={beer.id}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <SportsBar />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText key={beer.id} onClick={onBeerClick.bind(this, beer.id)} primary={beer.name} secondary={beer.brewery_type} />
                                <Typography variant="h4" gutterBottom>
                                    <IconButton onClick={saveFavourite.bind(this, beer?.id ?? "")} color="primary" size="large">
                                        {favourite.includes(beer?.id ?? '') ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                                    </IconButton>
                                </Typography>
                            </ListItemButton>
                        ))}
                    </List>
                    <Box display="flex" justifyContent="center" marginTop={2}>
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={handlePageChange}
                            showFirstButton
                            showLastButton
                            variant="outlined" color="primary"
                        />
                    </Box>
                </main>
            </section>
        </article>
    );
};

export default BeerList;