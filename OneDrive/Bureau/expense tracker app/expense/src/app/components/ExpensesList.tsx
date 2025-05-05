import React from 'react'

function ExpensesList() {

    const expenseList=[
        {
            "description":"month end salary",
            "amount":`2000 frs`
        },
        {
            "description":"momo transactions",
            "amount":`50000 frs`
        },                         
    ]
  return <ul className='h-[300px] bg-white px-3 py-3 space-y-2 overflow-y-auto'>
    
        {expenseList.map((expenses)=>(
            <li key={expenses.description} className='min-w-full min-h-auto bg-white border-b hover:shadow-md flex  justify-between px-3 py-3 items-center'>
                <div className='space-y-2'>
                <p className="description">
                  {expenses.description}
                </p>
                 <p className="amount">
                   {expenses.amount}
                 </p>
                </div>
                 <div className="deleateContainer">
        <button className='text-[10x] h-[20px] w-[20px] bg-red-500 flex justify-center items-center rounded hover:bg-red-600'>X</button>
    </div>
            </li>
        ))}
  </ul>
}

export default ExpensesList
