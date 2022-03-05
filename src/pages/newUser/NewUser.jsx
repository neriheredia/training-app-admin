import { useState } from "react";
// import { publicRequest } from '../../requestMethods';
import { useHistory } from 'react-router-dom'
import { Publish } from "@material-ui/icons";
import "./newUser.css";
import { register } from "../../redux/apiCalls/registerCall/createRegister";
import { useDispatch } from "react-redux";
import Swal from 'sweetalert2'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import app from '../../firebase'
import { useEffect } from "react";

export default function NewUser() {
    const history = useHistory()
    const [errors, setErrors] = useState({});

    const [newUserForm, setNewUser] = useState({})

    const dispatch = useDispatch()

    const [PHImage, setPH] = useState('')
    const [imgUpdate, setImg] = useState('')

    const handleImage = (e) => {
        e.preventDefault()
        let preventSubmit=document.getElementById('up')
        let totalSubmit=document.getElementsByClassName('newUserUpdateButton')[0]
        //totalSubmit
        preventSubmit.disabled='true'
                preventSubmit.style.opacity=.4
                preventSubmit.innerText='Uploading...'
                preventSubmit.style.cursor='progress'
                document.getElementsByTagName('html')[0].style.cursor='progress'

        totalSubmit.style.opacity=.7
        totalSubmit.disabled='true'
        totalSubmit.innerText='Loading...'

        const fileName = new Date().getTime() + imgUpdate.name

        const storage = getStorage(app)
 
        const storageRef = ref(storage, fileName)

        const uploadTask = uploadBytesResumable(storageRef, imgUpdate);

        uploadTask.on('state_changed',
            (snapshot) => {

                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                }
            },
            (error) => {},
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

                    setNewUser({
                        ...newUserForm,
                        profile_img: imgUpdate?downloadURL:''
                    })
                    preventSubmit.style.opacity=1
                    preventSubmit.innerText='Uploaded'
                    document.getElementsByTagName('html')[0].style.cursor='default'

                    totalSubmit.style.opacity=1
                    totalSubmit.innerText='Update'
                    document.getElementsByClassName('newUserUpdateButton')[0].disabled=false

                });
            })
    }

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    useEffect(()=>{
        console.log(newUserForm)
    })

    function handleChange(e){
        e.preventDefault()

        let field = e.target.name
        let input = e.target.value 

        if(field==='password'){ 
            if(!/(?=.*\d).{8,}$/.test(input)) setErrors({...errors, password:"Password must contain at least8 characters and 1 number"})
            else setErrors({...errors, [field]:''})
        }

        if(field==='username'){
            if(input.length<5) setErrors({...errors, username:"newUsername must contain at least 5 characters"})
            else setErrors({...errors, [field]:''})
        }

        if(field==='email'){
            if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(input)) setErrors({...errors, email:"Please enter a valid email"})
            else setErrors({...errors, [field]:''})
        }

        if(field==='isAdmin'){
            setNewUser({
                ...newUserForm,
                is_admin:!newUserForm.is_admin
            })
        }

        if(field==='profile_img'){
            if(!/https?:\/\/.+\.(a?png|gif|p?jpe?g|jfif|pjp|webp|pdf|svg|avif|jxl|bmp|ico|cur|tiff?)$/i.test(input)) setErrors({...errors, profile_img:"The file must be an image"})
            else setErrors({...errors, [field]:''})
        }

        if(field!=='isAdmin'){
                setNewUser({
                ...newUserForm,
                [field]:input
            })
        }
    }
    

    function handleSubmit(e){
        e.preventDefault()
        if(!Object.values(errors).find(e=>e!=='')) {
            try{
                register(dispatch, newUserForm)
            }
            catch(e){
                console.log(1)
            }
            Toast.fire({
                icon: 'info',
                title: 'User created'
            })
        }
        else Toast.fire({
            icon: 'info',
            title: 'There\'s an error in your inputs'
        })
    }


    return (
        <div className="newUserUpdate">
                    <span className="newUserUpdateTitle">Add new user</span>
                    <form className="newUserUpdateForm" >
                        <div className="newUserUpdateLeft">
                            <div className="newUserUpdateItem">
                                <label>Username</label>
                                <input
                                    type="text"
                                    name='username'
                                    className="newUserUpdateInput"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="newUserUpdateItem">
                                <label>Password </label>
                                <input
                                    type="password"
                                    name='password'
                                    className="newUserUpdateInput"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="newUserUpdateItem">
                                <label>Email</label>
                                <input
                                    type="text"
                                    name='email'
                                    className="newUserUpdateInput"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="newUserUpdateBox">
                                <label>isAdmin</label>
                                <select id="selectAdmin" name='isAdmin' defaultValue={false} onChange={handleChange}>
                                    <option value={true}>
                                        Yes
                                    </option>
                                    <option value={false} >
                                        No
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div className="newUserUpdateRight">
                            <div className="newUserUpdateUpload">
                                <img
                                    className="newUserUpdateImg"
                                    //src={imgUpdate || user.profile_img || "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"}
                                    src={PHImage || "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"}
                                    alt="newUser's profile"
                                />
                                <label htmlFor="file">
                                    <Publish className="newUserUpdateIcon" />
                                </label>
                                <input type="file" id="file" name='profile_img' style={{ display: "none" }} onChange={(event) => {
                                setImg(event.target.files[0])
                                
                                if (!event.target.files[0]) return
                                if (event.target.files[0]?.type.includes('image')) {
                                    if (event.target.files[0]?.size >= 1000000) return alert('Max file size: 1MB')
                                    
                                    var fileReader = new FileReader();
                                    fileReader.onload = function (fileLoadedEvent) {
                                        fileReader.onloadend = () => {
                                            setPH(fileReader.result)
                                            document.getElementById('up').disabled=false
                                            document.getElementById('up').innerText='Upload'
                                        }
                                    }
                                    fileReader.readAsDataURL(event.target.files[0])
                                }


                                let input = document.createElement('button')
                                input.innerText = 'Remove'
                                input.setAttribute('id', 'erase')
                                input.setAttribute('type', 'button')
                                input.addEventListener('click', () => {
                                    document.getElementById('up').disabled=false
                                    setImg('')
                                    setPH('')
                                    document.getElementById('options').removeChild(input)
                                    setNewUser({
                                        ...newUserForm,
                                        profile_img: ''
                                    })
                                    event.target.value = ''
                                    return
                                })

                                if (!imgUpdate) {
                                    document.getElementById('options').append(input)
                                }
                            }}/>
                            </div >
                            <div id='options'>
                            {imgUpdate
                                ? <button type='button' id='up' onClick={(event) => { 
                                    handleImage(event)
                                    document.getElementById('up').disabled=true
                                        }}>
                                    Upload
                                </button>
                                : null}
                            </div>
                            <button className="newUserUpdateButton" onClick={handleSubmit}>Update</button>
                        </div>
                    </form>

                </div>
    );
}