import { useEffect } from "react"
import Lenis from "lenis"

const SmoothScroll = ({ children }) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
    })

    let animationFrameId = 0
    const raf = (time) => {
      lenis.raf(time)
      animationFrameId = requestAnimationFrame(raf)
    }
    animationFrameId = requestAnimationFrame(raf)

    const resizeObserver = new ResizeObserver(() => {
      lenis.resize()
    })

    const rootElement = document.getElementById('root') || document.body
    resizeObserver.observe(rootElement)

    return () => {
      resizeObserver.disconnect()
      cancelAnimationFrame(animationFrameId)
      lenis.destroy()
    }
  }, [])

  return children
}

export default SmoothScroll
