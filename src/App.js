import "./index.css";

import Header from "./Components/Header";
import { useReducer,  useState, useEffect } from "react";
import DigitBtn from "./Components/DigitBtn";
import OperandBtn from "./Components/OperandBtn";




export const ACTIONS = {
  JOIN_DIGITS: "join-digits",
  OPERATION: "operate",
  DELETE_DIGITS: "delete-digits",
  RESET_DIGITS: "reset-digits",
  EVALUATE_DIGITS: "eval-digits",
};
function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.JOIN_DIGITS:
    // starting with a decimal  
    if(state.currentOperand === null && payload.digit === "."){
        return{
          ...state,
          currentOperand: payload.digit,
      }
    }
    
    // to avoid multiple decimal points
    if (payload.digit === "." && state.currentOperand.includes(".")) {
      return state;
    }
    
    // to avoid starting operations with multiple zeros
      if (state.currentOperand === "0" && payload.digit === 0) {
        return {
          ...state,
          currentOperand: state.currentOperand,
        };
      }

      
      if (state.active === true) {
        return {
          ...state,
          active: false,
          currentOperand: payload.digit,
        };
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };
    case ACTIONS.RESET_DIGITS:
      return {};
    case ACTIONS.DELETE_DIGITS:
      if (state.currentOperand == null) return state;
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };
    case ACTIONS.OPERATION:
      // if nothing is showing and operation is clicked, nothing should happen
      if (state.previousOperand == null && state.currentOperand == null) {
        return state;
      }
      // if currentOperand exist
      if (state.previousOperand == null) {
        return {
          ...state,
          Operator: payload.digit,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }
      // if current state does not exist and operator exist
      if (state.currentOperand == null) {
        return {
          ...state,
          Operator: payload.digit,
        };
      }
      // if prevvious and current exist,
      // evaluate previous and current the add operation to result in previous
      return {
        ...state,
        Operator: payload.digit,
        previousOperand: evaluate({ state }),
        currentOperand: null,
      };
    case ACTIONS.EVALUATE_DIGITS:
      if (state.previousOperand == null || state.currentOperand == null)
        return state;

      return {
        active: true,
        previousOperand: null,
        currentOperand: evaluate({ state }).toString(),
      };
    default: {
    }
  }
}

// function evaluate
function evaluate({ state }) {
  const prev = parseFloat(state.previousOperand);
  const current = parseFloat(state.currentOperand);
  const Operator = state.Operator;
  let result = "";
  if (isNaN(prev) || isNaN(current)) return state;
  if (Operator === "+") {
    result = prev + current;
  }
  if (Operator === "-") {
    result = prev - current;
  }
  if (Operator === "x") {
    result = prev * current;
  }
  if (Operator === "/") {
    if (current === 0) return result = 0;
    result = prev / current
  }
  return result;
}

function App() {
  const [color, setColor] = useState()
  const [{ previousOperand, Operator, currentOperand }, dispatch] = useReducer(
    reducer,
    {}
  );

  useEffect(()=>{
    const currentThemeColor = localStorage.getItem("theme-color");
    if(currentThemeColor){
      setColor(currentThemeColor)
    }
  }, [])

  return (
    <div className={`app ${color}`} >
      <Header  set={setColor} effect={color}/>
      <div className="calc-body">
        <div className="output-container">
          <div className="previous-operation">
            {previousOperand} {Operator}
          </div>
          <div className="current-operation">{currentOperand}</div>
        </div>
        <div className="calc-buttons">
          {/* className="btn" */}
          <DigitBtn dispatch={dispatch} digit={7} />
          <DigitBtn dispatch={dispatch} digit={8} />
          <DigitBtn dispatch={dispatch} digit={9} />

          <button
            className=" del btn"
            onClick={() => dispatch({ type: ACTIONS.DELETE_DIGITS })}
          >
            DEL
          </button>
          <DigitBtn dispatch={dispatch} digit={4} />
          <DigitBtn dispatch={dispatch} digit={5} />
          <DigitBtn dispatch={dispatch} digit={6} />

          <OperandBtn dispatch={dispatch} digit="+" />
          <DigitBtn dispatch={dispatch} digit={1} />
          <DigitBtn dispatch={dispatch} digit={2} />
          <DigitBtn dispatch={dispatch} digit={3} />
          <OperandBtn dispatch={dispatch} digit="-" />
          <DigitBtn dispatch={dispatch} digit="." />
          <DigitBtn dispatch={dispatch} digit={0} />
          <OperandBtn dispatch={dispatch} digit="/" />
          <OperandBtn dispatch={dispatch} digit="x" />
          <button
            className=" span-two reset btn"
            onClick={() => dispatch({ type: ACTIONS.RESET_DIGITS })}
          >
            RESET
          </button>
          <button
            onClick={() => dispatch({ type: ACTIONS.EVALUATE_DIGITS })}
            className="span-two equals btn "
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
