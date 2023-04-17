const initialState = {
  runningTotal: 0,
  buffer: "0",
  previousOperator: null,
  hasResult: false,
};

let state = { ...initialState };

const screen = document.querySelector(`.screen`);

function buttonClick(value) {
  if (isNaN(value)) {
    // it is not a number
    handleSymbol(value);
  } else {
    handleNumber(value);
    // it is a number
  }
  screen.innerText = state.buffer;
}

function handleSymbol(symbol) {
  switch (symbol) {
    case `C`:
      clear();
      break;
    case `=`:
      if (state.previousOperator === null) {
        return;
        // there should be two numbers to math
      }
      flushOperation(+state.buffer);
      state.previousOperator = null;
      state.buffer = state.runningTotal;
      state.runningTotal = 0;
      state.hasResult = true;
      break;
    case `←`:
      if (state.buffer.length === 1) {
        state.buffer = `0`;
      } else {
        state.buffer = state.buffer.substring(0, state.buffer.length - 1);
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

function clear() {
  state = initialState;
}

function handleMath(symbol) {
  if (state.buffer === `0`) {
    return;
  }

  const intBuffer = parseInt(state.buffer);
  // +buffer will be the same thing

  if (state.runningTotal === 0) {
    state.runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }

  state.previousOperator = symbol;

  state.buffer = `0`;
}

function flushOperation(intBuffer) {
  if (state.previousOperator === `+`) {
    state.runningTotal += intBuffer;
  } else if (state.previousOperator === `-`) {
    state.runningTotal -= intBuffer;
  } else if (state.previousOperator === `×`) {
    state.runningTotal *= intBuffer;
  } else {
    state.runningTotal /= intBuffer;
  }
}

function handleNumber(numberString) {
  if (state.buffer === `0` || state.hasResult) {
    state.buffer = numberString;
  } else {
    state.buffer = state.buffer + numberString;
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
