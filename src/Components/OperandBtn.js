import React from 'react'
import { ACTIONS } from '../App'

export default function OperandBtn({dispatch, digit}) {
  return (
    <button
      className="btn"
      onClick={() => dispatch({ type: ACTIONS.OPERATION, payload: {digit}})}
    >
      {digit}
    </button>
  );
}
