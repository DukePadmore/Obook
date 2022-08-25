import { SET_USER_FIELD, SET_USER_DATA, LOGOUT, CLEAR_PASSWORDS, TOGGLE_SIGN_IN_MODAL }  from "../actions/user";


export const initialState = {
  // user infos
  firstName:'',
  lastName:'',
  username: null,  
  email: 'marwan@gmail.com',
  // miscelleanous
  profilePicture:'https://res.cloudinary.com/obook/image/upload/v1661341818/vcyetnkhrahfxfyxrlhk.jpg',
  description:'',
  zipcode:'',
  localisation:'',
  biography:'',
  tel:'',
  // connexion
  token: null,
  isLogged: false,
  password: 'azerty1234',
  newUserName:'',
  newEmail: '',
  newPassword: '',
  newPasswordConfirm:'',
  };
  
  const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
      case SET_USER_FIELD:
      return{
        ...state,
        //action modulable qui s'appliquera aux deux champs email et password , tl-dr champ contrôlé
        [action.name]: action.value,
      }

      case SET_USER_DATA:
        //inscriptions des données user dans le state post submit 
        return{
          ...state,
          ...action.data,
        }

      case CLEAR_PASSWORDS:
        return{
          ...state,
          password:'',
          newPassword: '',
          newPasswordConfirm:'',
        }
        
      case LOGOUT:
          return{
            ...state,
            ...initialState,
            // logged: false,
            // pseudo: null,
            // token: null,
            // email: '',
            // password:'',
          };

        case TOGGLE_SIGN_IN_MODAL:
          console.log(state);
          return{
            ...state,
            signInModal: action.payload,
          }

      default:
        return state;
    }
  };
  
  export default reducer;
  