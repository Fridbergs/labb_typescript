"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const calculateBtn = document.getElementById("claculateBtn");
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
    let monthlyPayment = (principal * monthlyInterestRate) /
        (1 - Math.pow(1 + monthlyInterestRate, -totalPayments));
    // Get the resultDiv elements
    const monthResult = document.getElementById("monthResult");
    const interestResult = document.getElementById("interestResult");
    const principalResult = document.getElementById("principalResult");
    const remainingDebtResult = document.getElementById("remainingDebtResult");
    const monthlyPaymentResult = document.getElementById("monthlyPaymentResult");
    for (let month = 1; month <= totalPayments; month++) {
        let interestPayment = principal * monthlyInterestRate;
        let principalPayment = monthlyPayment - interestPayment;
        let remainingDebt = principal - principalPayment;
        // Update the resultDiv elements with the calculated values
        monthResult.textContent = `Month ${month}:`;
        interestResult.textContent = `Interest Payment: ${interestPayment.toFixed(2)}`;
        principalResult.textContent = `Principal Payment: ${principalPayment.toFixed(2)}`;
        remainingDebtResult.textContent = `Remaining Debt: ${remainingDebt.toFixed(2)}`;
        monthlyPaymentResult.textContent = `Monthly Payment: ${monthlyPayment.toFixed(2)}`;
        principal -= principalPayment; // Update the remaining principal for the next iteration
    }
}
