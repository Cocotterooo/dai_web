"use client"

import type React from "react"
import { useEffect, useRef } from "react"

export const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set initial canvas dimensions
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Particle[] = []
    const particleCount = 100 // Number of particles to display

    // Define the Particle class
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number

      constructor() {
        // Random initial position within canvas bounds
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        // Random size for variety
        this.size = Math.random() * 2 + 0.5
        // Random speed and direction
        this.speedX = Math.random() * 1 - 0.5 // -0.5 to 0.5
        this.speedY = Math.random() * 1 - 0.5 // -0.5 to 0.5
      }

      // Update particle's position
      update() {
        this.x += this.speedX
        this.y += this.speedY

        // Wrap particles around the canvas edges
        if (this.x > canvas.width) this.x = 0
        else if (this.x < 0) this.x = canvas.width

        if (this.y > canvas.height) this.y = 0
        else if (this.y < 0) this.y = canvas.height
      }

      // Draw the particle on the canvas
      draw() {
        // Particle color (light blue with some transparency)
        ctx.fillStyle = "rgba(0, 172, 226, 0.5)"
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Animation loop
    function animate() {
      // Set the background color for the canvas
      // This fills the entire canvas with the specified color before drawing particles
      ctx.fillStyle = "#000314" // Your desired dark blue background color
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw each particle
      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()
      }
      // Request the next animation frame
      requestAnimationFrame(animate)
    }

    // Start the animation
    animate()

    // Handle canvas resizing to maintain responsiveness
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      // Re-render particles or adjust positions if necessary after resize,
      // though for this simple animation, a simple resize is sufficient.
    }

    // Add resize event listener
    window.addEventListener("resize", handleResize)

    // Cleanup function: remove event listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, []) // Empty dependency array ensures useEffect runs only once on mount

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10" />
}

export default AnimatedBackground; // Export as default for easier import
