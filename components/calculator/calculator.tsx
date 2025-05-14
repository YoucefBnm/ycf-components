"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

import { Checkbox } from "../ui/checkbox"
import { Label } from "../ui/label"
import { Slider } from "../ui/slider"
import { Switch } from "../ui/switch"

//////////////// TYPES ////////////////
export type CalculatorGroupType = "radio" | "slider" | "toggle"

type CalculatorItemBase = {
  id: string
  label: string
  price: number
}

export type RadioItem = CalculatorItemBase & {
  type: "radio"
  selected: boolean
}

export type SliderItem = CalculatorItemBase & {
  type: "slider"
  quantity: number
  min?: number
  max?: number
}

export type ToggleItem = CalculatorItemBase & {
  type: "toggle"
  checked: boolean
}

type CalculatorItem = RadioItem | SliderItem | ToggleItem

export type CalculatorGroup = {
  id: string
  label?: string
  items: CalculatorItem[]
}

//////////////// STATE ////////////////
type CalculatorState = {
  groups: Record<string, CalculatorGroup>
}

//////////////// ACTIONS ////////////////
type CalculatorAction =
  | {
      type: "SELECT_RADIO"
      groupId: string
      itemId: string
    }
  | {
      type: "UPDATE_SLIDER"
      groupId: string
      itemId: string
      quantity: number
    }
  | {
      type: "TOGGLE_ITEM"
      groupId: string
      itemId: string
    }

//////////////// CONTEXT ////////////////
const CalculatorContext = React.createContext<
  | {
      state: CalculatorState
      dispatch: React.Dispatch<CalculatorAction>
    }
  | undefined
>(undefined)

// Add the missing context hook
/**
 * Custom hook to access the CalculatorContext.
 * Ensures that the hook is used within a CalculatorProvider.
 *
 * @throws {Error} If used outside of a CalculatorProvider.
 * @returns {Object} The state and dispatch function from the CalculatorContext.
 */
const useCalculatorContext = () => {
  const context = React.useContext(CalculatorContext)
  if (!context) {
    throw new Error(
      "useCalculatorContext must be used within a CalculatorProvider"
    )
  }
  return context
}

const calculatorReducer = (
  state: CalculatorState,
  action: CalculatorAction
): CalculatorState => {
  switch (action.type) {
    case "SELECT_RADIO":
      return {
        groups: {
          ...state.groups,
          [action.groupId]: {
            ...state.groups[action.groupId],
            items: state.groups[action.groupId].items.map((item) =>
              item.type === "radio"
                ? { ...item, selected: item.id === action.itemId }
                : item
            ),
          },
        },
      }

    case "UPDATE_SLIDER":
      return {
        groups: {
          ...state.groups,
          [action.groupId]: {
            ...state.groups[action.groupId],
            items: state.groups[action.groupId].items.map((item) =>
              item.id === action.itemId && item.type === "slider"
                ? { ...item, quantity: action.quantity }
                : item
            ),
          },
        },
      }

    case "TOGGLE_ITEM":
      return {
        groups: {
          ...state.groups,
          [action.groupId]: {
            ...state.groups[action.groupId],
            items: state.groups[action.groupId].items.map((item) =>
              item.id === action.itemId && item.type === "toggle"
                ? { ...item, checked: !item.checked }
                : item
            ),
          },
        },
      }

    default:
      console.warn(`Unhandled action type: ${(action as any).type}`)
      return state
  }
}

//////////////// PROVIDER ////////////////
interface CalculatorProviderProps {
  groups: CalculatorGroup[]
  children: React.ReactNode
}

export const CalculatorProvider: React.FC<CalculatorProviderProps> = ({
  groups,
  children,
}) => {
  const createInitialGroups = (
    groups: CalculatorGroup[]
  ): Record<string, CalculatorGroup> => {
    const groupMap: Record<string, CalculatorGroup> = {}
    for (const group of groups) {
      groupMap[group.id] = group
    }
    return groupMap
  }

  const initialState: CalculatorState = {
    groups: createInitialGroups(groups),
  }

  const [state, dispatch] = React.useReducer(calculatorReducer, initialState)

  return (
    <CalculatorContext.Provider value={{ state, dispatch }}>
      {children}
    </CalculatorContext.Provider>
  )
}

//////////////// INDIVIDUAL COMPONENTS ////////////////
const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timeout: NodeJS.Timeout
  return (...args: any[]) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), delay)
  }
}

const SliderItemInline = ({
  groupId,
  item,
  dispatch,
}: {
  groupId: string
  item: SliderItem
  dispatch: React.Dispatch<CalculatorAction>
}) => {
  const [localValue, setLocalValue] = React.useState(item.quantity)

  const debouncedDispatch = React.useMemo(
    () =>
      debounce((value: number) => {
        dispatch({
          type: "UPDATE_SLIDER",
          groupId,
          itemId: item.id,
          quantity: value,
        })
      }, 100),
    [dispatch, groupId, item.id]
  )

  const thumbPosition = React.useMemo(
    () => `${(localValue / (item.max || 10)) * 100}%`,
    [localValue, item.max]
  )

  const handleChange = (value: number) => {
    setLocalValue(value)
    debouncedDispatch(value)
  }

  return (
    <div className="w-full space-y-5 p-5 bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Label className="text-sm font-medium text-gray-700">
            {item.label} · {localValue}
          </Label>
          <p className="text-xs text-gray-400">${item.price} per unit</p>
        </div>
        <span className="text-lg font-semibold text-indigo-600 min-w-[90px] text-right">
          <span className="tabular-nums font-mono">
            ${(item.price * localValue).toFixed(2)}
          </span>
        </span>
      </div>
      <Slider
        value={[localValue]}
        min={item.min || 0}
        max={item.max || 10}
        step={1}
        onValueChange={(value: number[]) => handleChange(value[0])}
        className="relative w-full group"
      >
        <div className="relative h-2 w-full rounded-full bg-gray-100">
          <div
            className="absolute h-full bg-indigo-500 rounded-full"
            style={{ width: `${(localValue / (item.max || 10)) * 100}%` }}
          />
        </div>
      </Slider>
    </div>
  )
}

