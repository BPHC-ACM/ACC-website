"use client"

import { ChevronDown } from "lucide-react"
import { useEffect, useState } from "react"

export default function ScrollIndicator() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToEvents = () => {
    const eventsSection = document.getElementById("events")
    if (eventsSection) {
      eventsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  if (!isVisible) return null

  return (
    <div className="scroll-indicator">
      <button onClick={scrollToEvents} className="scroll-button" aria-label="Scroll to events">
        <ChevronDown size={24} />
      </button>
    </div>
  )
}

