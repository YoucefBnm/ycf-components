"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

import { Checkbox } from "../ui/checkbox"
import { SelectableItem } from "./calculator.types"

interface CalculatorSelectProps {
  items: SelectableItem[]
  selectedId: string | null
  onSelect: (id: string) => void
  renderItem?: (item: SelectableItem, isSelected: boolean) => React.ReactNode
  className?: string
}

export const CalculatorSelect = React.forwardRef<
  HTMLDivElement,
  CalculatorSelectProps
>(({ items, selectedId, onSelect, renderItem, className }, ref) => {
  const defaultRenderItem = (item: SelectableItem, isSelected: boolean) => (
    <div
      key={item.id}
      className={cn(
        "relative flex items-center rounded-full px-4 py-2",
        isSelected ? "bg-primary text-primary-foreground" : "bg-muted"
      )}
    >
      <Checkbox
        checked={isSelected}
        onCheckedChange={() => onSelect(item.id)}
        className="absolute inset-0 size-full rounded-full opacity-0"
      />
      <span className="z-10">{item.label}</span>
      <span className="ml-2 text-xs opacity-75">${item.price}</span>
    </div>
  )

  return (
    <div ref={ref} className={cn("flex flex-wrap gap-2", className)}>
      {items.map((item) =>
        renderItem
          ? renderItem(item, item.id === selectedId)
          : defaultRenderItem(item, item.id === selectedId)
      )}
    </div>
  )
})

CalculatorSelect.displayName = "CalculatorSelect"
