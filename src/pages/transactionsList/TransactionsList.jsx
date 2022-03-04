import "./transactionsList.css";
import { DataGrid } from "@material-ui/data-grid";
// import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
// import { deleteProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Disable } from '../../redux/apiCalls/disableCall/disableCall'
import { getAllTransactions } from "../../redux/apiCalls/transactionCalls/getTransations";

export default function ProductList() {
    const dispatch = useDispatch()
    const transaction = useSelector(state => state.transaction.transaction)
    const token = useSelector(state => state.user.currentUser.accessToken)

    const [state, setState] = useState(false)

    useEffect(() => {
        getAllTransactions(dispatch, token)
    }, [dispatch, state])

    const columns = [
        { field: "id", headerName: "Nº Transaction", width: 220 },
        {
            field: "productId",
            headerName: "Nº Product",
            width: 200,
        },
        {
            field: "card",
            headerName: "Card",
            width: 120,
            renderCell: (params) => {
                return (
                    <div className="productListItem">
                        {params.row.method.card.network}
                    </div>
                );
            },
        },
        {
            field: "type",
            headerName: "Type",
            width: 120,
            renderCell: (params) => {
                return (
                    <div className="productListItem">
                        {params.row.method.card.funding}
                    </div>
                );
            },
        },
        {
            field: "amount",
            headerName: "Amount",
            width: 160,
        },
        {
            field: "ticket",
            headerName: "Ticket",
            width: 120,
            renderCell: (params) => {
                return (
                    <div className="productListItem">
                        <a href={params.row.receipt} target='_blank' rel='noreferrer'>URL</a>
                    </div>
                );
            },
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
                rows={transaction}
                disableSelectionOnClick
                columns={columns}
                getRowId={row => row.id}
                pageSize={10}
                checkboxSelection
            />
        </div>
    );
}