function getValues() {
    let amount = parseFloat(document.getElementById("loan-amount").value);
    let term = parseInt(document.getElementById("term").value);
    let rate = parseFloat(document.getElementById("interest-rate").value);

    const loan = calculateLoan(amount, rate, term);

    document.getElementById("payment").innerHTML = `£ ${loan.payment.toFixed(2)}`;
    document.getElementById("total-principal").innerHTML = `£ ${loan.amount.toFixed(2)}`;
    document.getElementById("total-interest").innerHTML = `£ ${loan.totalInterest.toFixed(2)}`;
    document.getElementById("total-cost").innerHTML = `£ ${loan.totalCost.toFixed(2)}`;
    
    buildTable(loan.payments);
}

function calculateLoan(amount, rate, term) {
    const monthlyRate = rate / 1200;
    const payment = calculatePayment(amount, monthlyRate, term);

    let balance = amount;
    let totalInterest = 0;
    const payments = [];

    for (let month = 1; month <= term; month++) {

        const monthlyInterest = balance * monthlyRate;
        totalInterest += monthlyInterest;

        const monthlyPrincipal = payment - monthlyInterest;
        balance -= monthlyPrincipal;

        payments.push({
            month,
            payment,
            monthlyPrincipal,
            monthlyInterest,
            totalInterest,
            balance: Math.max(balance, 0) // Avoid negative rounding
        });
    }

    return {
        amount,
        rate,
        term,
        payment,
        totalInterest,
        totalCost: amount + totalInterest,
        payments
    };
}

function calculatePayment(amount, monthlyRate, term) {
    const payment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term));

    return payment;
}

function buildTable(payments) {
    const tbody = document.getElementById("schedule-body");
    tbody.innerHTML = ""; // Clear existing rows

    payments.forEach(p => {
        const row = `
            <tr>
                <td>${p.month}</td>
                <td>£${p.payment.toFixed(2)}</td>
                <td>£${p.monthlyPrincipal.toFixed(2)}</td>
                <td>£${p.monthlyInterest.toFixed(2)}</td>
                <td>£${p.totalInterest.toFixed(2)}</td>
                <td>£${p.balance.toFixed(2)}</td>
            </tr>
        `;
        tbody.insertAdjacentHTML("beforeend", row); // Inserts HTML without removing or recreating the element itself
    });

    // Display table rows
    document.getElementById("schedule-table").classList.remove("d-none");
}

// Set date
const currentYear = new Date().getFullYear();
document.getElementById("year").textContent = `©${currentYear}`;