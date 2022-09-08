export const SET_USER_FIELD = 'SET_USER_FIELD'; //change user field
export const SET_USER_MODIFY_ACCOUNT_FIELD = 'SET_USER_MODIFY_ACCOUNT_FIELD'; //change user field
export const SEND_MODIFIED_INFOS = 'SEND_MODIFIED_INFOS';
export const SET_USER_DATA ='SET_USER_DATA';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_UP = 'SIGN_UP';
export const CLEAR_PASSWORDS = 'CLEAR_PASSWORDS';
export const SETCREATIONCONFIRMATION = 'SETCREATIONCONFIRMATION';
export const LOGOUT = 'LOGOUT';
export const DEL_ACCOUNT = 'DEL_ACCOUNT';

// export const SET_ADDED_TAG = 'SET_ADDED_TAG';
export const GET_ALL_TAGS = 'GET_ALL_TAGS';
export const SET_ALL_TAGS = 'SET_ALL_TAGS';
export const SET_MY_TAGS = 'SET_MY_TAGS'

export const END_LOAN = 'END_LOAN';
//à voir dans un second temps une fois branché au back
export const CHANGE_USER_INFO = 'CHANGE_USER_INFO';
//séparation entre action demandant une confirmation et autres infos secondaires
export const CHANGE_USER_INFO_MISC = 'CHANGE_USER_INFO_MISC'; 
export const SET_USER_LABEL = 'SET_USER_LABEL';
export const ADD_TAG_USER = 'ADD_TAG_USER';
export const REMOVE_TAG_USER = 'REMOVE_TAG_USER';

// actions requêtant au serveur les données user / another member
export const GET_MY_LIBRARY = 'GET_MY_LIBRARY'; 
export const GET_MEMBER_PROFILE = 'GET_MEMBER_PROFILE';
//zipcode, area, labels, bio, pic
// toggle de la modale de connexion/inscription
export const TOGGLE_SIGN_IN_MODAL = 'TOGGLE_SIGN_IN_MODAL';
export const DISPATCH_ERROR = 'DISPATCH_ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';

export const setUserField = (value, name) => ({
	type: SET_USER_FIELD,
	value,
	name,
});
export const setUserModifyAccountField = (value, name) => ({
	type: SET_USER_MODIFY_ACCOUNT_FIELD,
	value,
	name,
});
export const setUserData = (data) => ({
	type: SET_USER_DATA,
	data,
});

export const signIn = () => ({
	type: SIGN_IN,
});

export const signUp = () => ({
	type: SIGN_UP,
});

export const clearPasswords = () =>({
	type: CLEAR_PASSWORDS,
});

export const setCreationConfirmation = (data)=>({
	type : SETCREATIONCONFIRMATION,
	data,
})

export const logOut = () => ({
	type: LOGOUT,
});

export const SetUserLabel = (label) =>({
	type: SET_USER_LABEL,
	payload: label,
})
export const getMyLibrary = () => ({
	type: GET_MY_LIBRARY,
});

export const getMemberProfile = (username) => ({
	type: GET_MEMBER_PROFILE,
	payload: username
});

export const sendModifiedInfos = (data) => ({
	type: SEND_MODIFIED_INFOS,
	data,
});

export const toggleSignInModal = (boolean) =>({
	type: TOGGLE_SIGN_IN_MODAL,
	payload: boolean
});

export const addTagUser = (tagId) =>({
	type: ADD_TAG_USER,
	payload: tagId,
});

export const removeTagUser = (tagId) =>({
	type: REMOVE_TAG_USER,
	payload: tagId,
});

// export const setAddedTag = (data) =>({
// 	type: SET_ADDED_TAG,
// 	payload: data,
// });

export const getAllTags = () =>({
	type: GET_ALL_TAGS,
});

export const setAllTags = (data) =>({
	type: SET_ALL_TAGS,
	payload: data,
});

export const setMyTags = (data)=>({
	type : SET_MY_TAGS,
	payload : data,
});

export const endLoan = (loanId) =>({
	type: END_LOAN,
	payload: loanId,
});

export const dispatchError = () =>({
	type: DISPATCH_ERROR,
});

export const clearError = () =>({
	type: CLEAR_ERROR,
});