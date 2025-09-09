"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  PlusCircle,
  Edit,
  Trash2,
  LogOut,
  Terminal,
  Shield,
  Database,
  FileCode,
  Server,
  Clock,
  Sun,
  Moon,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { MatrixRain } from "@/components/matrix-rain"
import { useTheme } from "next-themes"

// Types for our data
type Project = {
  id: string
  title: string
  description: string
  technologies: string
}

type Experience = {
  id: string
  title: string
  company: string
  location: string
  startDate: string
  endDate: string
  description: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("projects")
  const [currentTime, setCurrentTime] = useState(new Date())
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [systemStatus, setSystemStatus] = useState({
    cpu: "23%",
    memory: "512MB / 2GB",
    uptime: "3d 7h 42m",
    processes: "42",
  })

  // After mounting, we can safely show the UI that depends on the theme
  useEffect(() => {
    setMounted(true)
  }, [])

  // Sample data - in a real app, this would come from a database
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      title: "Application de gestion des services scolaires",
      description:
        "Permettre aux utilisateurs de soumettre des demandes et réclamations, et offrant à l \"Permettre aux utilisateurs de soumettre des demandes et réclamations, et offrant à l'administration la possibilité de les accepter, les refuser, les télécharger et d'effectuer des recherches avancées.",
      technologies: "Angular, Spring Boot",
    },
    {
      id: "2",
      title: "Socket App",
      description:
        "Développement d'une application en langage C, côté client et serveur, pour la gestion des contacts, incluant des fonctionnalités comme l'ajout, la suppression, la modification, et la recherche de contacts.",
      technologies: "C, Socket.io",
    },
  ])

  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: "1",
      title: "Freelance en Développement Web",
      company: "",
      location: "",
      startDate: "Août 2024",
      endDate: "Présent",
      description:
        "Travail principalement avec WordPress et des outils d'automatisation tels que Make pour créer des sites web dynamiques et optimiser les processus numériques.",
    },
    {
      id: "2",
      title: "Stagiaire en Développement Web",
      company: "Onnvision",
      location: "Tanger",
      startDate: "Juillet 2024",
      endDate: "Septembre 2024",
      description: "Conception et développement de solutions web, principalement avec WordPress.",
    },
  ])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Check if user is authenticated (in a real app, this would be more secure)
  useEffect(() => {
    // Simple client-side check - not secure for production
    const isAuthenticated = sessionStorage.getItem("isAuthenticated")
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [router])

  const handleLogout = () => {
    sessionStorage.removeItem("isAuthenticated")
    router.push("/login")
  }

  const deleteProject = (id: string) => {
    setProjects(projects.filter((project) => project.id !== id))
  }

  const deleteExperience = (id: string) => {
    setExperiences(experiences.filter((exp) => exp.id !== id))
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <div className="min-h-screen bg-black dark:bg-black text-green-500 font-mono relative overflow-hidden">
      {/* Matrix Background */}
      <div className="fixed inset-0 z-0 opacity-10">
        <MatrixRain />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-green-700 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="font-bold text-xl flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            ADMIN CONTROL PANEL
          </div>
          <div className="flex items-center gap-4">
            <div className="text-xs text-green-400">
              {currentTime.toLocaleTimeString()} | {currentTime.toLocaleDateString()}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-green-500 hover:bg-green-900/30 hover:text-green-300"
              onClick={toggleTheme}
            >
              {mounted && theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="border-green-700 text-green-500 hover:bg-green-900/30 hover:text-green-300"
            >
              <LogOut className="h-4 w-4 mr-2" />
              LOGOUT
            </Button>
            <Button
              variant="outline"
              size="sm"
              asChild
              className="border-green-700 text-green-500 hover:bg-green-900/30 hover:text-green-300"
            >
              <Link href="/">VIEW SYSTEM</Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              asChild
              className="border-green-700 text-green-500 hover:bg-green-900/30 hover:text-green-300"
            >
              <Link href="https://www.youtube.com/@welearntogetherofficial" target="_blank">
                YOUTUBE
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-black border-green-700 text-green-500">
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs text-green-400">CPU USAGE</div>
                <Server className="h-4 w-4 text-green-400" />
              </div>
              <div className="text-xl">{systemStatus.cpu}</div>
            </div>
          </Card>
          <Card className="bg-black border-green-700 text-green-500">
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs text-green-400">MEMORY</div>
                <Database className="h-4 w-4 text-green-400" />
              </div>
              <div className="text-xl">{systemStatus.memory}</div>
            </div>
          </Card>
          <Card className="bg-black border-green-700 text-green-500">
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs text-green-400">UPTIME</div>
                <Clock className="h-4 w-4 text-green-400" />
              </div>
              <div className="text-xl">{systemStatus.uptime}</div>
            </div>
          </Card>
          <Card className="bg-black border-green-700 text-green-500">
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs text-green-400">PROCESSES</div>
                <FileCode className="h-4 w-4 text-green-400" />
              </div>
              <div className="text-xl">{systemStatus.processes}</div>
            </div>
          </Card>
        </div>

        <Tabs defaultValue="projects" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <div className="flex justify-between items-center mb-6">
            <TabsList className="bg-green-900/20 border border-green-700">
              <TabsTrigger
                value="projects"
                className="data-[state=active]:bg-green-900/40 data-[state=active]:text-green-300"
              >
                PROJECTS
              </TabsTrigger>
              <TabsTrigger
                value="experiences"
                className="data-[state=active]:bg-green-900/40 data-[state=active]:text-green-300"
              >
                EXPERIENCES
              </TabsTrigger>
            </TabsList>
            <Button className="bg-green-900 hover:bg-green-800 text-green-300 border border-green-500">
              <PlusCircle className="h-4 w-4 mr-2" />
              {activeTab === "projects" ? "ADD PROJECT" : "ADD EXPERIENCE"}
            </Button>
          </div>

          <TabsContent value="projects" className="space-y-6">
            {projects.map((project) => (
              <Card key={project.id} className="bg-black border-green-700 text-green-500">
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-lg text-green-400 mb-1">{project.title}</div>
                      <div className="text-xs text-yellow-400 mb-2">{project.technologies}</div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-green-700 text-green-500 hover:bg-green-900/30 hover:text-green-300"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => deleteProject(project.id)}
                        className="border-red-700 text-red-500 hover:bg-red-900/30 hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-green-300 mt-2">{project.description}</p>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="experiences" className="space-y-6">
            {experiences.map((experience) => (
              <Card key={experience.id} className="bg-black border-green-700 text-green-500">
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-lg text-green-400 mb-1">{experience.title}</div>
                      <div className="text-xs text-yellow-400 mb-1">
                        {experience.company && `${experience.company} • `}
                        {experience.location}
                      </div>
                      <div className="text-xs text-green-600 mb-2">
                        {experience.startDate} - {experience.endDate}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-green-700 text-green-500 hover:bg-green-900/30 hover:text-green-300"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => deleteExperience(experience.id)}
                        className="border-red-700 text-red-500 hover:bg-red-900/30 hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-green-300 mt-2">{experience.description}</p>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </main>

      {/* Taskbar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-green-700 h-10 flex items-center px-4 text-xs z-20">
        <div className="flex-1">Moussa Dembélé</div>
        <div className="flex items-center gap-3">
          <Terminal className="h-4 w-4 text-green-500" />
          <div className="text-green-300">{currentTime.toLocaleTimeString()}</div>
        </div>
      </div>
    </div>
  )
}

