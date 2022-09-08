import Field from "./Field";
import Button from "../../Button";
import EscapeButton from "../../EscapeButton";
import LoginPartModal from "./LoginPartModal/LoginPartModal";
import SignInPartModal from "./SignInPartModal/SignInPartModal";

import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { setUserField, signIn, signUp, clearPasswords, clearError } from "../../../../actions/user";
import './styles.scss';
import { NavLink } from "react-router-dom";
import { toggleSignInModal } from "../../../../actions/user";

/**
 * LoginModal(handleLoginSignInClick)
 */
// const handleChange(evt) => {
//     dispatch(setUserField(evt.target.value, name))
// }



export const LoginModal=()=>{
    
    const dispatch = useDispatch();
    const email = useSelector(state => state.user.email);
    const password = useSelector(state => state.user.password);
    const newUserName = useSelector(state => state.user.newUserName); 
    const newEmail = useSelector(state => state.user.newEmail);
    const newPassword = useSelector(state => state.user.newPassword);
    const newPasswordConfirm = useSelector(state => state.user.newPasswordConfirm);
    //destructuring possible 

    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState("error");
    
    const onChange = (value, name) => {
		dispatch(setUserField(value, name));
	};

  const handleSubmitSignIn = (e) => {
    e.preventDefault();
		dispatch(signIn());
    dispatch(clearPasswords());
	};

  const handleSubmitSignUp = (e) => {
    
    e.preventDefault();
    // vérification des mdp égaux et existants : refactorisable
    if(newPassword && newPasswordConfirm){
      if(newPasswordConfirm === newPassword){
        dispatch(signUp()),
        setIsPasswordValid(true),
        dispatch(clearError())
        
      }else{
        setErrorMessage("Erreur : les mots de passe sont différents"),
        setIsPasswordValid(false)
      }
    }else{
      setErrorMessage("Erreur : merci de renseigner les deux champs de mot de passe"),
      setIsPasswordValid(false)
    }
    dispatch(clearPasswords());
	};

  const handleClick = (e)=>{
    setLoginForm(!loginForm)
  }
  const handleQuit = ()=>{
    dispatch(toggleSignInModal(false));
    dispatch(clearError());
  }
 
  const [loginForm, setLoginForm] = useState(true);
  const isLogged = useSelector(state => state.user.isLogged);
  const error = useSelector(state => state.user.error);
  
  return (
    
    <div className="login-modal bg-[#F5F5F5] min-h-max mx-auto rounded-md h-4/6 fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 max-w-3xl px-8 py-6 drop-shadow-lg">
      {/* si un jour on a le temps de refaire les imports : go tout faire en ternaire avec 2 sous composants LoginForm / SignUpForm */}
      
      
    { !isLogged
    &&(loginForm?(
      <>
          {/* <LoginPartModal/> */}
          <form className="login-form" onSubmit={handleSubmitSignIn}>
            <h2 className="text-xl p-4">Connexion</h2>
            {/* //form de login */}
            <Field value= {email} type= "email" name= "email" placeholder="Email" onChange={onChange} />
            <Field value= {password} type= "password" name= "password" placeholder="Mot de Passe" onChange={onChange} />
            {error && <p className="text-red-700">Email ou mot de passe invalide !</p>}
            <Button name="Se connecter" type="submit" value="loginButton" className="login-button p-2 px-3 m-3 rounded bg-[#292F44] text-[#F5F5F5]" />
            <a className='block' onClick={handleClick}>Pas encore inscrit ?</a>
          </form>
      <EscapeButton className='text-[#292F44] text-3xl m-3 cursor-pointer' onClick={handleQuit}/>
      </>
      ):
        <>
          {/* <SignInPartModal/> */}
          <form className="login-form" onSubmit={handleSubmitSignUp}>
            <h2 className="text-xl p-4">Inscription</h2>
            {/* //form de sign up */}
            <Field value= {newUserName} type= "text" name= "newUserName" placeholder = "Nom d'utilisateur" onChange={onChange} />
            <Field value= {newEmail} type= "email" name= "newEmail" placeholder = "Email" onChange={onChange} />
            <Field value= {newPassword} type= "password" name= "newPassword" placeholder = "Mot de Passe" onChange={onChange} />
            <Field value= {newPasswordConfirm} type= "password" name= "newPasswordConfirm" placeholder = "Confirmez le Mot de Passe" onChange=  {onChange} />
            <Button name="S'inscrire" value="signupButton" className="signup-button p-2 px-3 m-2 rounded bg-[#292F44] text-[#F5F5F5]" />
            <a className='block' onClick={handleClick}>Déjà inscrit ?</a>
            {!isPasswordValid && <p className="text-red-700">{errorMessage}</p>}
          </form>
        <EscapeButton className='text-[#292F44] text-3xl m-3 cursor-pointer' onClick={handleQuit}/>
        </>
      )}
      </div>

  )
};
