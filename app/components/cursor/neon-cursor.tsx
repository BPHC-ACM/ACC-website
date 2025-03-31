"use client"

import { useEffect, useRef } from "react"
import styles from "./neon-cursor.module.css"

interface NeonCursorProps {
  mousePosition: { x: number; y: number }
}

export function NeonCursor({ mousePosition }: NeonCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const trail = trailRef.current

    if (!cursor || !trail) return

    // Update cursor position with transform for better performance
    const updateCursorPosition = () => {
      cursor.style.transform = `translate(${mousePosition.x}px, ${mousePosition.y}px)`

      // Trail follows with a delay
      setTimeout(() => {
        trail.style.transform = `translate(${mousePosition.x}px, ${mousePosition.y}px)`
      }, 80)
    }

    // Use requestAnimationFrame for smooth animation
    let animationId: number

    const animate = () => {
      updateCursorPosition()
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [mousePosition])

  return (
    <>
      <div ref={cursorRef} className={styles.cursor}></div>
      <div ref={trailRef} className={styles.trail}></div>
    </>
  )
}

