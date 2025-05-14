/* eslint-disable @next/next/no-img-element */
"use client"

import * as React from "react"

export const CardsFloating = () => {
  return (
    <section className="my-32 flex flex-col items-center sm:my-48 lg:my-64">
      <div className="relative grid w-full items-center justify-center overflow-hidden pb-16 pt-12">
        <a
          href="/ryan"
          target="_blank"
          rel="noreferrer"
          className="bg-gray-25 relative col-start-1 row-start-1 overflow-hidden rounded-3xl"
          // style="width: 160.267px; height: 160.267px; transform: translateX(calc(50% - 439.717px)) translateY(calc(50% - 42.3398px)) rotate(-12deg);"
        >
          <img
            alt="Ryan"
            loading="eager"
            decoding="async"
            data-nimg="fill"
            className="ease-out-smooth pointer-events-none select-none object-cover transition-opacity duration-300"
            src="https://portrait.so/images/people/ryan.jpg"
            // style="position: absolute; height: 100%; width: 100%; inset: 0px; color: transparent;"
          />
        </a>
        <a
          href="/naomi"
          target="_blank"
          rel="noreferrer"
          className="bg-gray-25 relative col-start-1 row-start-1 overflow-hidden rounded-3xl"
          // style="width: 160.267px; height: 160.267px; transform: translateX(calc(50% - 320.833px)) translateY(calc(50% - 63.3021px)) rotate(-8deg);"
        >
          <img
            alt="Naomi"
            loading="eager"
            decoding="async"
            data-nimg="fill"
            className="ease-out-smooth pointer-events-none select-none object-cover transition-opacity duration-300"
            src="https://portrait.so/images/people/naomi.jpg"
            // style="position: absolute; height: 100%; width: 100%; inset: 0px; color: transparent;"
          />
        </a>
        <a
          href="/damian"
          target="_blank"
          rel="noreferrer"
          className="bg-gray-25 relative col-start-1 row-start-1 overflow-hidden rounded-3xl"
          // style="width: 160.267px; height: 160.267px; transform: translateX(calc(50% - 200.777px)) translateY(calc(50% - 75.9205px)) rotate(-4deg);"
        >
          <img
            alt="Damian"
            loading="eager"
            decoding="async"
            data-nimg="fill"
            className="ease-out-smooth pointer-events-none select-none object-cover transition-opacity duration-300"
            src="https://portrait.so/images/people/damian.jpg"
            // style="position: absolute; height: 100%; width: 100%; inset: 0px; color: transparent;"
          />
        </a>
        <a
          href="/aldous"
          target="_blank"
          rel="noreferrer"
          className="bg-gray-25 relative col-start-1 row-start-1 overflow-hidden rounded-3xl"
          // style="width: 160.267px; height: 160.267px; transform: translateX(calc(50% - 80.1335px)) translateY(calc(50% - 80.1335px));"
        >
          <img
            alt="Aldous"
            loading="eager"
            decoding="async"
            data-nimg="fill"
            className="ease-out-smooth pointer-events-none select-none object-cover transition-opacity duration-300"
            src="https://portrait.so/images/people/aldous.jpg"
            // style="position: absolute; height: 100%; width: 100%; inset: 0px; color: transparent;"
          />
        </a>
        <a
          href="/alex"
          target="_blank"
          rel="noreferrer"
          className="bg-gray-25 relative col-start-1 row-start-1 overflow-hidden rounded-3xl"
          // style="width: 160.267px; height: 160.267px; transform: translateX(calc(50% + 40.5103px)) translateY(calc(50% - 75.9205px)) rotate(4deg);"
        >
          <img
            alt="Alex"
            loading="eager"
            decoding="async"
            data-nimg="fill"
            className="ease-out-smooth pointer-events-none select-none object-cover transition-opacity duration-300"
            src="https://portrait.so/images/people/alex.jpg"
            // style="position: absolute; height: 100%; width: 100%; inset: 0px; color: transparent;"
          />
        </a>
        <a
          href="/rommy"
          target="_blank"
          rel="noreferrer"
          className="bg-gray-25 relative col-start-1 row-start-1 overflow-hidden rounded-3xl"
          // style="width: 160.267px; height: 160.267px; transform: translateX(calc(50% + 160.566px)) translateY(calc(50% - 63.3021px)) rotate(8deg);"
        >
          <img
            alt="Rommy"
            loading="eager"
            decoding="async"
            data-nimg="fill"
            className="ease-out-smooth pointer-events-none select-none object-cover transition-opacity duration-300"
            src="https://portrait.so/images/people/rommy.jpg"
            // style="position: absolute; height: 100%; width: 100%; inset: 0px; color: transparent;"
          />
        </a>
        <a
          href="/giliam"
          target="_blank"
          rel="noreferrer"
          className="bg-gray-25 relative col-start-1 row-start-1 overflow-hidden rounded-3xl"
          // style="width: 160.267px; height: 160.267px; transform: translateX(calc(50% + 279.45px)) translateY(calc(50% - 42.3398px)) rotate(12deg);"
        >
          <img
            alt="Giliam"
            loading="eager"
            decoding="async"
            data-nimg="fill"
            className="ease-out-smooth pointer-events-none select-none object-cover transition-opacity duration-300"
            src="https://portrait.so/images/people/giliam.jpg"
            // style="position: absolute; height: 100%; width: 100%; inset: 0px; color: transparent;"
          />
        </a>
        {/* cursor */}
        {/* <div
          className="pointer-events-none fixed left-0 top-0 z-10 inline-flex items-center gap-2 rounded-full bg-black py-1 pl-4 pr-1 font-semibold text-white shadow-sm"
          // style="opacity: 0; transform: translateX(210px) translateY(133px) scale(0.5); background-color: rgb(230, 0, 194); color: rgb(255, 255, 255);"
        >
          <div>Naomi</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="none"
            className="tabler-icon tabler-icon-circle-arrow-up-right-filled size-8"
          >
            <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-2 4.66h-6l-.117 .007a1 1 0 0 0 -.883 .993l.007 .117a1 1 0 0 0 .993 .883h3.584l-4.291 4.293l-.083 .094a1 1 0 0 0 1.497 1.32l4.293 -4.293v3.586l.007 .117a1 1 0 0 0 1.993 -.117v-6l-.007 -.117l-.029 -.149l-.035 -.105l-.054 -.113l-.071 -.111a1.01 1.01 0 0 0 -.097 -.112l-.09 -.08l-.096 -.067l-.098 -.052l-.11 -.044l-.112 -.03l-.126 -.017l-.075 -.003z"></path>
          </svg>
        </div> */}
      </div>
      <div className="backdrop-blur-4xl text-brand-blue-900/70 mb-8 text-balance rounded-full border border-[hsla(0,0%,85%,.35)] bg-white/40 px-3 py-1.5 text-sm font-medium bg-blend-luminosity dark:border-white/[0.12] dark:bg-black/80 md:mb-12">
        Not a feed. Not a social network. A Portrait.
      </div>
      <h2 className="text-brand-blue-1000 mb-10 max-w-[12em] text-center font-medium md:mb-20">
        Finally, a place on the internet that
        <span className="bg-rainbow-highlights font-junicode text-junicode-with-basier mx-[-0.3em] px-[0.3em] font-semibold italic [--stop-1:20%] [--stop-2:30%] [--stop-3:41%] [--stop-4:65%] [--stop-5:76%] [--stop-6:82%]">
          feels like you.
        </span>
      </h2>
      <button
        type="button"
        className="group/button inline-flex rounded-full outline-none disabled:cursor-not-allowed"
      >
        <span className="group-[:not([disabled])]/button:group-hocus/button:shadow-lg group-[:not([disabled])]/button:group-hocus/button:bg-gray-1000 dark:group-[:not([disabled])]/button:group-hocus/button:border-white/[0.27] dark:group-[:not([disabled])]/button:group-hocus/button:bg-white/[0.22] pointer-events-auto relative flex h-11 w-full items-center justify-center gap-2.5 whitespace-nowrap rounded-full border border-transparent bg-gray-700 px-5 text-base font-[540] text-white shadow-sm outline-none transition dark:border dark:border-white/20 dark:bg-white/[0.14] dark:text-white dark:shadow-none">
          <span className="inline-flex scale-100 items-center justify-center gap-2 opacity-100 transition-[transform,opacity]">
            Join <span className="hidden">Aldous and</span>3,569+ others
          </span>
          <span className="absolute left-1/2 top-1/2 inline-flex -translate-x-1/2 -translate-y-1/2 scale-0 opacity-0 transition-[transform,opacity]">
            <span className="LoadingSpinner_spinner__LNG7U relative">
              <svg
                width="20"
                height="20"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  fillOpacity=".15"
                  fillRule="evenodd"
                  d="M12 4.5a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15ZM8.173 2.761a10 10 0 1 1 7.654 18.478A10 10 0 0 1 8.173 2.761Z"
                  clipRule="evenodd"
                ></path>
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M12 4.5A7.5 7.5 0 0 0 4.5 12 1.25 1.25 0 1 1 2 12 10 10 0 0 1 12 2a1.25 1.25 0 1 1 0 2.5Z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
          </span>
        </span>
      </button>
      <span className="mt-6 text-sm font-medium text-gray-400">
        Your Portrait is your own space on the internet.
      </span>
    </section>
  )
}
