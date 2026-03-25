"use client"

import { useMotionValueEvent, useScroll } from "motion/react"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"

import { DanielTranMark } from "./danieltran-mark"

const calcDistance = (el: HTMLElement) => {
  const rect = el.getBoundingClientRect()
  const scrollTop = document.documentElement.scrollTop
  const headerHeight = 56
  return scrollTop + rect.top + rect.height - headerHeight
}

function DanielTranMarkMotion() {
  const { scrollY } = useScroll()
  const [visible, setVisible] = useState(false)
  const distanceRef = useRef(160)

  useMotionValueEvent(scrollY, "change", (latestValue) => {
    setVisible(latestValue >= distanceRef.current)
  })

  useEffect(() => {
    const coverMark = document.getElementById("js-cover-mark")
    if (!coverMark) return

    distanceRef.current = calcDistance(coverMark)

    const resizeObserver = new ResizeObserver(() => {
      distanceRef.current = calcDistance(coverMark)
    })
    resizeObserver.observe(coverMark)

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <DanielTranMark
      data-visible={visible}
      className="transition-[opacity,translate] duration-300 data-[visible=false]:-translate-y-4 data-[visible=false]:opacity-0 data-[visible=true]:translate-y-0 data-[visible=true]:opacity-100"
    />
  )
}

export function SiteHeaderMark() {
  const pathname = usePathname()
  const isHome = ["/", "/index"].includes(pathname)
  return isHome ? <DanielTranMarkMotion /> : <DanielTranMark />
}
