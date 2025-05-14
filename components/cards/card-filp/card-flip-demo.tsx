/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button"

import { CardFlip, CardFlipBack, CardFlipFront } from "./card-Flip"

export const CardFlipDemo = () => (
  <div className="container py-12">
    <div className="flex flex-wrap justify-center gap-4">
      <CardFlip className="h-96 w-2/6">
        <CardFlipFront className="rounded-xl">
          <img
            width={1015}
            height={678}
            src="https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="nike air jordan"
            className="size-full object-cover"
          />
        </CardFlipFront>
        <CardFlipBack className="flex flex-col items-center justify-center rounded-xl bg-rose-600 px-4 py-6 text-center text-white">
          <h2 className="text-xl font-bold">Nike Air Jordan</h2>
          <h4 className="mb-4">€ 1,299.00</h4>
          <Button className="rounded-full">Add to cart</Button>
        </CardFlipBack>
      </CardFlip>

      <CardFlip flipDirection="vertical" className="h-96 w-2/6">
        <CardFlipFront className="rounded-xl">
          <img
            width={542}
            height={678}
            src="https://images.unsplash.com/photo-1617814121568-9b184eaabf08?q=80&w=2264&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="nike air jordan"
            className="size-full object-cover"
          />
        </CardFlipFront>
        <CardFlipBack className="flex flex-col items-center justify-center rounded-xl bg-emerald-500 px-4 py-6 text-center text-white">
          <h2 className="text-xl font-bold">Nike Air Jordan</h2>
          <h4 className="mb-4">€ 1,299.00</h4>
          <Button className="rounded-full">Add to cart</Button>
        </CardFlipBack>
      </CardFlip>
    </div>
  </div>
)
