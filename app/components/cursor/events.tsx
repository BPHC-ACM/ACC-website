"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Eye } from "lucide-react"
import styles from "../../page.module.css"

type Event = {
  id: number
  title: string
  description: string
  image: string
  likes: number
}

export default function Events() {
  const [events] = useState<Event[]>([
    {
      id: 1,
      title: "Career Planning Workshop",
      description: "Learn how to plan your academic journey to align with your career goals.",
      image: "/placeholder.svg?height=200&width=300",
      likes: 21300,
    },
    {
      id: 2,
      title: "Study Skills Seminar",
      description: "Discover effective study techniques to improve your academic performance.",
      image: "/placeholder.svg?height=200&width=300",
      likes: 21300,
    },
    {
      id: 3,
      title: "Stress Management Session",
      description: "Learn strategies to manage academic stress and maintain well-being.",
      image: "/placeholder.svg?height=200&width=300",
      likes: 21300,
    },
    {
      id: 4,
      title: "Research Methodology Workshop",
      description: "Understand the fundamentals of academic research and methodology.",
      image: "/placeholder.svg?height=200&width=300",
      likes: 18500,
    },
  ])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [maxIndex, setMaxIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  useEffect(() => {
    const updateMaxIndex = () => {
      const cardsPerView = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1
      setMaxIndex(Math.max(0, events.length - cardsPerView))
    }

    updateMaxIndex()
    window.addEventListener("resize", updateMaxIndex)
    return () => window.removeEventListener("resize", updateMaxIndex)
  }, [events.length])

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  useEffect(() => {
    if (containerRef.current) {
      const scrollAmount = currentIndex * (containerRef.current.scrollWidth / events.length)
      containerRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      })
    }
  }, [currentIndex, events.length])

  return (
    <section id="events" className={styles.events}>
      <div className={styles.eventsBg}></div>

      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Events</h2>

        <div className={styles.eventsCarousel}>
          <button
            onClick={prevSlide}
            className={`${styles.carouselButton} ${styles.carouselButtonPrev}`}
            disabled={currentIndex === 0}
            aria-label="Previous events"
          >
            <ChevronLeft size={24} className={currentIndex === 0 ? "text-gray-300" : "text-gray-700"} />
          </button>

          <div ref={containerRef} className={styles.carouselContainer}>
            {events.map((event) => (
              <div
                key={event.id}
                className={styles.eventCard}
                onMouseEnter={() => setHoveredCard(event.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className={styles.eventImage}>
                  <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                  <div className={styles.eventImageOverlay}></div>
                </div>
                <div className={styles.eventContent}>
                  <h3 className={styles.eventTitle}>{event.title}</h3>
                  <p className={styles.eventDescription}>{event.description}</p>
                  <div className={styles.eventFooter}>
                    <button className={styles.eventView}>
                      <Eye size={18} />
                      <span className="text-sm font-medium">View details</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={nextSlide}
            className={`${styles.carouselButton} ${styles.carouselButtonNext}`}
            disabled={currentIndex === maxIndex}
            aria-label="Next events"
          >
            <ChevronRight size={24} className={currentIndex === maxIndex ? "text-gray-300" : "text-gray-700"} />
          </button>
        </div>
      </div>
    </section>
  )
}

