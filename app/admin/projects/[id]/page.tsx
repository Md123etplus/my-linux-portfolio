"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

type Project = {
  id: string
  title: string
  description: string
  technologies: string
}

export default function EditProject({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { id } = params
  const isNewProject = id === "new"

  const [project, setProject] = useState<Project>({
    id: isNewProject ? "" : id,
    title: "",
    description: "",
    technologies: "",
  })

  useEffect(() => {
    // In a real app, fetch project data from API if not a new project
    if (!isNewProject) {
      // Simulating data fetch
      if (id === "1") {
        setProject({
          id: "1",
          title: "Application de gestion des services scolaires",
          description:
            "Permettre aux utilisateurs de soumettre des demandes et réclamations, et offrant à l'administration la possibilité de les accepter, les refuser, les télécharger et d'effectuer des recherches avancées.",
          technologies: "Angular, Spring Boot",
        })
      } else if (id === "2") {
        setProject({
          id: "2",
          title: "Socket App",
          description:
            "Développement d'une application en langage C, côté client et serveur, pour la gestion des contacts, incluant des fonctionnalités comme l'ajout, la suppression, la modification, et la recherche de contacts.",
          technologies: "C, Socket.io",
        })
      }
    }
  }, [id, isNewProject])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProject((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, save to database
    console.log("Saving project:", project)
    router.push("/admin/dashboard")
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="font-bold text-xl">{isNewProject ? "Nouveau Projet" : "Modifier Projet"}</div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/dashboard">Annuler</Link>
          </Button>
        </div>
      </header>

      <main className="container py-10">
        <Link href="/admin/dashboard" className="flex items-center text-primary hover:underline mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour au tableau de bord
        </Link>

        <Card>
          <CardHeader>
            <CardTitle>{isNewProject ? "Ajouter un nouveau projet" : "Modifier le projet"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Titre du projet</Label>
                <Input id="title" name="title" value={project.title} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="technologies">Technologies utilisées</Label>
                <Input
                  id="technologies"
                  name="technologies"
                  value={project.technologies}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={project.description}
                  onChange={handleChange}
                  rows={5}
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Enregistrer
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>

      {/* Task Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t h-8 flex items-center px-4 text-xs">
        <div className="flex-1">Moussa Dembélé</div>
        <div>{new Date().toLocaleTimeString()}</div>
      </div>
    </div>
  )
}
