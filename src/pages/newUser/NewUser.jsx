import { useState } from "react";
import { publicRequest } from '../../requestMethods';
import { useHistory } from 'react-router-dom'
import "./newUser.css";

export default function NewUser() {
    const history = useHistory()
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [box, setBox] = useState(false)
    const [error, setError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);
        try {
            const res = await publicRequest.post("auth/register", {
                username,
                email,
                password,
                isAdmin: box
            });
            res.data && history.push("/users");
        } catch (err) {
            setError(true);
        }
    };


    return (
        <div className="newUser">
            <h1 className="newUserTitle">New User</h1>
            <form className="newUserForm" onSubmit={handleSubmit}>
                <div className="newUserItem">
                    <label>Username</label>
                    <input
                        type="text"
                        placeholder="pablo22"
                        name="userame"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="newUserItem">
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="pablo@gmail.com"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="newUserItem">
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="newUserItem">
                    <label>isAdmin</label>
                    <input
                        className="newUserSelect"
                        name='isAdmin'
                        type='checkbox'
                        value={true}
                        onChange={() => setBox(true)}
                    />
                </div>
                <button className="newUserButton">Create</button>
            </form>
            {error && (
                <span style={{ color: "red", marginTop: "10px" }}>
                    Something went wrong!
                </span>
            )}
        </div>
    );
}