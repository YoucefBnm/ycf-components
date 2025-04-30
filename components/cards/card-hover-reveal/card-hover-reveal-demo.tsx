import {
  CardHoverReveal,
  CardHoverRevealContent,
  CardHoverRevealMain,
} from "./card-hover-reveal"

const CardHoverRevealDemo = () => (
  <CardHoverReveal className=" h-[512px] w-[385px] rounded-xl">
    <CardHoverRevealMain>
      <img
        width={1077}
        height={606}
        alt="product image"
        src="https://images.unsplash.com/photo-1636247499734-893da2bcfc1c?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        className="inline-block size-full max-h-full max-w-full object-cover align-middle"
      />
    </CardHoverRevealMain>

    <CardHoverRevealContent className="space-y-4 rounded-2xl bg-zinc-900/75 text-zinc-50">
      <div className="space-y-2">
        <h3 className="text-sm text-opacity-60">Services</h3>
        <div className="flex flex-wrap gap-2 ">
          <div className=" rounded-full bg-zinc-800 px-2 py-1">
            <p className=" text-xs leading-normal">Branding</p>
          </div>
          <div className=" rounded-full bg-zinc-800 px-2 py-1">
            <p className=" text-xs leading-normal">UI UX</p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className=" text-sm text-opacity-60">Stack</h3>
        <div className="flex flex-wrap gap-2 ">
          <div className=" rounded-full bg-[hsl(18,56%,32%)] px-2 py-1">
            <p className=" text-xs leading-normal">Figma</p>
          </div>
          <div className=" rounded-full bg-[hsl(18,56%,32%)] px-2 py-1">
            <p className=" text-xs leading-normal">Webflow</p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className=" text-sm text-opacity-60">Profile</h3>
        {/* tag */}
        <div className="flex flex-wrap gap-2 ">
          <p className="text-sm text-card">
            Comprehensive platform designed for an agency, Creating professional
            and business-oriented brand.
          </p>
        </div>
      </div>
    </CardHoverRevealContent>
  </CardHoverReveal>
)

export default CardHoverRevealDemo
