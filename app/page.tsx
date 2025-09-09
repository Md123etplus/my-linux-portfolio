"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import {
  Github,
  Linkedin,
  Mail,
  Terminal,
  Folder,
  FileText,
  User,
  Code,
  Monitor,
  Settings,
  Power,
  Clock,
  Wifi,
  Volume2,
  Battery,
  Sun,
  Moon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { TerminalWindow } from "@/components/terminal-window"
import { DesktopIcon } from "@/components/desktop-icon"
import { MatrixRain } from "@/components/matrix-rain"
import { DesktopWindow } from "@/components/desktop-window"
import { YouTubeIcon } from "@/components/desktop-icon"
import { GitHubIcon } from "@/components/desktop-icon"
import { LinkedInIcon } from "@/components/desktop-icon"
import { useTheme } from "next-themes"

export default function Home() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [activeWindow, setActiveWindow] = useState<string | null>(null)
  const [showStartMenu, setShowStartMenu] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [windows, setWindows] = useState<{ [key: string]: boolean }>({
    about: false,
    experience: false,
    education: false,
    skills: false,
    projects: false,
    terminal: false,
  })

  // After mounting, we can safely show the UI that depends on the theme
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const toggleWindow = (window: string) => {
    setWindows((prev) => ({
      ...prev,
      [window]: !prev[window],
    }))
    setActiveWindow(window)
  }

  const closeWindow = (window: string) => {
    setWindows((prev) => ({
      ...prev,
      [window]: false,
    }))
    setActiveWindow(null)
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-mono relative overflow-hidden">
      {/* Matrix Background */}
      <div className="fixed inset-0 z-0 opacity-20">
        <MatrixRain />
      </div>

      {/* Desktop */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <div className="flex-1 p-4 grid grid-cols-4 gap-4 md:grid-cols-6 lg:grid-cols-8 auto-rows-min">
          <DesktopIcon
            icon={<User size={32} className="text-primary" />}
            label="About Me"
            onClick={() => toggleWindow("about")}
          />
          <DesktopIcon
            icon={<FileText size={32} className="text-primary" />}
            label="Experience"
            onClick={() => toggleWindow("experience")}
          />
          <DesktopIcon
            icon={<Code size={32} className="text-primary" />}
            label="Skills"
            onClick={() => toggleWindow("skills")}
          />
          <DesktopIcon
            icon={<Folder size={32} className="text-primary" />}
            label="Projects"
            onClick={() => toggleWindow("projects")}
          />
          <DesktopIcon
            icon={<Monitor size={32} className="text-primary" />}
            label="Education"
            onClick={() => toggleWindow("education")}
          />
          <DesktopIcon
            icon={<Terminal size={32} className="text-primary" />}
            label="Terminal"
            onClick={() => toggleWindow("terminal")}
          />
          <YouTubeIcon onClick={() => window.open("https://www.youtube.com/@welearntogetherofficial", "_blank")} />
          <GitHubIcon onClick={() => window.open("https://github.com/Md123etplus", "_blank")} />
          <LinkedInIcon onClick={() => window.open("https://www.linkedin.com/in/moussa-dembélé/", "_blank")} />
        </div>

        {/* Windows */}
        {windows.about && (
          <DesktopWindow
            title="About Me"
            active={activeWindow === "about"}
            onClose={() => closeWindow("about")}
            onFocus={() => setActiveWindow("about")}
            width="md:w-2/3"
            height="md:h-3/4"
            x={50}
            y={50}
          >
            <div className="grid md:grid-cols-2 gap-6 p-4">
              <div className="space-y-4">
                <div className="text-xl border-b border-green-500 pb-2">Moussa Dembélé</div>
                <p className="text-green-400">
                  Je suis étudiant en génie informatique à l'École Nationale des Sciences Appliquées de Tétouan, Maroc.
                  Passionné par le développement web, je travaille avec diverses technologies comme Angular, Spring
                  Boot, et WordPress.
                </p>
                <div className="mt-4 grid grid-cols-1 gap-2">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-green-500" />
                    <span className="text-green-300">moussa.dembele@etu.uae.ac.ma</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">☎</span>
                    <span className="text-green-300">+212 7 71 37 21 11</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="relative w-48 h-48 border-2 border-green-500 rounded-full overflow-hidden mb-4 glitch-effect">
                  <Image src="/images/profile.png" alt="Moussa Dembélé" fill className="object-cover" priority />
                </div>
                <div className="flex gap-4 mt-4">
                  <Link href="https://github.com/Md123etplus" target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-green-500 text-green-500 hover:bg-green-900 hover:text-green-300"
                    >
                      <Github className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="https://www.linkedin.com/in/moussa-dembélé/" target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-green-500 text-green-500 hover:bg-green-900 hover:text-green-300"
                    >
                      <Linkedin className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="mailto:moussa.dembele@etu.uae.ac.ma">
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-green-500 text-green-500 hover:bg-green-900 hover:text-green-300"
                    >
                      <Mail className="h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </DesktopWindow>
        )}

        {windows.experience && (
          <DesktopWindow
            title="Experience.log"
            active={activeWindow === "experience"}
            onClose={() => closeWindow("experience")}
            onFocus={() => setActiveWindow("experience")}
            width="md:w-2/3"
            height="md:h-3/4"
            x={100}
            y={100}
          >
            <div className="p-4 space-y-4 font-mono">
              <div className="text-green-300 border-b border-green-700 pb-2">
                <span className="text-yellow-400">$</span> cat experience.log
              </div>

              <div className="bg-background border border-green-700 p-4 rounded">
                <div className="text-green-400 mb-1">[ENTRY::01] ~ Freelance en Développement Web</div>
                <div className="text-yellow-400 text-sm mb-2">TIMEFRAME: Août 2024 - Présent</div>
                <div className="text-green-300 text-sm">
                  Travail principalement avec WordPress et des outils d'automatisation tels que Make pour créer des
                  sites web dynamiques et optimiser les processus numériques.
                </div>
              </div>

              <div className="bg-background border border-green-700 p-4 rounded">
                <div className="text-green-400 mb-1">[ENTRY::02] ~ Stagiaire en Développement Web</div>
                <div className="text-yellow-400 text-sm mb-1">LOCATION: Onnvision • Tanger</div>
                <div className="text-yellow-400 text-sm mb-2">TIMEFRAME: Juillet 2024 - Septembre 2024</div>
                <div className="text-green-300 text-sm">
                  Conception et développement de solutions web, principalement avec WordPress.
                </div>
              </div>
            </div>
          </DesktopWindow>
        )}

        {windows.education && (
          <DesktopWindow
            title="Education.db"
            active={activeWindow === "education"}
            onClose={() => closeWindow("education")}
            onFocus={() => setActiveWindow("education")}
            width="md:w-2/3"
            height="md:h-3/4"
            x={150}
            y={150}
          >
            <div className="p-4 space-y-4 font-mono">
              <div className="text-green-300 border-b border-green-700 pb-2">
                <span className="text-yellow-400">$</span> SELECT * FROM education ORDER BY year DESC;
              </div>

              <div className="bg-background border border-green-700 p-4 rounded">
                <div className="text-green-400 mb-1">Cycle d'ingénieur en génie informatique</div>
                <div className="text-yellow-400 text-sm mb-1">
                  École Nationale des Sciences Appliquées • Tétouan, Maroc
                </div>
                <div className="text-green-300 text-sm">2023 - Présent</div>
              </div>

              <div className="bg-background border border-green-700 p-4 rounded">
                <div className="text-green-400 mb-1">Cycle préparatoire</div>
                <div className="text-yellow-400 text-sm mb-1">
                  École Nationale des Sciences Appliquées • Tétouan, Maroc
                </div>
                <div className="text-green-300 text-sm">2021 - 2023</div>
              </div>

              <div className="bg-background border border-green-700 p-4 rounded">
                <div className="text-green-400 mb-1">Baccalauréat en sciences exactes</div>
                <div className="text-yellow-400 text-sm mb-1">Lycée moderne Cheick Modibo Diarra • Bamako, Mali</div>
                <div className="text-green-300 text-sm">2019 - 2020</div>
              </div>
            </div>
          </DesktopWindow>
        )}

        {windows.skills && (
          <DesktopWindow
            title="Skills.json"
            active={activeWindow === "skills"}
            onClose={() => closeWindow("skills")}
            onFocus={() => setActiveWindow("skills")}
            width="md:w-2/3"
            height="md:h-3/4"
            x={200}
            y={200}
          >
            <div className="p-4 space-y-4 font-mono">
              <div className="text-green-300 border-b border-green-700 pb-2">
                <span className="text-yellow-400">$</span> cat skills.json | jq
              </div>

              <div className="bg-background border border-green-700 p-4 rounded">
                <pre className="text-xs sm:text-sm text-green-300 overflow-auto">
                  {`{
  "technical_skills": [
    "Angular", "Spring Boot", "HTML", "CSS", 
    "JavaScript", "C", "JAVA", "PHP", 
    "Python", "Django", "Laravel", "NextJs", 
    "Bootstrap", "Oracle", "MySQL", "PL/SQL", 
    "Merise", "UML", "Windows", "Linux"
  ],
  "soft_skills": [
    "Esprit d'équipe", "Adaptabilité", "Autonomie"
  ],
  "languages": [
    {"name": "Français", "level": "Courant"},
    {"name": "Anglais", "level": "B2"},
    {"name": "Espagnol", "level": "A1"}
  ],
  "interests": [
    "Sport", "Lecture", "Video Making"
  ]
}`}
                </pre>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <div className="text-yellow-400 mb-2">Technical Skills:</div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Angular",
                      "Spring Boot",
                      "HTML",
                      "CSS",
                      "JavaScript",
                      "C",
                      "JAVA",
                      "PHP",
                      "Python",
                      "Django",
                      "Laravel",
                      "NextJs",
                      "Bootstrap",
                      "Oracle",
                      "MySQL",
                      "PL/SQL",
                      "Merise",
                      "UML",
                      "Windows",
                      "Linux",
                    ].map((skill) => (
                      <Badge key={skill} variant="outline" className="bg-green-900/30 text-green-400 border-green-500">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-yellow-400 mb-2">Soft Skills:</div>
                  <div className="flex flex-wrap gap-2">
                    {["Esprit d'équipe", "Adaptabilité", "Autonomie"].map((skill) => (
                      <Badge key={skill} variant="outline" className="bg-green-900/30 text-green-400 border-green-500">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </DesktopWindow>
        )}

        {windows.projects && (
          <DesktopWindow
            title="Projects.sh"
            active={activeWindow === "projects"}
            onClose={() => closeWindow("projects")}
            onFocus={() => setActiveWindow("projects")}
            width="md:w-2/3"
            height="md:h-3/4"
            x={250}
            y={250}
          >
            <div className="p-4 space-y-4 font-mono">
              <div className="text-green-300 border-b border-green-700 pb-2">
                <span className="text-yellow-400">$</span> ./list_projects.sh
              </div>

              <div className="bg-background border border-green-700 p-4 rounded">
                <div className="text-green-400 mb-1">[PROJECT_01] Application de gestion des services scolaires</div>
                <div className="text-yellow-400 text-sm mb-2">TECH: Angular, Spring Boot</div>
                <div className="text-green-300 text-sm">
                  Permettre aux utilisateurs de soumettre des demandes et réclamations, et offrant à l'administration la
                  possibilité de les accepter, les refuser, les télécharger et d'effectuer des recherches avancées.
                </div>
                <div className="mt-2 text-green-500 text-xs">
                  <span className="text-yellow-400">$</span> git clone project_01.git
                </div>
              </div>

              <div className="bg-background border border-green-700 p-4 rounded">
                <div className="text-green-400 mb-1">[PROJECT_02] Socket App</div>
                <div className="text-yellow-400 text-sm mb-2">TECH: C, Socket.io</div>
                <div className="text-green-300 text-sm">
                  Développement d'une application en langage C, côté client et serveur, pour la gestion des contacts,
                  incluant des fonctionnalités comme l'ajout, la suppression, la modification, et la recherche de
                  contacts.
                </div>
                <div className="mt-2 text-green-500 text-xs">
                  <span className="text-yellow-400">$</span> git clone project_02.git
                </div>
              </div>
            </div>
          </DesktopWindow>
        )}

        {windows.terminal && (
          <TerminalWindow
            active={activeWindow === "terminal"}
            onClose={() => closeWindow("terminal")}
            onFocus={() => setActiveWindow("terminal")}
          />
        )}

        {/* Taskbar */}
        <div className="bg-gray-900 border-t border-green-700 h-10 flex items-center px-4 text-xs z-20">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              className="text-green-500 hover:bg-green-900/30 hover:text-green-300 mr-2"
              onClick={() => setShowStartMenu(!showStartMenu)}
            >
              <Terminal className="h-4 w-4 mr-1" />
              <span>start</span>
            </Button>

            {/* Open Windows */}
            <div className="flex gap-1">
              {Object.entries(windows).map(
                ([key, isOpen]) =>
                  isOpen && (
                    <Button
                      key={key}
                      variant="ghost"
                      size="sm"
                      className={`text-xs ${activeWindow === key ? "bg-green-900/30 text-green-300" : "text-green-500 hover:bg-green-900/30 hover:text-green-300"}`}
                      onClick={() => setActiveWindow(key)}
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </Button>
                  ),
              )}
            </div>
          </div>

          <div className="flex-1"></div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-green-500 hover:bg-green-900/30 hover:text-green-300"
              onClick={toggleTheme}
            >
              {mounted && theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Wifi className="h-4 w-4 text-green-500" />
            <Volume2 className="h-4 w-4 text-green-500" />
            <Battery className="h-4 w-4 text-green-500" />
            <Clock className="h-4 w-4 text-green-500" />
            <div className="text-green-300">{currentTime.toLocaleTimeString()}</div>
            <div className="ml-2 text-green-300">Moussa Dembélé</div>
          </div>
        </div>

        {/* Start Menu */}
        {showStartMenu && (
          <div className="absolute bottom-10 left-0 w-64 bg-gray-900 border border-green-700 rounded-t-md z-30">
            <div className="p-2 border-b border-green-700 flex items-center">
              <div className="w-8 h-8 rounded-full bg-green-900 flex items-center justify-center mr-2 overflow-hidden">
                <Image
                  src="/images/profile.png"
                  alt="Moussa Dembélé"
                  width={32}
                  height={32}
                  className="object-cover"
                  priority
                />
              </div>
              <div className="text-green-300">Moussa Dembélé</div>
            </div>
            <div className="p-2">
              <Button
                variant="ghost"
                className="w-full justify-start text-green-500 hover:bg-green-900/30 hover:text-green-300"
                onClick={() => {
                  toggleWindow("about")
                  setShowStartMenu(false)
                }}
              >
                <User className="h-4 w-4 mr-2" />
                About Me
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-green-500 hover:bg-green-900/30 hover:text-green-300"
                onClick={() => {
                  toggleWindow("projects")
                  setShowStartMenu(false)
                }}
              >
                <Folder className="h-4 w-4 mr-2" />
                Projects
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-green-500 hover:bg-green-900/30 hover:text-green-300"
                onClick={() => {
                  toggleWindow("terminal")
                  setShowStartMenu(false)
                }}
              >
                <Terminal className="h-4 w-4 mr-2" />
                Terminal
              </Button>
              <Link href="/login">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-green-500 hover:bg-green-900/30 hover:text-green-300"
                  onClick={() => setShowStartMenu(false)}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Admin
                </Button>
              </Link>
              <div className="border-t border-green-700 my-2"></div>
              <Button
                variant="ghost"
                className="w-full justify-start text-green-500 hover:bg-green-900/30 hover:text-green-300"
                onClick={toggleTheme}
              >
                {mounted && theme === "dark" ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
                Toggle Theme
              </Button>
              <Link href="/">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-500 hover:bg-red-900/30 hover:text-red-300"
                  onClick={() => setShowStartMenu(false)}
                >
                  <Power className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
