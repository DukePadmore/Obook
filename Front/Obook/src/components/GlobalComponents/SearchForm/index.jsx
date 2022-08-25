import { useDispatch } from 'react-redux';
import { fetchBooks } from '../../../actions/books';
import Button from '../Button';
import SearchFilters from './SearchFilters';
import SearchBar from './SearchBar/SearchBar';

const SearchForm=()=>{


    const dispatch = useDispatch();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(fetchBooks())
    
    };

    
   
    
    return (
    <form onSubmit={handleSubmit}>
        <SearchBar className= "search-form__input"/>
        <Button type ="submit" name="Valider" value="searchButton" className="search-button" />
        <SearchFilters />
    </form>
    )
}
export default SearchForm;

