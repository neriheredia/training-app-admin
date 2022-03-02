import "./servicesList.css";
import { DataGrid } from "@material-ui/data-grid";
// import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
// import { deleteProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getAllServices } from '../../redux/apiCalls/servicesCalls/getServices'

export default function ProductList() {
    const dispatch = useDispatch()
    const services = useSelector(state => state.services.services)

    console.log(services)

    useEffect(() => {
        getAllServices(dispatch)
    }, [dispatch])

    // const handleDelete = (id) => {
    //     deleteProduct(id, dispatch)
    // };

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
                    <>
                        <Link to={"/product/" + params.row.id}>
                            <button className="productListEdit">Disabled</button>
                        </Link>
                        {/* <DeleteOutline
                            className="productListDelete"
                            onClick={() => handleDelete(params.row.id)}
                        /> */}
                    </>
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