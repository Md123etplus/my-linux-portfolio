"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { X, Minus, Square } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DesktopWindowProps {
  title: string
  children: React.ReactNode
  active: boolean
  onClose: () => void
  onFocus: () => void
  width?: string
  height?: string
  x?: number
  y?: number
}

export function DesktopWindow({
  title,
  children,
  active,
  onClose,
  onFocus,
  width = "md:w-2/3",
  height = "md:h-2/3",
  x = 100,
  y = 100,
}: DesktopWindowProps) {
  const [position, setPosition] = useState({ x, y })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const windowRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    if (windowRef.current && e.target === windowRef.current.querySelector(".window-titlebar")) {
      setIsDragging(true)
      setDragOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      })
      onFocus()
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
    } else {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging])

  return (
    <div
      ref={windowRef}
      className={`absolute ${width} ${height} bg-background border-2 ${active ? "border-green-500" : "border-green-800"} rounded-md shadow-lg overflow-hidden z-10`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? "grabbing" : "default",
      }}
      onClick={onFocus}
      onMouseDown={handleMouseDown}
    >
      {/* Title Bar */}
      <div className="window-titlebar bg-background h-8 flex items-center justify-between px-2 border-b border-green-700 cursor-grab">
        <div className="text-green-500 text-sm font-mono">{title}</div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5 rounded-full bg-yellow-500 hover:bg-yellow-600"
            onClick={(e) => {
              e.stopPropagation()
              // Minimize functionality would go here
            }}
          >
            <Minus className="h-3 w-3 text-yellow-900" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5 rounded-full bg-green-500 hover:bg-green-600"
            onClick={(e) => {
              e.stopPropagation()
              // Maximize functionality would go here
            }}
          >
            <Square className="h-3 w-3 text-green-900" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5 rounded-full bg-red-500 hover:bg-red-600"
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
          >
            <X className="h-3 w-3 text-red-900" />
          </Button>
        </div>
      </div>

      {/* Window Content */}
      <div className="h-[calc(100%-2rem)] overflow-auto">{children}</div>
    </div>
  )
}

