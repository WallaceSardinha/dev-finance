Modal = {
    open() {

        document.querySelector('.modal-overlay')
            .classList.add('active')

    },
    close() {
        document.querySelector('.modal-overlay')
            .classList.remove('active')

    }

}

const transactions = [
    {
        id: 1,
        description: 'luz',
        amount: -500000,
        date: '26/01/2021'
    },
    {
        id: 2,
        description: 'agua',
        amount: 8000,
        date: '26/01/2021'
    },
    {
        id: 3,
        description: 'internet',
        amount: -15000,
        date: '26/01/2021'
    }
]
const Transaction = {
    incomes() {

        let income = 0;

        transactions.forEach(transaction => {
            if( transaction.amount > 0 ) {

                income += transaction.amount;
            }
        })
        return income;
    },

    expenses() {

        let expense = 0;

        transactions.forEach(transaction => {
            if(transaction.amount < 0) {

                expense += transaction.amount;
            }
        })
        return expense;
    },

    total() {
        return "insertvalue";
    }
}



const DOM = {
    
    transactionsContainer: document.querySelector('#data-table tbody'),
    
    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)
        
        DOM.transactionsContainer.appendChild(tr)
    },
    innerHTMLTransaction(transaction) {
        const CSSclass = transaction.amount > 0 ? "income" : "expense"
        
        const amount = Utils.formatCurrency(transaction.amount)
        
        const html = `
        <td class="description">${transaction.description}</td>
        <td class="${CSSclass}">${amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
        <img class="x" src="./images/remove.png" alt="">
        </td>
        `
        
        return html
    },
    
    updateBalance() {
        const incomeResult = Utils.formatCurrency(Transaction.incomes())
        const expenseResult = Utils.formatCurrency(Transaction.expenses())
        const totalResult = Utils.formatCurrency(Transaction.total())

        document.getElementById('incomeDisplay').innerHTML = incomeResult
        document.getElementById('expenseDisplay').innerHTML = expenseResult
        document.getElementById('totalDisplay').innerHTML = totalResult
    }
}

const Utils = {

    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g, "")

        value = Number(value) / 100

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        return signal + value

    },
}
/*
const remove = () {
    document.querySelector('.x')
removeTR.onClick(transaction, index) 
   DOM.innerHTMLTransaction.remove('tr')
}*/

transactions.forEach(function(transaction){
    DOM.addTransaction(transaction)
})

DOM.updateBalance()