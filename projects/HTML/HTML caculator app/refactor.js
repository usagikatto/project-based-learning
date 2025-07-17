const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculator__keys')
const display = document.querySelector('.calculator__display')

const resultString = createResultString = (key, displayedNum, state) => {
    const keyContent = key.textContent
    const action = key.dataset.action
    const firstValue = state.firstValue
    const modValue = state.modValue
    const operator = state.operator
    const previousKeyType = state.previousKeyType

    const calculate = (n1, operator, n2) => {
        const firstNum = parseFloat(n1)
        const secondNum = parseFloat(n2)
        if (operator === 'add') return firstNum + secondNum
        if (operator === 'subtract') return firstNum - secondNum
        if (operator === 'multiply') return firstNum * secondNum
        if (operator === 'divide') return firstNum / secondNum
    }

    if (!action) {
        return displayedNum === '0' ||
        previousKeyType === 'operator' ||
        previousKeyType === 'calculate'
        ? keyContent
        : displayedNum + keyContent
    }

    if (action === 'decimal') {
        if (!displayedNum.includes('.')) return displayedNum + '.'
        if (previousKeyType === 'operator' || previousKeyType === 'calculate') return '0.'
        return displayedNum
    }

    if (
        action === 'add' ||
        action === 'subtract' ||
        action === 'multiply' ||
        action === 'divide'
    ) {
        const firstValue = calculator.dataset.firstValue
        const operator = calculator.dataset.operator

        return firstValue &&
        operator &&
        previousKeyType !== 'operator' &&
        previousKeyType !== 'calculate'
        ? calculate(firstValue, operator, secondValue)
        : displayedNum
    }

    if (action === 'clear') return 0

    if (action === 'calculate') {
        const firstValue = calculator.dataset.firstValue
        const operator = calculator.dataset.operator
        const modValue = calculator.dataset.modValue

        return firstValue
        ? previousKeyType === 'calculate'
            ? calculate(displayedNum, operator, modValue)
            : calculate(firstValue, operator, displayedNum)
        : displayedNum
        }
    }


keys.addEventListener('click', e => {
    if (!e.target.matches('button')) return
    const displayedNum = display.textContent
    const resultString = createResultString(e.target, displayedNum, calculator.dataset)
    

    // Remove depressed state from all keys
    Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'))

    // Number key
    

    // Operator key
    if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
        const firstValue = calculator.dataset.firstValue
        const operator = calculator.dataset.operator
        const secondValue = displayedNum

        if (
            firstValue &&
            operator &&
            previousKeyType !== 'operator' &&
            previousKeyType !== 'calculate'
        ) {
            const calcValue = calculate(firstValue, operator, secondValue)
            display.textContent = calcValue
            calculator.dataset.firstValue = calcValue
        } else {
            calculator.dataset.firstValue = displayedNum
        }

        key.classList.add('is-depressed')
        calculator.dataset.operator = action
        calculator.dataset.previousKeyType = 'operator'
    }

    // Decimal key
    if (action === 'decimal') {
        if (previousKeyType === 'operator' || previousKeyType === 'calculate') {
            display.textContent = '0.'
        } else if (!displayedNum.includes('.')) {
            display.textContent = displayedNum + '.'
        }
        calculator.dataset.previousKeyType = 'decimal'
    }

    // Clear key
    if (action === 'clear') {
        if (key.textContent === 'AC') {
            calculator.dataset.firstValue = ''
            calculator.dataset.modValue = ''
            calculator.dataset.operator = ''
            calculator.dataset.previousKeyType = ''
        } else {
            key.textContent = 'AC'
        }

        display.textContent = '0'
        calculator.dataset.previousKeyType = 'clear'
    }

    // Reset clear button text
    if (action !== 'clear') {
        const clearButton = calculator.querySelector('[data-action=clear]')
        clearButton.textContent = 'CE'
    }

    // Calculate key
    if (action === 'calculate') {
        let firstValue = calculator.dataset.firstValue
        let secondValue = displayedNum
        const operator = calculator.dataset.operator

        if (firstValue && operator) {
            if (previousKeyType === 'calculate') {
                firstValue = displayedNum
                secondValue = calculator.dataset.modValue
            }

            const calcValue = calculate(firstValue, operator, secondValue)
            display.textContent = calcValue
            calculator.dataset.firstValue = calcValue
            calculator.dataset.modValue = secondValue
        }

        calculator.dataset.previousKeyType = 'calculate'
    }
})
