import { CALCULATOR_ACTION_TYPES, ServiceSubProps } from "./calculator.types"

export const createAction = <T extends CALCULATOR_ACTION_TYPES, P>(
  type: T,
  payload: P
) => ({
  type,
  payload,
})

export function updateServiceSubPrice(
  e: React.ChangeEvent<HTMLInputElement>,
  subServices: ServiceSubProps[]
) {
  const { id, value } = e.target

  const updatedSubServices = subServices.map((service) => {
    if (service.id === id) {
      service.quantity = Number(value)
    }
    return service
  })

  return updatedSubServices
}
