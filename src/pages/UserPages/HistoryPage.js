import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getTransactionUser } from '../../actions';

const HistoryPage = (props) => {

    const dispatch = useDispatch()

    const { iduser } = useSelector((state) => {
        console.log(state.authReducer.id)
        return {
            iduser: state.authReducer.id
        }
    })

    const printTransactions = () => {

    }
    return (
        <div>
            <h3 className="text-center">Your History Transactions</h3>
        </div>
    )
}

export default HistoryPage;