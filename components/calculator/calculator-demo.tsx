import { CalculatorIcon } from "lucide-react"

import {
  CalculatorGroup,
  CalculatorProvider,
  CalculatorTotal,
} from "./calculator"

const MAIN_SERVICES = [
  {
    id: "web-design-service",
    label: "web design",
    price: 500,
  },
  {
    id: "frontend-service",
    label: "frontend",
    price: 600,
  },
  {
    id: "backend-service",
    label: "backend",
    price: 600,
  },
  {
    id: "full-stack-service",
    label: "full stack",
    price: 1100,
  },
]
const SUB_SERVICES = [
  {
    id: "number-of-pages-sub-service",
    label: "number of pages",
    price: 100,
    quantity: 0,
  },
  {
    id: "number-of-sections-sub-service",
    label: "number of sections",
    price: 20,
    quantity: 0,
  },
  {
    id: "number-of-products-sub-service",
    label: "number of products",
    price: 50,
    quantity: 0,
  },
  {
    id: "number-of-listings-sub-service",
    label: "number of listings",
    price: 50,
    quantity: 0,
  },
  {
    id: "number-of-appointments-sub-service",
    label: "appointments",
    price: 100,
    quantity: 0,
  },
]

const ADDITIONAL_SERVICES = [
  {
    id: "portfolio-additional-service",
    label: "portfolio",
    price: 350,
    isChecked: false,
  },
  {
    id: "properties-additional-service",
    label: "properties",
    price: 350,
    isChecked: false,
  },
  {
    id: "mobile-additional-service",
    label: "mobile",
    price: 350,
    isChecked: false,
  },
  {
    id: "appointments-additional-service",
    label: "appointments",
    price: 350,
    isChecked: false,
  },
]
//////////////// USAGE EXAMPLE ////////////////
const serviceGroups = [
  {
    id: "main-services",
    label: "Main Services",
    items: [
      {
        id: "web-design",
        type: "radio",
        label: "Web Design",
        price: 500,
        selected: false,
      },
      {
        id: "development",
        type: "radio",
        label: "Development",
        price: 1000,
        selected: false,
      },
    ],
  },
  {
    id: "options",
    label: "Options",
    items: [
      {
        id: "pages",
        type: "slider",
        label: "Number of Pages",
        price: 100,
        quantity: 0,
        min: 0,
        max: 10,
      },
      {
        id: "sections",
        type: "slider",
        label: "Number of sections",
        price: 100,
        quantity: 0,
        min: 0,
        max: 10,
      },
    ],
  },
  {
    id: "addons",
    label: "Add-ons",
    items: [
      {
        id: "hosting",
        type: "toggle",
        label: "Hosting",
        price: 50,
        checked: false,
      },
      {
        id: "logo",
        type: "toggle",
        label: "Logo",
        price: 150,
        checked: false,
      },
    ],
  },
]

export const CalculatorDemo = () => {
  return (
    <div className="min-h-svh w-full place-content-center place-items-center">
      <CalculatorProvider groups={serviceGroups}>
        <div className="space-y-8 p-4">
          <CalculatorGroup groupId="main-services" />
          <CalculatorGroup groupId="options" />
          <CalculatorGroup groupId="addons" />
          <CalculatorTotal />
        </div>
      </CalculatorProvider>
    </div>
  )
}
