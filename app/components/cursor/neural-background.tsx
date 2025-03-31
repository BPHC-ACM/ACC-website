"use client"

import { useEffect, useRef } from "react"

export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight

    const resizeCanvas = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    // Neural network nodes
    const nodes: { x: number; y: number; vx: number; vy: number }[] = []
    const nodeCount = Math.min(Math.floor((width * height) / 15000), 100)

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      })
    }

    const drawNode = (x: number, y: number, theme: string) => {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, 3)
      gradient.addColorStop(0, theme === "dark" ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)")
      gradient.addColorStop(1, theme === "dark" ? "rgba(255, 255, 255, 0)" : "rgba(0, 0, 0, 0)")

      ctx.beginPath()
      ctx.arc(x, y, 3, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()
    }

    const drawConnection = (x1: number, y1: number, x2: number, y2: number, distance: number, theme: string) => {
      const maxDistance = 150
      const opacity = 1 - distance / maxDistance

      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.strokeStyle = theme === "dark" ? `rgba(255, 255, 255, ${opacity * 0.2})` : `rgba(0, 0, 0, ${opacity * 0.2})`
      ctx.lineWidth = 1
      ctx.stroke()
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      const theme = document.documentElement.classList.contains("dark") ? "dark" : "light"

      // Update nodes
      for (let i = 0; i < nodes.length; i++) {
        nodes[i].x += nodes[i].vx
        nodes[i].y += nodes[i].vy

        // Bounce off edges
        if (nodes[i].x < 0 || nodes[i].x > width) nodes[i].vx *= -1
        if (nodes[i].y < 0 || nodes[i].y > height) nodes[i].vy *= -1

        drawNode(nodes[i].x, nodes[i].y, theme)
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            drawConnection(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y, distance, theme)
          }
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="neural-background" />
}

