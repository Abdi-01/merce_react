import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getTransactionUser } from '../../actions';

const HistoryPage = (props) => {

    const dispatch = useDispatch()

    const { iduser, transactions } = useSelector(({ authReducer }) => {
        return {
            iduser: authReducer.id,
            transactions: authReducer.transactions,
        }
    })

    const printTransactions = () => {
        return transactions.map((val, idx) => {
            return (
                <div className="card">
                    <div className="card-header" id="headingOne">
                        <h2 className="mb-0">
                            <div className="row text-center" style={{ fontSize: 18 }}>
                                <span className="col">
                                    <p>
                                        {val.date}
                                    </p>
                                </span>
                                <span className="col">
                                    <p>
                                        {val.status}
                                    </p>
                                </span>
                                <span className="col">
                                    <p>
                                        {val.totalPayment}
                                    </p>
                                </span>
                                <span className="col">
                                    <p>{val.status}</p>
                                </span>
                                <span className="col">
                                    <button className="btn btn-link btn-block text-left p-0" type="button" data-toggle="collapse" data-target={`#collapse${idx}`} aria-expanded="true" aria-controls={`collapse${idx}`}>
                                        Detail
                                    </button>
                                </span>
                            </div>
                        </h2>
                    </div>

                    <div id={`collapse${idx}`} className="collapse" aria-labelledby={`heading${idx}`} data-parent="#accordionExample">
                        <div className="card-body">
                            <table>
                                
                            </table>
                        </div>
                    </div>
                </div>
            )
        })
    }

    return (
        <div>
            <h3 className="text-center">Your History Transactions</h3>
            <div className="accordion" id="accordionExample">
                {printTransactions()}
            </div>
        </div>
    )
}

export default HistoryPage;