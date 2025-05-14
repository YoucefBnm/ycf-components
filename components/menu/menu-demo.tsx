import {
  Menu,
  MenuItem,
  MenuList,
  MenuNavigation,
  MenuToggleButton,
} from "./menu"

const MENU_LINKS = [
  {
    id: "menu-link-1",
    label: "home",
    href: "/",
  },
  {
    id: "menu-link-2",
    label: "about",
    href: "/about",
  },
  {
    id: "menu-link-3",
    label: "services",
    href: "/services",
  },
  {
    id: "menu-link-4",
    label: "contact",
    href: "/contact",
  },
  {
    id: "menu-link-5",
    label: "blog",
    href: "/blog",
  },
]

export const MenuDemo = () => {
  return (
    <Menu className="fixed left-0 top-0 z-50 w-full mix-blend-difference  ">
      <div className="relative z-[60] flex items-center justify-between bg-transparent px-12  py-2  ">
        <b className="text-xl font-bold uppercase tracking-tighter text-slate-950">
          logo<span className="text-[1.5em] text-[#EF3E36]">.</span>
        </b>

        <MenuToggleButton className="bg-slate-900 " />
      </div>
      <MenuNavigation className="fixed  inset-0  h-screen w-full  bg-slate-50  text-slate-950  ">
        <MenuList>
          {MENU_LINKS.map((link) => (
            <MenuItem key={link.id}>
              <a
                href={link.href}
                className="text-slate-50 hover:text-slate-100"
              >
                {link.label}
              </a>
            </MenuItem>
          ))}
        </MenuList>
      </MenuNavigation>
    </Menu>
  )
}
