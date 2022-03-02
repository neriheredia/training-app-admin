import "./modularUserList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline, Done } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../loading/Loading";
import { getAllUsers } from '../../redux/apiCalls/usersCalls/getUsersAll'
import { Disable } from '../../redux/apiCalls/disableCall/disableCall'

export default function ModularUserList({type}) {
    const dispatch = useDispatch()
    let users = useSelector(state => state.users.users)
    const token = useSelector(state => state.user.currentUser.accessToken)
    const [loading, setLoading] = useState(false)
    const [state, setState] = useState(false)
    
    users=users.filter(e=>
        type==='trainer'?e.is_personal_trainer===true:
        type==='nutritionist'?e.is_nutritionist===true:
        type==='user'?e:null
        )

    useEffect(() => {
        getAllUsers(dispatch, token)
            .then(response => {
                //setLoading(false)
                setState(false)
            })
    }, [dispatch,token])
    // const handleDelete = (id) => {
    //     setLoading(true)
    // deleteUsers(id, dispatch)
    //     .then(response => {
    //         setLoading(false)
    //     })
    // };

    const columns = [
        { field: "id", headerName: "ID", width: 220 },
        {
            field: "user",
            headerName: "User",
            width: 170,
            renderCell: (params) => {
                return (
                    <div className="userListUser">
                        <img className="userListImg" src={users.profile_img || "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"} alt={users.username} />
                        {params.row.username}
                    </div>
                );
            },
        },
        { field: "email", headerName: "Email", width: 180 },
        {
            field: "disabled",
            headerName: "Disable",
            width: 130,
        },
        {
            field: "action",
            headerName: "Action",
            width: 130,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/user/" + params.row.id}>
                            <button className="userListEdit">Edit</button>
                        </Link>
                        {params.row.disabled
                            ? <Done className="userListAdd"
                                onClick={() => {
                                    Disable(params.row.id)
                                    //setState(true)
                                }} />
                            : <DeleteOutline
                                className="userListDelete"
                                onClick={() => {
                                    Disable(params.row.id)
                                   // setState(true)
                                }}
                            />}

                    </>
                );
            },
        },
    ];

    return (
        <div className="userList">
            {
                loading ? (
                    <div className="contentLoading">
                        <Loading />
                    </div>
                ) :
                    (
                        <DataGrid
                            rows={users}
                            disableSelectionOnClick
                            columns={columns}
                            getRowId={row => row.id}
                            pageSize={10}
                            checkboxSelection
                        />
                    )
            }
        </div>
    );
}