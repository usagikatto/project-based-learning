const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculator__keys')
const display = document.querySelector('.calculator__display')

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target
        const action = key.dataset.action
        const keyContent = key.textContent
        const displayedNum = display.textContent
        const previousKeyType = calculator.dataset.previousKeyType

        if (!action) {
            if(displayedNum === '0' || previousKeyType == 'operator') {
                display.textContent = keyContent
            } else {
                display.textContent = displayedNum +keyContent
            }
        }

        if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
        ) {
            key.classList.add('is-depressed')
            calculator.dataset.previousKeyType = 'operator'

            calculator.dataset.firstValue = displayedNum
            calculator.dataset.operator = action
        }
        

        if (action === 'decimal') {
            display.textContent = displayedNum + '.'
        }

        if (action === 'clear') {
            console.log('clear key!')
        }

        const calculate = (n1, operator, n2) => {
            if (operator === 'add') {
                return parseFloat(n1) + parseFloat(n2)
            } else if (operator === 'subtract') {
                return parseFloat(n1) - parseFloat(n2)
            } else if (operator === 'multiply') {
                return parseFloat(n1) * parseFloat(n2)
            } else if (operator === 'divide') {
                return parseFloat(n1) / parseFloat(n2)
            }
        }

        if (action === 'calculate') {
            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayedNum

            display.textContent = calculate(firstValue, operator, secondValue)
        }
            
        Array.from(key.parentNode.children)
            .forEach(k => k.classList.remove('is-depressed'))
    }
})