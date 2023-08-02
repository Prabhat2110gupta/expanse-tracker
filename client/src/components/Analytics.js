import React from 'react'
import { Progress } from "antd"
const Analtytics = ({ allTransection }) => {


    //category
    const categories = ["salary", "tip", "project", "food", "medical", "tax",];

    //total transection
    const totalTransection = allTransection.length;
    const totalIncomeTransections = allTransection.filter(transaction => transaction.type === 'income')
    const totalExpenseTransections = allTransection.filter(transaction => transaction.type === 'expense')
    const totalIncomePercent = (totalIncomeTransections.length / totalTransection) * 100;
    const totalExpensePercent = (totalExpenseTransections.length / totalTransection) * 100;
    //total turnover
    const totalTurnover = allTransection.reduce((acc, transaction) => acc + transaction.amount, 0);

    const totalIncomeTurnover = allTransection.filter((transaction) => transaction.type === 'income').reduce((acc, transaction) => acc + transaction.amount, 0);
    const totalExpenseTurnover = allTransection.filter((transaction) => transaction.type === 'expense').reduce((acc, transaction) => acc + transaction.amount, 0);
    const totalIncomeTurnoverPercent = (totalIncomeTurnover / totalTurnover) * 100;
    const totalExpenseTurnoverPercent = (totalExpenseTurnover / totalTurnover) * 100;
    return (
        <>
            <div className='row'>
                <div className='col-md-3'>
                    <div className='card'>
                        <div className='card-header'>
                            Total Transection :{totalTransection}
                        </div>
                        <div className='card-body'>
                            <h5 className='text-success'>
                                Income:{totalIncomeTransections.length}
                            </h5>
                            <h5 className='text-danger'>
                                Expense:{totalExpenseTransections.length}
                            </h5>
                        </div>
                        <Progress type="circle" strokeColor={'green'} className='mx-2' percent={totalIncomePercent.toFixed(0)}>
                        </Progress>
                        <Progress type="circle" strokeColor={'red'} className='mx-2' percent={totalExpensePercent.toFixed(0)}>

                        </Progress>
                    </div>
                </div>

                <div className='col-md-3'>
                    <div className='card'>
                        <div className='card-header'>
                            Total Turnover :{totalTurnover}
                        </div>
                        <div className='card-body'>
                            <h5 className='text-success'>
                                Income:{totalIncomeTurnover}
                            </h5>
                            <h5 className='text-danger'>
                                Expense:{totalExpenseTurnover}
                            </h5>
                        </div>
                        <Progress type="circle" strokeColor={'green'} className='mx-2' percent={totalIncomeTurnoverPercent.toFixed(0)}>
                        </Progress>
                        <Progress type="circle" strokeColor={'red'} className='mx-2' percent={totalExpenseTurnoverPercent.toFixed(0)}>

                        </Progress>
                    </div>
                </div>


                <div className="col-md-3">
                    <h4> Category Wise Income</h4>
                    {
                        categories.map(category => {
                            const amount = allTransection.filter(transaction => transaction.type === 'income' && transaction.category === category).reduce((acc, transaction) => acc + transaction.amount, 0);
                            return (
                                amount > 0 && (
                                    <div className='card'>
                                        <div className='card-body'>
                                            <h5>{category}</h5>
                                            <Progress percent={((amount / totalIncomeTurnover) * 100).toFixed(0)} />


                                        </div>
                                    </div>

                                )


                            );
                        })}
                </div>
                <div className="col-md-3">
                    <h4> Category Wise Expense</h4>
                    {
                        categories.map(category => {
                            const amount = allTransection.filter(transaction => transaction.type === 'expense' && transaction.category === category).reduce((acc, transaction) => acc + transaction.amount, 0);
                            return (
                                amount > 0 && (
                                    <div className='card'>
                                        <div className='card-body'>
                                            <h5>{category}</h5>
                                            <Progress percent={((amount / totalExpenseTurnover) * 100).toFixed(0)} />


                                        </div>
                                    </div>

                                )


                            );
                        })}
                </div>


            </div>

           
          
        
        </>
    );

}
export default Analtytics;