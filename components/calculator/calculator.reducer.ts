import {
  CALCULATOR_ACTION_TYPES,
  CalculatorAction,
  CalculatorState,
} from "./calculator.types"

export const INITIAL_STATE: CalculatorState = {
  serviceMainSelected: "",
  serviceSub: null,
  serviceAdditional: null,
}
export const calculatorReducer = (
  state: CalculatorState,
  { type, payload }: CalculatorAction
) => {
  switch (type) {
    case CALCULATOR_ACTION_TYPES.SET_SERVICE_MAIN_SELECTED:
      return {
        ...state,
        serviceMainSelected: payload,
      }

    case CALCULATOR_ACTION_TYPES.SET_SERVICE_SUB:
      return {
        ...state,
        serviceSub: payload,
      }

    case CALCULATOR_ACTION_TYPES.SET_SERVIEC_ADDITIONAL:
      return {
        ...state,
        serviceAdditional: payload,
      }

    default:
      return state
  }
}
