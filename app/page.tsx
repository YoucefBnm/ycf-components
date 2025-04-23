import {
  AnimatedContainer,
  BgGradient,
  Hero,
  TextStagger,
} from "@/premium/hero"
import {
  Controls,
  ProductGallery,
  ProductGalleryPreviewImage,
  ProductGalleryThumb,
  ProductGalleryThumbsWrap,
} from "@/premium/product-gallery"

import {
  CardHoverReveal,
  CardHoverRevealContent,
  CardHoverRevealMain,
} from "@/components/card-hover-reveal"
import { RotationContainer } from "@/components/container-rotate-translate"

const PRODUCT_1_IMAGES = [
  "https://m.media-amazon.com/images/I/71gzELUdnlL._AC_SY695_.jpg",
  "https://m.media-amazon.com/images/I/713sbqTTU5L._AC_SY675_.jpg",
  "https://m.media-amazon.com/images/I/71qE7xlwixL._AC_SY695_.jpg",
  "https://m.media-amazon.com/images/I/71I5kbHaplL._AC_SY695_.jpg",
  "https://m.media-amazon.com/images/I/715ZAssNGmL._AC_SY695_.jpg",
  "https://m.media-amazon.com/images/I/71nAG2yOeYL._AC_SY695_.jpg",
]

export default function IndexPage() {
  return (
    <div className="overflow-hidden">
      <div className="container flex min-h-svh  justify-around px-6 py-12">
        <CardHoverReveal className="w-1/3 rounded-xl">
          <CardHoverRevealMain className="bg-blue-500">
            <img
              width={1077}
              height={606}
              alt="product image"
              src="https://images.unsplash.com/photo-1636247499734-893da2bcfc1c?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="inline-block size-full max-h-full max-w-full object-cover align-middle"
            />
          </CardHoverRevealMain>

          <CardHoverRevealContent className="space-y-4 rounded-2xl bg-zinc-900/90 text-zinc-50">
            <div className="space-y-2">
              <h3 className="text-sm text-opacity-60">Services</h3>
              {/* tag */}
              <div className="flex flex-wrap gap-2 ">
                <div className=" rounded-full bg-[hsl(18,0%,20%)] px-2 py-1 text-[#f3efef]">
                  <p className=" text-xs leading-normal">Branding</p>
                </div>
                <div className=" rounded-full bg-[hsl(18,0%,20%)] px-2 py-1 text-[#f3efef]">
                  <p className=" text-xs leading-normal">UI UX</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className=" text-sm text-opacity-60" style={{ opacity: 0.6 }}>
                Stack
              </h3>
              {/* tag */}
              <div className="flex flex-wrap gap-2 ">
                <div className=" rounded-full bg-[hsl(18,56%,32%)] px-2 py-1 text-[#f3efef]">
                  <p className=" text-xs leading-normal">Figma</p>
                </div>
                <div className=" rounded-full bg-[hsl(18,56%,32%)] px-2 py-1 text-[#f3efef]">
                  <p className=" text-xs leading-normal">Webflow</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className=" text-sm text-opacity-60" style={{ opacity: 0.6 }}>
                Profile
              </h3>
              {/* tag */}
              <div className="flex flex-wrap gap-2 ">
                <p className="text-sm text-card">
                  Comprehensive platform designed for an agency, Creating
                  professional and business-oriented brand.
                </p>
              </div>
            </div>
          </CardHoverRevealContent>
        </CardHoverReveal>
      </div>
      <Hero className="mb-8 space-y-8 text-white">
        <BgGradient gradientColors={"black"} />
        <TextStagger
          text="Your next website hero"
          className="text-5xl font-medium tracking-tighter md:text-6xl lg:text-7xl"
        />
        <AnimatedContainer>
          <p className="mx-auto max-w-prose text-white/80">
            Hero section created with Tailwind CSS and react, and animated with
            motion
          </p>
        </AnimatedContainer>
      </Hero>

      <RotationContainer />

      <div className="container flex min-h-svh w-full items-center justify-center px-6 py-12">
        <ProductGallery
          className="flex items-start justify-start gap-4"
          productImages={PRODUCT_1_IMAGES}
        >
          <ProductGalleryThumbsWrap className="flex flex-col items-start gap-1">
            {PRODUCT_1_IMAGES.map((imageUrl, index) => (
              <ProductGalleryThumb
                key={`${imageUrl}-${index}`}
                thumbImageUrl={imageUrl}
                index={index}
              />
            ))}
          </ProductGalleryThumbsWrap>
          <ProductGalleryPreviewImage>
            <Controls className=" flex flex-col gap-1" />
          </ProductGalleryPreviewImage>
        </ProductGallery>
      </div>
    </div>
  )
}
