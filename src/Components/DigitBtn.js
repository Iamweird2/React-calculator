import { ACTIONS } from "../App";
import "../index.css";
export default function DigitBtn({ dispatch, digit }) {
  return (
    <button
      className="btn"
      onClick={() =>
        dispatch({ type: ACTIONS.JOIN_DIGITS, payload: { digit } })
      }
    >
      {digit}
    </button>
  );
}
