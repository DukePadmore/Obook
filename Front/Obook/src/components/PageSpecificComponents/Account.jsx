import { useDispatch, useSelector } from "react-redux";
import { setUserData, SetUserLabel, setUserModifyAccountField, sendModifiedInfos, addTagUser, removeTagUser, getAllTags} from "../../actions/user";
import Axios from "axios";
import { useState } from "react";
import Field from "../GlobalComponents/Header/LoginModal/Field";
import { useEffect } from "react";
import { setLoading } from "../../actions/books";

const Account = () =>{
    const tags = useSelector(state => state.user.tags);
    // hooks
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setLoading(true));
        dispatch(getAllTags());
    }, [tags]);
    
    //NewModifications
    const newProfilePicture = useSelector(state => state.user.accountModifications.newProfilePicture);
    const newFirstName = useSelector(state => state.user.accountModifications.firstname);
    const newLastName = useSelector(state=>state.user.accountModifications.lastname);
    const newUsername = useSelector(state=>state.user.accountModifications.username);
    const newBiography = useSelector(state=>state.user.accountModifications.biography);
    const newLocalisation = useSelector(state=>state.user.accountModifications.localisation);
    const newZipcode = useSelector(state=>state.user.accountModifications.zipcode);
    const oldPassword = useSelector(state=>state.user.accountModifications.oldPassword);
    const newPassword = useSelector(state=>state.user.accountModifications.password);
    const newPasswordConfirm = useSelector(state=>state.user.accountModifications.passwordConfirm);
    const accountModifications = useSelector(state=>state.user.accountModifications);
    const tel = useSelector(state=> state.user.accountModifications.tel);
    const userImg = useSelector(state=>state.user.profile_picture);

    // MISE EN PLACE DES DONNÉES LIÉES AUX LABELS
    
    console.log(tags);
    const allTags = useSelector(state => state.user.allTags);

    // const labels = [
    //     {id: 1, name:'Romans', color: 'bg-sky-600', hover: 'hover:bg-sky-700'},
    //     {id: 2, name:'Science-Fiction & Fantasy', color: 'bg-red-600', hover: 'hover:bg-red-700'},
    //     {id: 3, name:'Polar & Thriller', color: 'bg-gray-800', hover: 'hover:bg-gray-900'},
    //     {id: 4, name:'BD & Manga', color: 'bg-amber-400', hover: 'hover:bg-amber-500'},
    //     {id: 5, name:'Littérature classique', color: 'bg-yellow-800', hover: 'hover:bg-yellow-900'},
    //     {id: 6, name:'Enfants & Jeunesse', color: 'bg-fuchsia-500', hover: 'hover:bg-fuchsia-600'},
    //     {id: 7, name:'Savoir', color: 'bg-green-600', hover: 'hover:bg-green-700'},
    //     {id: 8, name:'Loisirs', color: 'bg-orange-600', hover: 'hover:bg-orange-700'},
    //     {id: 9, name:'Autres', color: 'bg-teal-600', hover: 'hover:bg-teal-700'},
    // ];

    let classNameActiveLabel = '';
    // fonctions
    const [imageSelected, setImageSelected] = useState("");
    // console.log("notre selected image", imageSelected)
    const uploadImage = (e)=>{
        e.preventDefault();
        // A dispatch dans une action middleware (auth?)
        const formData = new FormData()
        formData.append("file", imageSelected)
        formData.append("upload_preset", "visitor of Obook website")
        
        Axios.post("https://api.cloudinary.com/v1_1/obook/upload",formData)
        .then((response)=>{
            // dispatch(setUserModifyAccountField(response.data.secure_url, newProfilePicture));
            dispatch(sendModifiedInfos({
                "profile_picture": response.data.secure_url,
            }))
        });
    };
    const handleChange = (value, name) => {
		dispatch(setUserModifyAccountField(value, name));
        console.log("NOUVELLE VALUE DU", name, "==>",value)
    }

    const handleAddTag = (e) => {
        e.preventDefault();
        console.log(`label ${e.target.value} added`);
        dispatch(addTagUser(e.target.value));
    };

    const handleRemoveTag = (e) => {
        e.preventDefault();
        console.log(`label ${e.target.value} removed`);
        dispatch(removeTagUser(e.target.value))
        console.log("TAGS POST RM",  tags);
        dispatch(getAllTags)
    };

    const handleSubmit = (e)=> {
        e.preventDefault();
        console.log(accountModifications);

        // Object.keys(data).forEach(key => {
        //     data[key] = data[key] || '';
        // }
        const modifiedInfo = {
            ...accountModifications,
        }
       Object.keys(modifiedInfo).forEach(key=> {
        if (modifiedInfo[key] === ''){
            delete modifiedInfo[key];
        }
        })
        console.log("post traitement de l'info", modifiedInfo);

        dispatch(sendModifiedInfos({
            ...modifiedInfo,

        }));
    }

    return (
    <form>
    <div className="flex w-full items-center mobile:flex-col desktop:flex-row mobile:pb-24">
        <div className="desktop:w-1/2 mobile:w-full">
        {/* Upload D' images */}
            <div className="flex justify-center desktop:items-end mobile:items-center m-5 mobile:flex-col desktop:flex-row">
                <img className="rounded-full h-40 w-40" src={userImg||"https://res.cloudinary.com/obook/image/upload/v1661345211/nl2gtqzgbnqyo5ilgzfz.jpg"}></img>
                <div className="flex flex-col">
                    <input type="file" onChange={event=>setImageSelected(event.target.files[0])}/>
                    <button className="bg-[#292F44] text-[#F5F5F5] rounded-md h-1/2" name="upload Image" onClick={uploadImage}>Upload Image</button>
                </div>
            </div>

            {/* Infos "secondaires" */}
            <Field value={newLocalisation}type="text" name="localisation" placeholder="Région" onChange={handleChange}/>
            <Field value={newZipcode} type="text" name="zipcode" placeholder="Code postal" onChange={handleChange}/> 
            <Field value={newBiography} type="text" name="biography" placeholder="Biographie" onChange={handleChange}/>
            <Field value={tel} type="number" name="tel" placeholder="Numéro de téléphone" onChange={handleChange}/>

            <span className="bg-#ff253a flex content-center justify-center">

            <div className="m-5 grid grid-cols-3 gap-1 flex content-center justify-center h-full items-center justify-content: space-evenly">
                {/* VERSION INITIALE FONCTIONNELLE */}
            {/* {labels.map(label => {
                if (tags.find(tag => tag.label===label.name)){
                    classNameActiveLabel = `mobile:text-xs desktop:text-sm desktop:w-[120px] mobile:w-[100px] p-2 max-w-sm mx-auto text-white ${label.color} ${label.hover} rounded-xl shadow-lg flex items-inline-block space-x-1`;
                    return <button
                    key={label.id}
                    className={classNameActiveLabel}
                    value={label.id}
                    onClick={handleRemoveTag}
                    >
                    {label.name}
                    </button>
                } else {
                    return <button
                    key={label.id}
                    className="mobile:text-xs desktop:text-sm desktop:w-[120px] mobile:w-[100px] p-2 max-w-sm mx-auto text-white bg-gray-300 hover:bg-gray-400 rounded-xl shadow-lg flex items-inline-block space-x-1"
                    value={label.id}
                    onClick={handleAddTag}
                    >
                    {label.name}
                    </button>
                }
            })} */}
            {allTags?.map(label => {
                if (tags.find(tag => tag.label===label.label)){
                    classNameActiveLabel = `mobile:text-xs desktop:text-sm desktop:w-[190px] mobile:w-[100px] p-2 mx-auto text-white ${label.color} ${label.hover} rounded-xl shadow-lg `;
                    return <button
                    key={label.id}
                    className={classNameActiveLabel}
                    value={label.id}
                    onClick={handleRemoveTag}
                    >
                    {label.label}
                    </button>
                } else {
                    return <button
                    key={label.id}
                    className="mobile:text-xs desktop:text-sm desktop:w-[190px] mobile:w-[100px] p-2 mx-auto text-white bg-gray-300 hover:bg-gray-400 rounded-xl shadow-lg"
                    value={label.id}
                    onClick={handleAddTag}
                    >
                    {label.label}
                    </button>
                }
            })}
            </div>

            </span>
        </div>

        <div className="desktop:w-1/2 mobile:w-full">

            {/* informations dures */}
            <Field value={newLastName} type="text" name="lastname" placeholder="Nom" onChange={handleChange} />
            <Field value={newFirstName} type="text" name="firstname" placeholder="Prénom" onChange={handleChange} />
            <Field value={newUsername} type="text" name="username" placeholder="Pseudonyme" onChange={handleChange} />
            {/* <Field value={telephone} type="telephone" name="telephone" placeholder="Téléphone" onChange={handleChange} /> */}
            <Field value={oldPassword} type="password" name="oldPassword" placeholder="Ancien Mot de passe" onChange={handleChange} />
            <Field value={newPassword} type="password" name="password" placeholder="Nouveau mot de passe" onChange={handleChange} />
            <Field value={newPasswordConfirm} type="password" name="passwordConfirm" placeholder="Confirmation du mot de passe" onChange={handleChange} />

            <button className='bg-[#AB9F9F] hover:bg-[#8f8585] text-black rounded-md font-bold p-2 text-lg m-3' type="submit" onClick={handleSubmit}>Confirmer</button>
        </div>
    </div>
    
    </form>
    )
};


export default Account;