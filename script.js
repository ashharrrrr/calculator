const digits = document.querySelectorAll("[data-value]");
const operators = document.querySelectorAll("[data-operator]");
const equalsOperator = document.querySelector("[data-equals]");
const outputFirstValue = document.querySelector(".first-value");
const outputOperator = document.querySelector(".output-operator");
const outputSecondValue = document.querySelector(".second-value");
const outputDisplay = document.querySelector(".output");
const clearButton = document.querySelector(".function");
const periodButton = document.querySelector(".period");
let firstNumber = 0;
let selectedOperator;
let operatorFunction = true;
let secondNumber;
let result;

digits.forEach((digit) => {
  digit.addEventListener("click", (e) => takeValues(e));
  digit.removeEventListener("click", (e) => takeValues(e));
});


operators.forEach((operator) => {
  if (firstNumber === null || firstNumber === undefined) return;
  operator.addEventListener("click", (e) => {
    if(firstNumber === 0 && (e.target.dataset.operator === '*' || e.target.dataset.operator === '/')){
        console.log(firstNumber);
        return alert("Enter a value first!")
    }
    if (
      selectedOperator === "+" ||
      selectedOperator === "-" ||
      selectedOperator === "*" ||
      selectedOperator === "/"
    ) {
      result = operate(firstNumber, selectedOperator, secondNumber);
      firstNumber = result;
      outputSecondValue.textContent = result;
      outputFirstValue.textContent = "";
      outputOperator.textContent = "";
    }
    outputDisplay.textContent = e.target.textContent;
    operatorFunction = false;
    if(firstNumber === 0) operatorFunction = true;
    selectedOperator = outputDisplay.textContent;
    outputSecondValue.textContent = firstNumber;
  });
});

clearButton.addEventListener("click", () => {
  clear();
});

function takeValues(e) {
  if (operatorFunction) {
    if(outputDisplay.textContent.length >= 24) return;
    outputDisplay.textContent += e.target.textContent;
    firstNumber = +outputDisplay.textContent;
    if(outputDisplay.textContent.includes('.')){
        periodButton.setAttribute('disabled', '');
    }

    console.log(firstNumber);
  } else {
    periodButton.removeAttribute('disabled');
    if(outputDisplay.textContent.length >= 24) return;

    if (outputDisplay.textContent === selectedOperator) {
      outputDisplay.textContent = "";
      outputOperator.textContent = firstNumber;
      outputSecondValue.textContent = selectedOperator;
    }
    outputDisplay.textContent += e.target.textContent;
    secondNumber = +outputDisplay.textContent;
    outputOperator.textContent = firstNumber;
    outputSecondValue.textContent = selectedOperator;
    if(outputDisplay.textContent.includes('.')){
        periodButton.setAttribute('disabled', '');
    }
  }
}

equalsOperator.addEventListener("click", () => {
  result = operate(firstNumber, selectedOperator.trim(), secondNumber);

  outputFirstValue.textContent = firstNumber;
  outputOperator.textContent = selectedOperator;
  outputSecondValue.textContent = secondNumber;
  outputDisplay.textContent = result;
});

function clear() {
  firstNumber = 0;
  secondNumber = 0;
  selectedOperator = 0;
  outputFirstValue.textContent = "";
  outputSecondValue.textContent = "";
  outputOperator.textContent = "";
  outputDisplay.textContent = "";
  operatorFunction = true;
  periodButton.removeAttribute('disabled');
}

function addition(num1, num2) {
  return num1 + num2;
}

function subtraction(num1, num2) {
  return num1 - num2;
}

function multiplication(num1, num2) {
  return num1 * num2;
}

function division(num1, num2) {
  return num1 / num2;
}

function operate(num1, operator, num2) {
  let result;

  if (operator === "+") {
    result = addition(num1, num2);
  } else if (operator === "-") {
    result = subtraction(num1, num2);
  } else if (operator === "*") {
    result = multiplication(num1, num2);
  } else if (operator === "/") {
    result = division(num1, num2);
  }

  return result;
}
