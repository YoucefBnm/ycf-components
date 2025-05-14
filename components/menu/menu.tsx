"use client"

import * as React from "react"
import {
  HTMLMotionProps,
  Variants,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react"

import { cn } from "@/lib/utils"

interface MenuContextProps {
  isOpen: boolean
  toggleIsOpen: React.MouseEventHandler<HTMLButtonElement>
  closeMenu: React.MouseEventHandler<HTMLDivElement>
}
interface MenuProps extends HTMLMotionProps<"header"> {}

const menuListVariants: Variants = {
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  hidden: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
}
export const menuItemVariants: Variants = {
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  hidden: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
}
const menuNavigationVariants: Variants = {
  hidden: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
    display: "none",
    transition: {
      delay: 0.5,
      duration: 0.4,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
  visible: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    display: "block",
    transition: {
      duration: 0.4,
    },
  },
}

export function useToggleHeader() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const [isHidden, setIsHidden] = React.useState<boolean>(false)

  // Add scroll lock effect
  React.useEffect(() => {
    if (isOpen) {
      // Save current scroll position and lock scroll
      const scrollY = window.scrollY
      document.body.style.position = "fixed"
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = "100%"
      document.body.style.overflow = "hidden"
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""
      document.body.style.overflow = ""
      window.scrollTo(0, parseInt(scrollY || "0") * -1)
    }
  }, [isOpen])

  const toggleIsOpen = () => setIsOpen((prevState) => !prevState)
  const closeMenu = () => setIsOpen(false)
  const showHeader = () => setIsHidden(false)

  const { scrollY } = useScroll()
  const latestYRef = React.useRef(0)

  useMotionValueEvent(scrollY, "change", (y) => {
    const difference = y - latestYRef.current

    if (Math.abs(difference) > 50) {
      setIsHidden(difference > 0)

      latestYRef.current = y
    }
  })

  return {
    isOpen,
    isHidden,
    toggleIsOpen,
    closeMenu,
    showHeader,
  }
}
const MenuContext = React.createContext<MenuContextProps | undefined>(undefined)
function useMenuContext() {
  const context = React.useContext(MenuContext)
  if (context === undefined) {
    throw new Error("useMenuContext must be used within a MenuProvider")
  }
  return context
}

export const Menu = React.forwardRef<HTMLDivElement, MenuProps>(
  ({ children, className, ...props }, ref) => {
    const { isOpen, isHidden, toggleIsOpen, closeMenu, showHeader } =
      useToggleHeader()

    return (
      <MenuContext.Provider value={{ isOpen, toggleIsOpen, closeMenu }}>
        <motion.header
          ref={ref}
          className={cn("", className)}
          animate={isHidden ? { y: "-100%" } : { y: "0%" }}
          whileHover={{ y: "0%" }}
          onFocusCapture={showHeader}
          transition={{ duration: 0.3 }}
          {...props}
        >
          {children}
        </motion.header>
      </MenuContext.Provider>
    )
  }
)
Menu.displayName = "Menu"

export const MenuToggleButton = React.forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement>
>(({ children, className, ...props }, ref) => {
  const { isOpen, toggleIsOpen } = useMenuContext()
  return (
    <button
      className={cn(
        "relative flex size-12 flex-wrap items-center justify-end rounded-full bg-opacity-80 pr-3.5 transition-colors hover:bg-opacity-100",
        className
      )}
      ref={ref}
      onClick={toggleIsOpen}
      aria-label="toggle menu"
      {...props}
    >
      <span className="sr-only">Toggle Menu</span>

      <motion.span
        className=" absolute block h-0.5 rounded-full  bg-white"
        layout="size"
        animate={
          isOpen
            ? { marginTop: "0px", width: "41.66667%", rotate: 45 }
            : { marginTop: "-6px", width: "50%", rotate: 0 }
        }
        transition={{ ease: [0.4, 0, 0.2, 1], duration: 0.3 }}
      />
      <motion.span
        className="absolute block h-0.5 rounded-full  bg-white"
        layout="size"
        animate={
          isOpen
            ? { marginTop: "0px", width: "41.66667%", rotate: -45 }
            : { marginTop: "6px", width: "33.33337%", rotate: 0 }
        }
        transition={{ ease: [0.4, 0, 0.2, 1], duration: 0.3 }}
      />
    </button>
  )
})
MenuToggleButton.displayName = "MenuToggleButton"

export const MenuNavigation = React.forwardRef<
  HTMLElement,
  HTMLMotionProps<"nav">
>(({ children, className, ...props }, ref) => {
  const { isOpen } = useMenuContext()
  return (
    <motion.nav
      ref={ref}
      className={cn("", className)}
      variants={menuNavigationVariants}
      animate={isOpen ? "visible" : "hidden"}
      {...props}
    >
      {children}
    </motion.nav>
  )
})
MenuNavigation.displayName = "MenuNavigation"

export const MenuList = React.forwardRef<
  HTMLUListElement,
  HTMLMotionProps<"ul">
>(({ children, className, ...props }, ref) => {
  const { isOpen } = useMenuContext()
  return (
    <motion.ul
      variants={menuListVariants}
      animate={isOpen ? "visible" : "hidden"}
      className="flex flex-col gap-4"
      ref={ref}
      {...props}
    >
      {children}
    </motion.ul>
  )
})
MenuList.displayName = "MenuList"
export const MenuItem = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<"div">
>(({ className, ...props }, ref) => {
  const { closeMenu } = useMenuContext()

  return (
    <motion.div
      onClick={closeMenu}
      ref={ref}
      className={cn("", className)}
      variants={menuItemVariants}
      {...props}
    />
  )
})
MenuItem.displayName = "MenuItem"
