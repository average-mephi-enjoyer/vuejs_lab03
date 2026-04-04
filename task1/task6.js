let display = document.getElementById('display');
let buttons = document.querySelectorAll('button');
let expression = '';
let reset = false;

// basic
function updateDisplay() {
        display.value = expression === '' ? '0' : expression;
}

function clearCalculator() {
    expression = '';
    reset = false;
    updateDisplay();
}

function addToExpression(value) {
    if (reset) {
        expression = '';
        reset = false;
    }
    expression += value;
    updateDisplay();
}

function backspace() {
    if (reset) {
        expression = '';
        reset = false;
    }
    else expression = expression.slice(0, -1);
    updateDisplay();
}

// rpn
function precedence(op) {
    if (op === '+' || op === '-') return 1;
    if (op === '*' || op === '/') return 2;
    return 0;
}

function isNumber(s) {
    return !isNaN(parseFloat(s)) && isFinite(s);
}

function rpn(expression) {
    // expression -> components
    let comps = [];
    let i = 0;
    let len = expression.length;
    while (i < len) {
        let ch = expression[i];
        if (ch >= '0' && ch <= '9') {
            let num = '';
            while (i < len && ((expression[i] >= '0' && expression[i] <= '9') || expression[i] === '.')) {
                num += expression[i];
                i++;
            }
            comps.push(num);
            continue;
        }
        else if ('+-*/()'.includes(ch)) {
            comps.push(ch);
            i++;
        }
        else i++;
    }

    // to rpn
    let out_queue = [];
    let operators = [];
    for (let comp of comps) {
        if (isNumber(comp)) out_queue.push(comp);
        else if ('+-*/'.includes(comp)) {
            while (operators.length > 0 && operators[operators.length - 1] !== '(' && precedence(operators[operators.length - 1]) >= precedence(comp)) 
                        out_queue.push(operators.pop());
            operators.push(comp);
        }
        else if (comp === '(') operators.push(comp);
        else if (comp === ')') {
            while (operators.length > 0 && operators[operators.length - 1] !== '(') out_queue.push(operators.pop());
            if (operators.length === 0) throw new Error('несбалансированные скобки');
            operators.pop();
        }
    }

    // скобки проверяем
    while (operators.length > 0) {
        let op = operators.pop();
        if (op === '(' || op === ')') throw new Error('несбалансированные скобки');
        out_queue.push(op);
    }
    return out_queue;
}

function rpn_check(comps) {
    let stack = [];
    for (let comp of comps) {
        if (isNumber(comp)) stack.push(parseFloat(comp));
        else if ('+-*/'.includes(comp)) {
            if (stack.length < 2) throw new Error('недостаточно операндов');
            let b = stack.pop();
            let a = stack.pop();
            let result;
            switch (comp) {
                case '+': result = a + b; break;
                case '-': result = a - b; break;
                case '*': result = a * b; break;
                case '/':
                    if (b === 0) throw new Error('деление на ноль');
                    result = a / b;
                    break;
                default: throw new Error('неизвестный оператор');
            }
            stack.push(result);
        }
    }
    if (stack.length !== 1) throw new Error('ошибка в выражении');
    return stack[0];
}

function calculate() {
    if (expression.trim() === '') return;
    try {
        let rpn_exp = rpn(expression);
        let result = rpn_check(rpn_exp);
        let rounded = Math.round(result * 1e10) / 1e10;
        expression = String(rounded);
        reset = true;
        updateDisplay();
    }
    catch (error) {
        expression = `Ошибка: ${error.message}`;
        reset = true;
        updateDisplay();
    }
}

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        let action = button.dataset.action;
        let value = button.dataset.value;

        if (action === 'digit') addToExpression(value);
        else if (action === 'operator') addToExpression(value);
        else if (action === 'parenthesis') addToExpression(value);
        else if (action === 'dot') addToExpression('.');
        else if (action === 'clear') clearCalculator();
        else if (action === 'equals') calculate();
        else if (action === 'backspace') backspace();
    });
});

clearCalculator();