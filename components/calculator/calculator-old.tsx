"use client"

import { type } from "os"
import * as React from "react"
import { HTMLMotionProps, motion } from "motion/react"

import { cn } from "@/lib/utils"

import { Checkbox } from "../ui/checkbox"
import { Label } from "../ui/label"
import { Slider } from "../ui/slider"
import { Switch } from "../ui/switch"

//////////////__TYPES__/////////////////:
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
  serviceSub: ServiceSubProps[]
  setSubServices: (
    e: React.ChangeEvent<HTMLInputElement>,
    servicesSub: ServiceSubProps[]
  ) => void
  serviceAdditional: ServiceAdditionalProps[]
  setServiceAdditional: (e: React.ChangeEvent<HTMLInputElement>) => void
  serviceMainPrice: number | undefined
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
  serviceSub: ServiceSubProps[]
  serviceAdditional: ServiceAdditionalProps[]
}
export type CalculatorAction =
  | { type: CALCULATOR_ACTION_TYPES.SET_SERVICE_MAIN_SELECTED; payload: string }
  | {
      type: CALCULATOR_ACTION_TYPES.SET_SERVICE_SUB
      payload: ServiceSubProps[]
    }
  | {
      type: CALCULATOR_ACTION_TYPES.SET_SERVIEC_ADDITIONAL
      payload: ServiceAdditionalProps[]
    }
///////////////////////////////

//////////////__REDUCER__/////////////////:
export const INITIAL_STATE: CalculatorState = {
  serviceMainSelected: "",
  serviceSub: [], // Initialize as empty array
  serviceAdditional: [],
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
        serviceSub: Array.isArray(payload) ? payload : state.serviceSub, // Type guard
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
////////////__UTILS__/////////////////:
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
): ServiceSubProps[] {
  const { id, value } = e.target
  console.log("Updating service:", id, "to:", value) // Debug log

  return subServices.map((service) => {
    if (service.label === id) {
      return {
        ...service,
        quantity: Number(value),
      }
    }
    return service
  })
}

const CalculatorContext = React.createContext<
  CalculatorContextValue | undefined
>(undefined)
function useCalculatorContext() {
  const context = React.useContext(CalculatorContext)
  if (!context) {
    throw new Error(
      "useCalculatorContext must be used within a CalculatorProvider"
    )
  }
  return context
}
export const Calculator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CalculatorProps
>(
  (
    {
      servicesMain,
      servicesSub,
      servicesAdditional,
      children,
      className,
      ...props
    },
    ref
  ) => {
    // Initialize with both serviceSub and serviceAdditional
    const [state, dispatch] = React.useReducer(calculatorReducer, {
      ...INITIAL_STATE,
      serviceSub: servicesSub ?? [],
      serviceAdditional: servicesAdditional ?? [], // Add this
    })

    const { serviceMainSelected, serviceSub, serviceAdditional } = state

    const setServiceMainSelected = (e: React.ChangeEvent<HTMLInputElement>) =>
      dispatch(
        createAction(
          CALCULATOR_ACTION_TYPES.SET_SERVICE_MAIN_SELECTED,
          e.target.value
        )
      )

    const setSubServices = (
      e: React.ChangeEvent<HTMLInputElement>,
      servicesSub: ServiceSubProps[]
    ) =>
      dispatch(
        createAction(
          CALCULATOR_ACTION_TYPES.SET_SERVICE_SUB,
          updateServiceSubPrice(e, servicesSub)
        )
      )

    const setServiceAdditional = (e: React.ChangeEvent<HTMLInputElement>) => {
      const updatedServices = serviceAdditional.map((service) => ({
        ...service,
        isChecked:
          service.label === e.target.value
            ? !service.isChecked
            : service.isChecked,
      }))

      dispatch(
        createAction(
          CALCULATOR_ACTION_TYPES.SET_SERVIEC_ADDITIONAL,
          updatedServices
        )
      )
    }

    // Fix price calculations using state values instead of props
    const serviceMainPrice = serviceMainSelected
      ? servicesMain?.find(
          (service) =>
            service.label.toLowerCase() === serviceMainSelected.toLowerCase()
        )?.price
      : undefined

    // Calculate prices using state values
    const serviceSubPrice = React.useMemo(
      () =>
        serviceSub.reduce(
          (total, service) => total + service.price * service.quantity,
          0
        ),
      [serviceSub]
    )

    const serviceAdditionalPrice = React.useMemo(
      () =>
        serviceAdditional
          .filter((service) => service.isChecked)
          .reduce((total, service) => total + service.price, 0),
      [serviceAdditional]
    )

    const value = {
      serviceMainSelected: serviceMainSelected ?? "",
      setServiceMainSelected,
      serviceSub,
      setSubServices,
      serviceAdditional,
      setServiceAdditional,
      serviceMainPrice,
      serviceSubPrice,
      serviceAdditionalPrice,
      servicesMain,
      servicesSub,
      servicesAdditional,
    }

    return (
      <CalculatorContext.Provider value={value}>
        <div className={cn("", className)} ref={ref} {...props}>
          {children}
        </div>
      </CalculatorContext.Provider>
    )
  }
)
Calculator.displayName = "Calculator"

