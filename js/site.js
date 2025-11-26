function getValues() {
    let loanAmount = document.getElementById("loan-amount").value;
    let term = document.getElementById("term").value;
    let interestRate = document.getElementById("interest-rate").value;

    loanAmount = parseInt(loanAmount);
    term = parseInt(term);
    interestRate = parseInt(interestRate);

    // Calculate interest & cost
    let totalInterest = loanAmount * (interestRate / 100) * (term / 12);
    let totalCost = loanAmount + totalInterest;

    document.getElementById("total-principal").innerHTML = `Total loan amount: ${loanAmount}`;
    document.getElementById("total-interest").innerHTML = `Total interest: ${totalInterest}`;
    document.getElementById("total-cost").innerHTML = `Total cost: ${totalCost}`;

}

// Set date
const currentYear = new Date().getFullYear();
document.getElementById("year").textContent = `©${currentYear}`;