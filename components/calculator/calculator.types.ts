export interface SelectableItem {
  id: string
  label: string
  price: number
}

export interface QuantifiableItem extends SelectableItem {
  quantity: number
}

export interface ToggleableItem extends SelectableItem {
  isEnabled: boolean // renamed from isChecked for more generic use
}

export type CalculatorSelection = {
  primarySelection: string | null
  quantifiedItems: QuantifiableItem[]
  toggledItems: ToggleableItem[]
}

export interface ServiceMainProps {
  id: string
  label: string
  price: number
}
export interface ServiceSubProps {
  id: string
  label: string
  price: number
  quantity: number
}
export interface ServiceAdditionalProps {
  id: string
  label: string
  price: number
  isChecked: boolean
}
export interface CalculatorProps {
  servicesMain?: ServiceMainProps[]
  servicesSub?: ServiceSubProps[]
  servicesAdditional?: ServiceAdditionalProps[]
}
export interface CalculatorContextValue {
  serviceMainSelected: string
  setServiceMainSelected: (e: React.ChangeEvent<HTMLInputElement>) => void
  serviceSub: string | null
  setSubServices: (e: React.ChangeEvent<HTMLInputElement>) => void
  serviceAdditional: string | null
  setServiceAdditional: (e: React.ChangeEvent<HTMLInputElement>) => void
  serviceMainPrice: number
  serviceSubPrice: number
  serviceAdditionalPrice: number

  servicesMain?: ServiceMainProps[]
  servicesSub?: ServiceSubProps[]
  servicesAdditional?: ServiceAdditionalProps[]
}
export enum CALCULATOR_ACTION_TYPES {
  SET_SERVICE_MAIN_SELECTED = "SET_SERVICE_MAIN_SELECTED",
  SET_SERVICE_SUB = "SET_SERVICE_SUB",
  SET_SERVIEC_ADDITIONAL = "SET_SERVIEC_ADDITIONAL",
}
export type CalculatorState = {
  serviceMainSelected: string | null
  serviceSub: string | null
  serviceAdditional: string | null
}
export type CalculatorAction = {
  type: CALCULATOR_ACTION_TYPES
  payload: string | null
}
