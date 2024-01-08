"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const calculateBtn = document.getElementById("calculateBtn");
    if (calculateBtn) {
        calculateBtn.addEventListener("click", collectInput);
    }
});
function collectInput() {
    const lengthOfCashInput = document.getElementById("lengthOfCash");
    const sumOfCashInput = document.getElementById("sumOfCash");
    const interestRateInput = document.getElementById("interestRate");
    let lengthOfCash = parseFloat(lengthOfCashInput.value);
    let sumOfCash = parseFloat(sumOfCashInput.value);
    let annualInterestRate = parseFloat(interestRateInput.value);
    calculateInterestPmt(lengthOfCash, sumOfCash, annualInterestRate);
}
function calculateInterestPmt(lengthOfCash, sumOfCash, annualInterestRate) {
    let totalPayments = lengthOfCash * 12;
    let principal = sumOfCash;
    let monthlyInterestRate = annualInterestRate / 12 / 100;
    // Clear previous results
    const monthContainer = document.getElementById("monthContainer");
    const interestContainer = document.getElementById("interestContainer");
    const principalContainer = document.getElementById("principalContainer");
    const remainingDebtContainer = document.getElementById("remainingDebtContainer");
    const monthlyPaymentContainer = document.getElementById("monthlyPaymentContainer");
    monthContainer.innerHTML = ""; // Clear previous content
    interestContainer.innerHTML = "";
    principalContainer.innerHTML = "";
    remainingDebtContainer.innerHTML = "";
    monthlyPaymentContainer.innerHTML = "";
    // Append headers to the respective containers
    monthContainer.innerHTML += "<h3>Month</h3>";
    interestContainer.innerHTML += "<h3>Interest Payments</h3>";
    principalContainer.innerHTML += "<h3>Principal Payments</h3>";
    remainingDebtContainer.innerHTML += "<h3>Remaining Debt</h3>";
    monthlyPaymentContainer.innerHTML += "<h3>Monthly Payments</h3>";
    let monthlyPayment = (principal * monthlyInterestRate) /
        (1 - Math.pow(1 + monthlyInterestRate, -totalPayments));
    for (let month = 1; month <= totalPayments; month++) {
        let interestPayment = principal * monthlyInterestRate;
        let principalPayment = monthlyPayment - interestPayment;
        let remainingDebt = principal - principalPayment;
        // Append values to the respective containers
        monthContainer.innerHTML += `<div>${month}</div>`;
        interestContainer.innerHTML += `<div>${interestPayment.toFixed(2)}</div>`;
        principalContainer.innerHTML += `<div>${principalPayment.toFixed(2)}</div>`;
        remainingDebtContainer.innerHTML += `<div>${remainingDebt.toFixed(2)}</div>`;
        monthlyPaymentContainer.innerHTML += `<div>${monthlyPayment.toFixed(2)}</div>`;
        principal -= principalPayment; // Update the remaining principal for the next iteration
    }
}
