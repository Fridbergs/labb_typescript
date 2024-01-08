document.addEventListener("DOMContentLoaded", () => {
  const calculateBtn = document.getElementById(
    "claculateBtn"
  ) as HTMLButtonElement;

  if (calculateBtn) {
    calculateBtn.addEventListener("click", collectInput);
  }
});

function collectInput() {
  const lengthOfCashInput = document.getElementById(
    "lengthOfCash"
  ) as HTMLInputElement;
  const sumOfCashInput = document.getElementById(
    "sumOfCash"
  ) as HTMLInputElement;
  const interestRateInput = document.getElementById(
    "interestRate"
  ) as HTMLInputElement;

  let lengthOfCash = parseFloat(lengthOfCashInput.value);
  let sumOfCash = parseFloat(sumOfCashInput.value);
  let annualInterestRate = parseFloat(interestRateInput.value);

  calculateInterestPmt(lengthOfCash, sumOfCash, annualInterestRate);
}

function calculateInterestPmt(
  lengthOfCash: number,
  sumOfCash: number,
  annualInterestRate: number
) {
  let totalPayments: number = lengthOfCash * 12;
  let principal: number = sumOfCash;
  let monthlyInterestRate: number = annualInterestRate / 12 / 100;

  let monthlyPayment: number =
    (principal * monthlyInterestRate) /
    (1 - Math.pow(1 + monthlyInterestRate, -totalPayments));

  // Get the resultDiv elements
  const monthResult = document.getElementById("monthResult") as HTMLDivElement;
  const interestResult = document.getElementById(
    "interestResult"
  ) as HTMLDivElement;
  const principalResult = document.getElementById(
    "principalResult"
  ) as HTMLDivElement;
  const remainingDebtResult = document.getElementById(
    "remainingDebtResult"
  ) as HTMLDivElement;
  const monthlyPaymentResult = document.getElementById(
    "monthlyPaymentResult"
  ) as HTMLDivElement;

  for (let month = 1; month <= totalPayments; month++) {
    let interestPayment = principal * monthlyInterestRate;
    let principalPayment = monthlyPayment - interestPayment;
    let remainingDebt = principal - principalPayment;

    // Update the resultDiv elements with the calculated values
    monthResult.textContent = `Month ${month}:`;
    interestResult.textContent = `Interest Payment: ${interestPayment.toFixed(
      2
    )}`;
    principalResult.textContent = `Principal Payment: ${principalPayment.toFixed(
      2
    )}`;
    remainingDebtResult.textContent = `Remaining Debt: ${remainingDebt.toFixed(
      2
    )}`;
    monthlyPaymentResult.textContent = `Monthly Payment: ${monthlyPayment.toFixed(
      2
    )}`;

    principal -= principalPayment; // Update the remaining principal for the next iteration
  }
}
