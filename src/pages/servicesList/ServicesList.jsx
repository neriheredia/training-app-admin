import "./servicesList.css";
import { DataGrid } from "@material-ui/data-grid";
// import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
// import { deleteProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getAllServices } from '../../redux/apiCalls/servicesCalls/getServices'
import { Disable } from '../../redux/apiCalls/disableCall/disableCall'

export default function ProductList() {
    const dispatch = useDispatch()
    const services = useSelector(state => state.services.services)
    const token = useSelector(state => state.user.currentUser.accessToken)

    const [state, setState] = useState(false)

    useEffect(() => {
        getAllServices(dispatch, token)
    }, [dispatch, state])

    const columns = [
        { field: "id", headerName: "ID", width: 220 },
        {
            field: "product",
            headerName: "Product",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="productListItem">
                        {params.row.title}
                    </div>
                );
            },
        },
        { field: "price", headerName: "Price", width: 220 },
        { field: "owner", headerName: "idUser", width: 220 },
        {
            field: "disabled",
            headerName: "Disabled",
            width: 160,
        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <button className="productListEdit" onClick={() => {
                        Disable(params.row.id)
                        setState(!state)
                    }}>Disabled</button>
                );
            },
        },
    ];

    return (
        <div className="productList">
            <DataGrid
                rows={services}
                disableSelectionOnClick
                columns={columns}
                getRowId={row => row.id}
                pageSize={10}
                checkboxSelection
            />
        </div>
    );
}