import * as React from "react"

import { ProductProps } from "@/types/product"
import { Product } from "@/components/product"

const product: ProductProps = {
  id: "fresh-foam-x-880-men-running",
  gender: "men",
  sport: "running",
  brand: "new balance",
  name: "fresh foam x 880",
  price: 114.95,
  colors: ["black", "orange", "blue"],
  sizes: [
    "7",
    "7.5",
    "8",
    "8.5",
    "9",
    "9.5",
    "10",
    "10.5",
    "11",
    "11.5",
    "12",
    "12.5",
    "13",
    "14",
    "15",
  ],
  images: [
    {
      id: "fresh-foam-x-880-men-running-black",
      color: "black",
      imagesUrl: [
        "https://m.media-amazon.com/images/I/61LGqMZ5UXL._AC_SY695_.jpg",
        "https://m.media-amazon.com/images/I/61jI0ayfZeL._AC_SY695_.jpg",
        "https://m.media-amazon.com/images/I/61vD+GAr9oL._AC_SY695_.jpg",
        "https://m.media-amazon.com/images/I/61-GCPoP75L._AC_SY695_.jpg",
        "https://m.media-amazon.com/images/I/61lz0VJRDOL._AC_SY695_.jpg",
        "https://m.media-amazon.com/images/I/71lU-fAtEXL._AC_SY695_.jpg",
      ],
      sizes: [
        { size: "7", quantity: 8 },
        { size: "7.5", quantity: 10 },
        { size: "8", quantity: 15 },
        { size: "8.5", quantity: 2 },
        { size: "9", quantity: 12 },
        { size: "9.5", quantity: 3 },
        { size: "10", quantity: 5 },
        { size: "10.5", quantity: 2 },
        { size: "11", quantity: 6 },
        { size: "11.5", quantity: 2 },
        { size: "12", quantity: 6 },
        { size: "12.5", quantity: 2 },
        { size: "13", quantity: 6 },
        { size: "14", quantity: 2 },
        { size: "15", quantity: 6 },
      ],
    },
    {
      id: "fresh-foam-x-880-men-running-orange",
      color: "orange",
      imagesUrl: [
        "https://m.media-amazon.com/images/I/71TMgBPHJFL._AC_SY695_.jpg",
        "https://m.media-amazon.com/images/I/714Dh9mpHcL._AC_SY695_.jpg",
        "https://m.media-amazon.com/images/I/714MRYyVStL._AC_SY695_.jpg",
        "https://m.media-amazon.com/images/I/71HaN9SZaWL._AC_SY695_.jpg",
        "https://m.media-amazon.com/images/I/612+7k2aQAL._AC_SY695_.jpg",
        "https://m.media-amazon.com/images/I/71Uvn18ChGL._AC_SY695_.jpg",
      ],
      sizes: [
        { size: "7.5", quantity: 5 },
        { size: "8", quantity: 10 },
        { size: "10.5", quantity: 5 },
        { size: "11.5", quantity: 5 },
        { size: "12.5", quantity: 5 },
        { size: "13", quantity: 5 },
        { size: "14", quantity: 5 },
        { size: "15", quantity: 5 },
      ],
    },
    {
      id: "fresh-foam-x-880-men-running-blue",
      color: "blue",
      imagesUrl: [
        "https://m.media-amazon.com/images/I/71kpXP8p3SL._AC_SY695_.jpg",
        "https://m.media-amazon.com/images/I/718In2BmkyL._AC_SY695_.jpg",
        "https://m.media-amazon.com/images/I/71ar0vcgZwL._AC_SY695_.jpg",
        "https://m.media-amazon.com/images/I/71NuDQV2SlL._AC_SY695_.jpg",
        "https://m.media-amazon.com/images/I/61hiNHyVwaL._AC_SY695_.jpg",
        "https://m.media-amazon.com/images/I/714gIZwrG-L._AC_SY695_.jpg",
      ],
      sizes: [
        { size: "11", quantity: 2 },
        { size: "12", quantity: 6 },
      ],
    },
  ],
  reviews: [
    {
      userId: "user1",
      displayName: "John Doe",
      reviewText: "Super comfortable and durable. Perfect for long runs!",
      rating: 5,
      date: "2024-12-15",
    },
    {
      userId: "user2",
      displayName: "John Doe",
      reviewText: "Great grip and fit, but the color fades slightly.",
      rating: 4,
      date: "2024-12-10",
    },
    {
      userId: "user3",
      displayName: "Jane Doe",
      reviewText: "The shoes are comfortable and fit well.",
      rating: 3,
      date: "2024-12-15",
    },
  ],
  details: [
    "Care instructions: Machine Wash",
    "Origin: Imported",
    "Sole material: Rubber",
    "Outer material: Synthetic and Mesh",
  ],
  features: [
    "Fresh Foam X midsole foam with approximately 3% bio-based content delivers our most cushioned Fresh Foam experience for incredible comfort.",
    "Neutral cushioning – for runners who do not require additional stability",
    "Breathable synthetic and mesh upper",
    "Structured and supportive upper design",
    "8 mm drop; due to variances created during the development and manufacturing processes, all references to 8 mm drop are approximate",
  ],
  releaseDate: "02-11-2024",
  featured: true,
  sale: false,
  salePrice: 99.62,
}

export default function IndexPage() {
  return <Product product={product} />
}
