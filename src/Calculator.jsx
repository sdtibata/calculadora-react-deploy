import { useState } from 'react'
import './Calculator.css'

export default function Calculator() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState(null)
  const [operation, setOperation] = useState(null)
  const [waitingForNewValue, setWaitingForNewValue] = useState(false)

  const handleNumber = (num) => {
    if (waitingForNewValue) {
      setDisplay(String(num))
      setWaitingForNewValue(false)
    } else {
      setDisplay(display === '0' ? String(num) : display + num)
    }
  }

  const handleDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.')
      setWaitingForNewValue(false)
    } else if (!display.includes('.')) {
      setDisplay(display + '.')
    }
  }

  const handleOperation = (nextOperation) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const result = performCalculation(previousValue, inputValue, operation)
      setDisplay(String(result))
      setPreviousValue(result)
    }

    setOperation(nextOperation)
    setWaitingForNewValue(true)
  }

  const performCalculation = (prev, current, op) => {
    switch (op) {
      case '+':
        return prev + current
      case '-':
        return prev - current
      case '*':
        return prev * current
      case '/':
        return prev / current
      default:
        return current
    }
  }

  const handleEquals = () => {
    const inputValue = parseFloat(display)

    if (previousValue !== null && operation) {
      const result = performCalculation(previousValue, inputValue, operation)
      setDisplay(String(result))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForNewValue(true)
    }
  }

  const handleClear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForNewValue(false)
  }

  const handleBackspace = () => {
    if (display.length === 1) {
      setDisplay('0')
    } else {
      setDisplay(display.slice(0, -1))
    }
  }

  const handlePercentage = () => {
    const inputValue = parseFloat(display)
    setDisplay(String(inputValue / 100))
  }

  return (
    <div className="calculator-container">
      <div className="calculator">
        <div className="display">{display}</div>
        
        <div className="buttons">
          <button className="btn btn-secondary" onClick={handleClear}>AC</button>
          <button className="btn btn-secondary" onClick={handleBackspace}>DEL</button>
          <button className="btn btn-secondary" onClick={handlePercentage}>%</button>
          <button className="btn btn-operation" onClick={() => handleOperation('/')}>÷</button>

          <button className="btn" onClick={() => handleNumber(7)}>7</button>
          <button className="btn" onClick={() => handleNumber(8)}>8</button>
          <button className="btn" onClick={() => handleNumber(9)}>9</button>
          <button className="btn btn-operation" onClick={() => handleOperation('*')}>×</button>

          <button className="btn" onClick={() => handleNumber(4)}>4</button>
          <button className="btn" onClick={() => handleNumber(5)}>5</button>
          <button className="btn" onClick={() => handleNumber(6)}>6</button>
          <button className="btn btn-operation" onClick={() => handleOperation('-')}>−</button>

          <button className="btn" onClick={() => handleNumber(1)}>1</button>
          <button className="btn" onClick={() => handleNumber(2)}>2</button>
          <button className="btn" onClick={() => handleNumber(3)}>3</button>
          <button className="btn btn-operation" onClick={() => handleOperation('+')}>+</button>

          <button className="btn btn-zero" onClick={() => handleNumber(0)}>0</button>
          <button className="btn" onClick={handleDecimal}>.</button>
          <button className="btn btn-equals" onClick={handleEquals}>=</button>
        </div>
      </div>
    </div>
  )
}
