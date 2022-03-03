import {
    CalendarToday,
    MailOutline,
    PermIdentity,
    Settings,
    Publish
} from "@material-ui/icons";
import { useEffect } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import app from '../../firebase'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { updateUser } from "../../redux/apiCalls/updateUserCall/updateUserCall";
import "./user.css";

export default function User() {
    const [userForm, setForm] = useState({})
    const [errors, setErrors] = useState({})

    const [PHImage, setPH] = useState('')
    const [imgUpdate, setImg] = useState('')

    const history = useHistory()
    const location = useLocation()
    const userId = location.pathname.split('/')[2]
    const user = useSelector(state => state.users.users.filter(u => u.id === userId))
    const adminUser = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch()

    const handleImage = (e) => {
        e.preventDefault()
        let preventSubmit=document.getElementById('up')
        let totalSubmit=document.getElementsByClassName('userUpdateButton')[0]
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

                    setForm({
                        ...userForm,
                        profile_img: imgUpdate?downloadURL:''
                    })
                    preventSubmit.style.opacity=1
                    preventSubmit.innerText='Uploaded'
                    document.getElementsByTagName('html')[0].style.cursor='default'

                    totalSubmit.style.opacity=1
                    totalSubmit.innerText='Update'
                    document.getElementsByClassName('userUpdateButton')[0].disabled=false

                });
            })
    }

    function handleChange(e){
        e.preventDefault()

        let field = e.target.name
        let input = e.target.value

        if(field==='password'&&!/(?=.*\d).{8,}$/.test(input)) 
            setErrors({...errors, password:"Password must contain at least8 characters and 1 number"})

        if(field==='username'&&input.length<5)
            setErrors({...errors, username:"Username must contain at least 5 characters"})

        if(field==='email'&&!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(input))
            setErrors({...errors, email:"Please enter a valid email"})

        if(field==='profile_img'&&!/https?:\/\/.+\.(a?png|gif|p?jpe?g|jfif|pjp|webp|pdf|svg|avif|jxl|bmp|ico|cur|tiff?)$/i.test(input))
            setErrors({...errors, profile_img:"The file must be an image"})

        setForm({
            ...userForm,
            [field]:input
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        updateUser(dispatch, adminUser.accessToken, userId, userForm)
    }

    useEffect(()=>{
        console.log(userForm)
    },[userForm, PHImage])

    return (
        <div className="user">
            <div className="userTitleContainer">
                <h1 className="userTitle">Edit User</h1>
                <Link to="/newUser">
                    <button className="userAddButton">Create</button>
                </Link>
            </div>
            <div className="userContainer">
                <div className="userShow">
                    <div className="userShowTop">
                        <img
                            src={user[0].profile_img || "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"}
                            alt=""
                            className="userShowImg"
                        />
                        <div className="userShowTopTitle">
                            <span className="userShowUsername">{user[0].username}</span>
                            <span className="userShowUserTitle">{user[0].email}</span>
                        </div>
                    </div>
                    <div className="userShowBottom">
                        <span className="userShowTitle">Account Details</span>
                        <div className="userShowInfo">
                            <PermIdentity className="userShowIcon" />
                            <span className="userShowInfoTitle">{user[0].username}</span>
                        </div>
                        <div className="userShowInfo">
                            <CalendarToday className="userShowIcon" />
                            <span className="userShowInfoTitle">{user[0].createdAt.split('T').join(' | ')}</span>
                        </div>
                        <span className="userShowTitle">{user.isAdmin}</span>
                        <div className="userShowInfo">
                            <MailOutline className="userShowIcon" />
                            <span className="userShowInfoTitle">{user[0].email}</span>
                        </div>
                        <div className="userShowInfo">
                            <Settings className="userShowIcon" />
                            <span className="userShowInfoTitle">{user[0].is_admin ? 'Admin' : 'User'}</span>
                        </div>
                    </div>
                </div>

                <div className="userUpdate">
                    <span className="userUpdateTitle">Edit</span>
                    <form className="userUpdateForm" >
                        <div className="userUpdateLeft">
                            <div className="userUpdateItem">
                                <label>Username</label>
                                <input
                                    type="text"
                                    name='username'
                                    placeholder={user[0].username}
                                    className="userUpdateInput"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Password </label>
                                <input
                                    type="password"
                                    name='password'
                                    placeholder="*****"
                                    className="userUpdateInput"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Email</label>
                                <input
                                    type="text"
                                    name='email'
                                    placeholder={user[0].email}
                                    className="userUpdateInput"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="userUpdateBox">
                                <label>isAdmin</label>
                                <input
                                    type="checkbox"
                                    name='is_admin'
                                    className="userUpdateBox"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="userUpdateRight">
                            <div className="userUpdateUpload">
                                <img
                                    className="userUpdateImg"
                                    //src={imgUpdate || user.profile_img || "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"}
                                    src={PHImage || "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"}
                                    alt="User's profile"
                                />
                                <label htmlFor="file">
                                    <Publish className="userUpdateIcon" />
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
                                    setForm({
                                        ...userForm,
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
                            <button className="userUpdateButton" onClick={handleSubmit}>Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}