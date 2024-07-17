const numButtons = document.querySelectorAll('.num');
const opButtons = document.querySelectorAll('.op');
const clearButton = document.querySelector('.clear');
const changeNumButton = document.querySelector('.change');
const backButton = document.querySelector('.back');
const floatButton = document.querySelector('.float');
const equalButton = document.querySelector('.equal');
const firstScreen = document.querySelector('.first-screen');
const secondScreen = document.querySelector('.second-screen');

let sum = '';
let currentOp = '';

const mathOp = {
    '+': (a, b) => {
        return a + b;
    },
    '-': (a, b) => {
        return a - b;
    },
    '/': (a, b) => {
        if (b !== 0) {
            return a / b;
        }
        alert("Can't divide to 0");
        clearAll();
    },
    '*': (a, b) => {
        return a * b;
    },
};

numButtons.forEach((num) => {
    num.addEventListener('click', () => addNumber(num.textContent));
});

opButtons.forEach((button) => {
    button.addEventListener('click', () => makeOperation(button.textContent));
});

clearButton.addEventListener('click', () => clearAll());

changeNumButton.addEventListener('click', () => {
    if (secondScreen.textContent[0] === '-') {
        secondScreen.textContent = secondScreen.textContent.split('').slice(1).join('');
    } else if (secondScreen.textContent.length > 0) {
        secondScreen.textContent = [...'-', ...secondScreen.textContent].join('');
    }
});

backButton.addEventListener('click', () => removeNum());

floatButton.addEventListener('click', () => addFloat());

equalButton.addEventListener('click', () => findAnswer());

window.addEventListener('keydown', (e) => handleKeyPress(e));

// Functions
const addNumber = (num) => {
    if (secondScreen.textContent[0] === '0' && !secondScreen.textContent.includes('.')) {
        secondScreen.textContent = num;
    } else {
        secondScreen.textContent += `${num}`;
    }
};

const makeOperation = (op) => {
    if (secondScreen.textContent.length > 0) {
        if (sum === '' || firstScreen.textContent.includes('=')) {
            sum = Number(secondScreen.textContent);
        } else {
            sum = mathOp[currentOp](sum, Number(secondScreen.textContent));
        }
    }

    currentOp = op;
    firstScreen.textContent = `${sum} ${currentOp}`;
    secondScreen.textContent = '';
};

const clearAll = () => {
    firstScreen.textContent = '';
    secondScreen.textContent = '';
    currentOp = '';
    sum = '';
};

const findAnswer = () => {
    if (secondScreen.textContent.length > 0 && currentOp !== '') {
        if (!firstScreen.textContent.includes('=')) {
            firstScreen.textContent += ` ${secondScreen.textContent} = `;
            secondScreen.textContent = mathOp[currentOp](sum, Number(secondScreen.textContent));
        } else {
            sum = Number(secondScreen.textContent);
            const secondScreenNumber = Number(firstScreen.textContent.split(' ')[2]);
            firstScreen.textContent = `${sum} ${currentOp} ${secondScreenNumber} =`;
            secondScreen.textContent = mathOp[currentOp](sum, secondScreenNumber);
        }
    }
};

const addFloat = () => {
    if (!secondScreen.textContent.includes('.') && secondScreen.textContent.length > 0) {
        secondScreen.textContent += '.';
    }
};

const removeNum = () => {
    secondScreen.textContent = secondScreen.textContent.split('').slice(0, -1).join('');
};

const handleKeyPress = (e) => {
    if (e.key >= 0 && e.key <= 9) {
        addNumber(e.key);
    } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        findAnswer();
    } else if ('+-/*'.includes(e.key)) {
        makeOperation(e.key);
    } else if (e.key === 'Backspace') {
        removeNum();
    } else if (e.key === 'Delete') {
        clearAll();
    } else if (e.key === '.') {
        addFloat();
    }
};
