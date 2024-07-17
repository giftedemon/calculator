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
    num.addEventListener('click', () => {
        if (secondScreen.textContent[0] === '0' && !secondScreen.textContent.includes('.')) {
            secondScreen.textContent = num.textContent;
        } else {
            secondScreen.textContent += `${num.textContent}`;
        }
    });
});

opButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (secondScreen.textContent.length > 0) {
            if (sum === '' || firstScreen.textContent.includes('=')) {
                sum = Number(secondScreen.textContent);
            } else {
                sum = mathOp[currentOp](sum, Number(secondScreen.textContent));
            }
        }

        currentOp = button.textContent;
        firstScreen.textContent = `${sum} ${currentOp}`;
        secondScreen.textContent = '';
    });
});

clearButton.addEventListener('click', () => {
    clearAll();
});

changeNumButton.addEventListener('click', () => {
    if (secondScreen.textContent[0] === '-') {
        secondScreen.textContent = secondScreen.textContent.split('').slice(1).join('');
    } else if (secondScreen.textContent.length > 0) {
        secondScreen.textContent = [...'-', ...secondScreen.textContent].join('');
    }
});

backButton.addEventListener('click', () => {
    secondScreen.textContent = secondScreen.textContent.split('').slice(0, -1).join('');
});

floatButton.addEventListener('click', () => {
    if (!secondScreen.textContent.includes('.') && secondScreen.textContent.length > 0) {
        secondScreen.textContent += '.';
    }
});

equalButton.addEventListener('click', () => {
    findAnswer();
});

// Functions
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
