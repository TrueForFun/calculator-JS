let runnungTotal = 0;
let buffer = `0`;
let previousOperator = null;

const screen = document.querySelector(`.screen`);

function buttonClick(value) {
  if (isNaN(value)) {
    // it is not a number
    handleSymbol(value);
  } else {
    handleNumber(value);
    // it is a number
  }
  screen.innerText = buffer;
}

function handleSymbol(symbol) {
  switch (symbol) {
    case `C`:
      buffer = `0`;
      runnungTotal = 0;
      break;
    case `=`:
      if (previousOperator === null) {
        return;
        // there should be two numbers to math
      }
      flushOperation(+buffer);
      previousOperator = null;
      buffer = runnungTotal;
      runnungTotal = 0;
      break;
    case `←`:
      if (buffer.length === 1) {
        buffer = `0`;
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    case `+`:
    case `-`:
    case `÷`:
    case `×`:
      handleMath(symbol);
      break;
  }
}
function handleMath(symbol) {
  if (buffer === `0`) {
    return;
  }

  const intBuffer = parseInt(buffer);
  // +buffer will be the same thing

  if (runnungTotal === 0) {
    runnungTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }

  previousOperator = symbol;

  buffer = `0`;
}

function flushOperation(intBuffer) {
  if (previousOperator === `+`) {
    runnungTotal += intBuffer;
  } else if (previousOperator === `-`) {
    runnungTotal -= intBuffer;
  } else if (previousOperator === `×`) {
    runnungTotal *= intBuffer;
  } else {
    runnungTotal /= intBuffer;
  }
}

function handleNumber(numberString) {
  if (buffer === `0`) {
    buffer = numberString;
  } else {
    buffer = buffer + numberString;
  }
}

function init() {
  document
    .querySelector(`.calc-buttons`)
    .addEventListener(`click`, function (event) {
      buttonClick(event.target.innerText);
    });
}

init();
