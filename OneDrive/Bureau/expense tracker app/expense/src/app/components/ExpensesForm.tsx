import React from 'react'

function ExpensesForm() {
    
  return (
     <form action="" className='w-full mt-8 rounded overflow-hidden '>
        <div className="inputContainer bg-white">
        <input type="text" name="description" id="description" placeholder='enter description'  className='w-full px-3 py-2 outline-none' />
        <input type="number" name="amount" id="amount" placeholder='enter amount' className='w-full px-3 py-2 outline-none' />
        </div>
       
        <button className="addExpenses w-full bg-blue-500 text-white p-2 font-bold">
            Add expense
        </button>
     </form>
  )
}

export default ExpensesForm
