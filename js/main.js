let activeInputField = 'num1';

function setOperator(operator) {
    const operatorDisplay = document.getElementById('operator');
    if (operatorDisplay.textContent === operator) {
        operatorDisplay.textContent = '_';
    } else {
        operatorDisplay.textContent = operator;
    }
    triggerCalculation();
}

function validateInput(inputField) {
    inputField.value = inputField.value.replace(/[^0-9]/g, '').slice(0, 2);
    triggerCalculation();
}

function selectNumber(number) {
    const activeField = document.getElementById(activeInputField);
    
    // Only add the number if the field has less than 2 digits
    if (activeField.value.length < 2) {
        activeField.value += number;
    }
    triggerCalculation();
}

function resetFields() {
    document.getElementById('num1').value = '';
    document.getElementById('num2').value = '';
    document.getElementById('operator').textContent = '_';
    activeInputField = 'num1';
    document.querySelector('.sum').textContent = '0';
    document.getElementById('num1').focus();
}

function clearField(field) {
    document.getElementById(field).value = '';
    activeInputField = field;
    triggerCalculation();
}

function setActiveField(field) {
    document.getElementById('num1').classList.remove('active-field');
    document.getElementById('num2').classList.remove('active-field');
    document.getElementById(field).classList.add('active-field');
    activeInputField = field;
    document.getElementById(field).focus(); 
}

// Function to trigger calculation when all inputs are filled
function triggerCalculation() {
    const num1 = document.getElementById('num1').value;
    const num2 = document.getElementById('num2').value;
    const operator = document.getElementById('operator').textContent;

    if (num1.length >= 1 && num2.length >= 1 && ['+', '-', '*', '/'].includes(operator)) {
        calculateResult(num1, num2, operator);
    } else {
        document.querySelector('.sum').textContent = '0';
    }
}

function calculateResult(num1, num2, operator) {
    let result = 0;
    const number1 = parseInt(num1, 10);
    const number2 = parseInt(num2, 10);

    switch (operator) {
        case '+':
            result = number1 + number2;
            break;
        case '-':
            result = number1 - number2;
            break;
        case '*':
            result = number1 * number2;
            break;
        case '/':
            result = number2 !== 0 ? number1 / number2 : 'Error';
            break;
        default:
            result = 'Error';
    }

    // Format the result to 4 significant digits if possible
    if (typeof result === 'number' && result !== 'Error') {
        result = parseFloat(result.toPrecision(4));
    }

    document.querySelector('.sum').textContent = result.toString().slice(0, 4);
}

// Handle keyboard input
document.addEventListener('keydown', function(event) {
    if (!isNaN(event.key)) {
        // If the key pressed is a number, select it
        selectNumber(event.key);
    } else if (['+', '-', '*', '/'].includes(event.key)) {
        // If the key pressed is an operator, set it
        setOperator(event.key);
    } else if (event.key === 'Backspace') {
        // If Backspace is pressed, clear the active field
        const currentInput = document.getElementById(activeInputField);
        currentInput.value = currentInput.value.slice(0, -1);
        triggerCalculation();
    }
});

// Initial setup: set num1 as active field
window.onload = function() {
    activeInputField = 'num1';
    document.getElementById('num1').focus();
};