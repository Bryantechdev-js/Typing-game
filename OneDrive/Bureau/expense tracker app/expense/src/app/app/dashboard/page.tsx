import ExpensesForm from '@/app/components/ExpensesForm'
import ExpensesList from '@/app/components/ExpensesList'
import React from 'react'

function page() {
   
  return (
    <div className='p-10'>
       <h1 className='text-3xl font-bold text-white text-center'>dashboard</h1>
       <div className='w-full max-w-full mx-auto'>
        <ExpensesList/>
        <ExpensesForm/>
       </div>
    </div>
  )
}

export default page
