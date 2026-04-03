let display = document.getElementById('display');
let buttons = document.querySelectorAll('button');
let firstOperand = null;
let operator = null;
let shouldResetDisplay = false;

function updateDisplay(value) {
    display.value = value;
}

function clearCalculator() {
    firstOperand = null;
    operator = null;
    shouldResetDisplay = false;
    updateDisplay('0');
}

function calculate(a, b, op) {
    switch (op) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return b === 0 ? 'Ошибка' : a / b;
        default: return b;
    }
}

function inputDigit(digit) {
    if (display.value === 'Ошибка') clearCalculator();
    if (shouldResetDisplay || display.value === '0') {
        updateDisplay(digit);
        shouldResetDisplay = false;
    }
    else updateDisplay(display.value + digit);
}

function inputOperator(nextOperator) {
    if (display.value === 'Ошибка') {
        clearCalculator();
        return;
    }
    let currentValue = Number(display.value);
    if (firstOperand === null) firstOperand = currentValue;
    else if (operator && !shouldResetDisplay) {
        let result = calculate(firstOperand, currentValue, operator);
        if (result === 'Ошибка') {
            updateDisplay(result);
            firstOperand = null;
            operator = null;
            shouldResetDisplay = true;
            return;
        }
        firstOperand = result;
        updateDisplay(String(result));
    }
    operator = nextOperator;
    shouldResetDisplay = true;
}

function inputEquals() {
    if (display.value === 'Ошибка') {
        clearCalculator();
        return;
    }
    if (operator === null || firstOperand === null) return;
    let secondOperand = Number(display.value);
    let result = calculate(firstOperand, secondOperand, operator);
    updateDisplay(String(result));
    firstOperand = null;
    operator = null;
    shouldResetDisplay = true;
}

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        let action = button.dataset.action;
        let value = button.dataset.value;
        if (action === 'digit') inputDigit(value);
        else if (action === 'operator') inputOperator(value);
        else if (action === 'equals') inputEquals();
        else if (action === 'clear') clearCalculator();
    });
});