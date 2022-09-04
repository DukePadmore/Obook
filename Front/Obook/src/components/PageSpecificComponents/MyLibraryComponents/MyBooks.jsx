import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { fetchBooks } from "../../../actions/books";
import BookCard from "../../GlobalComponents/BooksResults/BookCard";
import BookAvailabilityToggleBUtton from "../../GlobalComponents/BooksResults/BookCard/BookAvailabilityToggleButton/bookAvailabilityToggleButton";
import { sendMyBookAvailability } from "../../../actions/books";
import { getMyProfile } from "../../../actions/user";

const MyBooks = ()=>{
    // constantes
    const libraryFilter = useSelector(state=>state.books.libraryFilter)
    const myBooks = useSelector(state=>state.books.booksData.myBooks)
    // const link = `/book/${isbn}`;
    // Fonctions
    const dispatch = useDispatch();
    // console.log(libraryFilter)
    dispatch(getMyProfile());

    useEffect(() => {
        dispatch(fetchBooks());
        console.log("fetching from myBooks")
    }, []);

    // useEffect(() => {
    //     dispatch(fetchBooks());
    //     console.log("fetching from myBooks")
    // }, []);
    
    // const handleAvailabilityToggle= (e) =>{
    //     console.log('button clicked');
    //     dispatch(sendMyBookAvailability(is_available, e.target.value))}


    
    if (libraryFilter==='allMyBooks'){
        return (
            <>
                <h3>My books</h3>
                <div className='flex flex-wrap w-5/6 ml-56 justify-evenly'>
                    {myBooks.books.map((book) =>
                        (<>
                            {/* <NavLink to ={link}> */}
                            <BookCard key={`mybooks_${book.libraryid}`} {...book}/>
                            {/* </NavLink> */}
                            <BookAvailabilityToggleBUtton key={`myBooks-button${book.libraryid}`} {...book}/>
                        </>)
                    )}
                </div>
            </>
        )           
    }
    if(libraryFilter==='myLends'){
        return (
            <>
                <h3>My lends</h3>
                <div className='flex justify-evenly'>
                    {myBooks.lends.map((book) =>
                        (<>
                            <BookCard key={`myLends${book.libraryid}`} {...book}/>
                            <BookAvailabilityToggleBUtton key={`myLends-button${book.libraryid}`} {...book}/>

                        </>)    
                    )}
                </div>
            </>
        )
    }
    if(libraryFilter==='myBorrows'){
        return (
            <>
                <h3>My borrows</h3>
                <div className='flex justify-evenly'>
                    {myBooks.borrow.map((book) =>
                        (<BookCard key={`myBorrows_${book.libraryid}`} {...book}/>)
                    )}
                </div>
            </>
        )
    }

    

        
}
export default MyBooks;