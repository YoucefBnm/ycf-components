import {
  Columns,
  ColumnsIcon,
  GridIcon,
  LayoutListIcon,
  ListIcon,
} from "lucide-react"

import { CellToggle, ContainerToggle } from "./layout-toggle"

const PRODUCTS = [
  {
    id: "item-9",
    name: "adidas",
    imageUrl: "https://m.media-amazon.com/images/I/61uSf-0MJzL._AC_SY695_.jpg",
    price: 120,
  },
  {
    id: "item-8",
    name: "nike",
    imageUrl: "https://m.media-amazon.com/images/I/81YBp7gNeHL._AC_SX695_.jpg",
    price: 120,
  },
  {
    id: "item-4",
    name: "brooks",
    imageUrl: "https://m.media-amazon.com/images/I/81s8buboliL._AC_SY695_.jpg",
    price: 95,
  },
  {
    id: "item-2",
    name: "nike",
    imageUrl: "https://m.media-amazon.com/images/I/81hPhqRGDIL._AC_SX695_.jpg",
    price: 79.95,
  },
  {
    id: "item-5",
    name: "salomon",
    imageUrl: "https://m.media-amazon.com/images/I/71NRA5y7qIL._AC_SX695_.jpg",
    price: 89.99,
  },
  {
    id: "item-7",
    name: "brooks",
    imageUrl: "https://m.media-amazon.com/images/I/81gwJjH+E9L._AC_SY695_.jpg",
    price: 88,
  },
  {
    id: "item-1",
    name: "nike",
    imageUrl: "https://m.media-amazon.com/images/I/81IaVB-vw7L._AC_SX695_.jpg",
    price: 199.99,
  },
  {
    id: "item-6",
    name: "new balance",
    imageUrl: "https://m.media-amazon.com/images/I/61LGqMZ5UXL._AC_SY695_.jpg",
    price: 70,
  },

  {
    id: "item-3",
    name: "under armour",
    imageUrl: "https://m.media-amazon.com/images/I/61P3L82SruL._AC_SY695_.jpg",
    price: 85.99,
  },
]

export const LayoutToggleDemo = () => {
  return (
    <div className="min-h-screen place-content-center p-12 md:px-8">
      <ContainerToggle className="min-h-screen bg-gray-50">
        {PRODUCTS.map((product) => (
          <CellToggle
            key={product.id}
            className="cursor-pointer space-y-4 overflow-hidden rounded-sm bg-white pb-6 shadow"
          >
            <div className="relative pb-8 pt-16">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="mx-auto h-auto max-h-full max-w-[75%]"
              />
              <div className="absolute inset-0 z-10 bg-slate-950/5" />
            </div>
            <div className="flex items-center justify-between px-4">
              <h3 className="text-sm font-semibold capitalize tracking-tight">
                {product.name}
              </h3>
              <p className="text-xs tabular-nums leading-none tracking-tight text-slate-700">
                ${product.price}
              </p>
            </div>
          </CellToggle>
        ))}
      </ContainerToggle>
    </div>
  )
}
