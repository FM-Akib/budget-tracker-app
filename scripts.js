
let income = 0;
let expense = 0;
const previousTransaction = localStorage.getItem('allTransaction')
let allTransaction = JSON.parse(previousTransaction) || [];

function add (){
    const amountAdd = parseInt(document.getElementById('amountUser').value); 
    // console.log(amountAdd)

    // if(amountAdd>0){
    //     income+=amountAdd;
    // }
    // else{
    //     expense+= Math.abs(amountAdd);
    // }

    const transaction ={
        amount: amountAdd
    }

   allTransaction.push(transaction);
//    console.log(allTransaction)
const newTransaction = JSON.stringify(allTransaction);
localStorage.setItem('allTransaction',newTransaction);
addOnTransactionList ();
}

function addOnTransactionList (){

    let income = 0;
    let expense = 0;
    const listContainer = document.getElementById('listContainer');
    listContainer.innerHTML = '';


    allTransaction.forEach ((atransaction,i)=>{

        if(atransaction.amount>0){
            income+=atransaction.amount;
        }
        else{
            expense+= Math.abs(atransaction.amount);
        }

    const alist = document.createElement('li');
    alist.classList.add('flex', 'justify-between', 'items-center','mt-4','text-xl','font-semibold');

    alist.innerHTML=`
    <div className="">
    <h2>${Math.abs(atransaction.amount)} <span class="text-sm ">${atransaction.amount > 0 ? 'income' : 'expense'}</span> </h2> 
    </div>
    <div className="">
    <button class="mr-4 text-sm" onClick="deleteTransactions(${i})">Delete</button>
    <button class=" text-sm" onClick="editTransactions(${i})">Edit</button>
    </div>
    `

    listContainer.appendChild(alist)
        

    document.getElementById("income").innerText=`Income: ${income}`;
    document.getElementById("expense").innerText=`Expense: ${expense}`;

    })
}

const deleteTransactions = (i) => {
    const deleteAmount = allTransaction[i].amount;
    // console.log(deleteAmount);
    allTransaction.splice(i, 1);
   
    addOnTransactionList();
    if(deleteAmount>0){
        income-=deleteAmount;
    }
    else{
        expense-=deleteAmount;
    }
   
 
    localStorage.setItem('allTransaction',JSON.stringify(allTransaction));
    
  };

  function editTransactions(i){
    const oldAmount = allTransaction[i].amount;
    const newAmount = parseInt(prompt('Enter a new amount'))
    allTransaction[i].amount = newAmount;
    if(oldAmount>0){
        income += (newAmount - oldAmount);
    }
    else{
        expense -= (newAmount - oldAmount)
    }
    localStorage.setItem('allTransaction',JSON.stringify(allTransaction));
    addOnTransactionList()
  }








  addOnTransactionList()


