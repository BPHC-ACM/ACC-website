"use client"

import { useEffect, useState } from "react"

export default function CursorEffect() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener("mousemove", updatePosition)
    window.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("mouseenter", () => setIsVisible(true))

    return () => {
      window.removeEventListener("mousemove", updatePosition)
      window.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("mouseenter", () => setIsVisible(true))
    }
  }, [])

  if (!isVisible) return null

  return (
    <div
      className="cursor-effect"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        opacity: isVisible ? 1 : 0,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="cursor-glow">
        <div className="cursor-glow-large"></div>
        <div className="cursor-glow-medium"></div>
        <div className="cursor-glow-small"></div>
      </div>
    </div>
  )
}

