import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/loading/Loading";
import { getAllUsers } from '../../redux/apiCalls/usersCalls/getUsersAll'

export default function UserList() {
    const dispatch = useDispatch()
    const users = useSelector(state => state.users.users)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getAllUsers(dispatch)
            .then(response => {
                setLoading(false)
            })
    }, [dispatch])

    console.log(users);
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
            field: "is_nutritionist",
            headerName: "isNutritionist",
            width: 155,
        },
        {
            field: "is_personal_trainer",
            headerName: "isTrainer",
            width: 130,
        },
        {
            field: "is_admin",
            headerName: "isAdmin",
            width: 130,
        },
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
                        <DeleteOutline
                            className="userListDelete"
                        // onClick={() => handleDelete(params.row.id)}
                        />
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