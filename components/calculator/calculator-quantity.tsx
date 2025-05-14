"use client"

import * as React from "react"
import { Label } from "@radix-ui/react-label"
import { Slider } from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

import { QuantifiableItem } from "./calculator.types"

interface CalculatorQuantityProps {
  items: QuantifiableItem[]
  onChange: (id: string, quantity: number) => void
  className?: string
}

export const CalculatorQuantity = React.forwardRef<
  HTMLDivElement,
  CalculatorQuantityProps
>(({ items, onChange, className }, ref) => {
  return (
    <div ref={ref} className={cn("space-y-4", className)}>
      {items.map((item) => (
        <div key={item.id} className="space-y-2">
          <div className="flex justify-between">
            <Label>{item.label}</Label>
            <span className="text-sm">
              ${(item.price * (item.quantity || 0)).toFixed(2)}
            </span>
          </div>
          <Slider
            min={0}
            max={10}
            step={1}
            defaultValue={[item.quantity]}
            onValueChange={([value]) => onChange(item.id, value)}
          />
        </div>
      ))}
    </div>
  )
})

CalculatorQuantity.displayName = "CalculatorQuantity"
