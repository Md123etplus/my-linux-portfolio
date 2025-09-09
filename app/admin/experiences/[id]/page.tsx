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

type Experience = {
  id: string
  title: string
  company: string
  location: string
  startDate: string
  endDate: string
  description: string
}

export default function EditExperience({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { id } = params
  const isNewExperience = id === "new"

  const [experience, setExperience] = useState<Experience>({
    id: isNewExperience ? "" : id,
    title: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
  })

  useEffect(() => {
    // In a real app, fetch experience data from API if not a new experience
    if (!isNewExperience) {
      // Simulating data fetch
      if (id === "1") {
        setExperience({
          id: "1",
          title: "Freelance en Développement Web",
          company: "",
          location: "",
          startDate: "Août 2024",
          endDate: "Présent",
          description:
            "Travail principalement avec WordPress et des outils d'automatisation tels que Make pour créer des sites web dynamiques et optimiser les processus numériques.",
        })
      } else if (id === "2") {
        setExperience({
          id: "2",
          title: "Stagiaire en Développement Web",
          company: "Onnvision",
          location: "Tanger",
          startDate: "Juillet 2024",
          endDate: "Septembre 2024",
          description: "Conception et développement de solutions web, principalement avec WordPress.",
        })
      }
    }
  }, [id, isNewExperience])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setExperience((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, save to database
    console.log("Saving experience:", experience)
    router.push("/admin/dashboard")
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="font-bold text-xl">{isNewExperience ? "Nouvelle Expérience" : "Modifier Expérience"}</div>
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
            <CardTitle>{isNewExperience ? "Ajouter une nouvelle expérience" : "Modifier l'expérience"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Titre du poste</Label>
                <Input id="title" name="title" value={experience.title} onChange={handleChange} required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Entreprise</Label>
                  <Input id="company" name="company" value={experience.company} onChange={handleChange} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Lieu</Label>
                  <Input id="location" name="location" value={experience.location} onChange={handleChange} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Date de début</Label>
                  <Input
                    id="startDate"
                    name="startDate"
                    value={experience.startDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endDate">Date de fin</Label>
                  <Input id="endDate" name="endDate" value={experience.endDate} onChange={handleChange} required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={experience.description}
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
