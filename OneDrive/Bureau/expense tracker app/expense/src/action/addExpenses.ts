"use server"

// add expenses
const addExpense= async(formdata:FormData)=>{
   await prisma.expense.create({
     body:{
        "description":formdata.description as string,
        "amount":formdata.amount as string;
     }
   })
}

// deleating expenses

const deleateExpense=async(id:string)=>{
    await prisma.expense.deleate({
        where:{
            id
        }
    })
   
}