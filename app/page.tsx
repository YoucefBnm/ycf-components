import * as React from "react"

import { ProductCard } from "@/components/product-card"

const PRODUCT = {
  id: "product-1",
  colors: ["rgb(147, 171, 193)", "rgb(187, 203, 195)", "rgb(222, 156, 94)"],
  images: [
    {
      id: "product-1-color-1",
      color: "rgb(187, 195, 203)",
      images: [
        "https://m.media-amazon.com/images/I/51o1onb4djL._AC_SY695_.jpg",
        "https://m.media-amazon.com/images/I/51M6NgQBmhL._AC_SY695_.jpg",
        "https://m.media-amazon.com/images/I/513u06YgdUL._AC_SY695_.jpg",
        "https://m.media-amazon.com/images/I/61Iiz3mNZML._AC_SY695_.jpg",
        "https://m.media-amazon.com/images/I/71ZUDauanRL._AC_SY695_.jpg",
        "https://m.media-amazon.com/images/I/51NmoERaG1L._AC_SY695_.jpg",
        "https://m.media-amazon.com/images/I/51tL3GKKEVL._AC_SY695_.jpg",
      ],
    },
    {
      id: "product-1-color-2",
      color: "rgb(187, 203, 195)",
      images: [
        "https://m.media-amazon.com/images/I/51bfzTuf2cL._AC_SY695_.jpg",
        "https://m.media-amazon.com/images/I/51Xm87WBX1L._AC_SY695_.jpg",
        "https://m.media-amazon.com/images/I/51OeG91-ThL._AC_SY695_.jpg",
        "https://m.media-amazon.com/images/I/61uea5RnOFL._AC_SY695_.jpg",
        "https://m.media-amazon.com/images/I/61LDgzNp5mL._AC_SY695_.jpg",
        "https://m.media-amazon.com/images/I/51Cbm0TzXXL._AC_SY695_.jpg",
        "https://m.media-amazon.com/images/I/51cZe0QGFpL._AC_SY695_.jpg",
      ],
    },
    {
      id: "product-1-color-3",
      color: "rgb(222, 156, 94)",
      images: [
        "https://m.media-amazon.com/images/I/61++XRhgaTL._AC_SY695_.jpg",
        "https://m.media-amazon.com/images/I/51WRTVpnh0L._AC_SY695_.jpg",
        "https://m.media-amazon.com/images/I/51N6X-0wRGL._AC_SY695_.jpg",
        "https://m.media-amazon.com/images/I/61U2ujR0DNL._AC_SY695_.jpg",
        "https://m.media-amazon.com/images/I/712BDuOS69L._AC_SY695_.jpg",
        "https://m.media-amazon.com/images/I/51viiVQvWlL._AC_SY695_.jpg",
        "https://m.media-amazon.com/images/I/51Nk-eLMYuL._AC_SY695_.jpg",
      ],
    },
  ],
}

export default function IndexPage() {
  return (
    <div className="container flex min-h-svh items-center justify-center">
      <ProductCard
        id={PRODUCT.id}
        className="w-64"
        images={PRODUCT.images}
        colors={PRODUCT.colors}
      />
    </div>
  )
}
