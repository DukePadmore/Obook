//react Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
//possible ajout de classNames plus tard

//app Components
import SearchBar from '../../SearchForm/SearchBar/SearchBar';
import SearchForm from '../../SearchForm';
import { useDispatch } from 'react-redux';

//actions 
import { getBooks, setSearchField } from '../../../../actions/books';


const MobileMenu=()=>{

    const dispatch = useDispatch();
    const [isSearchBarActive, setSearchBarActive]= useState(false);
    
    const endSearch = () => {
        dispatch(setSearchField(''));
    }
    
    const handleClick = ()=>{
        setSearchBarActive(!isSearchBarActive)
        endSearch()
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getBooks())
        endSearch()
    };

    return (
        <nav>
            {isSearchBarActive? 
                <>
                    <form onSubmit={handleSubmit}>
                        <SearchBar />
                    </form>
                    <FontAwesomeIcon icon="fa-solid fa-circle-xmark" onClick={handleClick} />
                </>
                 : 
                 <>
                    <FontAwesomeIcon icon= "magnifying-glass" onClick={handleClick} /> 
                    <NavLink to ="/"><FontAwesomeIcon icon= "house"/></NavLink>
                    <NavLink to ="/mylibrary"><FontAwesomeIcon icon= "fa-book-open" /></NavLink>
                    <NavLink to = "/account"><FontAwesomeIcon icon= "user" /></NavLink>
                </>
            }
        </nav>
    )
};
export default MobileMenu;
