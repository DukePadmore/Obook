import { LoginModal } from './LoginModal/LoginModal';
import SearchForm from "../SearchForm";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from '../../../actions/user';
import Button from '../Button';
import { toggleSignInModal } from '../../../actions/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';


const Header=()=>{

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleLogOut = (e) => {
        console.log("LOGOUT !!")
        dispatch(logOut());
        dispatch(toggleSignInModal(false));
        
    };

    const handleSignButton = ()=>{
        console.log('sign button clicked');
        console.log("on veut dispatch toggleSignInModal(true)!")
        dispatch(toggleSignInModal(true))
    }
    const isLogged = useSelector(state => state.user.isLogged);
    const isSignModalToggled =useSelector (state=>state.user.signInModal)
        return (
        <>
        <div className='flex flex-wrap justify-evenly items-center content-baseline h-24 border-y-2 border-[#292F44] border-solid'>
            <div className='desktop:text-4xl p-4 text-[#292F44] font-semibold mobile:text-2xl flex items-center'>
                <NavLink className='flex items-center' to='/'>
                    <h2 >O'BOOK</h2>
                    <FontAwesomeIcon className='p-3' icon="fa-book-open" />
                </NavLink>
            </div> 
            <SearchForm /> 
        {isLogged?
            <div className='flex items-center'>
                <div className='flex flex-col mr-4'>
                    <NavLink className='mobile:hidden desktop:block' to = "/account"><FontAwesomeIcon className='h-10 text-[#292F44] block pl-8' icon= "user" />Mon compte</NavLink>
                </div>
                <div className='flex flex-col mr-4'>
                    <NavLink className='mobile:hidden desktop:block' to = "/mylibrary"><FontAwesomeIcon className='h-10 text-[#292F44] block pl-8' icon= "fa-book-open" />Ma bibliothèque</NavLink>
                </div>
                <button className='p-3 m-3 desktop:text-lg bg-[#292F44] text-[#F5F5F5] rounded-md h-1/2 mobile:text-sm mobile:p-2 mobile:m-2 hover:drop-shadow-lg duration-100 ease-in-out' name="Logout button" onClick={handleLogOut}>Deconnexion</button>
            </div>
        :
        <>
            {!isSignModalToggled&&

                <div>
                    <button className='mobile:hidden desktop:block p-3 m-3 text-lg bg-[#292F44] text-[#F5F5F5] rounded-md hover:drop-shadow-lg duration-100 ease-in-out' name="Connexion/inscription" onClick={handleSignButton}>Connexion / Inscription</button>
                    <button className='desktop:hidden mobile:block bg-[#292F44] text-[#F5F5F5] rounded-md text-sm p-2 m-2' name="Connexion/inscription" onClick={handleSignButton}>Connexion</button>
                </div>
                }
            
            {isSignModalToggled && <LoginModal />} 
            </>
        }
        </div>
        </>
        )
    }
    export default Header;