export const CalculatorServiceMain = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const {
    servicesMain,
    serviceMainSelected,
    setServiceMainSelected,
    serviceMainPrice,
  } = useCalculatorContext()

  const handleCheckedChange = (checked: boolean, label: string) => {
    // Create synthetic event to match the expected type
    const event = {
      target: {
        value: checked ? label : "",
      },
    } as React.ChangeEvent<HTMLInputElement>

    setServiceMainSelected(event)
  }

  return (
    <div
      id="service-main-layout"
      ref={ref}
      className={cn("flex flex-wrap gap-2 space-y-4", className)}
      {...props}
    >
      <h3 className="text-xl font-medium">Main Services</h3>
      {servicesMain?.map((service) => (
        <div
          className="relative flex items-center justify-center rounded-full bg-slate-200/70 px-4 py-2"
          key={service.label}
        >
          <Checkbox
            id={service.label}
            className="absolute inset-0 !rounded-[inherit] border-current border-opacity-50"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              borderRadius: "inherit !important",
            }}
            name={service.label}
            checked={service.label === serviceMainSelected}
            onCheckedChange={(checked) =>
              handleCheckedChange(checked as boolean, service.label)
            }
            value={service.label}
            title={service.label}
          />
          <Label
            className="pointer-events-none z-10 font-medium capitalize"
            htmlFor={service.label}
          >
            {service.label}&nbsp;
            <span className="text-xs font-normal">(${service.price})</span>
          </Label>
          {service.label === serviceMainSelected && (
            <motion.div
              layoutId="service-main-layout"
              className="pointer-events-none absolute inset-0 !rounded-[inherit] bg-indigo-600"
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            />
          )}
        </div>
      ))}
    </div>
  )
})
CalculatorServiceMain.displayName = "CalculatorServiceMain"

export const CalculatorServiceSub = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { serviceSub, setSubServices } = useCalculatorContext() // Use serviceSub instead of servicesSub

  const handleSliderChange = React.useCallback(
    (value: number, service: ServiceSubProps) => {
      const event = {
        target: {
          id: service.label,
          value: value.toString(),
        },
      } as React.ChangeEvent<HTMLInputElement>

      setSubServices(event, serviceSub) // Use serviceSub from context
      console.log("Updating:", service.label, "to:", value) // Debug log
    },
    [serviceSub, setSubServices]
  )

  return (
    <div className={cn("w-3/5", className)} ref={ref} {...props}>
      <div className="flex flex-col gap-6">
        {serviceSub.map(
          (
            service // Use serviceSub directly
          ) => (
            <div key={service.label} className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor={service.label}>
                  {service.label}&nbsp;
                  <span className="text-xs">
                    (${service.price * (service.quantity || 0)})
                  </span>
                </Label>
                <span className="text-sm font-medium">{service.quantity}</span>
              </div>
              <Slider
                id={service.label}
                min={0}
                max={10}
                step={1}
                defaultValue={[service.quantity]} // Changed from defaultValue to value
                onValueChange={(defaultValue) =>
                  handleSliderChange(defaultValue[0], service)
                }
                className="w-full"
              />
            </div>
          )
        )}
      </div>
    </div>
  )
})
CalculatorServiceSub.displayName = "CalculatorServiceSub"

export const CalculatorServiceAdditional = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { servicesAdditional, serviceAdditional, setServiceAdditional } =
    useCalculatorContext()

  const handleCheckedChange = React.useCallback(
    (checked: boolean, label: string) => {
      const event = {
        target: {
          value: label,
        },
      } as React.ChangeEvent<HTMLInputElement>

      setServiceAdditional(event)
    },
    [setServiceAdditional]
  )

  return (
    <div className="" ref={ref} {...props}>
      {servicesAdditional?.map((service) => (
        <div key={service.label}>
          <Switch
            checked={
              serviceAdditional.find((s) => s.label === service.label)
                ?.isChecked
            }
            onCheckedChange={(checked) =>
              handleCheckedChange(checked, service.label)
            }
          />
          <Label>
            {service.label}{" "}
            <span
              style={{
                opacity: serviceAdditional.find(
                  (s) => s.label === service.label
                )?.isChecked
                  ? 1
                  : 0.1,
              }}
            >
              (${service.price})
            </span>
          </Label>
        </div>
      ))}
    </div>
  )
})
CalculatorServiceAdditional.displayName = "CalculatorServiceAdditional"

export const AnimatedNumber = ({
  value,
  index,
}: {
  value: number
  index: number
}) => {
  return (
    <motion.span
      key={value}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{
        delay: 0.1 * index,
        type: "spring",
        stiffness: 300,
        damping: 25,
      }}
    >
      {value}
    </motion.span>
  )
}

export const CalculatorTotalPrice = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { serviceMainPrice, serviceSubPrice, serviceAdditionalPrice } =
    useCalculatorContext()

  const totalPrice =
    (serviceMainPrice ?? 0) + serviceSubPrice + serviceAdditionalPrice

  // Split price into parts
  const parts = totalPrice.toFixed(2).split(".")
  const wholePart = parts[0].split("").map(Number)
  const decimalPart = parts[1].split("").map(Number)

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center gap-2 font-mono text-2xl font-bold tracking-tight",
        className
      )}
      {...props}
    >
      <span className="text-base font-normal text-slate-500">Total:</span>
      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex tabular-nums"
      >
        <span className="text-slate-500">$</span>
        {/* Whole numbers */}
        {wholePart.map((number, i) => (
          <AnimatedNumber index={i} key={`${i}-${number}`} value={number} />
        ))}
        <span className="text-slate-500">.</span>
        {/* Decimal numbers */}
        {decimalPart.map((number, i) => (
          <AnimatedNumber
            index={i}
            key={`decimal-${i}-${number}`}
            value={number}
          />
        ))}
      </motion.div>
    </div>
  )
})

CalculatorTotalPrice.displayName = "CalculatorTotalPrice"
