"use client"
import { useMotionValueEvent, useScroll } from "motion/react";
import * as React from "react";

export function useToggleOnScroll () {
    const [isHidden, setIsHidden] = React.useState<boolean>(false)
    const show = () => setIsHidden(false)

    const { scrollY } = useScroll()
    const latestYRef = React.useRef(0)

    useMotionValueEvent(scrollY, "change", y => {
        const difference = y - latestYRef.current

        if(Math.abs(difference) > 50) {
            setIsHidden(difference > 0)
            latestYRef.current = y
        }
    })

    return {
        isHidden,
        show
    }
}