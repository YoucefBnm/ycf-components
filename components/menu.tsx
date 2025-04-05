"use client"

import * as React from "react"
import { Link } from "lucide-react"
import {
  HTMLMotionProps,
  MotionValue,
  motion,
  useInView,
  useScroll,
  useTransform,
} from "motion/react"

import { cn } from "@/lib/utils"

export const navListVariants = {
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  hidden: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
}
export const navItemVariants = {
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

export const navVariants = {
  visible: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    display: "block",
    transition: {
      // type: "spring",
      // stiffness: 20,
      // restDelta: 2,
    },
  },
  hidden: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
    display: "none",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
}

interface MenuProps
  extends React.HTMLAttributes<HTMLElement>,
    React.PropsWithChildren {
  className?: string
}
interface MenuContextValue {
  isOpen: boolean
  toggleIsOpen: () => void
}

const MenuContext = React.createContext<MenuContextValue | undefined>(undefined)

function useMenuContext() {
  const context = React.useContext(MenuContext)

  if (context === undefined) {
    throw new Error("useMenuContext must be used within a MenuProvider")
  }

  return context
}

function Menu({ className, children, ...props }: MenuProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const toggleIsOpen = () => setIsOpen(!isOpen)
  return (
    <MenuContext.Provider value={{ isOpen, toggleIsOpen }}>
      <div className={cn(className)} {...props}>
        {children}
      </div>
    </MenuContext.Provider>
  )
}

interface MenuButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
}
function MenuButton({ className, ...props }: MenuButtonProps) {
  const { isOpen, toggleIsOpen } = useMenuContext()
  return (
    <button
      className={cn(
        "relative flex size-14 flex-wrap items-center justify-end rounded-full bg-transparent pr-4 transition-colors hover:bg-zinc-50",
        className
      )}
      onClick={toggleIsOpen}
      {...props}
    >
      <motion.span
        className="absolute block h-0.5 rounded-sm bg-black"
        layout
        animate={
          isOpen
            ? { marginTop: "0px", width: "41.66667%", rotate: 45 }
            : { marginTop: "-6px", width: "50%", rotate: 0 }
        }
        transition={{ ease: [0.4, 0, 0.2, 1] }}
      />
      <motion.span
        className="absolute block h-0.5  rounded-sm bg-black"
        layout
        animate={
          isOpen
            ? { marginTop: "0px", width: "41.66667%", rotate: -45 }
            : { marginTop: "6px", width: "50%", rotate: 0 }
        }
        transition={{ ease: [0.4, 0, 0.2, 1] }}
      />
    </button>
  )
}

interface MenuListProps
  extends React.HTMLAttributes<"div">,
    React.PropsWithChildren {
  navLinks: { title: string; route: string; id: string }[]
  className?: string
}
function MenuList({ navLinks, className, ...props }: MenuListProps) {
  const { isOpen } = useMenuContext()

  return (
    <motion.nav
      className="fixed inset-0 z-40 h-screen w-screen overflow-hidden bg-zinc-900 bg-opacity-95  pb-12 pt-20 backdrop-blur-md"
      variants={navVariants}
      animate={isOpen ? "visible" : "hidden"}
    >
      <div className="reltive px-default flex h-full flex-wrap items-center justify-between gap-6 overflow-hidden">
        <motion.ul
          variants={navListVariants}
          animate={isOpen ? "visible" : "hidden"}
          className="flex flex-col gap-4"
        >
          {navLinks.map((navLink) => (
            <motion.li key={navLink.id} variants={navItemVariants}>
              <a href={navLink.route}>
                <h2>{navLink.title}</h2>
              </a>
            </motion.li>
          ))}
        </motion.ul>

        {/* <motion.ul
          variants={navListVariants}
          animate={isOpen ? "visible" : "hidden"}
          className="text-primary-1 flex flex-wrap gap-4 self-end"
        >
          {socialProfiles.map((profile) => (
            <motion.li key={profile.id} variants={navItemVariants}>
              <a href={profile.link} target="_blank" rel="noopener noreferrer">
                {profile.title}
              </a>
            </motion.li>
          ))}
        </motion.ul> */}
      </div>
    </motion.nav>
  )
}

export { Menu, MenuButton, MenuList }
