"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { X, Minus, Square } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TerminalWindowProps {
  active: boolean
  onClose: () => void
  onFocus: () => void
}

export function TerminalWindow({ active, onClose, onFocus }: TerminalWindowProps) {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<string[]>([
    "Welcome to MoussaOS v1.0.0",
    'Type "help" for available commands.',
    "",
  ])
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (active && inputRef.current) {
      inputRef.current.focus()
    }
  }, [active])

  const handleCommand = (cmd: string) => {
    const newHistory = [...history, `$ ${cmd}`]

    const commands: { [key: string]: () => string[] } = {
      help: () => [
        "Available commands:",
        "  help     - Show this help message",
        "  clear    - Clear the terminal",
        "  whoami   - Display user information",
        "  ls       - List files and directories",
        "  projects - Show my projects",
        "  contact  - Show contact information",
        "  youtube  - Open YouTube channel",
        "  date     - Show current date and time",
        "  exit     - Close the terminal",
      ],
      clear: () => {
        setHistory([])
        return []
      },
      whoami: () => [
        "Moussa Dembélé",
        "Ingénieur Élève en Génie Informatique",
        "École Nationale des Sciences Appliquées de Tétouan",
      ],
      ls: () => ["Documents/", "Projects/", "Education/", "Skills.json", "Experience.log", "README.md"],
      projects: () => [
        "1. Application de gestion des services scolaires",
        "   Technologies: Angular, Spring Boot",
        "",
        "2. Socket App",
        "   Technologies: C, Socket.io",
      ],
      contact: () => [
        "Email: moussa.dembele@etu.uae.ac.ma",
        "Phone: +212 7 71 37 21 11",
        "GitHub: https://github.com/Md123etplus",
        "LinkedIn: https://www.linkedin.com/in/moussa-dembélé/",
        "YouTube: https://www.youtube.com/@welearntogetherofficial",
      ],
      date: () => [new Date().toString()],
      youtube: () => [
        "Opening YouTube channel: WELEARNTOGETHER OFFICIAL",
        "URL: https://www.youtube.com/@welearntogetherofficial",
      ],
      exit: () => {
        setTimeout(() => onClose(), 500)
        return ["Closing terminal..."]
      },
    }

    if (cmd.trim() === "") {
      setHistory([...newHistory, ""])
    } else if (commands[cmd.toLowerCase()]) {
      const result = commands[cmd.toLowerCase()]()
      setHistory([...newHistory, ...result, ""])
    } else {
      setHistory([...newHistory, `Command not found: ${cmd}`, ""])
    }

    setInput("")

    setTimeout(() => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight
      }
    }, 0)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(input)
    }
  }

  return (
    <div
      className={`absolute top-20 left-20 w-[90%] md:w-2/3 h-[70%] bg-background border-2 ${active ? "border-green-500" : "border-green-800"} rounded-md shadow-lg overflow-hidden z-10`}
      onClick={onFocus}
    >
      {/* Title Bar */}
      <div className="bg-background h-8 flex items-center justify-between px-2 border-b border-green-700">
        <div className="text-green-500 text-sm font-mono">Terminal</div>
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

      {/* Terminal Content */}
      <div ref={terminalRef} className="p-4 h-[calc(100%-2rem)] overflow-auto font-mono text-green-500 text-sm">
        {history.map((line, index) => (
          <div key={index} className={line.startsWith("$") ? "text-yellow-400" : ""}>
            {line}
          </div>
        ))}
        <div className="flex items-center">
          <span className="text-yellow-400 mr-2">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-green-500"
            autoFocus={active}
          />
        </div>
      </div>
    </div>
  )
}
