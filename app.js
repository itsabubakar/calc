class Calculator {
  constructor(prevOperandText,currentOperandText) {
    this.currentOperandText = currentOperandText;
    this.prevOperandText = prevOperandText;
    this.clear();
  }

  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  appendNumber(number) {
      if(number === '.' && this.currentOperand.includes('.')) return
      this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if(this.currentOperand === '') return
    if (this.previousOperand !== '') {
        this.compute()
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = ''
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if(isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
        case '+':
            computation = prev + current;
            break
        case '-':
            computation = prev - current;
            break
        case '/':
            computation = prev / current;
            break
        case '*':
            computation = prev * current;
            break
        default:
            return;
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
  }

  displayNum(number) {
      const floated = parseFloat(number);
      if(isNaN(floated)) return ''
      return floated.toLocaleString('en')
  }

  updateDisplay() {
    this.currentOperandText.innerText = this.displayNum(this.currentOperand)
    if(this.operation != null) {
        this.prevOperandText.innerText = `${this.displayNum(this.previousOperand)} ${this.operation}`;
    } else {
        this.prevOperandText.innerText = ''
    }
  }
}

const numberBtns = document.querySelectorAll("[data-number]");
const operationBtns = document.querySelectorAll("[data-operation]");
const equalsBtns = document.querySelector("[data-equals]");
const deletesBtns = document.querySelector("[data-delete]");
const allClearBtns = document.querySelector("[data-all-clear]");
const currentOperandText = document.querySelector("[data-current-operand");
const prevOperandText = document.querySelector("[data-prev-operand]");


const calculator = new Calculator(prevOperandText,currentOperandText);

numberBtns.forEach(btn => {
    btn.addEventListener('click', ()=> {
        calculator.appendNumber(btn.innerText);
        calculator.updateDisplay();
    })
})

operationBtns.forEach(btn => {
    btn.addEventListener('click', ()=> {
        calculator.chooseOperation(btn.innerText);
        calculator.updateDisplay();
    })
})

equalsBtns.addEventListener('click', btn=> {
    calculator.compute();
    calculator.updateDisplay();
})

allClearBtns.addEventListener('click', btn=> {
    calculator.clear();
    calculator.updateDisplay();
})

deletesBtns.addEventListener('click', btn=> {
    calculator.delete();
    calculator.updateDisplay();
})