//////////////// GROUP COMPONENT ////////////////
export const CalculatorGroup = ({ groupId }: { groupId: string }) => {
  const { state, dispatch } = useCalculatorContext()
  const group = state.groups[groupId]

  if (!group || group.items.length === 0) return null

  return (
    <div className="space-y-4">
      {group.label && <h3 className="text-lg font-medium">{group.label}</h3>}
      <div className="flex flex-wrap gap-4">
        {group.items.map((item) => {
          switch (item.type) {
            case "radio":
              return (
                <RadioItem
                  key={item.id}
                  groupId={groupId}
                  item={item}
                  dispatch={dispatch}
                />
              )
            case "slider":
              return (
                <SliderItemInline
                  key={item.id}
                  groupId={groupId}
                  item={item}
                  dispatch={dispatch}
                />
              )
            case "toggle":
              return (
                <ToggleItem
                  key={item.id}
                  groupId={groupId}
                  item={item}
                  dispatch={dispatch}
                />
              )
          }
        })}
      </div>
    </div>
  )
}

//////////////// INDIVIDUAL COMPONENTS ////////////////
const RadioItem: React.FC<{
  groupId: string
  item: RadioItem
  dispatch: React.Dispatch<CalculatorAction>
}> = ({ groupId, item, dispatch }) => (
  <div className="relative">
    <Checkbox
      id={item.id}
      checked={item.selected}
      onCheckedChange={() =>
        dispatch({ type: "SELECT_RADIO", groupId, itemId: item.id })
      }
      // className="sr-only"
    />
    <Label
      htmlFor={item.id}
      className={cn(
        "flex items-center px-4 py-2 rounded-full border",
        item.selected ? "border-indigo-600 bg-indigo-50" : "border-gray-200"
      )}
    >
      {item.label} · ${item.price}
    </Label>
  </div>
)

const SliderItem = ({
  groupId,
  item,
  dispatch,
}: {
  groupId: string
  item: SliderItem
  dispatch: React.Dispatch<CalculatorAction>
}) => {
  const [localValue, setLocalValue] = React.useState(item.quantity)

  const debouncedDispatch = React.useMemo(
    () =>
      debounce((value: number) => {
        dispatch({
          type: "UPDATE_SLIDER",
          groupId,
          itemId: item.id,
          quantity: value,
        })
      }, 100),
    [dispatch, groupId, item.id]
  )

  const thumbPosition = React.useMemo(
    () => `${(localValue / (item.max || 10)) * 100}%`,
    [localValue, item.max]
  )

  const handleChange = (value: number) => {
    setLocalValue(value)
    debouncedDispatch(value)
  }

  return (
    <div className="w-full space-y-5 p-5 bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Label className="text-sm font-medium text-gray-700">
            {item.label} · {localValue}
          </Label>
          <p className="text-xs text-gray-400">${item.price} per unit</p>
        </div>
        <span className="text-lg font-semibold text-indigo-600 min-w-[90px] text-right">
          <span className="tabular-nums font-mono">
            ${(item.price * localValue).toFixed(2)}
          </span>
        </span>
      </div>
      {React.useMemo(
        () => (
          <div
            className="absolute h-full bg-indigo-500 rounded-full"
            style={{ width: `${(localValue / (item.max || 10)) * 100}%` }}
          />
        ),
        [localValue, item.max]
      )}
      <Slider
        value={[localValue]}
        min={item.min || 0}
        max={item.max || 10}
        step={1}
        onValueChange={(values: number[]) => handleChange(values[0])}
        className="relative w-full group"
      >
        {/* Track */}
        <div className="relative h-2 w-full rounded-full bg-gray-100">
          {/* Range */}
          <div
            className="absolute h-full bg-indigo-500 rounded-full"
            style={{ width: `${(localValue / (item.max || 10)) * 100}%` }}
          />
          {/* Thumb */}
          <div className="hidden group-hover:block">
            <div
              className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-2 border-indigo-500 rounded-full shadow-lg transition-transform hover:scale-110"
              style={{ left: thumbPosition }}
            />
          </div>
        </div>
      </Slider>
    </div>
  )
}
const ToggleItem = ({
  groupId,
  item,
  dispatch,
}: {
  groupId: string
  item: ToggleItem
  dispatch: React.Dispatch<CalculatorAction>
}) => (
  <div className="flex items-center gap-2">
    <Switch
      checked={item.checked}
      onCheckedChange={() =>
        dispatch({ type: "TOGGLE_ITEM", groupId, itemId: item.id })
      }
    />
    <Label>
      {item.label} (${item.price})
    </Label>
  </div>
)

export const CalculatorTotal = () => {
  const { state } = useCalculatorContext()

  const total = React.useMemo(() => {
    return Object.values(state.groups).reduce((acc, group) => {
      return (
        acc +
        group.items.reduce((groupTotal, item) => {
          if (item.type === "radio" && item.selected)
            return groupTotal + item.price
          if (item.type === "slider")
            return groupTotal + item.price * item.quantity
          if (item.type === "toggle" && item.checked)
            return groupTotal + item.price
          return groupTotal
        }, 0)
      )
    }, 0)
  }, [state.groups])

  return <div className="text-xl font-bold">Total: ${total.toFixed(2)}</div>
}
