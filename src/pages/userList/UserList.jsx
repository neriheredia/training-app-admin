import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, deleteUsers } from "../../redux/apiCalls";
import Loading from "../../components/loading/Loading";

export default function UserList() {
    const dispatch = useDispatch()
    const users = useSelector(state => state.users.users)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getUsers(dispatch)
            .then(response => {
                setLoading(false)
            })
    }, [dispatch])

    console.log(users);
    const handleDelete = (id) => {
        setLoading(true)
        deleteUsers(id, dispatch)
            .then(response => {
                setLoading(false)
            })
    };

    const columns = [
        { field: "_id", headerName: "ID", width: 220 },
        {
            field: "user",
            headerName: "User",
            width: 300,
            renderCell: (params) => {
                return (
                    <div className="userListUser">
                        <img className="userListImg" src={users.img || "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"} alt={users.username} />
                        {params.row.username}
                    </div>
                );
            },
        },
        { field: "email", headerName: "Email", width: 300 },
        // {
        //     field: "status",
        //     headerName: "Status",
        //     width: 120,
        // },
        // {
        //     field: "transaction",
        //     headerName: "Transaction Volume",
        //     width: 160,
        // },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/user/" + params.row._id}>
                            <button className="userListEdit">Edit</button>
                        </Link>
                        <DeleteOutline
                            className="userListDelete"
                            onClick={() => handleDelete(params.row._id)}
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
                            getRowId={row => row._id}
                            pageSize={8}
                            checkboxSelection
                        />
                    )
            }
        </div>
    );
}