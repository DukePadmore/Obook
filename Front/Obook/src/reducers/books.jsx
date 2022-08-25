import { SET_BOOKS_RESULTS_IN_SEARCH_STATE, SET_SEARCH, SET_SELECTED_FILTER } from "../actions/books";
import {SET_BOOKS} from "../actions/books";


// initialstate : search vide et librairie API à affichier vide
export const initialState = {
    searchValue: '',
    booksData:{
      searchedBooks:[],
      myBooks:[],
      visitedProfileBooks:[],
    },
    selectedSearchFilter: 'all'
  };
  
  const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case SET_SEARCH:
            return{
              //retour du nouveau state chargé de la valeur du champ de recherche
                ...state,
                searchValue: action.payload,
            }
        // case SET_BOOKS:
        //   return{
        //     //retour du nouveau state chargé de la valeur de la librairie requêtée 
        //     ...state,
        //       oldData : action.payload,
        //   }
        case SET_SELECTED_FILTER:
          return{
            ...state,
            selectedSearchFilter: action.payload,
          }

        case SET_BOOKS_RESULTS_IN_SEARCH_STATE:
          console.log(state);
          return{
            ...state,
            booksData: {
              ...state.booksData,
              [action.name]: [...action.bookData.data],
              // searchedBooks: [...action.bookData.data],
          }};
      default:
        return state;
    }
  };
  
  export default reducer;