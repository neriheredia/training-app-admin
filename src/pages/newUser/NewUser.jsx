import { useState } from "react";
// import { publicRequest } from '../../requestMethods';
import { useHistory } from 'react-router-dom'
import "./newUser.css";
import { register } from "../../redux/apiCalls/registerCall/createRegister";
import { useDispatch } from "react-redux";
import Swal from 'sweetalert2'

export default function NewUser() {
    const history = useHistory()
    const [errors, setErrors] = useState({});

    const [newUserForm, setNewUser] = useState({})

    const dispatch = useDispatch()

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

    function handleChange(e){
        e.preventDefault()

        console.log(errors)

        let field = e.target.name
        let input = e.target.value

        console.log(input)

        if(field==='password'){ 
            if(!/(?=.*\d).{8,}$/.test(input)) setErrors({...errors, password:"Password must contain at least8 characters and 1 number"})
            else setErrors({...errors, [field]:''})
        }

        if(field==='username'){
            if(input.length<5) setErrors({...errors, username:"Username must contain at least 5 characters"})
            else setErrors({...errors, [field]:''})
        }

        if(field==='email'){
            if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(input)) setErrors({...errors, email:"Please enter a valid email"})
            else setErrors({...errors, [field]:''})
        }

        // if(field==='isAdmin'){
        //     if(input !=='boolean') setErrors({...errors, isAdmin:"Invalid input type"})
        //     else setErrors({...errors, [field]:''})
        // }

        if(field==='profile_img'){
            if(!/https?:\/\/.+\.(a?png|gif|p?jpe?g|jfif|pjp|webp|pdf|svg|avif|jxl|bmp|ico|cur|tiff?)$/i.test(input)) setErrors({...errors, profile_img:"The file must be an image"})
            else setErrors({...errors, [field]:''})
        }

            setNewUser({
            ...newUserForm,
            [field]:input
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        if(!Object.values(errors).find(e=>e!=='')) {
            register(dispatch, newUserForm)
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

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setError(false);
    //     try {
    //         const res = await publicRequest.post("auth/register", {
    //             username,
    //             email,
    //             password,
    //             isAdmin: box
    //         });
    //         res.data && history.push("/users");
    //     } catch (err) {
    //         setError(true);
    //     }
    // };


    return (
        <div className="newUser">
            <h1 className="newUserTitle">New User</h1>
            <form className="newUserForm">
                <div className="newUserItem">
                    <label>Username</label>
                    <input
                        type="text"
                        placeholder="pablo22"
                        name="username"
                        onChange={handleChange}
                    />
                </div>
                <div className="newUserItem">
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="pablo@gmail.com"
                        name="email"
                        onChange={handleChange}
                    />
                </div>
                <div className="newUserItem">
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="password"
                        name="password"
                        onChange={handleChange}
                    />
                </div>
                <div className="newUserItem">
                    <label>isAdmin</label>
                    <input
                        className="newUserSelect"
                        name='isAdmin'
                        type='checkbox'
                        value={true}
                        onChange={handleChange}
                    />
                </div>
                <button className="newUserButton" type='submit' onClick={handleSubmit}>Create</button>
            </form>
            {Object.values(errors).find(e=>e!=='') && (
                <span style={{ color: "red", marginTop: "10px" }}>
                    Something went wrong!
                </span>
            )}
        </div>
    );
}