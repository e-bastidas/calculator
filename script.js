let firstDigit = '';
let secondDigit = '';
let tempDigit = '';
let operator = '';
let result = '';
let firstDigitSet = false;
let decimalAdded = false;
let operatorAdded = false;
let expressionEnded = false;

let screenTop = document.querySelector('.top-line');
let screenBottom = document.querySelector('.bottom-line');

function expression(a, b, c) {
    return c === '+' ? a + b 
        : c === '-' ? a - b 
        : c === 'x' ? a * b
        : c === '÷' && b === 0 ? 'Error' 
        : a / b
};

function screenOrganizer(b){
    if (expressionEnded == false) {
        if (!firstDigitSet) {
            setFirstScreenAndDigit(b)
        } else if (firstDigitSet == true && operatorAdded == true) {
            setSecScreenAndDigit(b)
        }
    } if (expressionEnded == true) {
        setSecScreenAndDigit(b)
        secondDigit = b.value;
        expressionEnded = false;
        screenBottom.textContent = b.value;
        
    }
};

const setFirstScreenAndDigit = (b) => {
    if (b.value === '.') {
        if (!decimalAdded) {
            firstDigit += '.';
            decimalAdded = true;
        }
    } else {
        firstDigit += b.value;
        screenBottom.textContent = `${firstDigit} ${secondDigit}`;
    }
};

const setSecScreenAndDigit = (b) => {
    if (b.value === '.') {
        if (!decimalAdded) {
            secondDigit += '.';
            decimalAdded = true;
        }
    } else if (expressionEnded == false) {
        operatorAdded = true;
        secondDigit += b.value;
        screenTop.textContent = `${firstDigit} ${operator}`;
        screenBottom.textContent = `${secondDigit}`;
    } else if (expressionEnded == true && secondDigit == '') {
        secondDigit = b.value;
        screenBottom.textContent = secondDigit;
    }
};

function setOperator(c) {
    if (!operatorAdded && !expressionEnded) {
        firstDigitSet = true;
        decimalAdded = false;
        operator = c.value;
        screenBottom.textContent += ` ${operator}`;
        operatorAdded = true;
    } else if (operatorAdded == false && expressionEnded == true) {
        operator = c.value;
        firstDigit = result;
        secondDigit = result;
        screenTop.textContent = `${result}`;
        screenBottom.textContent = `${result}`;
        screenBottom.textContent += `${operator}`;
    } else if (operatorAdded == true && expressionEnded == false) {
        calculation();
        operator = c.value;
        secondDigit = result;
        screenTop.textContent = `${result} ${operator}`;
        screenBottom.textContent = result;
        operatorAdded = true;
    } else if (operatorAdded == true && expressionEnded == true) {
        operator = c.value;
        secondDigit = '';
        screenBottom.textContent = result;
        screenTop.textContent = `${result} ${operator}`;
    }
};

function calculation() {
    resetFontFirstScreeen()
    result = expression(Number(firstDigit), Number(secondDigit), operator);
    screenTop.textContent = `${firstDigit} ${operator} ${secondDigit}`;
    screenBottom.textContent = `${result}`;
    expressionEnded = true;
        
    if (operatorAdded == true && expressionEnded == true) {
         if (secondDigit === '') {
            secondDigit = firstDigit;
            result = expression(Number(firstDigit), Number(firstDigit), operator);
            screenTop.textContent = `${firstDigit} ${operator} ${secondDigit}`;
            screenBottom.textContent = `${result}`
        }
        screenTop.textContent = `${firstDigit} ${operator} ${secondDigit}`;
        expression(Number(firstDigit), Number(secondDigit), operator)
        screenBottom.textContent = result;
        firstDigit = result;
    } else if (operatorAdded == false && expressionEnded == true) {
        result = expression(Number(firstDigit), Number(secondDigit), operator);
        screenTop.textContent = `${firstDigit} ${operator} ${secondDigit}`;
        screenBottom.textContent = `${result}`
        expressionEnded = false;
    };
    adjustFontSizeForLineOne();
    adjustFontSizeForLineTwo(); 
};

function reset(){
    firstDigit = '';
    secondDigit = '';
    tempDigit = '';
    operator = '';
    result = '';
    screenTop.textContent = '';
    screenBottom.textContent = '';
    firstDigitSet = false;
    decimalAdded = false;
    operatorAdded = false;
    expressionEnded = false;
};

function adjustFontSizeForLineOne() {
    const firstDigitLenght = screenTop.textContent.length;
    let fontSize = 4.5;
    if (firstDigitLenght > 13) {
        for (let i = 13; i < firstDigitLenght; i++) {
            fontSize -= 0.17;
            screenTop.style.fontSize = `${fontSize}em`
            screenTop.style.paddingTop = '20px';
            screenTop.style.paddingLeft = 0;
            screenTop.style.paddingRight = 0; 
        };
    };
};

function adjustFontSizeForLineTwo() {
    const secondDigitLenght = screenBottom.textContent.length;
    let fontSize = 4.5;
    if (secondDigitLenght > 13) {
        for (let i = 13; i < secondDigitLenght; i++) {
            fontSize -= 0.19;
            screenBottom.style.fontSize = `${fontSize}em`;
            screenBottom.style.paddingLeft = 0;
            screenBottom.style.paddingRight = 0; 
        };
    };
};

function resetFontBottom() {
    const secondDigitLenght = screenBottom.textContent.length;
    if (secondDigitLenght < 13) {
        screenBottom.style.fontSize = '4.5em';
    };
};
function resetFontFirstScreeen() {
    const firstDigitLenght = screenTop.textContent.length;
    if (firstDigitLenght < 13) {
        screenTop.style.fontSize = '4.5em';
    };
};

document.querySelectorAll('.numBtn').forEach(b => b.addEventListener('click', e => screenOrganizer(b)));
document.querySelectorAll('.numBtn').forEach(b => b.addEventListener('click', e => {resetFontFirstScreeen(), resetFontBottom()}));
document.querySelectorAll('.opBtn').forEach(c => c.addEventListener('click', e => setOperator(c)));
document.querySelector('.resBtn').addEventListener('click', () => reset());
document.querySelector('.exeBtn').addEventListener('click', () => calculation());