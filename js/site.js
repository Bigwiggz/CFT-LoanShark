//Loan Shark Application

//Event Listener
let runProgram=document.getElementById("btnSubmit");
runProgram.addEventListener("click", RunLoanProgam);

//Main Function
function RunLoanProgam(){

    //Get values
    let loanAmountInput=parseInt(document.getElementById("loanAmount").value);
    let loanTermInputMonths=parseInt(document.getElementById("loanTerm").value);
    let interestRate=parseFloat(document.getElementById("interestRate").value);

    //Basic input validation
    if(Number.isInteger(loanAmountInput)===false){
        let errorMessage=`The loan amount of ${loanAmountInput} is not a valid amount for the loan`;
        let errorMessageDisplay=document.getElementById("validation-summary");
        errorMessageDisplay.innerHTML=errorMessage;
    }
    else if(Number.isInteger(loanTermInputMonths)===false){
        let errorMessage=`The loan amount of ${loanTermInputMonths} is not a valid amount for the loan term`;
        let errorMessageDisplay=document.getElementById("validation-summary");
        errorMessageDisplay.innerHTML=errorMessage;
    }
    else if(isFloat(interestRate)===false){
        let errorMessage=`The interest rate of ${interestRate} is not a valid amount for the interest`;
        let errorMessageDisplay=document.getElementById("validation-summary");
        errorMessageDisplay.innerHTML=errorMessage;
    }

    let amortizationList=CalculateAmortizationSchedule(loanAmountInput,loanTermInputMonths, interestRate);

}

//function to check if a number is a float
function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
}
//function to calculate the amortization schedule
function CalculateAmortizationSchedule(loanAmountInput,loanTermInputMonths, interestRate){
    let totalMonthlyPayment=(loanAmountInput*(interestRate/1200))/(1-Math.pow((1+interestRate/1200),-loanTermInputMonths));

    let periodInfo={};
    let previousRemainingBalance=loanAmountInput;
    let currentRemainingBalance;
    let amortizationList=[];
    let totalInterestPaid=0;

    for(let i=0; i<loanTermInputMonths;i++){
        //Month Counter
        periodInfo.monthNumber=i+1;
        //Total Monthly Payment
        periodInfo.totalMonthlyPayment=totalMonthlyPayment;
        //Interest payment
        if(i===0){
            periodInfo.interestPayment=CalculatePeriodInterestPayment(previousRemainingBalance,interestRate);
        }
        else{
            periodInfo.interestPayment=CalculatePeriodInterestPayment(currentRemainingBalance,interestRate);
        }
        //Cumulative Interest
        totalInterestPaid+=periodInfo.interestPayment;
        periodInfo.totalCumulativeInterest=totalInterestPaid;

        //Principal Payment
        periodInfo.principalPayment=CalculatePrincipalPayment(totalMonthlyPayment,periodInfo.interestPayment);

        // Current Remaining Balance
        periodInfo.remainingBalance=CalculateRemainingBalance(previousRemainingBalance,periodInfo.principalPayment);
        currentRemainingBalance=periodInfo.remainingBalance;
        previousRemainingBalance=currentRemainingBalance;

        //Add value to amortization list
        amortizationList.push(periodInfo);
        periodInfo={};
    }
    return amortizationList;
}

//function to calculate Interest Payment per period
function CalculatePeriodInterestPayment( remainingBalanace, interestRate){
    return remainingBalanace*interestRate/1200;
}

//function to calculate principal payment
function CalculatePrincipalPayment(totalMonthlyPayment,interestPayment){
    return totalMonthlyPayment-interestPayment;
}

//function to calculate remaining balance
function CalculateRemainingBalance(previousBalance,principalPayment){
    return previousBalance-principalPayment;
}
