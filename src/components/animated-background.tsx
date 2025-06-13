"use client"

import type React from "react"
import { useEffect, useRef } from "react"

export const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext("2d")
    if (!context) return

    let ctx: CanvasRenderingContext2D = context

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Particle[] = []
    const particleCount = 85

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      width: number
      height: number

      constructor(width: number, height: number) {
        this.width = width
        this.height = height
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.size = Math.random() * 2 + 0.5
        this.speedX = Math.random() * 1 - 0.5
        this.speedY = Math.random() * 1 - 0.5
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > this.width) this.x = 0
        else if (this.x < 0) this.x = this.width

        if (this.y > this.height) this.y = 0
        else if (this.y < 0) this.y = this.height
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "rgba(0, 172, 226, 0.5)"
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas.width, canvas.height))
    }

    function animate(ctx: CanvasRenderingContext2D, width: number, height: number) {
      ctx.fillStyle = "#000314"
      ctx.fillRect(0, 0, width, height)

      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw(ctx)
      }

      requestAnimationFrame(() => animate(ctx, width, height))
    }


    animate(ctx, canvas.width, canvas.height)

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10" />
}

export default AnimatedBackground
