import { Link, useHistory, useLocation } from "react-router-dom";
import "./product.css";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";
import Chart from "../../components/chart/Chart"
import { Publish } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
// import { updateProduct } from "../../redux/apiCalls";

export default function Product() {
    const dispatch = useDispatch()
    const location = useLocation()
    const history = useHistory()


    const productId = location.pathname.split('/')[2]
    const product = useSelector(state => state.product.products.find(product => product._id === productId))


    const [pStats, setPStats] = useState([])
    const [imgUpdate, setImgUpdate] = useState(null)
    const [complete, setComplete] = useState(false)
    const [productUpdate, setProductUpdate] = useState({
        id: product._id,
        title: product.title,
        desc: product.desc,
        img: product.img,
        categories: product.categories,
        size: product.size,
        color: product.color,
        price: product.price,
        inStock: product.inStock,
        cuantity: product.cuantity
    })

    // console.log("MIRAR IMG:", productUpdate);

    const handleChange = (e) => {
        setProductUpdate(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleImage = (e) => {
        e.preventDefault()
        //Para que las imagen con el mismo nombre no se pisen
        const fileName = new Date().getTime() + imgUpdate.name
        //Traer del storage los datos
        const storage = getStorage(app)
        //Referencia
        const sotorageRef = ref(storage, fileName)
        //COnfiguracion de Firebase para los File y conseguir la URL
        const uploadTask = uploadBytesResumable(sotorageRef, imgUpdate);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
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
            (error) => {
                // Handle unsuccessful uploads
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setProductUpdate(prev => {
                        return {
                            ...prev,
                            img: downloadURL
                        }
                    });
                    setComplete(true)
                }
                );
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // updateProduct(dispatch, productUpdate.id, productUpdate).then(response => history.push("/products"))
    }
    console.log(imgUpdate);

    const MONTHS = useMemo(
        () => [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Agu",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ], []
    )

    // useEffect(() => {
    //     const getStats = async () => {
    //         try {
    //             const res = await userRequest.get('orders/income?pid=' + productId)
    //             const list = res.data.sort((a, b) => {
    //                 return a._id - b._id
    //             })
    //             list.map((item) =>
    //                 setPStats((prev) => [
    //                     ...prev,
    //                     { name: MONTHS[item._id - 1], Sales: item.total }
    //                 ])
    //             )
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     }
    //     getStats()
    // }, [MONTHS])

    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">Product</h1>
                <Link to="/newproduct">
                    <button className="productAddButton">Create</button>
                </Link>
            </div>
            <div className="productTop">
                <div className="productTopLeft">
                    <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
                </div>
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img src={product.img} alt="" className="productInfoImg" />
                        <span className="productName">{product.title}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">id:</span>
                            <span className="productInfoValue">{product._id}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">cuantity:</span>
                            <span className="productInfoValue">5123</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">in stock:</span>
                            <span className="productInfoValue">{product.inStock}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <div className="productForm">
                    <form className="productForm" onSubmit={handleSubmit}>
                        <div className="productFormLeft">
                            <label>Product Title</label>
                            <input
                                type="text"
                                name='title'
                                placeholder={product.title}
                                onChange={(e) => handleChange(e)}
                            />
                            <label>Product Cuantity</label>
                            <input
                                type="number"
                                name='cuantity'
                                placeholder={product.cuantity}
                                onChange={(e) => handleChange(e)}
                            />
                            <label>Product Price</label>
                            <input
                                type="text"
                                name="price"
                                placeholder={product.price}
                                onChange={(e) => handleChange(e)}
                            />
                            <button
                                className="productButton"
                            >Update</button>
                        </div>
                    </form>
                    <div className="productFormRight">
                        <div className="productUpload">
                            <img
                                src={productUpdate.img}
                                alt={product.title}
                                className="productUploadImg"
                                name="img"
                            />
                            <label for="file">
                                <Publish />
                            </label>
                            <input
                                type="file"
                                id="file"
                                style={{ display: "none" }}
                                onChange={(e) => setImgUpdate(e.target.files[0])}
                            />
                        </div>
                        {
                            complete === false ? (
                                <button
                                    className="productButton"
                                    onClick={handleImage}
                                >Upload</button>
                            ) : (
                                <button
                                    className="productButtonComplete"
                                    onClick={handleImage}
                                >Success</button>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}