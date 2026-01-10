'use client'

import { useEffect, useState } from 'react'

interface CountingNumberProps {
  end: number
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
  className?: string
}

export function CountingNumber({
  end,
  duration = 2000,
  decimals = 2,
  prefix = '',
  suffix = '',
  className = '',
}: CountingNumberProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number | null = null
    const startValue = 0

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = startValue + (end - startValue) * easeOutQuart

      setCount(currentCount)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    requestAnimationFrame(animate)
  }, [end, duration])

  const formattedNumber = count.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return (
    <span className={className}>
      {prefix}
      {formattedNumber}
      {suffix}
    </span>
  )
}
