import "./widgetLg.css";
import { useEffect, useState } from "react";
import { format } from 'timeago.js'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTransactions } from "../../redux/apiCalls/transactionCalls/getTransations";
import { getAllUsers } from "../../redux/apiCalls/usersCalls/getUsersAll";
import {Disable} from '../../redux/apiCalls/disableCall/disableCall'
import { Link } from "react-router-dom";


export default function WidgetLg({type}) {
    const dispatch = useDispatch()
    const transactions = useSelector(state => state.transaction.transaction)
    const users = useSelector(state => state.users.users)
    const trainers = useSelector(state => state.users.users.filter(e=>e.is_personal_trainer===true))
    const nutritionists = useSelector(state => state.users.users.filter(e=>e.is_nutritionist===true))
    const token = useSelector(state => state.user.currentUser.accessToken)

    const [state, setState] = useState(false)

    let types={users,trainers,nutritionists,transactions}

    const sorted = [...types[type]].sort(function(a, b){
        if(a.id < b.id) { return -1; }
        if(a.id > b.id) { return 1; }
        return 0;
    });

    useEffect(() => {
        getAllTransactions(dispatch, token)
        getAllUsers(dispatch, token).then(r=>setState(false))
    }, [state])

    let headers = []
    let values = []

    if(type==='transactions'){
        headers = ['Customer', 'Date', 'Amount', 'Service']
        values = ['id', 'createdAt', 'amount', 'receipt']
    }
    else{
        headers = ['id', 'Username', 'Email', 'Options']
        values = ['id', 'username', 'email', 'options']
    }

    const Button = ({ type }) => {
        return <button className={"widgetLgButton " + type} onClick={()=>{
            window.open(type, '_black')
        }}>View receipt</button>;
    };
    return (
        <div className="widgetLg">
            <h3 className="widgetLgTitle">Latest {type}</h3>
            <table className="widgetLgTable">
                {types[type].length?
                <>
                <tbody className="widgetLgTr">
                    <th className="widgetLgTh">{headers[0]}</th>
                    <th className="widgetLgTh">{headers[1]}</th>
                    <th className="widgetLgTh">{headers[2]}</th>
                    <th className="widgetLgTh">{headers[3]}</th>
                </tbody>
                {sorted.map((e,i) => (
                    <tbody className="widgetLgTr" key={e[values[0]]} >
                        <td className="widgetLgUser">
                            <span className="widgetLgName">{e[values[0]]}</span>
                        </td>
                        <td className="widgetLgDate">{type==='transactions'?format(e[values[1]].split('T')[0]):e[values[1]]}</td>
                        <td className="widgetLgAmount">{e[values[2]]}</td>
                        <td className="widgetLgStatus">
                            {type==='transactions'
                            ?<Button type={e.receipt} />
                            :<div style={{display:'flex', flexDirection:'row'}}>
                            <button className="userListEdit">
                                <Link to={`/user/${e.id}`} style={{textDecoration:'none', color:'white'}}>
                                Edit
                                </Link>
                            </button>
                            <button className={e.disabled?"userListEdit":"productListEdit"} id={'productListEdit'+i} onClick={()=>{
                                Disable(e.id, token)
                                setState(true)
                            }}>
                                {e.disabled?'Enable':'Disable'}
                            </button>
                            </div>}
                        </td>
                    </tbody>
                ))}
                </>:null
                }
                
            </table>
        </div>
    );
}