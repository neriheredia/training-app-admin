import "./widgetLg.css";
import { useEffect } from "react";
import { format } from 'timeago.js'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTransactions } from "../../redux/apiCalls/transactionCalls/getTransations";


export default function WidgetLg() {
    const dispatch = useDispatch()
    const transactions = useSelector(state => state.transaction.transaction)
    const token = useSelector(state => state.user.currentUser.accessToken)

    useEffect(() => {
        getAllTransactions(dispatch, token)
    }, [])


    const Button = ({ type }) => {
        return <button className={"widgetLgButton " + type}>{type}</button>;
    };
    return (
        <div className="widgetLg">
            <h3 className="widgetLgTitle">Latest transactions</h3>
            <table className="widgetLgTable">
                {transactions.length?
                <>
                <tbody className="widgetLgTr">
                    <th className="widgetLgTh">Customer</th>
                    <th className="widgetLgTh">Date</th>
                    <th className="widgetLgTh">Amount</th>
                    <th className="widgetLgTh">Service</th>
                </tbody>
                {transactions.map(transaction => (
                    <tbody className="widgetLgTr" key={transaction.id} >
                        <td className="widgetLgUser">
                            <span className="widgetLgName">{transaction.id}</span>
                        </td>
                        <td className="widgetLgDate">{format(transaction.createdAt.split('T')[0])}</td>
                        <td className="widgetLgAmount">${transaction.amount}</td>
                        <td className="widgetLgStatus">
                            <Button type={transaction.receipt} />
                        </td>
                    </tbody>
                ))}
                </>:null
                }
                
            </table>
        </div>
    );
}